output "kubeconfig" {
  value     = azurerm_kubernetes_cluster.this.kube_config_raw
  sensitive = true
}

output "cluster_name" {
  value = azurerm_kubernetes_cluster.this.name
}

output "node_resource_group" {
  value = azurerm_kubernetes_cluster.this.node_resource_group
}
