import type { Client } from "@microsoft/microsoft-graph-client";
import type { RiskyUsersResponse } from "@/types/riskyUsers";

export async function fetchRiskyUsers(client: Client): Promise<RiskyUsersResponse> {
  const response = await client
    .api("/identityProtection/riskyUsers")
    .filter("riskLevel ne 'none' and riskLevel ne 'hidden'")
    .top(100)
    .get();
  return response;
}
