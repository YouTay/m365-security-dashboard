import type { Client } from "@microsoft/microsoft-graph-client";
import type { DevicesResponse } from "@/types/devices";

export async function fetchDevices(client: Client): Promise<DevicesResponse> {
  const response = await client
    .api("/deviceManagement/managedDevices")
    .top(999)
    .select(
      "id,deviceName,managedDeviceOwnerType,operatingSystem,osVersion,complianceState,lastSyncDateTime,userDisplayName,userPrincipalName,model,manufacturer,isEncrypted,enrolledDateTime"
    )
    .get();

  const devices = response.value || [];
  const compliantCount = devices.filter(
    (d: { complianceState: string }) => d.complianceState === "compliant"
  ).length;
  const nonCompliantCount = devices.filter(
    (d: { complianceState: string }) => d.complianceState === "noncompliant"
  ).length;

  return {
    value: devices,
    totalCount: devices.length,
    compliantCount,
    nonCompliantCount,
  };
}
