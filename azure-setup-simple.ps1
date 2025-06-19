# Simplified Azure Infrastructure Setup Script for BahtsulMasail.tech

param(
    [Parameter(Mandatory=$true)]
    [string]$SubscriptionId,
    
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroupName = "bahtsulmasail-rg",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "East US"
)

Write-Host "🚀 Setting up Azure infrastructure for BahtsulMasail.tech" -ForegroundColor Green
Write-Host "Subscription: $SubscriptionId" -ForegroundColor Yellow
Write-Host "Resource Group: $ResourceGroupName" -ForegroundColor Yellow
Write-Host "Location: $Location" -ForegroundColor Yellow

# Set Azure subscription
Write-Host "Setting Azure subscription..." -ForegroundColor Yellow
az account set --subscription $SubscriptionId

# Create Resource Group
Write-Host "Creating resource group..." -ForegroundColor Yellow
az group create --name $ResourceGroupName --location $Location

# Create Azure Container Registry
Write-Host "Creating Azure Container Registry..." -ForegroundColor Yellow
$acrName = "bahtsulmasailregistry"
az acr create --resource-group $ResourceGroupName --name $acrName --sku Basic --admin-enabled true

# Create Azure Kubernetes Service (AKS)
Write-Host "Creating Azure Kubernetes Service..." -ForegroundColor Yellow
$aksName = "bahtsulmasail-aks"
az aks create --resource-group $ResourceGroupName --name $aksName --node-count 2 --node-vm-size Standard_B2s --attach-acr $acrName --generate-ssh-keys

# Create Azure Database for PostgreSQL
Write-Host "Creating Azure Database for PostgreSQL..." -ForegroundColor Yellow
$dbServerName = "bahtsulmasail-db"
$dbName = "bahtsulmasail"
$dbUsername = "bahtsulmasail"
$dbPassword = -join ((33..126) | ForEach {[char]$_} | Get-Random -Count 20)

az postgres server create --resource-group $ResourceGroupName --name $dbServerName --location $Location --admin-user $dbUsername --admin-password $dbPassword --sku-name GP_Gen5_2 --version 13

# Create database
az postgres db create --resource-group $ResourceGroupName --server-name $dbServerName --name $dbName

# Configure firewall to allow Azure services
az postgres server firewall-rule create --resource-group $ResourceGroupName --server $dbServerName --name "AllowAzureServices" --start-ip-address 0.0.0.0 --end-ip-address 0.0.0.0

# Create Azure Cache for Redis
Write-Host "Creating Azure Cache for Redis..." -ForegroundColor Yellow
$redisName = "bahtsulmasail-redis"
az redis create --resource-group $ResourceGroupName --name $redisName --location $Location --sku Basic --vm-size c0

# Create Azure Storage Account for Blob Storage
Write-Host "Creating Azure Storage Account..." -ForegroundColor Yellow
$storageAccountName = "bahtsulmasailstorage"
az storage account create --resource-group $ResourceGroupName --name $storageAccountName --location $Location --sku Standard_LRS --kind StorageV2

# Create blob container
$containerName = "media"
az storage container create --account-name $storageAccountName --name $containerName --public-access off

# Get storage account key
$storageKey = az storage account keys list --resource-group $ResourceGroupName --account-name $storageAccountName --query '[0].value' -o tsv

# Generate Django secret key
$djangoSecret = -join ((33..126) | ForEach {[char]$_} | Get-Random -Count 50)

# Get AKS credentials
Write-Host "Getting AKS credentials..." -ForegroundColor Yellow
az aks get-credentials --resource-group $ResourceGroupName --name $aksName

# Get Redis connection details
$redisHostname = az redis show --resource-group $ResourceGroupName --name $redisName --query hostName -o tsv

# Create Kubernetes secrets
Write-Host "Creating Kubernetes secrets..." -ForegroundColor Yellow
kubectl create secret generic bahtsulmasail-secrets --from-literal=django-secret-key=$djangoSecret --from-literal=db-password=$dbPassword --from-literal=db-host="$dbServerName.postgres.database.azure.com" --from-literal=redis-host=$redisHostname --from-literal=azure-account-name=$storageAccountName --from-literal=azure-account-key=$storageKey --from-literal=azure-container-name=$containerName

# Output summary
Write-Host ""
Write-Host "✅ Azure infrastructure setup completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Summary:" -ForegroundColor Cyan
Write-Host "Resource Group: $ResourceGroupName" -ForegroundColor White
Write-Host "AKS Cluster: $aksName" -ForegroundColor White
Write-Host "Container Registry: $acrName.azurecr.io" -ForegroundColor White
Write-Host "Database Server: $dbServerName.postgres.database.azure.com" -ForegroundColor White
Write-Host "Redis Cache: $redisHostname" -ForegroundColor White
Write-Host "Storage Account: $storageAccountName" -ForegroundColor White
Write-Host ""
Write-Host "🔐 Important Credentials:" -ForegroundColor Yellow
Write-Host "Database Password: $dbPassword" -ForegroundColor Red
Write-Host "Django Secret Key: $djangoSecret" -ForegroundColor Red
Write-Host "Storage Key: $storageKey" -ForegroundColor Red
Write-Host "⚠️  Save these credentials securely!" -ForegroundColor Red
Write-Host ""
Write-Host "🚀 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Deploy application: kubectl apply -f azure-deployment.yaml" -ForegroundColor White
Write-Host "2. Check deployment: kubectl get pods" -ForegroundColor White
Write-Host "3. Get services: kubectl get services" -ForegroundColor White 