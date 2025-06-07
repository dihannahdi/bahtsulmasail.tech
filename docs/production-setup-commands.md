# Production Setup Commands - BahtsulMasail.tech

## Cloud SQL Backup Configuration

### 1. Enable Automated Daily Backups

```bash
# Enable automated backups for the Cloud SQL instance
gcloud sql instances patch lbmdb \
    --backup-start-time=02:00 \
    --backup-location=us-central1 \
    --enable-bin-log \
    --retained-backups-count=30 \
    --retained-transaction-log-days=7

# Verify backup configuration
gcloud sql instances describe lbmdb \
    --format="value(settings.backupConfiguration)"
```

### 2. Create Manual Backup (for immediate backup)

```bash
# Create an immediate backup
gcloud sql backups create \
    --instance=lbmdb \
    --description="Pre-production manual backup $(date +%Y%m%d_%H%M%S)"

# List all backups
gcloud sql backups list --instance=lbmdb
```

### 3. Point-in-Time Recovery Setup

```bash
# Enable point-in-time recovery (already included in backup config above)
gcloud sql instances patch lbmdb \
    --enable-bin-log \
    --retained-transaction-log-days=7
```

## Google Cloud Monitoring Setup

### 1. Create Alerting Policies

#### High CPU Utilization Alert

```bash
# Create CPU utilization alert policy
gcloud alpha monitoring policies create --policy-from-file=- <<EOF
displayName: "High CPU Utilization - BahtsulMasail Services"
documentation:
  content: "CPU utilization is above 80% for more than 5 minutes"
  mimeType: "text/markdown"
conditions:
  - displayName: "Cloud Run CPU > 80%"
    conditionThreshold:
      filter: 'resource.type="cloud_run_revision" AND resource.labels.service_name=~"bahtsulmasail-tech-.*"'
      comparison: COMPARISON_GREATER_THAN
      thresholdValue: 0.8
      duration: 300s
      aggregations:
        - alignmentPeriod: 60s
          perSeriesAligner: ALIGN_MEAN
          crossSeriesReducer: REDUCE_MEAN
          groupByFields:
            - "resource.labels.service_name"
            - "resource.labels.revision_name"
combiner: OR
enabled: true
notificationChannels:
  - projects/bahtsul-masail-457713/notificationChannels/NOTIFICATION_CHANNEL_ID
EOF
```

#### Server Error Rate Alert

```bash
# Create server error rate alert policy
gcloud alpha monitoring policies create --policy-from-file=- <<EOF
displayName: "High Server Error Rate - BahtsulMasail Services"
documentation:
  content: "HTTP 5xx error rate is above 5% for more than 2 minutes"
  mimeType: "text/markdown"
conditions:
  - displayName: "Cloud Run 5xx Error Rate > 5%"
    conditionThreshold:
      filter: 'resource.type="cloud_run_revision" AND resource.labels.service_name=~"bahtsulmasail-tech-.*" AND metric.type="run.googleapis.com/request_count"'
      comparison: COMPARISON_GREATER_THAN
      thresholdValue: 0.05
      duration: 120s
      aggregations:
        - alignmentPeriod: 60s
          perSeriesAligner: ALIGN_RATE
          crossSeriesReducer: REDUCE_SUM
          groupByFields:
            - "resource.labels.service_name"
            - "metric.labels.response_code_class"
      denominatorFilter: 'resource.type="cloud_run_revision" AND resource.labels.service_name=~"bahtsulmasail-tech-.*" AND metric.type="run.googleapis.com/request_count"'
      denominatorAggregations:
        - alignmentPeriod: 60s
          perSeriesAligner: ALIGN_RATE
          crossSeriesReducer: REDUCE_SUM
          groupByFields:
            - "resource.labels.service_name"
combiner: OR
enabled: true
notificationChannels:
  - projects/bahtsul-masail-457713/notificationChannels/NOTIFICATION_CHANNEL_ID
EOF
```

#### Cloud SQL Connection Alert

```bash
# Create Cloud SQL connection alert
gcloud alpha monitoring policies create --policy-from-file=- <<EOF
displayName: "Cloud SQL High Connection Count"
documentation:
  content: "Cloud SQL connection count is above 80% of maximum"
  mimeType: "text/markdown"
conditions:
  - displayName: "Cloud SQL Connections > 80%"
    conditionThreshold:
      filter: 'resource.type="cloudsql_database" AND resource.labels.database_id="bahtsul-masail-457713:lbmdb" AND metric.type="cloudsql.googleapis.com/database/postgresql/num_backends"'
      comparison: COMPARISON_GREATER_THAN
      thresholdValue: 80
      duration: 300s
      aggregations:
        - alignmentPeriod: 60s
          perSeriesAligner: ALIGN_MEAN
          crossSeriesReducer: REDUCE_MEAN
combiner: OR
enabled: true
notificationChannels:
  - projects/bahtsul-masail-457713/notificationChannels/NOTIFICATION_CHANNEL_ID
EOF
```

### 2. Create Notification Channels

#### Email Notification Channel

