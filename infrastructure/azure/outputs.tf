output "aks_primary_kubeconfig" {
  value     = module.aks_primary.kubeconfig
  sensitive = true
}

output "aks_secondary_kubeconfig" {
  value     = module.aks_secondary.kubeconfig
  sensitive = true
}

output "postgres_primary_fqdn" {
  value = module.postgres_primary.fqdn
}

output "postgres_secondary_fqdn" {
  value = module.postgres_secondary.fqdn
}
