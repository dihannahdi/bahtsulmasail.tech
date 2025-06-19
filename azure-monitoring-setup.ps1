# Azure Monitoring Setup Script for BahtsulMasail.tech
# Replaces Google Cloud Monitoring setup

param(
    [Parameter(Mandatory=$true)]
    [string]$ResourceGroupName = "bahtsulmasail-rg",
    
    [Parameter(Mandatory=$true)]
    [string]$WorkspaceName = "bahtsulmasail-monitor",
    
    [Parameter(Mandatory=$false)]
    [string]$NotificationEmail = "admin@bahtsulmasail.tech"
)

Write-Host "🔍 Setting up Azure monitoring for BahtsulMasail.tech" -ForegroundColor Green

# Create Action Group for notifications
Write-Host "Creating Action Group for notifications..." -ForegroundColor Yellow
$actionGroupName = "bahtsulmasail-alerts"

az monitor action-group create `
    --resource-group $ResourceGroupName `
    --name $actionGroupName `
    --short-name "BMAlerts" `
    --email-receivers name="Admin" email="$NotificationEmail"

# Get the action group ID
$actionGroupId = az monitor action-group show --resource-group $ResourceGroupName --name $actionGroupName --query id -o tsv

# Create Application Insights
Write-Host "Creating Application Insights..." -ForegroundColor Yellow
$appInsightsName = "bahtsulmasail-insights"
az monitor app-insights component create `
    --resource-group $ResourceGroupName `
    --app $appInsightsName `
    --location "East US" `
    --kind web `
    --workspace "/subscriptions/$(az account show --query id -o tsv)/resourceGroups/$ResourceGroupName/providers/Microsoft.OperationalInsights/workspaces/$WorkspaceName"

# Create CPU utilization alert
Write-Host "Creating CPU utilization alert..." -ForegroundColor Yellow
az monitor metrics alert create `
    --resource-group $ResourceGroupName `
    --name "High CPU Utilization - BahtsulMasail" `
    --description "CPU utilization is above 80% for more than 5 minutes" `
    --condition "avg Percentage CPU > 80" `
    --window-size 5m `
    --evaluation-frequency 1m `
    --action $actionGroupId `
    --scope "/subscriptions/$(az account show --query id -o tsv)/resourceGroups/$ResourceGroupName"

# Create memory utilization alert  
Write-Host "Creating memory utilization alert..." -ForegroundColor Yellow
az monitor metrics alert create `
    --resource-group $ResourceGroupName `
    --name "High Memory Utilization - BahtsulMasail" `
    --description "Memory utilization is above 85% for more than 5 minutes" `
    --condition "avg Memory percentage > 85" `
    --window-size 5m `
    --evaluation-frequency 1m `
    --action $actionGroupId `
    --scope "/subscriptions/$(az account show --query id -o tsv)/resourceGroups/$ResourceGroupName"

# Create database connection alert
Write-Host "Creating database connection alert..." -ForegroundColor Yellow
az monitor metrics alert create `
    --resource-group $ResourceGroupName `
    --name "High Database Connections - BahtsulMasail" `
    --description "Database connection count is above 80% of maximum" `
    --condition "avg connection_successful > 80" `
    --window-size 5m `
    --evaluation-frequency 1m `
    --action $actionGroupId `
    --scope "/subscriptions/$(az account show --query id -o tsv)/resourceGroups/$ResourceGroupName/providers/Microsoft.DBforPostgreSQL/servers/bahtsulmasail-db"

# Create Redis memory alert
Write-Host "Creating Redis memory utilization alert..." -ForegroundColor Yellow
az monitor metrics alert create `
    --resource-group $ResourceGroupName `
    --name "High Redis Memory Usage - BahtsulMasail" `
    --description "Redis memory usage is above 90%" `
    --condition "avg usedmemorypercentage > 90" `
    --window-size 5m `
    --evaluation-frequency 1m `
    --action $actionGroupId `
    --scope "/subscriptions/$(az account show --query id -o tsv)/resourceGroups/$ResourceGroupName/providers/Microsoft.Cache/Redis/bahtsulmasail-redis"

# Create storage utilization alert
Write-Host "Creating storage utilization alert..." -ForegroundColor Yellow
az monitor metrics alert create `
    --resource-group $ResourceGroupName `
    --name "High Storage Usage - BahtsulMasail" `
    --description "Storage usage is above 80%" `
    --condition "avg UsedCapacity > 80000000000" `
    --window-size 15m `
    --evaluation-frequency 5m `
    --action $actionGroupId `
    --scope "/subscriptions/$(az account show --query id -o tsv)/resourceGroups/$ResourceGroupName/providers/Microsoft.Storage/storageAccounts/bahtsulmasailstorage"

# Create custom dashboard
Write-Host "Creating Azure Dashboard..." -ForegroundColor Yellow

$dashboardJson = @"
{
  "lenses": {
    "0": {
      "order": 0,
      "parts": {
        "0": {
          "position": {"x": 0, "y": 0, "rowSpan": 4, "colSpan": 6},
          "metadata": {
            "inputs": [
              {
                "name": "resourceGroup",
                "value": "$ResourceGroupName"
              }
            ],
            "type": "Extension/HubsExtension/PartType/ResourceGroupMapPinnedPart"
          }
        },
        "1": {
          "position": {"x": 6, "y": 0, "rowSpan": 4, "colSpan": 6},
          "metadata": {
            "inputs": [
              {
                "name": "chartType",
                "value": "Area"
              },
              {
                "name": "metrics",
                "value": [
                  {
                    "resourceMetadata": {
                      "id": "/subscriptions/$(az account show --query id -o tsv)/resourceGroups/$ResourceGroupName/providers/Microsoft.ContainerService/managedClusters/bahtsulmasail-aks"
                    },
                    "name": "node_cpu_usage_percentage",
                    "aggregationType": 4,
                    "namespace": "microsoft.containerservice/managedclusters",
                    "metricVisualization": {
                      "displayName": "CPU Usage %"
                    }
                  }
                ]
              }
            ],
            "type": "Extension/Microsoft_Azure_Monitoring/PartType/MetricsChartPart"
          }
        }
      }
    }
  },
  "metadata": {
    "model": {
      "timeRange": {
        "value": {
          "relative": {
            "duration": 24,
            "timeUnit": 1
          }
        },
        "type": "MsPortalFx.Composition.Configuration.ValueTypes.TimeRange"
      }
    }
  }
}
"@

# Save dashboard to file
$dashboardJson | Out-File -FilePath "bahtsulmasail-dashboard.json"

# Create workbook for detailed monitoring
Write-Host "Creating Azure Workbook..." -ForegroundColor Yellow

$workbookJson = @"
{
  "version": "Notebook/1.0",
  "items": [
    {
      "type": 1,
      "content": {
        "json": "# BahtsulMasail.tech Application Dashboard\n\nOverview of application performance and health metrics."
      },
      "name": "Header"
    },
    {
      "type": 10,
      "content": {
        "chartId": "workbook-chart-1",
        "version": "MetricsItem/2.0",
        "size": 0,
        "chartType": 2,
        "resourceIds": [
          "/subscriptions/$(az account show --query id -o tsv)/resourceGroups/$ResourceGroupName/providers/Microsoft.ContainerService/managedClusters/bahtsulmasail-aks"
        ],
        "timeContext": {
          "durationMs": 3600000
        },
        "metrics": [
          {
            "namespace": "microsoft.containerservice/managedclusters",
            "metric": "node_cpu_usage_percentage",
            "aggregation": 4
          }
        ],
        "title": "AKS CPU Usage"
      },
      "name": "CPU Metrics"
    },
    {
      "type": 10,
      "content": {
        "chartId": "workbook-chart-2",
        "version": "MetricsItem/2.0",
        "size": 0,
        "chartType": 2,
        "resourceIds": [
          "/subscriptions/$(az account show --query id -o tsv)/resourceGroups/$ResourceGroupName/providers/Microsoft.DBforPostgreSQL/servers/bahtsulmasail-db"
        ],
        "timeContext": {
          "durationMs": 3600000
        },
        "metrics": [
          {
            "namespace": "microsoft.dbforpostgresql/servers",
            "metric": "cpu_percent",
            "aggregation": 4
          }
        ],
        "title": "Database CPU Usage"
      },
      "name": "Database Metrics"
    }
  ],
  "fallbackResourceIds": [
    "/subscriptions/$(az account show --query id -o tsv)/resourceGroups/$ResourceGroupName"
  ]
}
"@

# Save workbook to file
$workbookJson | Out-File -FilePath "bahtsulmasail-workbook.json"

# Create Log Analytics queries for application logs
Write-Host "Setting up Log Analytics queries..." -ForegroundColor Yellow

# Create saved searches in Log Analytics
$queries = @(
    @{
        Name = "Application Errors"
        Query = 'ContainerLog | where LogEntry contains "ERROR" | summarize count() by bin(TimeGenerated, 5m)'
        Category = "BahtsulMasail"
    },
    @{
        Name = "High Response Times"
        Query = 'ContainerLog | where LogEntry contains "response_time" | extend ResponseTime = extract("response_time:([0-9.]+)", 1, LogEntry) | where toint(ResponseTime) > 1000'
        Category = "BahtsulMasail"
    },
    @{
        Name = "Failed Requests"
        Query = 'ContainerLog | where LogEntry contains "HTTP" and (LogEntry contains "4\d\d" or LogEntry contains "5\d\d") | summarize count() by bin(TimeGenerated, 5m)'
        Category = "BahtsulMasail"
    }
)

foreach ($query in $queries) {
    Write-Host "Creating saved search: $($query.Name)" -ForegroundColor Gray
    az monitor log-analytics workspace saved-search create `
        --resource-group $ResourceGroupName `
        --workspace-name $WorkspaceName `
        --saved-search-id "$($query.Name -replace ' ', '')" `
        --display-name $query.Name `
        --category $query.Category `
        --query $query.Query
}

# Output summary
Write-Host "`n✅ Azure monitoring setup completed!" -ForegroundColor Green
Write-Host "`n📋 Monitoring Summary:" -ForegroundColor Cyan
Write-Host "Action Group: $actionGroupName" -ForegroundColor White
Write-Host "Application Insights: $appInsightsName" -ForegroundColor White
Write-Host "Log Analytics Workspace: $WorkspaceName" -ForegroundColor White
Write-Host "Notification Email: $NotificationEmail" -ForegroundColor White

