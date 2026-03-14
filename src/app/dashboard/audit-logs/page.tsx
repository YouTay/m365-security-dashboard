"use client";

import { makeStyles, tokens, Text, Badge } from "@fluentui/react-components";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { DataSourceBanner } from "@/components/shared/DataSourceBanner";
import { NoDataPlaceholder } from "@/components/shared/NoDataPlaceholder";
import { useAuditLogs } from "@/hooks/useAuditLogs";
import { formatRelativeTime } from "@/lib/utils/formatDate";
import {
  CheckmarkCircle20Filled,
  DismissCircle20Filled,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
  },
  th: {
    textAlign: "left" as const,
    padding: "10px 12px",
    fontSize: "12px",
    fontWeight: 600,
    color: tokens.colorNeutralForeground3,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  },
  td: {
    padding: "10px 12px",
    fontSize: "13px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke3}`,
    verticalAlign: "top" as const,
  },
  result: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  success: {
    color: tokens.colorPaletteGreenForeground1,
  },
  failure: {
    color: tokens.colorPaletteRedForeground1,
  },
});

export default function AuditLogsPage() {
  const styles = useStyles();
  const { data, loading, isLive, isAuthenticated, error, errorMessage } = useAuditLogs();

  if (loading) return <LoadingSpinner />;

  if (!data && isAuthenticated) {
    return (
      <>
        <DataSourceBanner isLive={isLive} isAuthenticated={isAuthenticated} error={error} label="Audit Logs" />
        <NoDataPlaceholder label="Audit Logs" errorMessage={errorMessage} />
      </>
    );
  }

  const logs = data?.value || [];

  return (
    <>
      <DataSourceBanner isLive={isLive} isAuthenticated={isAuthenticated} error={error} label="Audit Logs" />
      <PageHeader
        title="Audit Logs"
        description={`${logs.length} Einträge gefunden`}
      />

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Zeitpunkt</th>
            <th className={styles.th}>Aktivität</th>
            <th className={styles.th}>Initiiert von</th>
            <th className={styles.th}>Ziel</th>
            <th className={styles.th}>Kategorie</th>
            <th className={styles.th}>Ergebnis</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td className={styles.td}>
                <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                  {formatRelativeTime(log.activityDateTime)}
                </Text>
              </td>
              <td className={styles.td}>
                <Text weight="semibold" size={200}>
                  {log.activityDisplayName}
                </Text>
              </td>
              <td className={styles.td}>
                <Text size={200}>
                  {log.initiatedBy.user?.displayName ||
                    log.initiatedBy.app?.displayName ||
                    "System"}
                </Text>
                {log.initiatedBy.user?.ipAddress && (
                  <Text
                    size={100}
                    block
                    style={{ color: tokens.colorNeutralForeground3 }}
                  >
                    IP: {log.initiatedBy.user.ipAddress}
                  </Text>
                )}
              </td>
              <td className={styles.td}>
                {log.targetResources?.map((target, idx) => (
                  <Text key={idx} size={200} block>
                    {target.displayName}
                  </Text>
                ))}
              </td>
              <td className={styles.td}>
                <Badge size="small" appearance="outline" color="informative">
                  {log.category}
                </Badge>
              </td>
              <td className={styles.td}>
                <div
                  className={`${styles.result} ${
                    log.result === "success" ? styles.success : styles.failure
                  }`}
                >
                  {log.result === "success" ? (
                    <><CheckmarkCircle20Filled /> Erfolgreich</>
                  ) : (
                    <><DismissCircle20Filled /> Fehlgeschlagen</>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
