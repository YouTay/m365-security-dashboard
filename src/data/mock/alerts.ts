import type { SecurityAlert } from "@/types/alerts";

const now = new Date();

function minutesAgo(minutes: number): string {
  return new Date(now.getTime() - minutes * 60000).toISOString();
}

export const mockAlerts: SecurityAlert[] = [
  {
    id: "alert-001",
    title: "Verdächtige Anmeldung — anna.mueller@contoso.at",
    description:
      "Anmeldeversuch aus Nigeria (Lagos) erkannt · IP: 197.210.xx.xx · Entra ID Risk: HIGH",
    severity: "high",
    status: "new",
    createdDateTime: minutesAgo(4),
    category: "Identity",
    userStates: [
      { userPrincipalName: "anna.mueller@contoso.at", riskScore: "HIGH" },
    ],
    source: "Entra ID Identity Protection",
    recommendedActions: [
      "Passwort des Benutzers zurücksetzen",
      "MFA erzwingen",
      "Anmeldeprotokolle überprüfen",
    ],
  },
  {
    id: "alert-002",
    title: "Global Admin ohne MFA — michael.bauer@contoso.at",
    description:
      "Privilegiertes Konto ist nicht durch MFA geschützt · Entra ID Rolle: Global Administrator",
    severity: "high",
    status: "new",
    createdDateTime: minutesAgo(60),
    category: "Identity",
    userStates: [{ userPrincipalName: "michael.bauer@contoso.at" }],
    source: "Microsoft Secure Score",
    recommendedActions: [
      "MFA für alle Global Admins aktivieren",
      "Privileged Identity Management einrichten",
      "Notfallzugangskonto erstellen",
    ],
  },
  {
    id: "alert-003",
    title: "SharePoint-Site extern freigegeben — Projektdaten Q1",
    description:
      'Site "Projektdaten-Q1-2026" ist für externe Benutzer freigegeben · 3 externe Gäste aktiv',
    severity: "medium",
    status: "new",
    createdDateTime: minutesAgo(180),
    category: "Data",
    source: "SharePoint Online",
    recommendedActions: [
      "Externe Freigaberichtlinien überprüfen",
      "Gastzugang zeitlich begrenzen",
      "Sensible Daten klassifizieren",
    ],
  },
  {
    id: "alert-004",
    title: "Conditional Access Policy im Report-Only Modus",
    description:
      'Policy "Block Legacy Authentication" ist nicht aktiv (Report-Only) · 23 betroffene Benutzer',
    severity: "medium",
    status: "inProgress",
    createdDateTime: minutesAgo(360),
    category: "Identity",
    source: "Conditional Access",
    recommendedActions: [
      "Policy von Report-Only auf Aktiv umstellen",
      "Auswirkungen im Report-Only Bericht prüfen",
      "Benutzer über Änderung informieren",
    ],
  },
  {
    id: "alert-005",
    title: "Veraltete App-Registrierung mit hohen Berechtigungen",
    description:
      'App "Legacy-CRM-Connector" hat Directory.ReadWrite.All Berechtigung · Letzter Zugriff vor 90 Tagen',
    severity: "medium",
    status: "new",
    createdDateTime: minutesAgo(720),
    category: "Apps",
    source: "App-Berechtigungen",
    recommendedActions: [
      "Ungenutzte App-Registrierung entfernen",
      "Berechtigungen auf Minimum reduzieren",
      "App-Owner kontaktieren",
    ],
  },
  {
    id: "alert-006",
    title: "Unverschlüsselte Geräte in Intune erkannt",
    description:
      "5 von 142 verwalteten Geräten haben keine BitLocker-Verschlüsselung aktiviert",
    severity: "medium",
    status: "new",
    createdDateTime: minutesAgo(1440),
    category: "Device",
    source: "Intune",
    recommendedActions: [
      "BitLocker-Compliance-Richtlinie erstellen",
      "Betroffene Geräte identifizieren",
      "Benutzer zur Verschlüsselung auffordern",
    ],
  },
  {
    id: "alert-007",
    title: "Audit-Protokollierung nicht vollständig aktiviert",
    description:
      "Erweiterte Audit-Protokollierung für Exchange Online ist deaktiviert",
    severity: "low",
    status: "new",
    createdDateTime: minutesAgo(2880),
    category: "Compliance",
    source: "Compliance Center",
    recommendedActions: [
      "Erweiterte Überwachung im Compliance Center aktivieren",
      "Aufbewahrungsrichtlinien konfigurieren",
    ],
  },
];

export const mockAlertsResponse = {
  value: mockAlerts,
};
