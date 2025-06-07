# BahtsulMasail.tech Monitoring Setup Script
# This script sets up comprehensive monitoring, alerting, and dashboards for the platform

Write-Host "Setting up comprehensive monitoring for BahtsulMasail.tech..." -ForegroundColor Green

# Configuration variables
$PROJECT_ID = "bahtsul-masail-457713"
$NOTIFICATION_EMAIL = "admin@bahtsulmasail.tech"
$SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"

# Enable required APIs
Write-Host "Enabling required Google Cloud APIs..." -ForegroundColor Yellow
gcloud services enable monitoring.googleapis.com
gcloud services enable logging.googleapis.com
gcloud services enable cloudtrace.googleapis.com
gcloud services enable cloudprofiler.googleapis.com

# Create notification channels
Write-Host "Creating notification channels..." -ForegroundColor Yellow

# Email notification channel
Write-Host "Creating email notification channel..."
$emailChannelId = gcloud alpha monitoring channels create `
    --display-name="BahtsulMasail Admin Email" `
    --type=email `
    --channel-labels=email_address=$NOTIFICATION_EMAIL `
    --description="Primary admin email for critical alerts" `
    --format="value(name)"

Write-Host "Email notification channel created: $emailChannelId"

# Slack notification channel (optional)
if ($SLACK_WEBHOOK_URL -ne "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK") {
    Write-Host "Creating Slack notification channel..."
    $slackChannelId = gcloud alpha monitoring channels create `
        --display-name="BahtsulMasail Slack Alerts" `
        --type=slack `
        --channel-labels=url=$SLACK_WEBHOOK_URL `
        --description="Slack channel for system alerts" `
        --format="value(name)"
    
    Write-Host "Slack notification channel created: $slackChannelId"
}

# Create log-based metrics
Write-Host "Creating log-based metrics..." -ForegroundColor Yellow

# Application errors metric
Write-Host "Creating application errors metric..."
gcloud logging metrics create application_errors `
    --description="Count of application errors" `
    --log-filter='resource.type="cloud_run_revision" AND resource.labels.service_name=~"bahtsulmasail-tech-.*" AND severity>=ERROR'

# Authentication failures metric
Write-Host "Creating authentication failures metric..."
gcloud logging metrics create auth_failures `
    --description="Count of authentication failures" `
    --log-filter='resource.type="cloud_run_revision" AND resource.labels.service_name="bahtsulmasail-tech-backend" AND jsonPayload.message=~".*authentication.*failed.*"'

# Database connection errors metric
Write-Host "Creating database connection errors metric..."
gcloud logging metrics create db_connection_errors `
    --description="Count of database connection errors" `
    --log-filter='resource.type="cloud_run_revision" AND resource.labels.service_name="bahtsulmasail-tech-backend" AND (textPayload=~".*database.*error.*" OR jsonPayload.message=~".*database.*error.*")'

# Tashih workflow errors metric
Write-Host "Creating Tashih workflow errors metric..."
gcloud logging metrics create tashih_workflow_errors `
    --description="Count of Tashih workflow errors" `
    --log-filter='resource.type="cloud_run_revision" AND resource.labels.service_name="bahtsulmasail-tech-backend" AND (textPayload=~".*tashih.*error.*" OR jsonPayload.message=~".*tashih.*error.*")'

# Create uptime checks
Write-Host "Creating uptime checks..." -ForegroundColor Yellow

# Frontend uptime check
Write-Host "Creating frontend uptime check..."
gcloud monitoring uptime create `
    --display-name="BahtsulMasail Frontend Uptime" `
    --http-check-path="/" `
    --hostname="bahtsulmasail.tech" `
    --port=443 `
    --use-ssl `
    --timeout=10s `
    --period=60s

# API health check
Write-Host "Creating API health check..."
gcloud monitoring uptime create `
    --display-name="BahtsulMasail API Health Check" `
    --http-check-path="/api/v1/health/" `
    --hostname="api.bahtsulmasail.tech" `
    --port=443 `
    --use-ssl `
    --timeout=10s `
    --period=60s

