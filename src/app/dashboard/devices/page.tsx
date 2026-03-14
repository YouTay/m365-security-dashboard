"use client";

import { makeStyles, tokens, Text, Badge } from "@fluentui/react-components";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { DataSourceBanner } from "@/components/shared/DataSourceBanner";
import { NoDataPlaceholder } from "@/components/shared/NoDataPlaceholder";
import { useDevices } from "@/hooks/useDevices";
import { formatRelativeTime } from "@/lib/utils/formatDate";
import {
  CheckmarkCircle20Filled,
  DismissCircle20Filled,
  LockClosed20Regular,
  LockOpen20Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    marginBottom: "24px",
  },
  statCard: {
    padding: "16px",
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
    textAlign: "center" as const,
  },
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
  },
  compliant: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    color: tokens.colorPaletteGreenForeground1,
  },
  nonCompliant: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    color: tokens.colorPaletteRedForeground1,
  },
  encrypted: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
});

export default function DevicesPage() {
  const styles = useStyles();
  const { data, loading, isLive, isAuthenticated, error, errorMessage } = useDevices();

  if (loading) return <LoadingSpinner />;
  if (!data) {
    return (
      <>
        <DataSourceBanner isLive={isLive} isAuthenticated={isAuthenticated} error={error} label="Geräte" />
        <NoDataPlaceholder label="Geräte" errorMessage={errorMessage} />
      </>
    );
  }

  return (
    <>
      <DataSourceBanner isLive={isLive} isAuthenticated={isAuthenticated} error={error} label="Geräte" />
      <PageHeader
        title="Intune Geräte"
        description={`${data.totalCount} verwaltete Geräte`}
      />

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <Text size={800} weight="bold" block>{data.totalCount}</Text>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Gesamt</Text>
        </div>
        <div className={styles.statCard}>
          <Text size={800} weight="bold" block style={{ color: "#4CAF50" }}>
            {data.compliantCount}
          </Text>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Konform</Text>
        </div>
        <div className={styles.statCard}>
          <Text size={800} weight="bold" block style={{ color: "#F44336" }}>
            {data.nonCompliantCount}
          </Text>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
            Nicht konform
          </Text>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Gerät</th>
            <th className={styles.th}>Benutzer</th>
            <th className={styles.th}>OS</th>
            <th className={styles.th}>Compliance</th>
            <th className={styles.th}>Verschlüsselt</th>
            <th className={styles.th}>Letzte Sync</th>
          </tr>
        </thead>
        <tbody>
          {data.value.map((device) => (
            <tr key={device.id}>
              <td className={styles.td}>
                <Text weight="semibold" size={200} block>{device.deviceName}</Text>
                <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>
                  {device.manufacturer} {device.model}
                </Text>
              </td>
              <td className={styles.td}>
                <Text size={200}>{device.userDisplayName}</Text>
              </td>
              <td className={styles.td}>
                <Badge size="small" appearance="outline" color="informative">
                  {device.operatingSystem} {device.osVersion}
                </Badge>
              </td>
              <td className={styles.td}>
                {device.complianceState === "compliant" ? (
                  <div className={styles.compliant}>
                    <CheckmarkCircle20Filled /> Konform
                  </div>
                ) : (
                  <div className={styles.nonCompliant}>
                    <DismissCircle20Filled /> Nicht konform
                  </div>
                )}
              </td>
              <td className={styles.td}>
                <div
                  className={styles.encrypted}
                  style={{
                    color: device.isEncrypted
                      ? tokens.colorPaletteGreenForeground1
                      : tokens.colorPaletteRedForeground1,
                  }}
                >
                  {device.isEncrypted ? (
                    <><LockClosed20Regular /> Ja</>
                  ) : (
                    <><LockOpen20Regular /> Nein</>
                  )}
                </div>
              </td>
              <td className={styles.td}>
                <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                  {formatRelativeTime(device.lastSyncDateTime)}
                </Text>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
