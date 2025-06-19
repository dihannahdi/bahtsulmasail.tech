# Azure Infrastructure Setup Script for BahtsulMasail.tech
# Replaces Google Cloud Platform infrastructure

param(
    [Parameter(Mandatory=$true)]
    [string]$SubscriptionId,
    
    [Parameter(Mandatory=$true)]
    [string]$ResourceGroupName = "bahtsulmasail-rg",
    
    [Parameter(Mandatory=$true)]
    [string]$Location = "East US",
    
    [Parameter(Mandatory=$false)]
    [string]$Environment = "production"
)

Write-Host "🚀 Setting up Azure infrastructure for BahtsulMasail.tech" -ForegroundColor Green
Write-Host "Environment: $Environment" -ForegroundColor Yellow
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
if ($Environment -eq "development") {
    $aksName = "bahtsulmasail-aks-dev"
}

az aks create `
    --resource-group $ResourceGroupName `
    --name $aksName `
    --node-count 2 `
    --node-vm-size Standard_B2s `
    --enable-addons monitoring `
    --attach-acr $acrName `
    --generate-ssh-keys

# Create Azure Database for PostgreSQL
Write-Host "Creating Azure Database for PostgreSQL..." -ForegroundColor Yellow
$dbServerName = "bahtsulmasail-db"
$dbName = "bahtsulmasail"
$dbUsername = "bahtsulmasail"
$dbPassword = -join ((33..126) | ForEach {[char]$_} | Get-Random -Count 20)

az postgres server create `
    --resource-group $ResourceGroupName `
    --name $dbServerName `
    --location $Location `
    --admin-user $dbUsername `
    --admin-password $dbPassword `
    --sku-name GP_Gen5_2 `
    --version 13

# Create database
az postgres db create `
    --resource-group $ResourceGroupName `
    --server-name $dbServerName `
    --name $dbName

# Configure firewall to allow Azure services
az postgres server firewall-rule create `
    --resource-group $ResourceGroupName `
    --server $dbServerName `
    --name "AllowAzureServices" `
    --start-ip-address 0.0.0.0 `
    --end-ip-address 0.0.0.0

# Enable pgvector extension
Write-Host "Enabling pgvector extension..." -ForegroundColor Yellow
$connectionString = "host=$dbServerName.postgres.database.azure.com port=5432 dbname=$dbName user=$dbUsername@$dbServerName password=$dbPassword sslmode=require"
# Note: This would need to be done manually or with a script that connects to the database

# Create Azure Cache for Redis
Write-Host "Creating Azure Cache for Redis..." -ForegroundColor Yellow
$redisName = "bahtsulmasail-redis"
az redis create `
    --resource-group $ResourceGroupName `
    --name $redisName `
    --location $Location `
    --sku Basic `
    --vm-size c0

# Create Azure Storage Account for Blob Storage
Write-Host "Creating Azure Storage Account..." -ForegroundColor Yellow
$storageAccountName = "bahtsulmasailstorage"
az storage account create `
    --resource-group $ResourceGroupName `
    --name $storageAccountName `
    --location $Location `
    --sku Standard_LRS `
    --kind StorageV2

# Create blob container
$containerName = "media"
az storage container create `
    --account-name $storageAccountName `
    --name $containerName `
    --public-access off

# Get storage account key
$storageKey = az storage account keys list --resource-group $ResourceGroupName --account-name $storageAccountName --query '[0].value' -o tsv

# Create Azure Key Vault for secrets
Write-Host "Creating Azure Key Vault..." -ForegroundColor Yellow
$keyVaultName = "bahtsulmasail-kv"
az keyvault create `
    --resource-group $ResourceGroupName `
    --name $keyVaultName `
    --location $Location

# Generate Django secret key
$djangoSecret = -join ((33..126) | ForEach {[char]$_} | Get-Random -Count 50)

# Store secrets in Key Vault
Write-Host "Storing secrets in Key Vault..." -ForegroundColor Yellow
az keyvault secret set --vault-name $keyVaultName --name "django-secret-key" --value $djangoSecret
az keyvault secret set --vault-name $keyVaultName --name "db-password" --value $dbPassword
az keyvault secret set --vault-name $keyVaultName --name "db-host" --value "$dbServerName.postgres.database.azure.com"
az keyvault secret set --vault-name $keyVaultName --name "azure-account-name" --value $storageAccountName
az keyvault secret set --vault-name $keyVaultName --name "azure-account-key" --value $storageKey
az keyvault secret set --vault-name $keyVaultName --name "azure-container-name" --value $containerName

