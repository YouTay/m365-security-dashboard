variable "subscription_id" {
  description = "Azure Subscription ID"
  type        = string
}

variable "prefix" {
  description = "Naming prefix for all resources"
  type        = string
  default     = "m365sec"
}

variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "rg-m365-security-app"
}

variable "location" {
  description = "Azure region for VNet, Key Vault, and Resource Group"
  type        = string
  default     = "westeurope"
}

variable "swa_location" {
  description = "Azure region for Static Web App (limited regions)"
  type        = string
  default     = "westeurope"
}

variable "msal_client_id" {
  description = "MSAL / Azure AD App Registration Client ID"
  type        = string
  sensitive   = true
}

variable "deployer_ip" {
  description = "Public IP of the deployer machine (for Key Vault firewall)"
  type        = string
}

variable "tags" {
  description = "Tags applied to all resources"
  type        = map(string)
  default = {
    project     = "m365-security-dashboard"
    environment = "production"
    managed_by  = "terraform"
  }
}
