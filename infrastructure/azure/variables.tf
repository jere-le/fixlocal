variable "primary_location" {
  description = "Primary Azure region"
  type        = string
  default     = "swedencentral"
}

variable "secondary_location" {
  description = "Secondary Azure region"
  type        = string
  default     = "northeurope"
}

variable "environment" {
  type    = string
  default = "prod"
}

variable "project" {
  type    = string
  default = "fixlocal"
}

variable "node_count" {
  type    = number
  default = 2
}

variable "node_vm_size" {
  type    = string
  default = "Standard_B2s"
}
