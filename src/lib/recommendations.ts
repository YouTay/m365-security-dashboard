import type { UsersResponse } from "@/types/users";
import type { SecureScoreResponse } from "@/types/secureScore";
import type { ConditionalAccessResponse } from "@/types/conditionalAccess";
import type { RiskyUsersResponse } from "@/types/riskyUsers";
import type { DevicesResponse } from "@/types/devices";
import type { AlertsResponse } from "@/types/alerts";

export type Priority = "high" | "medium" | "low";
export type RecommendationCategory =
  | "identity"
  | "device"
  | "access"
  | "threat"
  | "compliance";

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  category: RecommendationCategory;
  impact: string;
  action: string;
  link?: string;
}

interface AnalysisData {
  users?: UsersResponse | null;
  secureScore?: SecureScoreResponse | null;
  conditionalAccess?: ConditionalAccessResponse | null;
  riskyUsers?: RiskyUsersResponse | null;
  devices?: DevicesResponse | null;
  alerts?: AlertsResponse | null;
}

export function generateRecommendations(data: AnalysisData): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // --- MFA Analysis ---
  if (data.users) {
    const { mfaDisabledCount, totalCount, globalAdminCount } = data.users;
    const mfaRate = totalCount > 0 ? ((totalCount - mfaDisabledCount) / totalCount) * 100 : 100;

    if (mfaDisabledCount > 0) {
      recommendations.push({
        id: "mfa-coverage",
        title: `${mfaDisabledCount} Benutzer ohne MFA-Schutz`,
        description: `Nur ${mfaRate.toFixed(0)}% der Benutzer haben Multi-Faktor-Authentifizierung aktiviert. Konten ohne MFA sind 99,9% anfälliger für Kompromittierung.`,
        priority: mfaDisabledCount > 5 ? "high" : "medium",
        category: "identity",
        impact: `${mfaDisabledCount} ungeschützte Konten`,
        action: "MFA für alle Benutzer über Conditional Access erzwingen",
        link: "https://portal.azure.com/#view/Microsoft_AAD_ConditionalAccess/ConditionalAccessBlade/~/Overview",
      });
    }

    // --- Global Admin Analysis ---
    if (globalAdminCount > 2) {
      recommendations.push({
        id: "too-many-admins",
        title: `${globalAdminCount} Global Admins — Microsoft empfiehlt max. 2`,
        description: `Zu viele Global Admins erhöhen die Angriffsfläche. Jedes dieser Konten hat vollen Zugriff auf alle Dienste und Daten.`,
        priority: globalAdminCount > 4 ? "high" : "medium",
        category: "identity",
        impact: `${globalAdminCount - 2} überzählige Admin-Konten`,
        action: "Rollen auf spezifische Administratorrollen (z.B. Exchange Admin, User Admin) herunterstufen",
        link: "https://portal.azure.com/#view/Microsoft_AAD_IAM/RolesManagementMenuBlade/~/AllRoles",
      });
    }

    // Check for admins without MFA
    const adminsWithoutMfa = data.users.value.filter(
      (u) => u.isAdmin && !u.mfaEnabled
    );
    if (adminsWithoutMfa.length > 0) {
      recommendations.push({
        id: "admin-no-mfa",
        title: `${adminsWithoutMfa.length} Admin(s) ohne MFA — Kritisches Risiko`,
        description: `Privilegierte Konten ohne MFA sind das häufigste Einfallstor für Angreifer. Diese Konten müssen sofort geschützt werden: ${adminsWithoutMfa.map((u) => u.displayName).join(", ")}.`,
        priority: "high",
        category: "identity",
        impact: "Vollständige Tenant-Kompromittierung möglich",
        action: "Sofort MFA für alle Admin-Konten aktivieren",
        link: "https://portal.azure.com/#view/Microsoft_AAD_ConditionalAccess/ConditionalAccessBlade/~/Policies",
      });
    }
  }

  // --- Conditional Access Analysis ---
  if (data.conditionalAccess) {
    const { enabledCount, reportOnlyCount, disabledCount, totalCount } = data.conditionalAccess;

    if (totalCount === 0) {
      recommendations.push({
        id: "no-ca-policies",
        title: "Keine Conditional Access Policies konfiguriert",
        description: "Ohne Conditional Access Policies gibt es keine risikobasierte Zugriffskontrolle. Jeder kann sich von überall anmelden.",
        priority: "high",
        category: "access",
        impact: "Kein bedingter Zugriffs-Schutz",
        action: "Basis-Policies erstellen: MFA erzwingen, Legacy-Auth blockieren, Standort-basierte Regeln",
        link: "https://portal.azure.com/#view/Microsoft_AAD_ConditionalAccess/ConditionalAccessBlade/~/Policies",
      });
    }

    if (reportOnlyCount > 0) {
      recommendations.push({
        id: "ca-report-only",
        title: `${reportOnlyCount} CA-Policies im Report-Only Modus`,
        description: `Diese Policies protokollieren nur, blockieren aber keine Zugriffe. Prüfen Sie die Ergebnisse und aktivieren Sie die Policies.`,
        priority: "medium",
        category: "access",
        impact: `${reportOnlyCount} Policies bieten keinen aktiven Schutz`,
        action: "Report-Only Policies nach Testphase auf 'Enabled' umstellen",
      });
    }

    if (disabledCount > 0) {
      recommendations.push({
        id: "ca-disabled",
        title: `${disabledCount} CA-Policies deaktiviert`,
        description: `Deaktivierte Policies könnten vergessene Sicherheitsregeln sein. Überprüfen Sie, ob diese noch benötigt werden.`,
        priority: "low",
        category: "access",
        impact: `${disabledCount} inaktive Sicherheitsregeln`,
        action: "Deaktivierte Policies prüfen — aktivieren oder löschen",
      });
    }

    // Check for legacy auth blocking
    const hasLegacyAuthBlock = data.conditionalAccess.value.some(
      (p) =>
        p.state === "enabled" &&
        p.grantControls?.builtInControls.includes("block")
    );
    if (!hasLegacyAuthBlock && enabledCount > 0) {
      recommendations.push({
        id: "no-legacy-block",
        title: "Legacy-Authentifizierung nicht blockiert",
        description: "Ältere Protokolle (IMAP, POP3, SMTP) unterstützen kein MFA und sind ein häufiger Angriffsvektor.",
        priority: "high",
        category: "access",
        impact: "MFA kann durch Legacy-Protokolle umgangen werden",
        action: "CA-Policy erstellen, die Legacy-Authentifizierung blockiert",
        link: "https://portal.azure.com/#view/Microsoft_AAD_ConditionalAccess/ConditionalAccessBlade/~/Policies",
      });
    }
  }

  // --- Risky Users Analysis ---
  if (data.riskyUsers) {
    const risky = data.riskyUsers.value;
    const highRisk = risky.filter((u) => u.riskLevel === "high");
    const mediumRisk = risky.filter((u) => u.riskLevel === "medium");

    if (highRisk.length > 0) {
      recommendations.push({
        id: "high-risk-users",
        title: `${highRisk.length} Benutzer mit HOHEM Risiko erkannt`,
        description: `Diese Konten zeigen Anzeichen aktiver Kompromittierung: ${highRisk.map((u) => u.userDisplayName).join(", ")}. Sofortige Maßnahmen erforderlich.`,
        priority: "high",
        category: "threat",
        impact: "Mögliche aktive Kompromittierung",
        action: "Passwort zurücksetzen, Sessions beenden, MFA erzwingen, Anmeldeprotokolle prüfen",
        link: "https://portal.azure.com/#view/Microsoft_AAD_IAM/IdentityProtectionMenuBlade/~/RiskyUsers",
      });
    }

    if (mediumRisk.length > 0) {
      recommendations.push({
        id: "medium-risk-users",
        title: `${mediumRisk.length} Benutzer mit mittlerem Risiko`,
        description: `Verdächtige Aktivitäten erkannt. Überprüfen Sie die Anmeldeprotokolle dieser Benutzer.`,
        priority: "medium",
        category: "threat",
        impact: "Potenzielle Sicherheitsvorfälle",
        action: "Anmeldeprotokolle prüfen und ggf. Passwort-Reset erzwingen",
      });
    }
  }

  // --- Device Compliance Analysis ---
  if (data.devices) {
    const { nonCompliantCount, totalCount } = data.devices;

    if (nonCompliantCount > 0) {
      const nonCompliantRate = totalCount > 0 ? (nonCompliantCount / totalCount) * 100 : 0;
      recommendations.push({
        id: "non-compliant-devices",
        title: `${nonCompliantCount} Geräte nicht compliant (${nonCompliantRate.toFixed(0)}%)`,
        description: `Nicht-konforme Geräte erfüllen nicht die Sicherheitsanforderungen (Verschlüsselung, OS-Version, Firewall etc.).`,
        priority: nonCompliantRate > 30 ? "high" : "medium",
        category: "device",
        impact: `${nonCompliantCount} unsichere Geräte haben Zugriff`,
        action: "Compliance-Policies in Intune prüfen und Zugriff für nicht-konforme Geräte per CA-Policy einschränken",
        link: "https://intune.microsoft.com/#view/Microsoft_Intune_DeviceSettings/DevicesMenu/~/compliance",
      });
    }

    // Unencrypted devices
    const unencrypted = data.devices.value.filter((d) => !d.isEncrypted);
    if (unencrypted.length > 0) {
      recommendations.push({
        id: "unencrypted-devices",
        title: `${unencrypted.length} Geräte ohne Festplattenverschlüsselung`,
        description: `Unverschlüsselte Geräte setzen Unternehmensdaten bei Diebstahl oder Verlust einem Risiko aus.`,
        priority: unencrypted.length > 3 ? "high" : "medium",
        category: "device",
        impact: `${unencrypted.length} Geräte mit Datenverlust-Risiko`,
        action: "BitLocker (Windows) / FileVault (macOS) über Intune-Policy erzwingen",
      });
    }
  }

  // --- Secure Score Analysis ---
  if (data.secureScore) {
    const score = data.secureScore.value?.[0];
    if (score) {
      const percentage = (score.currentScore / score.maxScore) * 100;

      if (percentage < 50) {
        recommendations.push({
          id: "low-secure-score",
          title: `Secure Score nur ${percentage.toFixed(0)}% — Deutlich unter Durchschnitt`,
          description: `Ihr Microsoft Secure Score liegt bei ${score.currentScore}/${score.maxScore}. Ein Score unter 50% weist auf erhebliche Sicherheitslücken hin.`,
          priority: "high",
          category: "compliance",
          impact: "Zahlreiche Sicherheitsmaßnahmen nicht umgesetzt",
          action: "Secure Score Empfehlungen im Microsoft 365 Defender Portal umsetzen",
          link: "https://security.microsoft.com/securescore",
        });
      } else if (percentage < 70) {
        recommendations.push({
          id: "medium-secure-score",
          title: `Secure Score bei ${percentage.toFixed(0)}% — Verbesserungspotenzial`,
          description: `Ihr Score liegt bei ${score.currentScore}/${score.maxScore}. Mit gezielten Maßnahmen können Sie den Score deutlich verbessern.`,
          priority: "medium",
          category: "compliance",
          impact: "Einige Sicherheitsmaßnahmen noch offen",
          action: "Top-Empfehlungen im Secure Score Dashboard umsetzen",
          link: "https://security.microsoft.com/securescore",
        });
      }

      // Low category scores
      const lowCategories = score.controlScores.filter(
        (c) => c.maxScore > 0 && (c.score / c.maxScore) * 100 < 40
      );
      if (lowCategories.length > 0) {
        recommendations.push({
          id: "weak-categories",
          title: `${lowCategories.length} Sicherheitskategorien unter 40%`,
          description: `Schwache Bereiche: ${lowCategories.map((c) => `${c.controlCategory} (${((c.score / c.maxScore) * 100).toFixed(0)}%)`).join(", ")}`,
          priority: "medium",
          category: "compliance",
          impact: "Gezielte Schwachstellen in bestimmten Bereichen",
          action: "Fokus auf die schwächsten Kategorien legen",
        });
      }
    }
  }

  // --- Active Alerts Analysis ---
  if (data.alerts) {
    const alerts = data.alerts.value;
    const highSeverity = alerts.filter(
      (a) => a.severity === "high" && a.status !== "resolved"
    );

    if (highSeverity.length > 0) {
      recommendations.push({
        id: "unresolved-high-alerts",
        title: `${highSeverity.length} ungelöste High-Severity Alerts`,
        description: `Es gibt ${highSeverity.length} schwerwiegende Sicherheitswarnungen, die noch nicht bearbeitet wurden.`,
        priority: "high",
        category: "threat",
        impact: "Aktive Sicherheitsbedrohungen",
        action: "Alerts im Microsoft 365 Defender Portal sofort untersuchen",
        link: "https://security.microsoft.com/alerts",
      });
    }
  }

  // Sort by priority: high > medium > low
  const priorityOrder: Record<Priority, number> = { high: 0, medium: 1, low: 2 };
  recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return recommendations;
}
