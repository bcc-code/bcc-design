terraform {
  backend "azurerm" {}
  required_version = ">= 1.4.6"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.65"
    }
  }
}

provider "azurerm" {
  features {}
}

locals {
  props = merge(jsondecode(var.props), jsondecode(var.deployment_props))
}

data "azurerm_resource_group" "main" {
  name = local.props.azure.resource_group
}