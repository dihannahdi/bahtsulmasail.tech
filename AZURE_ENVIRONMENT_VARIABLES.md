# Azure Environment Variables Reference

## 🔐 Required Environment Variables for Azure Deployment

### Backend Environment Variables

#### Database Configuration
```bash
USE_POSTGRESQL=true
DB_NAME=bahtsulmasail
DB_USER=bahtsulmasail@bahtsulmasail-db
DB_PASSWORD=<generated-by-azure-setup-script>
DB_HOST=bahtsulmasail-db.postgres.database.azure.com
DB_PORT=5432
```

#### Django Configuration
```bash
DJANGO_SECRET_KEY=<generated-by-azure-setup-script>
DJANGO_DEBUG=False
DJANGO_SETTINGS_MODULE=core.settings
PYTHONUNBUFFERED=1
```

#### Azure Storage Configuration
```bash
AZURE_ACCOUNT_NAME=bahtsulmasailstorage
AZURE_ACCOUNT_KEY=<generated-by-azure-setup-script>
AZURE_CONTAINER_NAME=media
AZURE_LOCATION=media
```

#### Redis Configuration
```bash
REDIS_HOST=bahtsulmasail-redis.redis.cache.windows.net
REDIS_PORT=6379
REDIS_KEY=<generated-by-azure-setup-script>
```

#### Celery Configuration
```bash
CELERY_BROKER_URL=redis://bahtsulmasail-redis.redis.cache.windows.net:6379/0
CELERY_RESULT_BACKEND=redis://bahtsulmasail-redis.redis.cache.windows.net:6379/0
```

### Frontend Environment Variables

#### Production Configuration
```bash
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=<same-as-django-secret-or-separate>
```

#### API Configuration
```bash
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 📝 How These Variables Are Set

### In Kubernetes Deployment

The environment variables are set in three ways in the Kubernetes deployment:

#### 1. ConfigMap (Non-sensitive data)
Located in `azure-deployment.yaml`:
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: bahtsulmasail-config
data:
  USE_POSTGRESQL: "true"
  DB_NAME: "bahtsulmasail"
  DB_USER: "bahtsulmasail@bahtsulmasail-db"
  DB_PORT: "5432"
  REDIS_PORT: "6379"
  DJANGO_DEBUG: "False"
  PYTHONUNBUFFERED: "1"
  AZURE_LOCATION: "media"
```

#### 2. Kubernetes Secrets (Sensitive data)
Created by the `azure-setup.ps1` script:
```yaml
kubectl create secret generic bahtsulmasail-secrets \
  --from-literal=django-secret-key=$djangoSecret \
  --from-literal=db-password=$dbPassword \
  --from-literal=db-host="$dbServerName.postgres.database.azure.com" \
  --from-literal=redis-host=$redisHostname \
  --from-literal=azure-account-name=$storageAccountName \
  --from-literal=azure-account-key=$storageKey \
  --from-literal=azure-container-name=$containerName
```

#### 3. Pod Environment Variables
Referenced in deployment manifests:
```yaml
env:
- name: DJANGO_SECRET_KEY
  valueFrom:
    secretKeyRef:
      name: bahtsulmasail-secrets
      key: django-secret-key
- name: DB_PASSWORD
  valueFrom:
    secretKeyRef:
      name: bahtsulmasail-secrets
      key: db-password
```

## 🔧 Manual Configuration Steps

### If You Need to Update Environment Variables:

#### Update Kubernetes ConfigMap:
```powershell
kubectl edit configmap bahtsulmasail-config
```

#### Update Kubernetes Secrets:
```powershell
kubectl delete secret bahtsulmasail-secrets
kubectl create secret generic bahtsulmasail-secrets \
  --from-literal=django-secret-key="NEW_SECRET_KEY" \
  --from-literal=db-password="NEW_DB_PASSWORD" \
  # ... other secrets
```

#### Restart Deployments:
```powershell
kubectl rollout restart deployment/bahtsulmasail-backend
kubectl rollout restart deployment/bahtsulmasail-frontend
kubectl rollout restart deployment/bahtsulmasail-celery
```

## 🏗️ Local Development Environment Variables

For local development, create a `.env` file in the backend directory:

```bash
# .env file for local development
DEBUG=True
SECRET_KEY=your-local-secret-key
DATABASE_URL=postgresql://username:password@localhost:5432/bahtsulmasail_dev

# For local Azure testing
AZURE_ACCOUNT_NAME=bahtsulmasailstorage
AZURE_ACCOUNT_KEY=your-account-key
AZURE_CONTAINER_NAME=media-dev
```

## 🔍 Environment Variable Validation

Use this command to verify all environment variables are properly set in your deployment:

```powershell
# Check environment variables in a running pod
kubectl exec -it deployment/bahtsulmasail-backend -- env | grep -E "(DJANGO|DB|AZURE|REDIS)"
```

## 🚨 Security Best Practices

1. **Never commit real environment variables to git**
2. **Use Azure Key Vault for production secrets**
3. **Rotate secrets regularly**
4. **Use different secrets for different environments**
5. **Limit access to secrets using Kubernetes RBAC**

## 📋 Environment Variables Checklist

Before deployment, ensure all these variables are properly configured:

### Backend Checklist:
- [ ] `DJANGO_SECRET_KEY` - Unique secret key for Django
- [ ] `DB_PASSWORD` - PostgreSQL database password
- [ ] `DB_HOST` - Azure PostgreSQL hostname
- [ ] `AZURE_ACCOUNT_KEY` - Azure Storage account key
- [ ] `REDIS_HOST` - Azure Redis hostname
- [ ] `DJANGO_DEBUG=False` - Production safety

### Frontend Checklist:
- [ ] `NODE_ENV=production` - Production mode
- [ ] `NEXT_PUBLIC_API_URL` - Backend API URL
- [ ] `NEXTAUTH_URL` - Frontend domain URL
- [ ] `NEXT_TELEMETRY_DISABLED=1` - Privacy

### Infrastructure Checklist:
- [ ] All secrets created in Kubernetes
- [ ] ConfigMap applied to cluster
- [ ] Environment variables referenced in deployments
- [ ] Azure Key Vault configured (optional)

---

**Note**: All sensitive values are automatically generated by the `azure-setup.ps1` script and stored securely in Azure Key Vault and Kubernetes secrets. 