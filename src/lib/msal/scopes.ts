export const graphScopes = [
  "SecurityEvents.Read.All",
  "User.Read.All",
  "Policy.Read.All",
  "IdentityRiskyUser.Read.All",
  "DeviceManagementManagedDevices.Read.All",
  "AuditLog.Read.All",
  "Directory.Read.All",
  "UserAuthenticationMethod.Read.All",
];

export const loginRequest = {
  scopes: graphScopes,
};