# Get Redis connection details
$redisHostname = az redis show --resource-group $ResourceGroupName --name $redisName --query hostName -o tsv
$redisKey = az redis list-keys --resource-group $ResourceGroupName --name $redisName --query primaryKey -o tsv

az keyvault secret set --vault-name $keyVaultName --name "redis-host" --value $redisHostname
az keyvault secret set --vault-name $keyVaultName --name "redis-key" --value $redisKey

# Get AKS credentials
Write-Host "Getting AKS credentials..." -ForegroundColor Yellow
az aks get-credentials --resource-group $ResourceGroupName --name $aksName

# Create Kubernetes namespace
if ($Environment -eq "development") {
    kubectl create namespace development
    kubectl config set-context --current --namespace=development
}

# Create Kubernetes secrets
Write-Host "Creating Kubernetes secrets..." -ForegroundColor Yellow
kubectl create secret generic bahtsulmasail-secrets `
    --from-literal=django-secret-key=$djangoSecret `
    --from-literal=db-password=$dbPassword `
    --from-literal=db-host="$dbServerName.postgres.database.azure.com" `
    --from-literal=redis-host=$redisHostname `
    --from-literal=azure-account-name=$storageAccountName `
    --from-literal=azure-account-key=$storageKey `
    --from-literal=azure-container-name=$containerName

# Create Azure Monitor workspace for monitoring
Write-Host "Creating Azure Monitor workspace..." -ForegroundColor Yellow
$monitorWorkspace = "bahtsulmasail-monitor"
az monitor log-analytics workspace create `
    --resource-group $ResourceGroupName `
    --workspace-name $monitorWorkspace `
    --location $Location

# Enable Container Insights for AKS
az aks enable-addons `
    --resource-group $ResourceGroupName `
    --name $aksName `
    --addons monitoring `
    --workspace-resource-id $(az monitor log-analytics workspace show --resource-group $ResourceGroupName --workspace-name $monitorWorkspace --query id -o tsv)

# Output summary
Write-Host "`n✅ Azure infrastructure setup completed!" -ForegroundColor Green
Write-Host "`n📋 Summary:" -ForegroundColor Cyan
Write-Host "Resource Group: $ResourceGroupName" -ForegroundColor White
Write-Host "AKS Cluster: $aksName" -ForegroundColor White
Write-Host "Container Registry: $acrName.azurecr.io" -ForegroundColor White
Write-Host "Database Server: $dbServerName.postgres.database.azure.com" -ForegroundColor White
Write-Host "Redis Cache: $redisHostname" -ForegroundColor White
Write-Host "Storage Account: $storageAccountName" -ForegroundColor White
Write-Host "Key Vault: $keyVaultName" -ForegroundColor White

Write-Host "`n🔐 Important Credentials:" -ForegroundColor Yellow
Write-Host "Database Password: $dbPassword" -ForegroundColor Red
Write-Host "Django Secret Key: $djangoSecret" -ForegroundColor Red
Write-Host "⚠️  Save these credentials securely!" -ForegroundColor Red

Write-Host "`n🚀 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Update azure-pipelines.yml with your actual resource names" -ForegroundColor White
Write-Host "2. Set up Azure DevOps service connection" -ForegroundColor White
Write-Host "3. Configure DNS and SSL certificates" -ForegroundColor White
Write-Host "4. Run database migrations" -ForegroundColor White
Write-Host "5. Deploy application using: kubectl apply -f azure-deployment.yaml" -ForegroundColor White

Write-Host "`n🔗 Useful Commands:" -ForegroundColor Cyan
Write-Host "Connect to AKS: az aks get-credentials --resource-group $ResourceGroupName --name $aksName" -ForegroundColor White
Write-Host "Login to ACR: az acr login --name $acrName" -ForegroundColor White
Write-Host "View secrets: az keyvault secret list --vault-name $keyVaultName" -ForegroundColor White 