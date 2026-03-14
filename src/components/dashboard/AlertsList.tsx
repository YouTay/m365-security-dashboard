"use client";

import { makeStyles, Text, tokens } from "@fluentui/react-components";
import { Warning24Filled } from "@fluentui/react-icons";
import { SeverityBadge } from "@/components/shared/SeverityBadge";
import { formatRelativeTime } from "@/lib/utils/formatDate";
import type { SecurityAlert } from "@/types/alerts";

const useStyles = makeStyles({
  root: {
    marginTop: "8px",
  },
  title: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "16px",
  },
  titleIcon: {
    color: tokens.colorPaletteRedForeground1,
  },
  alertItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "16px",
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
    marginBottom: "8px",
    transition: "background-color 0.15s ease",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  severityDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    marginTop: "6px",
    flexShrink: 0,
  },
  dotHigh: {
    backgroundColor: "#F44336",
  },
  dotMedium: {
    backgroundColor: "#FF9800",
  },
  dotLow: {
    backgroundColor: "#2196F3",
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontWeight: 600,
    fontSize: "14px",
    marginBottom: "4px",
  },
  alertDescription: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  alertMeta: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "4px",
    flexShrink: 0,
  },
  alertTime: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
});

function getDotClass(severity: string, styles: ReturnType<typeof useStyles>): string {
  if (severity === "high") return styles.dotHigh;
  if (severity === "medium") return styles.dotMedium;
  return styles.dotLow;
}

export function AlertsList({ alerts }: { alerts: SecurityAlert[] }) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <Warning24Filled className={styles.titleIcon} />
        <Text size={500} weight="bold">
          Aktive Sicherheitswarnungen
        </Text>
      </div>

      {alerts.slice(0, 6).map((alert) => (
        <div key={alert.id} className={styles.alertItem}>
          <div
            className={`${styles.severityDot} ${getDotClass(alert.severity, styles)}`}
          />
          <div className={styles.alertContent}>
            <Text className={styles.alertTitle} block>
              {alert.title}
            </Text>
            <Text className={styles.alertDescription}>
              {alert.description}
            </Text>
          </div>
          <div className={styles.alertMeta}>
            <SeverityBadge severity={alert.severity} />
            <Text className={styles.alertTime}>
              {formatRelativeTime(alert.createdDateTime)}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
}
