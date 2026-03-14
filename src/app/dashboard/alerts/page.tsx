"use client";

import { makeStyles, tokens, Text, Badge } from "@fluentui/react-components";
import { PageHeader } from "@/components/shared/PageHeader";
import { SeverityBadge } from "@/components/shared/SeverityBadge";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { DataSourceBanner } from "@/components/shared/DataSourceBanner";
import { NoDataPlaceholder } from "@/components/shared/NoDataPlaceholder";
import { useAlerts } from "@/hooks/useAlerts";
import { formatRelativeTime, formatDateTime } from "@/lib/utils/formatDate";
import {
  CheckmarkCircle24Regular,
  DismissCircle24Regular,
  ArrowClockwise24Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  filters: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
  },
  alertCard: {
    padding: "20px",
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
    marginBottom: "12px",
  },
  alertHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  alertTitle: {
    fontWeight: 600,
    fontSize: "15px",
  },
  alertMeta: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  alertDescription: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground3,
    marginBottom: "12px",
  },
  alertFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recommendations: {
    marginTop: "12px",
    padding: "12px",
    borderRadius: "6px",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  recTitle: {
    fontWeight: 600,
    fontSize: "12px",
    marginBottom: "8px",
    color: tokens.colorNeutralForeground2,
  },
  recItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    marginBottom: "4px",
    color: tokens.colorNeutralForeground2,
  },
  recIcon: {
    color: tokens.colorBrandForeground1,
    fontSize: "16px",
  },
  source: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  statusIcon: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
});

export default function AlertsPage() {
  const styles = useStyles();
  const { data, loading, isLive, isAuthenticated, error, errorMessage } = useAlerts();

  if (loading) return <LoadingSpinner />;

  if (!data && isAuthenticated) {
    return (
      <>
        <DataSourceBanner isLive={isLive} isAuthenticated={isAuthenticated} error={error} label="Alerts" />
        <NoDataPlaceholder label="Sicherheitswarnungen" errorMessage={errorMessage} />
      </>
    );
  }

  const alerts = data?.value || [];

  return (
    <>
      <DataSourceBanner isLive={isLive} isAuthenticated={isAuthenticated} error={error} label="Alerts" />
      <PageHeader
        title="Sicherheitswarnungen"
        description={`${alerts.length} aktive Warnungen gefunden`}
      />

      {alerts.map((alert) => (
        <div key={alert.id} className={styles.alertCard}>
          <div className={styles.alertHeader}>
            <Text className={styles.alertTitle}>{alert.title}</Text>
            <div className={styles.alertMeta}>
              <SeverityBadge severity={alert.severity} />
              <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                {formatRelativeTime(alert.createdDateTime)}
              </Text>
            </div>
          </div>

          <Text className={styles.alertDescription} block>
            {alert.description}
          </Text>

          {alert.recommendedActions && alert.recommendedActions.length > 0 && (
            <div className={styles.recommendations}>
              <div className={styles.recTitle}>Empfohlene Maßnahmen:</div>
              {alert.recommendedActions.map((action, idx) => (
                <div key={idx} className={styles.recItem}>
                  <CheckmarkCircle24Regular className={styles.recIcon} />
                  {action}
                </div>
              ))}
            </div>
          )}

          <div className={styles.alertFooter} style={{ marginTop: "12px" }}>
            <Text className={styles.source}>
              Quelle: {alert.source || "Microsoft Security"}
            </Text>
            <div className={styles.statusIcon}>
              {alert.status === "new" ? (
                <><DismissCircle24Regular /> Offen</>
              ) : (
                <><ArrowClockwise24Regular /> In Bearbeitung</>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
