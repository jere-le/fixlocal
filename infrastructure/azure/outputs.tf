output "aks_primary_kubeconfig" {
  value     = module.aks_primary.kubeconfig
  sensitive = true
}

output "aks_secondary_kubeconfig" {
  value     = module.aks_secondary.kubeconfig
  sensitive = true
}
