export type RiskLevel = "low" | "medium" | "high" | "hidden" | "none" | "unknownFutureValue";
export type RiskState = "atRisk" | "confirmedCompromised" | "remediated" | "dismissed" | "confirmedSafe" | "unknownFutureValue";

export interface RiskyUser {
  id: string;
  userDisplayName: string;
  userPrincipalName: string;
  riskLevel: RiskLevel;
  riskState: RiskState;
  riskLastUpdatedDateTime: string;
  riskDetail: string;
  isDeleted: boolean;
}

export interface RiskyUsersResponse {
  value: RiskyUser[];
}
