export type ComplianceState = "compliant" | "noncompliant" | "conflict" | "error" | "unknown" | "notApplicable";

export interface ManagedDevice {
  id: string;
  deviceName: string;
  managedDeviceOwnerType: string;
  operatingSystem: string;
  osVersion: string;
  complianceState: ComplianceState;
  lastSyncDateTime: string;
  userDisplayName: string;
  userPrincipalName: string;
  model: string;
  manufacturer: string;
  isEncrypted: boolean;
  enrolledDateTime: string;
}

export interface DevicesResponse {
  value: ManagedDevice[];
  totalCount: number;
  compliantCount: number;
  nonCompliantCount: number;
}
