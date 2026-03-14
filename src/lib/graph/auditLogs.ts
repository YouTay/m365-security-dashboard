import type { Client } from "@microsoft/microsoft-graph-client";
import type { AuditLogsResponse } from "@/types/auditLogs";

export async function fetchAuditLogs(client: Client): Promise<AuditLogsResponse> {
  const response = await client
    .api("/auditLogs/directoryAudits")
    .top(100)
    .orderby("activityDateTime desc")
    .get();
  return response;
}
