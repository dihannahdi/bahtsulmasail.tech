# Azure Deployment Checklist - BahtsulMasail.tech

## 🚀 Pre-Deployment Setup

### 1. Azure Prerequisites
- [ ] Azure subscription with sufficient credits/resources
- [ ] Azure CLI installed and logged in (`az login`)
- [ ] kubectl installed (`az aks install-cli`)
- [ ] Docker Desktop installed and running
- [ ] Azure DevOps account (optional for CI/CD)

### 2. Environment Preparation
- [ ] Clone the repository to deployment machine
- [ ] Ensure all Azure configuration files are present:
  - [ ] `azure-setup.ps1`
  - [ ] `azure-deployment.yaml`
  - [ ] `azure-pipelines.yml`
  - [ ] `azure-monitoring-setup.ps1`
  - [ ] `AZURE_MIGRATION_GUIDE.md`

## 🏗️ Infrastructure Deployment

### 3. Create Azure Resources
```powershell
# Run the infrastructure setup script
./azure-setup.ps1 -SubscriptionId "YOUR_SUBSCRIPTION_ID" -ResourceGroupName "bahtsulmasail-rg" -Location "East US"

# Save the output credentials securely!
```

**Important**: Save the generated database password and Django secret key from the script output.

### 4. Verify Infrastructure
- [ ] Resource Group created: `bahtsulmasail-rg`
- [ ] Container Registry: `bahtsulmasailregistry.azurecr.io`
- [ ] AKS Cluster: `bahtsulmasail-aks`
- [ ] PostgreSQL Database: `bahtsulmasail-db`
- [ ] Redis Cache: `bahtsulmasail-redis`
- [ ] Storage Account: `bahtsulmasailstorage`
- [ ] Key Vault: `bahtsulmasail-kv`

## 🐳 Container Image Building

### 5. Build and Push Container Images

```powershell
# Login to Azure Container Registry
az acr login --name bahtsulmasailregistry

# Build and push backend image
cd backend
docker build -t bahtsulmasailregistry.azurecr.io/bahtsulmasail-tech-backend:latest .
docker push bahtsulmasailregistry.azurecr.io/bahtsulmasail-tech-backend:latest

# Build and push frontend image
cd ../frontend
docker build -t bahtsulmasailregistry.azurecr.io/bahtsulmasail-tech-frontend:latest .
docker push bahtsulmasailregistry.azurecr.io/bahtsulmasail-tech-frontend:latest

# Build and push Celery image
cd ../backend
docker build -f Dockerfile.celery -t bahtsulmasailregistry.azurecr.io/bahtsulmasail-tech-celery:latest .
docker push bahtsulmasailregistry.azurecr.io/bahtsulmasail-tech-celery:latest
```

### 6. Verify Images
- [ ] Backend image pushed successfully
- [ ] Frontend image pushed successfully  
- [ ] Celery image pushed successfully

## 🗄️ Database Setup

### 7. Database Migration
```powershell
# Get AKS credentials
az aks get-credentials --resource-group bahtsulmasail-rg --name bahtsulmasail-aks

# Run database migrations
kubectl run django-migrate --image=bahtsulmasailregistry.azurecr.io/bahtsulmasail-tech-backend:latest \
  --rm -i --restart=Never --env-from=configmap/bahtsulmasail-config \
  --env DJANGO_SECRET_KEY="YOUR_DJANGO_SECRET_KEY" \
  --env DB_PASSWORD="YOUR_DB_PASSWORD" \
  -- python manage.py migrate --noinput

# Create superuser (optional)
kubectl run django-createsuperuser --image=bahtsulmasailregistry.azurecr.io/bahtsulmasail-tech-backend:latest \
  --rm -i --restart=Never --env-from=configmap/bahtsulmasail-config \
  --env DJANGO_SECRET_KEY="YOUR_DJANGO_SECRET_KEY" \
  --env DB_PASSWORD="YOUR_DB_PASSWORD" \
  -- python manage.py createsuperuser --noinput
```

### 8. Enable PostgreSQL Extensions
```sql
-- Connect to PostgreSQL and run:
CREATE EXTENSION IF NOT EXISTS vector;
```

## 🚀 Application Deployment