```bash
# Create email notification channel
gcloud alpha monitoring channels create \
    --display-name="BahtsulMasail Admin Email" \
    --type=email \
    --channel-labels=email_address=admin@bahtsulmasail.tech \
    --description="Primary admin email for critical alerts"
```

#### Slack Notification Channel (if using Slack)

```bash
# Create Slack notification channel (requires Slack webhook URL)
gcloud alpha monitoring channels create \
    --display-name="BahtsulMasail Slack Alerts" \
    --type=slack \
    --channel-labels=url=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK \
    --description="Slack channel for system alerts"
```

### 3. Create Custom Dashboards

#### Application Performance Dashboard

```bash
# Create custom dashboard for application metrics
gcloud monitoring dashboards create --config-from-file=- <<EOF
displayName: "BahtsulMasail.tech - Application Performance"
mosaicLayout:
  tiles:
    - width: 6
      height: 4
      widget:
        title: "Cloud Run Request Count"
        xyChart:
          dataSets:
            - timeSeriesQuery:
                timeSeriesFilter:
                  filter: 'resource.type="cloud_run_revision" AND resource.labels.service_name=~"bahtsulmasail-tech-.*"'
                  aggregation:
                    alignmentPeriod: 60s
                    perSeriesAligner: ALIGN_RATE
                    crossSeriesReducer: REDUCE_SUM
                    groupByFields:
                      - "resource.labels.service_name"
              plotType: LINE
          yAxis:
            label: "Requests/sec"
    - width: 6
      height: 4
      xPos: 6
      widget:
        title: "Cloud Run Response Latency"
        xyChart:
          dataSets:
            - timeSeriesQuery:
                timeSeriesFilter:
                  filter: 'resource.type="cloud_run_revision" AND resource.labels.service_name=~"bahtsulmasail-tech-.*" AND metric.type="run.googleapis.com/request_latencies"'
                  aggregation:
                    alignmentPeriod: 60s
                    perSeriesAligner: ALIGN_DELTA
                    crossSeriesReducer: REDUCE_PERCENTILE_95
                    groupByFields:
                      - "resource.labels.service_name"
              plotType: LINE
          yAxis:
            label: "Latency (ms)"
    - width: 12
      height: 4
      yPos: 4
      widget:
        title: "Cloud SQL Metrics"
        xyChart:
          dataSets:
            - timeSeriesQuery:
                timeSeriesFilter:
                  filter: 'resource.type="cloudsql_database" AND resource.labels.database_id="bahtsul-masail-457713:lbmdb"'
                  aggregation:
                    alignmentPeriod: 60s
                    perSeriesAligner: ALIGN_MEAN
                    crossSeriesReducer: REDUCE_MEAN
              plotType: LINE
          yAxis:
            label: "Connections"
EOF
```

## Security and Access Control

### 1. IAM Roles and Permissions

```bash
# Create custom role for monitoring access
gcloud iam roles create bahtsulmasail_monitoring_viewer \
    --project=bahtsul-masail-457713 \
    --title="BahtsulMasail Monitoring Viewer" \
    --description="Read-only access to monitoring data" \
    --permissions=monitoring.alertPolicies.get,monitoring.alertPolicies.list,monitoring.dashboards.get,monitoring.dashboards.list,monitoring.metricDescriptors.get,monitoring.metricDescriptors.list,monitoring.timeSeries.list

# Grant monitoring access to operations team
gcloud projects add-iam-policy-binding bahtsul-masail-457713 \
    --member="group:ops-team@bahtsulmasail.tech" \
    --role="projects/bahtsul-masail-457713/roles/bahtsulmasail_monitoring_viewer"
```

### 2. Service Account for Monitoring

```bash
# Create service account for monitoring automation
gcloud iam service-accounts create bahtsulmasail-monitoring \
    --display-name="BahtsulMasail Monitoring Service Account" \
    --description="Service account for automated monitoring tasks"

# Grant necessary permissions
gcloud projects add-iam-policy-binding bahtsul-masail-457713 \
    --member="serviceAccount:bahtsulmasail-monitoring@bahtsul-masail-457713.iam.gserviceaccount.com" \
    --role="roles/monitoring.metricWriter"

gcloud projects add-iam-policy-binding bahtsul-masail-457713 \
    --member="serviceAccount:bahtsulmasail-monitoring@bahtsul-masail-457713.iam.gserviceaccount.com" \
    --role="roles/logging.logWriter"
```

## Log Management

### 1. Create Log-based Metrics

```bash
# Create log-based metric for application errors
gcloud logging metrics create application_errors \
    --description="Count of application errors" \
    --log-filter='resource.type="cloud_run_revision" AND resource.labels.service_name=~"bahtsulmasail-tech-.*" AND severity>=ERROR'

# Create log-based metric for authentication failures
gcloud logging metrics create auth_failures \
    --description="Count of authentication failures" \
    --log-filter='resource.type="cloud_run_revision" AND resource.labels.service_name="bahtsulmasail-tech-backend" AND jsonPayload.message=~".*authentication.*failed.*"'
```

### 2. Log Retention Policies

