import type { Client } from "@microsoft/microsoft-graph-client";
import type { ConditionalAccessResponse } from "@/types/conditionalAccess";

export async function fetchConditionalAccessPolicies(
  client: Client
): Promise<ConditionalAccessResponse> {
  const response = await client
    .api("/identity/conditionalAccess/policies")
    .get();

  const policies = response.value || [];
  const enabledCount = policies.filter((p: { state: string }) => p.state === "enabled").length;
  const reportOnlyCount = policies.filter(
    (p: { state: string }) => p.state === "enabledForReportingButNotEnforced"
  ).length;
  const disabledCount = policies.filter((p: { state: string }) => p.state === "disabled").length;

  return {
    value: policies,
    totalCount: policies.length,
    enabledCount,
    reportOnlyCount,
    disabledCount,
  };
}
