export interface AuditLogEntry {
  id: string;
  createdDateTime: string;
  activityDisplayName: string;
  activityDateTime: string;
  category: string;
  result: string;
  initiatedBy: {
    user?: {
      displayName: string;
      userPrincipalName: string;
      ipAddress?: string;
    };
    app?: {
      displayName: string;
    };
  };
  targetResources?: {
    displayName: string;
    type: string;
  }[];
  loggedByService?: string;
}

export interface AuditLogsResponse {
  value: AuditLogEntry[];
}
