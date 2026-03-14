import type { AuditLogsResponse } from "@/types/auditLogs";

const now = new Date();
function hoursAgo(hours: number): string {
  return new Date(now.getTime() - hours * 3600000).toISOString();
}

export const mockAuditLogs: AuditLogsResponse = {
  value: [
    {
      id: "log-001",
      createdDateTime: hoursAgo(0.5),
      activityDisplayName: "Benutzeranmeldung",
      activityDateTime: hoursAgo(0.5),
      category: "SignInLogs",
      result: "success",
      initiatedBy: {
        user: {
          displayName: "Stefan Huber",
          userPrincipalName: "stefan.huber@contoso.at",
          ipAddress: "82.150.xx.xx",
        },
      },
      targetResources: [{ displayName: "Azure Portal", type: "Application" }],
      loggedByService: "Entra ID",
    },
    {
      id: "log-002",
      createdDateTime: hoursAgo(1),
      activityDisplayName: "Fehlgeschlagene Anmeldung",
      activityDateTime: hoursAgo(1),
      category: "SignInLogs",
      result: "failure",
      initiatedBy: {
        user: {
          displayName: "Anna Müller",
          userPrincipalName: "anna.mueller@contoso.at",
          ipAddress: "197.210.xx.xx",
        },
      },
      targetResources: [{ displayName: "Microsoft 365", type: "Application" }],
      loggedByService: "Entra ID",
    },
    {
      id: "log-003",
      createdDateTime: hoursAgo(2),
      activityDisplayName: "Conditional Access Policy geändert",
      activityDateTime: hoursAgo(2),
      category: "Policy",
      result: "success",
      initiatedBy: {
        user: {
          displayName: "Thomas Schneider",
          userPrincipalName: "thomas.schneider@contoso.at",
        },
      },
      targetResources: [
        { displayName: "Block Legacy Authentication", type: "Policy" },
      ],
      loggedByService: "Conditional Access",
    },
    {
      id: "log-004",
      createdDateTime: hoursAgo(3),
      activityDisplayName: "Benutzer erstellt",
      activityDateTime: hoursAgo(3),
      category: "UserManagement",
      result: "success",
      initiatedBy: {
        user: {
          displayName: "Michael Bauer",
          userPrincipalName: "michael.bauer@contoso.at",
        },
      },
      targetResources: [
        { displayName: "neuer.mitarbeiter@contoso.at", type: "User" },
      ],
      loggedByService: "Entra ID",
    },
    {
      id: "log-005",
      createdDateTime: hoursAgo(5),
      activityDisplayName: "App-Berechtigung erteilt",
      activityDateTime: hoursAgo(5),
      category: "ApplicationManagement",
      result: "success",
      initiatedBy: {
        user: {
          displayName: "Sarah Weber",
          userPrincipalName: "sarah.weber@contoso.at",
        },
      },
      targetResources: [
        { displayName: "Projektmanagement-App", type: "Application" },
      ],
      loggedByService: "Entra ID",
    },
    {
      id: "log-006",
      createdDateTime: hoursAgo(8),
      activityDisplayName: "Passwort zurückgesetzt",
      activityDateTime: hoursAgo(8),
      category: "UserManagement",
      result: "success",
      initiatedBy: {
        user: {
          displayName: "Stefan Huber",
          userPrincipalName: "stefan.huber@contoso.at",
        },
      },
      targetResources: [
        { displayName: "lisa.hoffmann@contoso.at", type: "User" },
      ],
      loggedByService: "Entra ID",
    },
    {
      id: "log-007",
      createdDateTime: hoursAgo(12),
      activityDisplayName: "Externe Freigabe erstellt",
      activityDateTime: hoursAgo(12),
      category: "SharePointFileOperation",
      result: "success",
      initiatedBy: {
        user: {
          displayName: "Markus Gruber",
          userPrincipalName: "markus.gruber@contoso.at",
        },
      },
      targetResources: [
        { displayName: "Projektdaten-Q1-2026", type: "Site" },
      ],
      loggedByService: "SharePoint Online",
    },
    {
      id: "log-008",
      createdDateTime: hoursAgo(24),
      activityDisplayName: "Geräte-Compliance-Status geändert",
      activityDateTime: hoursAgo(24),
      category: "DeviceManagement",
      result: "success",
      initiatedBy: {
        app: { displayName: "Microsoft Intune" },
      },
      targetResources: [
        { displayName: "DESKTOP-FW05", type: "Device" },
      ],
      loggedByService: "Intune",
    },
  ],
};
