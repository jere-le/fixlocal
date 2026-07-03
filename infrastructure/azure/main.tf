locals {
  primary_prefix   = "${var.project}-${var.environment}-swe"
  secondary_prefix = "${var.project}-${var.environment}-ne"
  common_tags = {
    project     = var.project
    environment = var.environment
    managed_by  = "terraform"
  }
}

# ── Resource Groups ──────────────────────────────────────────────────────────

resource "azurerm_resource_group" "primary" {
  name     = "${local.primary_prefix}-rg"
  location = var.primary_location
  tags     = local.common_tags
}

resource "azurerm_resource_group" "secondary" {
  name     = "${local.secondary_prefix}-rg"
  location = var.secondary_location
  tags     = local.common_tags
}

# ── AKS ─────────────────────────────────────────────────────────────────────

module "aks_primary" {
  source              = "./modules/aks"
  prefix              = local.primary_prefix
  resource_group_name = azurerm_resource_group.primary.name
  location            = var.primary_location
  node_count          = var.node_count
  node_vm_size        = var.node_vm_size
  tags                = local.common_tags
}

module "aks_secondary" {
  source              = "./modules/aks"
  prefix              = local.secondary_prefix
  resource_group_name = azurerm_resource_group.secondary.name
  location            = var.secondary_location
  node_count          = var.node_count
  node_vm_size        = var.node_vm_size
  tags                = local.common_tags
}
