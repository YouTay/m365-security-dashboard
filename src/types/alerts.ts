export type AlertSeverity = "high" | "medium" | "low" | "informational";
export type AlertStatus = "new" | "inProgress" | "resolved" | "unknownFutureValue";

export interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  status: AlertStatus;
  createdDateTime: string;
  category: string;
  userStates?: {
    userPrincipalName: string;
    riskScore?: string;
  }[];
  source?: string;
  recommendedActions?: string[];
}

export interface AlertsResponse {
  value: SecurityAlert[];
}