Write-Host "`n📊 Created Alerts:" -ForegroundColor Cyan
Write-Host "- High CPU Utilization (>80%)" -ForegroundColor White
Write-Host "- High Memory Utilization (>85%)" -ForegroundColor White  
Write-Host "- High Database Connections (>80)" -ForegroundColor White
Write-Host "- High Redis Memory Usage (>90%)" -ForegroundColor White
Write-Host "- High Storage Usage (>80GB)" -ForegroundColor White

Write-Host "`n🔗 Access Your Monitoring:" -ForegroundColor Cyan
Write-Host "Azure Portal: https://portal.azure.com" -ForegroundColor White
Write-Host "Application Insights: https://portal.azure.com/#@/resource/subscriptions/$(az account show --query id -o tsv)/resourceGroups/$ResourceGroupName/providers/Microsoft.Insights/components/$appInsightsName" -ForegroundColor White
Write-Host "Log Analytics: https://portal.azure.com/#@/resource/subscriptions/$(az account show --query id -o tsv)/resourceGroups/$ResourceGroupName/providers/Microsoft.OperationalInsights/workspaces/$WorkspaceName" -ForegroundColor White

Write-Host "`n📝 Dashboard files created:" -ForegroundColor Yellow
Write-Host "- bahtsulmasail-dashboard.json" -ForegroundColor White
Write-Host "- bahtsulmasail-workbook.json" -ForegroundColor White 