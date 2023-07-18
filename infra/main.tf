provider "azurerm" {
  features {}
}

locals {
  props = merge(jsondecode(var.props), jsondecode(var.deployment_props))
}

data "azurerm_resource_group" "main" {
  name = local.props.azure.resource_group
}

resource "azurerm_static_site" "main" {
  name                = "swa-${local.props.project_name}-${local.props.component_name}-${local.props.app_environment}"
  location            = data.azurerm_resource_group.main.location
  resource_group_name = data.azurerm_resource_group.main.name
  sku_tier            = local.props.app_environment == "prod" ? "Standard" : "Free"
  sku_size            = local.props.app_environment == "prod" ? "Standard" : "Free"
}

# resource "azurerm_static_site_custom_domain" "main" {
#   static_site_id  = azurerm_static_site.main.id
#   domain_name     = local.props.app_environment == "prod" ? "design-library.developer.bcc.no" : "design-library-dev.developer.bcc.no"
#   validation_type = "cname-delegation"

#   lifecycle {
#     ignore_changes = [
#       validation_type
#     ]
#   }

#   timeouts {
#     create = "15m"
#     update = "15m"
#     delete = "30m"
#     read   = "5m"
#   }
# }