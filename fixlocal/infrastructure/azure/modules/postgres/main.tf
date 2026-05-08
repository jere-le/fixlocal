resource "azurerm_postgresql_flexible_server" "this" {
  name                   = "${var.prefix}-pg"
  location               = var.location
  resource_group_name    = var.resource_group_name
  version                = "16"
  administrator_login    = var.admin_user
  administrator_password = var.admin_password
  sku_name               = var.sku_name
  storage_mb             = 32768
  tags                   = var.tags

  public_network_access_enabled = false
}

resource "azurerm_postgresql_flexible_server_database" "fixlocal" {
  name      = "fixlocal"
  server_id = azurerm_postgresql_flexible_server.this.id
  collation = "en_US.utf8"
  charset   = "utf8"
}
