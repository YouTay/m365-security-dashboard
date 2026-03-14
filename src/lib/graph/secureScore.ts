import type { Client } from "@microsoft/microsoft-graph-client";
import type { SecureScoreResponse } from "@/types/secureScore";

export async function fetchSecureScores(client: Client): Promise<SecureScoreResponse> {
  const response = await client
    .api("/security/secureScores")
    .top(1)
    .select("id,currentScore,maxScore,controlScores,createdDateTime,averageComparativeScores")
    .get();
  return response;
}
