import type { SecureScoreResponse } from "@/types/secureScore";

export const mockSecureScore: SecureScoreResponse = {
  value: [
    {
      id: "contoso-gmbh_2026-03-08",
      currentScore: 70,
      maxScore: 100,
      createdDateTime: "2026-03-08T14:32:07Z",
      controlScores: [
        {
          controlCategory: "Identity",
          controlName: "Identity & Access",
          score: 41,
          maxScore: 50,
          description: "MFA, Conditional Access, Passwortrichtlinien",
        },
        {
          controlCategory: "Device",
          controlName: "Geräteverwaltung",
          score: 13,
          maxScore: 20,
          description: "Intune Compliance, Geräterichtlinien",
        },
        {
          controlCategory: "Data",
          controlName: "SharePoint / Data",
          score: 6,
          maxScore: 15,
          description: "DLP, Externe Freigaben, Klassifizierung",
        },
        {
          controlCategory: "Apps",
          controlName: "Exchange / E-Mail",
          score: 11,
          maxScore: 15,
          description: "Anti-Spam, Anti-Phishing, DKIM",
        },
        {
          controlCategory: "Infrastructure",
          controlName: "Defender / Endpoint",
          score: 35,
          maxScore: 40,
          description: "Defender for Endpoint, Bedrohungsschutz",
        },
        {
          controlCategory: "Compliance",
          controlName: "Compliance Center",
          score: 11,
          maxScore: 20,
          description: "Aufbewahrung, eDiscovery, Audit",
        },
      ],
      averageComparativeScores: [
        { basis: "AllTenants", averageScore: 52.3 },
        { basis: "TotalSeats", averageScore: 58.7 },
      ],
    },
  ],
};
