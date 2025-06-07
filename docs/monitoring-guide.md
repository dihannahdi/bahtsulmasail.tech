# BahtsulMasail.tech Monitoring Guide

## Overview

This guide provides comprehensive information about monitoring the BahtsulMasail.tech platform using Google Cloud Monitoring. It covers dashboards, alerts, metrics, logging, and troubleshooting procedures.

## Architecture Overview

### Monitored Components
- **Cloud Run Services**: Frontend, Backend, and Celery workers
- **Cloud SQL Database**: PostgreSQL instance (lbmdb)
- **Redis Instance**: Memorystore Redis for caching and task queuing
- **Cloud Storage**: Document and media storage (lbmbucket)
- **Load Balancers**: Application load balancing and SSL termination
- **CDN**: Static asset delivery and caching

### Monitoring Stack
- **Google Cloud Monitoring**: Metrics collection and alerting
- **Google Cloud Logging**: Centralized log management
- **Cloud Trace**: Distributed tracing for performance analysis
- **Cloud Profiler**: Application performance profiling
- **Uptime Monitoring**: Service availability checks

## Dashboard Overview

### Main Platform Dashboard

#### Service Health Metrics
1. **Request Rate**: Requests per second across all services
2. **Response Latency**: 95th percentile response times
3. **Error Rates**: HTTP 4xx and 5xx error percentages
4. **Service Availability**: Uptime percentage and SLA compliance

#### Resource Utilization
1. **CPU Utilization**: Per service and aggregate usage
2. **Memory Usage**: Memory consumption and allocation
3. **Storage Usage**: Disk and Cloud Storage utilization
4. **Network Traffic**: Ingress and egress data flows

#### Application Metrics
1. **User Activities**: Login rates, document uploads, searches
2. **Tashih Workflow**: Review queue status, completion rates
3. **Database Performance**: Query latency, connection pools
4. **Cache Performance**: Redis hit rates and memory usage

### Accessing Dashboards