# API search functionality check
Write-Host "Creating API search functionality check..."
gcloud monitoring uptime create `
    --display-name="BahtsulMasail API Search Check" `
    --http-check-path="/api/v1/documents/search/?q=test" `
    --hostname="api.bahtsulmasail.tech" `
    --port=443 `
    --use-ssl `
    --timeout=15s `
    --period=300s

# Create monitoring dashboard
Write-Host "Creating monitoring dashboard..." -ForegroundColor Yellow
gcloud monitoring dashboards create --config-from-file=monitoring-dashboard.json

# Create alert policies with the notification channel
Write-Host "Creating alert policies..." -ForegroundColor Yellow

# Read the alert policies template and replace notification channel placeholder
$alertPoliciesContent = Get-Content "alert-policies.json" -Raw
$alertPoliciesContent = $alertPoliciesContent -replace "NOTIFICATION_CHANNEL_ID", $emailChannelId.Split('/')[-1]

# Save the updated alert policies to a temporary file
$tempAlertFile = "temp-alert-policies.json"
$alertPoliciesContent | Out-File -FilePath $tempAlertFile -Encoding UTF8

# Create each alert policy
$alertPolicies = Get-Content $tempAlertFile | ConvertFrom-Json

foreach ($policy in $alertPolicies) {
    $policyName = $policy.displayName
    Write-Host "Creating alert policy: $policyName"
    
    # Convert policy back to JSON and create
    $policyJson = $policy | ConvertTo-Json -Depth 10
    $policyJson | Out-File -FilePath "single-policy.json" -Encoding UTF8
    
    try {
        gcloud alpha monitoring policies create --policy-from-file=single-policy.json
        Write-Host "Successfully created alert policy: $policyName" -ForegroundColor Green
    }
    catch {
        Write-Host "Failed to create alert policy: $policyName - $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Clean up temporary files
Remove-Item $tempAlertFile -ErrorAction SilentlyContinue
Remove-Item "single-policy.json" -ErrorAction SilentlyContinue

# Set up log retention policies
Write-Host "Setting up log retention policies..." -ForegroundColor Yellow

# Set default log retention to 30 days
gcloud logging buckets update _Default `
    --location=global `
    --retention-days=30

# Create long-term storage bucket for important logs
gcloud logging buckets create bahtsulmasail-long-term `
    --location=us-central1 `
    --retention-days=365 `
    --description="Long-term storage for BahtsulMasail logs"

# Create log sinks for important logs
Write-Host "Creating log sinks for long-term storage..."

# Sink for authentication logs
gcloud logging sinks create auth-logs-sink `
    logging.googleapis.com/projects/$PROJECT_ID/locations/us-central1/buckets/bahtsulmasail-long-term `
    --log-filter='resource.type="cloud_run_revision" AND resource.labels.service_name="bahtsulmasail-tech-backend" AND (jsonPayload.message=~".*authentication.*" OR textPayload=~".*authentication.*")'

# Sink for Tashih workflow logs
gcloud logging sinks create tashih-logs-sink `
    logging.googleapis.com/projects/$PROJECT_ID/locations/us-central1/buckets/bahtsulmasail-long-term `
    --log-filter='resource.type="cloud_run_revision" AND resource.labels.service_name="bahtsulmasail-tech-backend" AND (jsonPayload.message=~".*tashih.*" OR textPayload=~".*tashih.*")'

# Set up backup verification jobs
Write-Host "Setting up backup verification..." -ForegroundColor Yellow

# Verify Cloud SQL backups are enabled
$backupConfig = gcloud sql instances describe lbmdb --format="value(settings.backupConfiguration.enabled)"
if ($backupConfig -eq "True") {
    Write-Host "Cloud SQL backups are properly configured" -ForegroundColor Green
} else {
    Write-Host "WARNING: Cloud SQL backups are not enabled!" -ForegroundColor Red
    Write-Host "Run the following command to enable backups:"
    Write-Host "gcloud sql instances patch lbmdb --backup-start-time=02:00 --backup-location=us-central1 --enable-bin-log --retained-backups-count=30" -ForegroundColor Yellow
}