```bash
# Set log retention for application logs (30 days)
gcloud logging buckets update _Default \
    --location=global \
    --retention-days=30

# Create custom log bucket for long-term storage
gcloud logging buckets create bahtsulmasail-long-term \
    --location=us-central1 \
    --retention-days=365 \
    --description="Long-term storage for BahtsulMasail logs"
```

## Performance Monitoring

### 1. Enable Cloud Profiler

```bash
# Enable Cloud Profiler API
gcloud services enable cloudprofiler.googleapis.com

# Grant profiler agent role to service accounts
gcloud projects add-iam-policy-binding bahtsul-masail-457713 \
    --member="serviceAccount:bahtsulmasail-backend@bahtsul-masail-457713.iam.gserviceaccount.com" \
    --role="roles/cloudprofiler.agent"
```

### 2. Enable Cloud Trace

```bash
# Enable Cloud Trace API
gcloud services enable cloudtrace.googleapis.com

# Grant trace agent role
gcloud projects add-iam-policy-binding bahtsul-masail-457713 \
    --member="serviceAccount:bahtsulmasail-backend@bahtsul-masail-457713.iam.gserviceaccount.com" \
    --role="roles/cloudtrace.agent"
```

## Disaster Recovery

### 1. Cross-Region Backup

```bash
# Create cross-region backup for disaster recovery
gcloud sql backups create \
    --instance=lbmdb \
    --description="Disaster recovery backup $(date +%Y%m%d_%H%M%S)" \
    --location=us-east1

# Export database to Cloud Storage for additional backup
gcloud sql export sql lbmdb gs://lbmbucket/backups/disaster-recovery-$(date +%Y%m%d_%H%M%S).sql \
    --database=postgres
```

### 2. Infrastructure as Code Backup

```bash
# Export current Cloud Run configurations
gcloud run services describe bahtsulmasail-tech-frontend \
    --region=us-central1 \
    --format="export" > infrastructure/frontend-service.yaml

gcloud run services describe bahtsulmasail-tech-backend \
    --region=us-central1 \
    --format="export" > infrastructure/backend-service.yaml

gcloud run services describe bahtsulmasail-tech-celery \
    --region=us-central1 \
    --format="export" > infrastructure/celery-service.yaml
```

## Health Checks and Uptime Monitoring

### 1. Create Uptime Checks

```bash
# Create uptime check for frontend
gcloud monitoring uptime create \
    --display-name="BahtsulMasail Frontend Uptime" \
    --http-check-path="/" \
    --hostname="bahtsulmasail.tech" \
    --port=443 \
    --use-ssl \
    --timeout=10s \
    --period=60s

# Create uptime check for API health endpoint
gcloud monitoring uptime create \
    --display-name="BahtsulMasail API Health Check" \
    --http-check-path="/api/v1/health/" \
    --hostname="api.bahtsulmasail.tech" \
    --port=443 \
    --use-ssl \
    --timeout=10s \
    --period=60s
```

## Maintenance and Updates

### 1. Scheduled Maintenance Windows

```bash
# Create maintenance window for database updates
gcloud sql instances patch lbmdb \
    --maintenance-window-day=SUN \
    --maintenance-window-hour=2 \
    --maintenance-release-channel=production
```

### 2. Automated Security Updates

```bash
# Enable automatic minor version updates for Cloud SQL
gcloud sql instances patch lbmdb \
    --enable-auto-upgrade
```

## Verification Commands

### 1. Test Backup and Restore

```bash
# Test backup creation
gcloud sql backups create --instance=lbmdb --description="Test backup"

# List recent backups to verify
gcloud sql backups list --instance=lbmdb --limit=5

# Test restore to a new instance (for testing only)
gcloud sql instances create lbmdb-test \
    --backup=BACKUP_ID \
    --tier=db-f1-micro \
    --region=us-central1
```

### 2. Test Monitoring Alerts

```bash
# Trigger a test alert (simulate high CPU)
gcloud monitoring policies list --filter="displayName:'High CPU Utilization'"

# Check notification channels
gcloud alpha monitoring channels list
```

### 3. Verify Log Collection

```bash
# Check recent logs from services
gcloud logging read 'resource.type="cloud_run_revision" AND resource.labels.service_name="bahtsulmasail-tech-backend"' \
    --limit=10 \
    --format="table(timestamp,severity,textPayload)"
```

## Notes and Best Practices

1. **Replace Placeholder Values**: Update notification channel IDs and email addresses
2. **Test in Staging**: Test all monitoring and backup configurations in a staging environment first
3. **Regular Reviews**: Review and update monitoring policies quarterly
4. **Documentation**: Keep this configuration documented and version controlled
5. **Access Control**: Limit access to production monitoring and backup systems
6. **Cost Monitoring**: Set up billing alerts to monitor costs of monitoring and backup systems

## Emergency Contacts and Procedures

- **Primary Admin**: admin@bahtsulmasail.tech
- **Technical Lead**: tech-lead@bahtsulmasail.tech
- **Emergency Escalation**: emergency@bahtsulmasail.tech

For emergency procedures, refer to the incident response playbook in the operations documentation. 