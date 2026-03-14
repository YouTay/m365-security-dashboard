import type { Client } from "@microsoft/microsoft-graph-client";
import type { AlertsResponse } from "@/types/alerts";

export async function fetchAlerts(client: Client): Promise<AlertsResponse> {
  const response = await client
    .api("/security/alerts_v2")
    .top(50)
    .orderby("createdDateTime desc")
    .get();
  return response;
}
