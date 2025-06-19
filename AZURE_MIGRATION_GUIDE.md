# Azure Migration Guide - BahtsulMasail.tech

This document provides a complete guide for migrating the BahtsulMasail.tech application from Google Cloud Platform (GCP) to Microsoft Azure.

## 🏗️ Migration Overview

### What Was Changed

#### Removed GCP Components:
- ❌ `cloudbuild.yaml` - Google Cloud Build configuration
- ❌ Google Cloud Storage integration
- ❌ Google Cloud SQL specific configurations
- ❌ Google Cloud Run deployment settings
- ❌ Google Cloud Monitoring setup
- ❌ GCP-specific environment variables

#### Added Azure Components:
- ✅ `azure-pipelines.yml` - Azure DevOps Pipeline
- ✅ `azure-deployment.yaml` - Kubernetes deployment for AKS
- ✅ `azure-setup.ps1` - Infrastructure setup script
- ✅ `azure-monitoring-setup.ps1` - Monitoring configuration
- ✅ Azure Blob Storage integration
- ✅ Azure Database for PostgreSQL configuration
- ✅ Azure Container Apps ready configuration

## 🗂️ File Changes Summary

### Backend Changes:
- `backend/core/storage.py` - Replaced Google Cloud Storage with Azure Blob Storage
- `backend/core/settings.py` - Updated database and storage configurations for Azure
- `backend/requirements.txt` - Replaced `django-storages[google]` with `azure-storage-blob`
- `backend/documents/tasks.py` - Updated file operations to use Azure Blob Storage

### Infrastructure Changes:
- **Deleted**: `cloudbuild.yaml`, `monitoring/` folder with GCP configurations
- **Added**: `azure-pipelines.yml`, `azure-deployment.yaml`, setup scripts

## 🚀 Step-by-Step Migration Process

### Phase 1: Clean Up GCP Resources

Before starting Azure deployment, clean up your GCP resources:

```powershell
# 1. Stop GCP services to avoid charges
gcloud run services delete bahtsulmasail-tech-frontend --region=us-central1
gcloud run services delete bahtsulmasail-tech-backend --region=us-central1  
gcloud run services delete bahtsulmasail-tech-celery --region=us-central1

# 2. Delete Cloud Build triggers
gcloud builds triggers list
gcloud builds triggers delete [TRIGGER_ID]

# 3. Delete Cloud SQL instance (BACKUP DATA FIRST!)
gcloud sql backups create --instance=lbmdb --description="Final backup before migration"
# After confirming backup:
# gcloud sql instances delete lbmdb

# 4. Delete Redis instance
gcloud redis instances delete bahtsulmasail-redis --region=us-central1

# 5. Delete VPC and networking components
gcloud compute networks subnets delete [SUBNET_NAME] --region=us-central1
gcloud compute networks delete [VPC_NAME]

# 6. Delete monitoring and alerting policies
gcloud alpha monitoring policies list
gcloud alpha monitoring policies delete [POLICY_ID]
```

### Phase 2: Set Up Azure Infrastructure

1. **Install Prerequisites:**
```powershell
# Install Azure CLI
winget install Microsoft.AzureCLI

# Login to Azure
az login

# Install kubectl
az aks install-cli
```

2. **Run Infrastructure Setup:**
```powershell
# Make the setup script executable and run it
./azure-setup.ps1 -SubscriptionId "YOUR_SUBSCRIPTION_ID" -ResourceGroupName "bahtsulmasail-rg" -Location "East US"
```

3. **Set up Monitoring:**
```powershell
./azure-monitoring-setup.ps1 -ResourceGroupName "bahtsulmasail-rg" -WorkspaceName "bahtsulmasail-monitor" -NotificationEmail "your-email@domain.com"
```

### Phase 3: Data Migration

#### Database Migration:
1. **Export from GCP Cloud SQL:**
```bash
# Create final backup
gcloud sql export sql lbmdb gs://your-backup-bucket/final-backup.sql --database=bahtsulmasail

# Download the backup
gsutil cp gs://your-backup-bucket/final-backup.sql ./final-backup.sql
```

2. **Import to Azure PostgreSQL:**
```bash
# Connect to Azure PostgreSQL
psql "host=bahtsulmasail-db.postgres.database.azure.com port=5432 dbname=bahtsulmasail user=bahtsulmasail@bahtsulmasail-db password=YOUR_PASSWORD sslmode=require"

# Import the data
\i final-backup.sql

# Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;
```

#### File Storage Migration:
```powershell
# Install AzCopy
winget install Microsoft.AzCopy

# Copy files from GCS to Azure Blob Storage
azcopy copy "https://storage.googleapis.com/your-gcs-bucket/*" "https://bahtsulmasailstorage.blob.core.windows.net/media/" --recursive
```

### Phase 4: Deploy Application

1. **Set up Azure DevOps:**
   - Create an Azure DevOps project
   - Import your repository
   - Create service connections for Azure Container Registry and AKS
   - Create pipeline using `azure-pipelines.yml`

2. **Deploy to Kubernetes:**
```powershell
# Get AKS credentials
az aks get-credentials --resource-group bahtsulmasail-rg --name bahtsulmasail-aks

# Deploy the application
kubectl apply -f azure-deployment.yaml

# Check deployment status
kubectl get pods
kubectl get services
```

