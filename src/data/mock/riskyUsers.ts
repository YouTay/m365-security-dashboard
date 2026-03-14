import type { RiskyUsersResponse } from "@/types/riskyUsers";

export const mockRiskyUsers: RiskyUsersResponse = {
  value: [
    {
      id: "ru-001",
      userDisplayName: "Anna Müller",
      userPrincipalName: "anna.mueller@contoso.at",
      riskLevel: "high",
      riskState: "atRisk",
      riskLastUpdatedDateTime: "2026-03-08T14:28:00Z",
      riskDetail: "Verdächtiger Anmeldeversuch aus Nigeria (Lagos) erkannt. IP-Adresse stimmt nicht mit üblichen Standorten überein.",
      isDeleted: false,
    },
    {
      id: "ru-002",
      userDisplayName: "Felix Wagner",
      userPrincipalName: "felix.wagner@contoso.at",
      riskLevel: "medium",
      riskState: "atRisk",
      riskLastUpdatedDateTime: "2026-03-07T09:15:00Z",
      riskDetail: "Anmeldung von anonymer IP-Adresse erkannt. Möglicher VPN/Tor-Nutzung.",
      isDeleted: false,
    },
    {
      id: "ru-003",
      userDisplayName: "Sandra Eder",
      userPrincipalName: "sandra.eder@contoso.at",
      riskLevel: "low",
      riskState: "atRisk",
      riskLastUpdatedDateTime: "2026-03-06T16:45:00Z",
      riskDetail: "Ungewöhnliches Anmeldemuster erkannt. Anmeldung außerhalb der üblichen Geschäftszeiten.",
      isDeleted: false,
    },
  ],
};
