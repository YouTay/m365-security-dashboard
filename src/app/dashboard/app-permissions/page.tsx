"use client";

import { makeStyles, tokens, Text, Badge } from "@fluentui/react-components";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  Warning20Filled,
  CheckmarkCircle20Filled,
  AppGeneric20Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  appCard: {
    padding: "16px",
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  appIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    backgroundColor: tokens.colorNeutralBackground4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  appInfo: {
    flex: 1,
  },
  permissions: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap" as const,
    marginTop: "4px",
  },
  risk: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    flexShrink: 0,
  },
});

const mockApps = [
  {
    id: "app-001",
    name: "Outlook Mobile",
    publisher: "Microsoft",
    permissions: ["Mail.ReadWrite", "Calendars.ReadWrite", "Contacts.Read"],
    riskLevel: "low",
    lastUsed: "Heute",
  },
  {
    id: "app-002",
    name: "Legacy-CRM-Connector",
    publisher: "Intern",
    permissions: ["Directory.ReadWrite.All", "User.ReadWrite.All", "Group.ReadWrite.All"],
    riskLevel: "high",
    lastUsed: "Vor 90 Tagen",
  },
  {
    id: "app-003",
    name: "Teams Bot - Helpdesk",
    publisher: "Contoso GmbH",
    permissions: ["User.Read", "Team.ReadBasic.All"],
    riskLevel: "low",
    lastUsed: "Gestern",
  },
  {
    id: "app-004",
    name: "SharePoint Migration Tool",
    publisher: "Extern",
    permissions: ["Sites.FullControl.All", "Files.ReadWrite.All"],
    riskLevel: "high",
    lastUsed: "Vor 45 Tagen",
  },
  {
    id: "app-005",
    name: "Zoom Meetings",
    publisher: "Zoom Video Communications",
    permissions: ["Calendars.Read", "User.Read"],
    riskLevel: "low",
    lastUsed: "Heute",
  },
  {
    id: "app-006",
    name: "Backup Service v2",
    publisher: "Intern",
    permissions: ["Mail.Read", "Files.Read.All", "Sites.Read.All"],
    riskLevel: "medium",
    lastUsed: "Vor 7 Tagen",
  },
];

export default function AppPermissionsPage() {
  const styles = useStyles();

  const highRiskApps = mockApps.filter((a) => a.riskLevel === "high");
  const otherApps = mockApps.filter((a) => a.riskLevel !== "high");

  return (
    <>
      <PageHeader
        title="App-Berechtigungen"
        description={`${mockApps.length} registrierte Apps · ${highRiskApps.length} mit hohem Risiko`}
      />

      {[...highRiskApps, ...otherApps].map((app) => (
        <div key={app.id} className={styles.appCard}>
          <div className={styles.appIcon}>
            <AppGeneric20Regular />
          </div>
          <div className={styles.appInfo}>
            <Text weight="semibold" size={300} block>
              {app.name}
            </Text>
            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
              {app.publisher} · Zuletzt verwendet: {app.lastUsed}
            </Text>
            <div className={styles.permissions}>
              {app.permissions.map((perm) => (
                <Badge
                  key={perm}
                  size="small"
                  appearance="outline"
                  color={
                    perm.includes("Write") || perm.includes("FullControl")
                      ? "danger"
                      : "informative"
                  }
                >
                  {perm}
                </Badge>
              ))}
            </div>
          </div>
          <div className={styles.risk}>
            {app.riskLevel === "high" ? (
              <Badge size="small" color="danger" icon={<Warning20Filled />}>
                Hohes Risiko
              </Badge>
            ) : app.riskLevel === "medium" ? (
              <Badge size="small" color="warning">
                Mittleres Risiko
              </Badge>
            ) : (
              <Badge size="small" color="success" icon={<CheckmarkCircle20Filled />}>
                Niedriges Risiko
              </Badge>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
