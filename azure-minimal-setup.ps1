# Minimal Azure Setup - Step 1: Basic Resources Only

param(
    [Parameter(Mandatory=$true)]
    [string]$SubscriptionId,
    
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroupName = "bahtsulmasail-rg",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "East US"
)

Write-Host "🚀 Setting up basic Azure infrastructure for BahtsulMasail.tech" -ForegroundColor Green

# Set Azure subscription
Write-Host "Setting Azure subscription..." -ForegroundColor Yellow
az account set --subscription $SubscriptionId

# The resource group should already exist from our previous attempt
Write-Host "Resource group already exists: $ResourceGroupName" -ForegroundColor Green

# Create Azure Storage Account (this should work as Microsoft.Storage is commonly pre-registered)
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

# Output what we've created so far
Write-Host ""
Write-Host "✅ Basic Azure infrastructure setup completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Created Resources:" -ForegroundColor Cyan
Write-Host "Resource Group: $ResourceGroupName" -ForegroundColor White
Write-Host "Storage Account: $storageAccountName" -ForegroundColor White
Write-Host "Blob Container: $containerName" -ForegroundColor White
Write-Host ""
Write-Host "🔐 Generated Credentials:" -ForegroundColor Yellow
Write-Host "Django Secret Key: $djangoSecret" -ForegroundColor Red
Write-Host "Storage Key: $storageKey" -ForegroundColor Red
Write-Host ""
Write-Host "🚀 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Wait for resource providers to register (5-10 minutes)" -ForegroundColor White
Write-Host "2. Check provider status: az provider show -n Microsoft.ContainerRegistry" -ForegroundColor White
Write-Host "3. Once registered, run the full setup script" -ForegroundColor White 