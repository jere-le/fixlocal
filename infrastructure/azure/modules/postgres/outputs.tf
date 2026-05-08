output "fqdn" {
  value = azurerm_postgresql_flexible_server.this.fqdn
}

output "server_name" {
  value = azurerm_postgresql_flexible_server.this.name
}

output "db_name" {
  value = azurerm_postgresql_flexible_server_database.fixlocal.name
}