3. **Run Database Migrations:**
```powershell
# Run migrations
kubectl run django-migrate --image=bahtsulmasailregistry.azurecr.io/bahtsulmasail-tech-backend:latest \
  --rm -i --restart=Never --env-from=configmap/bahtsulmasail-config \
  --env DJANGO_SECRET_KEY="YOUR_SECRET_KEY" \
  --env DB_PASSWORD="YOUR_DB_PASSWORD" \
  -- python manage.py migrate --noinput
```

## 🔧 Configuration Updates

### Environment Variables Mapping:

| GCP Variable | Azure Variable | Notes |
|--------------|----------------|-------|
| `GS_BUCKET_NAME` | `AZURE_CONTAINER_NAME` | Storage container name |
| `GS_PROJECT_ID` | `AZURE_ACCOUNT_NAME` | Storage account name |
| `GOOGLE_APPLICATION_CREDENTIALS` | `AZURE_ACCOUNT_KEY` | Storage access key |
| `CLOUD_SQL_CONNECTION_NAME` | `DB_HOST` | Database connection string |
| `GAE_APPLICATION` or `K_SERVICE` | Not needed | Azure handles automatically |

### New Azure-Specific Variables:
```
AZURE_ACCOUNT_NAME=bahtsulmasailstorage
AZURE_ACCOUNT_KEY=your_storage_key
AZURE_CONTAINER_NAME=media
AZURE_LOCATION=media
DB_HOST=bahtsulmasail-db.postgres.database.azure.com
REDIS_HOST=bahtsulmasail-redis.redis.cache.windows.net
```

## 🔍 Testing the Migration

### Health Checks:
```powershell
# Check all pods are running
kubectl get pods

# Check services
kubectl get services

# Test frontend
curl http://FRONTEND_EXTERNAL_IP/

# Test backend API
curl http://BACKEND_EXTERNAL_IP/api/health/

# Test file upload/download
# Use the application's file upload feature to test Azure Blob Storage
```

### Performance Testing:
1. Upload a test document to verify Azure Blob Storage integration
2. Run a semantic search to test database connectivity
3. Monitor Azure metrics to ensure proper resource utilization

## 🚨 Troubleshooting

### Common Issues:

1. **Storage Access Issues:**
```powershell
# Check storage account access
az storage blob list --account-name bahtsulmasailstorage --container-name media
```

2. **Database Connection Issues:**
```powershell
# Test database connection
psql "host=bahtsulmasail-db.postgres.database.azure.com port=5432 dbname=bahtsulmasail user=bahtsulmasail@bahtsulmasail-db password=YOUR_PASSWORD sslmode=require"
```

3. **Pod Startup Issues:**
```powershell
# Check pod logs
kubectl logs deployment/bahtsulmasail-backend
kubectl describe pod POD_NAME
```

## 📊 Cost Optimization

### Azure Cost Savings Tips:
1. **Use Azure Reserved Instances** for predictable workloads (up to 72% savings)
2. **Enable Auto-scaling** for AKS nodes based on demand
3. **Use Azure Cost Management** to monitor and optimize spending
4. **Configure storage lifecycle policies** for blob storage
5. **Use Azure Advisor** recommendations for cost optimization

### Monthly Cost Estimates:
- **AKS Cluster**: ~$150-300/month (2-4 nodes)
- **Azure Database for PostgreSQL**: ~$100-200/month
- **Azure Cache for Redis**: ~$50-100/month
- **Blob Storage**: ~$20-50/month
- **Container Registry**: ~$5-20/month
- **Total Estimated**: ~$325-670/month

## 🔐 Security Considerations

1. **Enable Azure Key Vault** for secret management
2. **Configure network security groups** for AKS
3. **Enable Azure Defender** for container security
4. **Set up Azure Active Directory** integration
5. **Configure SSL/TLS** certificates for HTTPS

## 📈 Monitoring and Alerting

Your Azure monitoring setup includes:
- **Application Insights** for application performance monitoring
- **Azure Monitor** for infrastructure monitoring
- **Log Analytics** for centralized logging
- **Alert Rules** for proactive monitoring
- **Custom Dashboards** for visualization

## 🔄 Rollback Plan

If issues occur during migration:

1. **Immediate Rollback**: Redeploy to GCP using previous configuration
2. **Data Rollback**: Restore database from GCP backups
3. **File Rollback**: Copy files back from Azure to GCS if needed
4. **DNS Rollback**: Update DNS records to point back to GCP services

## ✅ Post-Migration Checklist

- [ ] All services are running and healthy
- [ ] Database is accessible and data is intact
- [ ] File uploads/downloads work correctly
- [ ] Monitoring and alerting are configured
- [ ] DNS records are updated
- [ ] SSL certificates are configured
- [ ] Performance testing completed
- [ ] Cost monitoring is set up
- [ ] Team is trained on Azure tools
- [ ] Documentation is updated
- [ ] GCP resources are cleaned up (after confirming stability)

## 📞 Support and Resources

- **Azure Documentation**: https://docs.microsoft.com/azure/
- **Azure Cost Calculator**: https://azure.microsoft.com/pricing/calculator/
- **Azure Support**: https://azure.microsoft.com/support/
- **Kubernetes Documentation**: https://kubernetes.io/docs/

---

🎉 **Congratulations!** You have successfully migrated BahtsulMasail.tech from Google Cloud Platform to Microsoft Azure. Your application is now running on a modern, scalable, and cost-effective Azure infrastructure. 