#### Google Cloud Console
1. Navigate to [Cloud Monitoring Console](https://console.cloud.google.com/monitoring)
2. Select "Dashboards" from the left navigation
3. Choose "BahtsulMasail.tech - Comprehensive Platform Monitoring"

#### Direct Dashboard URLs
```
Main Dashboard: https://console.cloud.google.com/monitoring/dashboards/custom/[DASHBOARD_ID]
Service Overview: https://console.cloud.google.com/run
Database Monitoring: https://console.cloud.google.com/sql/instances/lbmdb/overview
Storage Monitoring: https://console.cloud.google.com/storage/browser/lbmbucket
```

## Alert Policies

### Critical Alerts (Immediate Response Required)

#### High Server Error Rate
- **Threshold**: >5% HTTP 5xx responses for 2 minutes
- **Impact**: Service degradation or outage
- **Response**: Check error logs, verify service health, escalate if needed

#### Service Uptime Failure
- **Threshold**: Service unavailable for 1 minute
- **Impact**: Complete service outage
- **Response**: Immediate incident response, check Cloud Run status

#### Cloud SQL High CPU
- **Threshold**: >80% CPU utilization for 5 minutes
- **Impact**: Database performance degradation
- **Response**: Check slow queries, consider scaling

#### High Memory Utilization
- **Threshold**: >85% memory usage for 5 minutes
- **Impact**: Service instability, potential crashes
- **Response**: Check for memory leaks, restart services if needed

### Warning Alerts (Monitor and Plan Response)

#### High CPU Utilization
- **Threshold**: >80% CPU for 5 minutes
- **Impact**: Performance degradation, potential scaling needed
- **Response**: Monitor trends, plan capacity scaling

#### High Connection Count
- **Threshold**: >80 database connections for 5 minutes
- **Impact**: Connection pool exhaustion
- **Response**: Check for connection leaks, optimize queries

#### High Response Latency
- **Threshold**: >2 seconds 95th percentile for 5 minutes
- **Impact**: Poor user experience
- **Response**: Investigate performance bottlenecks

#### Storage Usage High
- **Threshold**: >80% of allocated storage
- **Impact**: Potential storage exhaustion
- **Response**: Plan storage expansion or cleanup

### Alert Configuration

#### Notification Channels
- **Email**: admin@bahtsulmasail.tech
- **Slack**: #alerts channel (if configured)
- **SMS**: Emergency contact numbers (for critical alerts)

#### Escalation Procedures
1. **Level 1**: Automated alerts to on-call engineer
2. **Level 2**: Escalation after 15 minutes if unacknowledged
3. **Level 3**: Manager notification after 30 minutes
4. **Level 4**: Executive notification for extended outages

## Key Metrics and Thresholds

### Cloud Run Services

#### Performance Metrics
```
Request Rate: Monitor for traffic patterns and spikes
  - Normal: 10-100 requests/second
  - High: >500 requests/second
  - Alert: Sudden 10x increase

Response Latency (95th percentile):
  - Good: <500ms
  - Warning: 500ms-2s
  - Critical: >2s

CPU Utilization:
  - Normal: <60%
  - Warning: 60-80%
  - Critical: >80%

Memory Utilization:
  - Normal: <70%
  - Warning: 70-85%
  - Critical: >85%
```

#### Error Metrics
```
HTTP Error Rates:
  - 4xx Errors: <5% (client errors)
  - 5xx Errors: <1% (server errors)
  - Alert: >5% for 4xx, >1% for 5xx

Application Errors:
  - Normal: <1 error/minute
  - Warning: 1-5 errors/minute
  - Critical: >5 errors/minute
```

### Cloud SQL Database

#### Performance Metrics
```
CPU Utilization:
  - Normal: <60%
  - Warning: 60-80%
  - Critical: >80%

Memory Utilization:
  - Normal: <70%
  - Warning: 70-85%
  - Critical: >85%

Connection Count:
  - Normal: <60 connections
  - Warning: 60-80 connections
  - Critical: >80 connections

Query Latency:
  - Good: <100ms
  - Warning: 100ms-1s
  - Critical: >1s
```

#### Storage Metrics
```
Disk Usage:
  - Normal: <70% of allocated space
  - Warning: 70-85%
  - Critical: >85%

Disk I/O:
  - Monitor for unusual spikes
  - Alert on sustained high I/O wait
```

### Redis Cache

#### Performance Metrics
```
Memory Usage:
  - Normal: <70%
  - Warning: 70-85%
  - Critical: >85%

Hit Rate:
  - Good: >90%
  - Warning: 80-90%
  - Poor: <80%

Connection Count:
  - Monitor for connection spikes
  - Alert on connection exhaustion
```

## Log Analysis and Troubleshooting

### Important Log Categories

#### Application Logs
```bash
# View recent application errors
gcloud logging read 'resource.type="cloud_run_revision" 
AND resource.labels.service_name="bahtsulmasail-tech-backend" 
AND severity>=ERROR' --limit=50

# View authentication logs
gcloud logging read 'resource.type="cloud_run_revision" 
AND resource.labels.service_name="bahtsulmasail-tech-backend" 
AND (jsonPayload.message=~".*authentication.*" OR textPayload=~".*authentication.*")' --limit=50

# View Tashih workflow logs
gcloud logging read 'resource.type="cloud_run_revision" 
AND resource.labels.service_name="bahtsulmasail-tech-backend" 
AND (jsonPayload.message=~".*tashih.*" OR textPayload=~".*tashih.*")' --limit=50
```

#### Database Logs
```bash
# View Cloud SQL error logs
gcloud logging read 'resource.type="cloudsql_database" 
AND resource.labels.database_id="bahtsul-masail-457713:us-central1:lbmdb" 
AND severity>=ERROR' --limit=50

# View slow query logs
gcloud logging read 'resource.type="cloudsql_database" 
AND resource.labels.database_id="bahtsul-masail-457713:us-central1:lbmdb" 
AND textPayload=~".*slow query.*"' --limit=50
```

#### System Logs
```bash
# View Cloud Run deployment logs
gcloud logging read 'resource.type="cloud_run_revision" 
AND resource.labels.service_name=~"bahtsulmasail-tech-.*" 
AND (textPayload=~".*deployment.*" OR jsonPayload.message=~".*deployment.*")' --limit=50

# View load balancer logs
gcloud logging read 'resource.type="http_load_balancer"' --limit=50
```

### Common Issues and Solutions

#### High Error Rates
1. **Check Error Logs**: Identify error patterns and root causes
2. **Database Issues**: Look for connection errors or slow queries
3. **Memory Issues**: Check for out-of-memory errors
4. **Code Issues**: Review recent deployments and code changes

#### Performance Degradation
1. **CPU/Memory**: Check resource utilization trends
2. **Database**: Analyze slow queries and connection pools
3. **Cache**: Review Redis hit rates and memory usage
4. **Network**: Check for bandwidth or latency issues

#### Service Unavailability
1. **Health Checks**: Verify service health endpoints
2. **Deployment Issues**: Check recent deployment logs
3. **Infrastructure**: Verify Cloud Run and database status
4. **Dependencies**: Check external service dependencies

## Log-based Metrics

### Custom Metrics Configuration

#### Application Error Metrics
```yaml
Name: application_errors
Description: Count of application errors
Filter: resource.type="cloud_run_revision" 
        AND resource.labels.service_name=~"bahtsulmasail-tech-.*" 
        AND severity>=ERROR
```

#### Authentication Failure Metrics
```yaml
Name: auth_failures
Description: Count of authentication failures
Filter: resource.type="cloud_run_revision" 
        AND resource.labels.service_name="bahtsulmasail-tech-backend" 
        AND jsonPayload.message=~".*authentication.*failed.*"
```

#### Database Connection Error Metrics
```yaml
Name: db_connection_errors
Description: Count of database connection errors
Filter: resource.type="cloud_run_revision" 
        AND resource.labels.service_name="bahtsulmasail-tech-backend" 
        AND (textPayload=~".*database.*error.*" OR jsonPayload.message=~".*database.*error.*")
```

#### Tashih Workflow Error Metrics
```yaml
Name: tashih_workflow_errors
Description: Count of Tashih workflow errors
Filter: resource.type="cloud_run_revision" 
        AND resource.labels.service_name="bahtsulmasail-tech-backend" 
        AND (textPayload=~".*tashih.*error.*" OR jsonPayload.message=~".*tashih.*error.*")
```

## Uptime Monitoring

### Configured Uptime Checks

#### Frontend Availability
- **URL**: https://bahtsulmasail.tech/
- **Frequency**: Every 60 seconds
- **Regions**: USA, Europe, Asia-Pacific
- **Expected**: HTTP 200, contains "BahtsulMasail.tech"

#### API Health Check
- **URL**: https://api.bahtsulmasail.tech/api/v1/health/
- **Frequency**: Every 60 seconds
- **Regions**: USA, Europe, Asia-Pacific
- **Expected**: HTTP 200, contains "status":"healthy"

#### Authentication Service
- **URL**: https://api.bahtsulmasail.tech/api/v1/auth/status/
- **Frequency**: Every 5 minutes
- **Regions**: USA, Europe
- **Expected**: HTTP 200 or 401 (service responsive)

#### Search Functionality
- **URL**: https://api.bahtsulmasail.tech/api/v1/documents/search/?q=test
- **Frequency**: Every 5 minutes
- **Regions**: USA, Europe
- **Expected**: HTTP 200, valid JSON response

#### Tashih Dashboard
- **URL**: https://bahtsulmasail.tech/dashboard/tashih
- **Frequency**: Every 10 minutes
- **Regions**: USA, Asia-Pacific
- **Expected**: HTTP 200, 302, or 401 (service responsive)

## Performance Monitoring

### Application Performance Monitoring

#### Cloud Trace Integration
- **Setup**: Enabled for all Cloud Run services
- **Sampling**: 1 in 1000 requests for production
- **Analysis**: Latency breakdown, dependency analysis
- **Alerts**: Configured for latency spikes

#### Cloud Profiler Integration
- **Setup**: Enabled for Python backend services
- **Data Collection**: CPU, heap, thread profiling
- **Analysis**: Performance hotspots, resource usage
- **Optimization**: Identify optimization opportunities

### Database Performance

#### Query Performance
- **Slow Query Logging**: Enabled for queries >1 second
- **Connection Monitoring**: Pool utilization and wait times
- **Index Usage**: Monitor index efficiency and missing indexes
- **Lock Analysis**: Detect and resolve lock contention

#### Resource Monitoring
- **CPU Usage**: Track query processing overhead
- **Memory Usage**: Monitor buffer pool and cache effectiveness
- **I/O Performance**: Disk read/write patterns and bottlenecks
- **Replication Lag**: Monitor if read replicas are configured

## Backup and Recovery Monitoring

### Backup Verification

#### Cloud SQL Backups
```bash
# Check backup status
gcloud sql backups list --instance=lbmdb

# Verify backup configuration
gcloud sql instances describe lbmdb --format="value(settings.backupConfiguration)"

# Test backup restore (to test instance)
gcloud sql instances create lbmdb-test --backup=BACKUP_ID --tier=db-f1-micro
```

#### Application Data Backups
```bash
# Check Cloud Storage backup objects
gsutil ls gs://lbmbucket/backups/

# Verify backup automation logs
gcloud logging read 'resource.type="cloud_function" AND resource.labels.function_name="backup-function"' --limit=10
```

### Recovery Procedures

#### Database Recovery
1. **Identify Recovery Point**: Determine required recovery time
2. **Create Recovery Instance**: Use point-in-time recovery
3. **Validate Data**: Verify data integrity and completeness
4. **Switch Services**: Update connection strings and restart services
5. **Verify Operation**: Test all critical functionality

#### Application Recovery
1. **Assess Damage**: Determine scope of data loss or corruption
2. **Restore from Backup**: Use most recent clean backup
3. **Replay Transactions**: Apply any available transaction logs
4. **Test Functionality**: Verify all services are working correctly
5. **Monitor Performance**: Watch for any performance impacts

## Security Monitoring

### Security Metrics

#### Authentication Monitoring
- **Failed Login Attempts**: Monitor for brute force attacks
- **Suspicious Access Patterns**: Detect unusual access patterns
- **Token Validation Failures**: Monitor JWT validation errors
- **Account Lockouts**: Track account security events

#### Access Control Monitoring
- **Privilege Escalations**: Monitor role changes and permissions
- **Unauthorized Access Attempts**: Track access to restricted resources
- **API Abuse**: Monitor for unusual API usage patterns
- **Data Export Activities**: Track large data downloads or exports

### Security Alerts

#### Critical Security Events
- **Multiple Failed Logins**: >10 failures from same IP in 5 minutes
- **Admin Account Access**: Any access to admin accounts
- **Privilege Changes**: Any role or permission modifications
- **Data Breaches**: Unusual data access or export patterns

#### Security Log Analysis
```bash
# Monitor authentication failures
gcloud logging read 'resource.type="cloud_run_revision" 
AND (textPayload=~".*authentication.*failed.*" OR jsonPayload.message=~".*authentication.*failed.*")' 
--limit=50

# Monitor admin access
gcloud logging read 'resource.type="cloud_run_revision" 
AND (textPayload=~".*admin.*access.*" OR jsonPayload.user_role="admin")' 
--limit=50

# Monitor suspicious activities
gcloud logging read 'resource.type="cloud_run_revision" 
AND severity>=WARNING 
AND (textPayload=~".*suspicious.*" OR jsonPayload.message=~".*suspicious.*")' 
--limit=50
```

## Capacity Planning

### Growth Monitoring

#### Usage Trends
- **User Growth**: Track user registration and activity trends
- **Content Growth**: Monitor document uploads and storage usage
- **Traffic Patterns**: Analyze request volume and geographic distribution
- **Feature Usage**: Track adoption of platform features

#### Resource Planning
- **Compute Resources**: Plan Cloud Run instance scaling
- **Storage Growth**: Project storage needs and costs
- **Database Scaling**: Plan for read replicas or vertical scaling
- **Cache Requirements**: Optimize Redis sizing and configuration

### Scaling Triggers

#### Automatic Scaling
- **Cloud Run**: Configured for 0-10 instances per service
- **Database**: Monitor for scaling recommendations
- **Cache**: Alert when memory usage >85%
- **Storage**: Alert when usage >80% of quota

#### Manual Scaling Decisions
- **Performance Degradation**: Scale up when latency increases
- **Cost Optimization**: Scale down during low usage periods
- **Feature Rollouts**: Pre-scale for major feature launches
- **Traffic Spikes**: Prepare for expected high-traffic events

## Maintenance and Updates

### Regular Maintenance Tasks

#### Daily Tasks
- Review critical alerts and system health
- Check backup completion and integrity
- Monitor resource utilization trends
- Review error logs for new issues

#### Weekly Tasks
- Analyze performance trends and bottlenecks
- Review security logs and access patterns
- Update alert thresholds based on usage patterns
- Plan capacity scaling if needed

#### Monthly Tasks
- Comprehensive performance review
- Security audit and vulnerability assessment
- Backup and recovery procedure testing
- Monitoring configuration updates

#### Quarterly Tasks
- Complete system health assessment
- Alert policy effectiveness review
- Capacity planning and budget review
- Disaster recovery plan testing

### Update Procedures

#### Monitoring Configuration Updates
1. **Test Changes**: Use staging environment first
2. **Gradual Rollout**: Apply changes incrementally
3. **Monitor Impact**: Watch for false positives or missed alerts
4. **Document Changes**: Update documentation and runbooks
5. **Team Training**: Ensure team understands new procedures

#### Alert Threshold Tuning
1. **Analyze Historical Data**: Review past alert frequency and accuracy
2. **Adjust Thresholds**: Reduce noise while maintaining coverage
3. **Test New Thresholds**: Validate with historical incidents
4. **Monitor Results**: Track improvement in alert quality
5. **Regular Review**: Schedule periodic threshold reviews

## Troubleshooting Runbooks

### Common Scenarios

#### High Error Rate Response
1. **Immediate**: Check service health and recent deployments
2. **Investigate**: Review error logs for patterns and root causes
3. **Isolate**: Determine if issue is service-specific or system-wide
4. **Mitigate**: Roll back recent changes or restart affected services
5. **Monitor**: Track error rate recovery and stability
6. **Post-mortem**: Analyze root cause and implement preventive measures

#### Performance Degradation Response
1. **Assess Impact**: Determine user impact and severity
2. **Check Resources**: Review CPU, memory, and database performance
3. **Identify Bottlenecks**: Use tracing and profiling data
4. **Apply Fixes**: Scale resources or optimize code as needed
5. **Verify Recovery**: Confirm performance returns to normal
6. **Document**: Record findings and preventive actions

#### Service Outage Response
1. **Incident Declaration**: Activate incident response procedures
2. **Impact Assessment**: Determine scope and user impact
3. **Recovery Actions**: Follow service restoration procedures
4. **Communication**: Update status page and notify stakeholders
5. **Service Restoration**: Verify full functionality recovery
6. **Post-incident Review**: Conduct thorough post-mortem analysis

## Contact Information

### On-call Rotation
- **Primary**: Technical Lead
- **Secondary**: Senior Developer
- **Escalation**: Engineering Manager
- **Executive**: CTO

### Emergency Contacts
- **Technical Support**: +1-XXX-XXX-XXXX
- **Security Issues**: security@bahtsulmasail.tech
- **General Support**: support@bahtsulmasail.tech

### External Vendors
- **Google Cloud Support**: Premium support tier
- **DNS Provider**: Domain registrar support
- **CDN Provider**: CloudFlare support (if applicable)

---

This monitoring guide should be reviewed and updated regularly to ensure it remains current with the platform's evolution and operational needs. 