# Create IAM role for monitoring access
Write-Host "Creating custom IAM role for monitoring..." -ForegroundColor Yellow
gcloud iam roles create bahtsulmasail_monitoring_viewer `
    --project=$PROJECT_ID `
    --title="BahtsulMasail Monitoring Viewer" `
    --description="Read-only access to monitoring data" `
    --permissions=monitoring.alertPolicies.get,monitoring.alertPolicies.list,monitoring.dashboards.get,monitoring.dashboards.list,monitoring.metricDescriptors.get,monitoring.metricDescriptors.list,monitoring.timeSeries.list,logging.entries.list,logging.logMetrics.get,logging.logMetrics.list

# Create service account for monitoring automation
Write-Host "Creating monitoring service account..." -ForegroundColor Yellow
gcloud iam service-accounts create bahtsulmasail-monitoring `
    --display-name="BahtsulMasail Monitoring Service Account" `
    --description="Service account for automated monitoring tasks"

# Grant necessary permissions to the monitoring service account
gcloud projects add-iam-policy-binding $PROJECT_ID `
    --member="serviceAccount:bahtsulmasail-monitoring@$PROJECT_ID.iam.gserviceaccount.com" `
    --role="roles/monitoring.metricWriter"

gcloud projects add-iam-policy-binding $PROJECT_ID `
    --member="serviceAccount:bahtsulmasail-monitoring@$PROJECT_ID.iam.gserviceaccount.com" `
    --role="roles/logging.logWriter"

# Verify monitoring setup
Write-Host "Verifying monitoring setup..." -ForegroundColor Yellow

# Check if dashboards were created
$dashboards = gcloud monitoring dashboards list --filter="displayName:BahtsulMasail" --format="value(displayName)"
if ($dashboards) {
    Write-Host "Monitoring dashboard created successfully: $dashboards" -ForegroundColor Green
} else {
    Write-Host "WARNING: Monitoring dashboard creation may have failed" -ForegroundColor Red
}

# Check if alert policies were created
$alertPolicyCount = gcloud alpha monitoring policies list --filter="displayName:BahtsulMasail OR displayName:High OR displayName:Cloud" --format="value(displayName)" | Measure-Object | Select-Object -ExpandProperty Count
Write-Host "Created $alertPolicyCount alert policies" -ForegroundColor Green

# Check if uptime checks were created
$uptimeChecks = gcloud monitoring uptime list --filter="displayName:BahtsulMasail" --format="value(displayName)"
if ($uptimeChecks) {
    Write-Host "Uptime checks created successfully:" -ForegroundColor Green
    $uptimeChecks | ForEach-Object { Write-Host "  - $_" }
} else {
    Write-Host "WARNING: Uptime checks creation may have failed" -ForegroundColor Red
}

# Display next steps
Write-Host "`n" -NoNewline
Write-Host "Monitoring setup completed!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Verify all alerts are working by checking the Cloud Monitoring console"
Write-Host "2. Test notification channels by triggering a test alert"
Write-Host "3. Review dashboard metrics and adjust thresholds if needed"
Write-Host "4. Set up additional custom metrics for application-specific monitoring"
Write-Host "5. Create runbooks for common alert scenarios"
Write-Host "6. Schedule regular monitoring reviews and updates"

Write-Host "`nMonitoring URLs:" -ForegroundColor Cyan
Write-Host "- Cloud Monitoring Console: https://console.cloud.google.com/monitoring"
Write-Host "- Dashboards: https://console.cloud.google.com/monitoring/dashboards"
Write-Host "- Alert Policies: https://console.cloud.google.com/monitoring/alerting/policies"
Write-Host "- Uptime Checks: https://console.cloud.google.com/monitoring/uptime"
Write-Host "- Logs Explorer: https://console.cloud.google.com/logs/query"

Write-Host "`nImportant Notes:" -ForegroundColor Magenta
Write-Host "- Replace placeholder notification channel IDs with actual values"
Write-Host "- Update Slack webhook URL if using Slack notifications"
Write-Host "- Review and adjust alert thresholds based on actual usage patterns"
Write-Host "- Test all alerts and notification channels regularly"
Write-Host "- Keep monitoring configuration in version control"

Write-Host "`nFor troubleshooting, check the logs:" -ForegroundColor Yellow
Write-Host "gcloud logging read 'resource.type=`"cloud_run_revision`" AND resource.labels.service_name=~`"bahtsulmasail-tech-.*`"' --limit=50" 