### 9. Deploy to Kubernetes
```powershell
# Deploy the application
kubectl apply -f azure-deployment.yaml

# Check deployment status
kubectl get pods
kubectl get services

# Wait for all pods to be ready
kubectl wait --for=condition=ready pod --all --timeout=300s
```

### 10. Verify Deployment
- [ ] All pods are running (`kubectl get pods`)
- [ ] Services have external IPs (`kubectl get services`)
- [ ] Frontend is accessible via LoadBalancer IP
- [ ] Backend API is responding (`/api/health/`)
- [ ] Celery workers are processing tasks

## 🔍 Monitoring Setup

### 11. Configure Monitoring
```powershell
# Set up Azure monitoring
./azure-monitoring-setup.ps1 -ResourceGroupName "bahtsulmasail-rg" -WorkspaceName "bahtsulmasail-monitor" -NotificationEmail "your-email@domain.com"
```

### 12. Verify Monitoring
- [ ] Application Insights configured
- [ ] Alert rules created
- [ ] Dashboard created
- [ ] Email notifications configured

## 🌐 DNS and SSL Configuration

### 13. Configure DNS
- [ ] Update DNS records to point to Azure Load Balancer IPs
- [ ] Configure SSL/TLS certificates
- [ ] Test HTTPS access

### 14. Production Settings
- [ ] Update `ALLOWED_HOSTS` in Django settings
- [ ] Verify `DEBUG=False` in production
- [ ] Configure CORS settings for frontend domain

## 🔐 Security Configuration

### 15. Security Hardening
- [ ] Review and update security settings
- [ ] Configure Azure AD authentication (optional)
- [ ] Set up Azure Key Vault integration
- [ ] Configure network security groups
- [ ] Enable Azure Security Center recommendations

## 📊 Performance Testing

### 16. Load Testing
- [ ] Test application under load
- [ ] Verify auto-scaling works
- [ ] Monitor resource usage
- [ ] Optimize as needed

## 🔄 CI/CD Setup (Optional)

### 17. Azure DevOps Pipeline
- [ ] Create Azure DevOps project
- [ ] Import repository
- [ ] Configure service connections
- [ ] Set up pipeline using `azure-pipelines.yml`
- [ ] Test automated deployment

## ✅ Final Verification

### 18. End-to-End Testing
- [ ] User registration and login works
- [ ] Document upload and processing works
- [ ] Semantic search functionality works
- [ ] Tashih workflow is functional
- [ ] All API endpoints respond correctly
- [ ] File storage and retrieval works
- [ ] Email notifications work (if configured)

### 19. Backup and Recovery
- [ ] Database backup strategy configured
- [ ] File storage backup configured
- [ ] Disaster recovery plan documented

## 🚨 Troubleshooting

### Common Issues:
1. **Pods not starting**: Check logs with `kubectl logs <pod-name>`
2. **Database connection issues**: Verify connection strings and firewall rules
3. **Image pull errors**: Ensure ACR authentication is working
4. **Memory/CPU issues**: Adjust resource limits in deployment
5. **Storage issues**: Verify Azure Storage account configuration

### Useful Commands:
```powershell
# Check pod logs
kubectl logs deployment/bahtsulmasail-backend

# Get pod shell access
kubectl exec -it deployment/bahtsulmasail-backend -- bash

# Check resource usage
kubectl top pods

# Restart deployment
kubectl rollout restart deployment/bahtsulmasail-backend
```

## 📞 Support Resources

- Azure Documentation: https://docs.microsoft.com/azure/
- Kubernetes Documentation: https://kubernetes.io/docs/
- Django Documentation: https://docs.djangoproject.com/
- Next.js Documentation: https://nextjs.org/docs

---

## 🎉 Deployment Complete!

Once all checklist items are completed, your BahtsulMasail.tech application will be successfully deployed on Azure with:

- ✅ High availability and auto-scaling
- ✅ Secure database and file storage
- ✅ Comprehensive monitoring and alerting
- ✅ Modern container orchestration
- ✅ Production-ready configuration

**Total Estimated Deployment Time**: 2-4 hours (depending on data migration size)

**Monthly Azure Cost Estimate**: $200-400 USD (depending on usage and chosen service tiers) 