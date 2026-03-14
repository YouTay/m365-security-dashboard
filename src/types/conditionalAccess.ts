export type PolicyState = "enabled" | "disabled" | "enabledForReportingButNotEnforced";

export interface ConditionalAccessPolicy {
  id: string;
  displayName: string;
  state: PolicyState;
  createdDateTime: string;
  modifiedDateTime: string;
  conditions: {
    users?: {
      includeUsers?: string[];
      excludeUsers?: string[];
    };
    applications?: {
      includeApplications?: string[];
    };
    locations?: {
      includeLocations?: string[];
    };
    platforms?: {
      includePlatforms?: string[];
    };
  };
  grantControls?: {
    builtInControls: string[];
  };
  description?: string;
}

export interface ConditionalAccessResponse {
  value: ConditionalAccessPolicy[];
  totalCount: number;
  enabledCount: number;
  reportOnlyCount: number;
  disabledCount: number;
}
