"use client";

import {
  makeStyles,
  tokens,
  Text,
  Badge,
  Avatar,
} from "@fluentui/react-components";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { DataSourceBanner } from "@/components/shared/DataSourceBanner";
import { NoDataPlaceholder } from "@/components/shared/NoDataPlaceholder";
import { useUsers } from "@/hooks/useUsers";
import {
  ShieldCheckmark20Filled,
  ShieldDismiss20Filled,
  PersonKey20Filled,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
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
  statValue: {
    fontSize: "28px",
    fontWeight: 700,
  },
  statLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
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
  userCell: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  mfaEnabled: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    color: tokens.colorPaletteGreenForeground1,
    fontSize: "13px",
  },
  mfaDisabled: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    color: tokens.colorPaletteRedForeground1,
    fontSize: "13px",
  },
  adminBadge: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px",
  },
});

export default function UsersPage() {
  const styles = useStyles();
  const { data, loading, isLive, isAuthenticated, error, errorMessage } = useUsers();

  if (loading) return <LoadingSpinner />;
  if (!data) {
    return (
      <>
        <DataSourceBanner isLive={isLive} isAuthenticated={isAuthenticated} error={error} label="Benutzer" />
        <NoDataPlaceholder label="Benutzer" errorMessage={errorMessage} />
      </>
    );
  }

  return (
    <>
      <DataSourceBanner isLive={isLive} isAuthenticated={isAuthenticated} error={error} label="Benutzer" />
      <PageHeader
        title="Benutzer & Rollen"
        description={`${data.totalCount} Benutzer im Tenant`}
      />

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <Text className={styles.statValue} block>{data.totalCount}</Text>
          <Text className={styles.statLabel}>Gesamt-Benutzer</Text>
        </div>
        <div className={styles.statCard}>
          <Text className={styles.statValue} block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {data.mfaEnabledCount}
          </Text>
          <Text className={styles.statLabel}>MFA aktiviert</Text>
        </div>
        <div className={styles.statCard}>
          <Text className={styles.statValue} block style={{ color: tokens.colorPaletteRedForeground1 }}>
            {data.mfaDisabledCount}
          </Text>
          <Text className={styles.statLabel}>MFA deaktiviert</Text>
        </div>
        <div className={styles.statCard}>
          <Text className={styles.statValue} block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            {data.globalAdminCount}
          </Text>
          <Text className={styles.statLabel}>Global Admins</Text>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Benutzer</th>
            <th className={styles.th}>Abteilung</th>
            <th className={styles.th}>MFA</th>
            <th className={styles.th}>Rollen</th>
          </tr>
        </thead>
        <tbody>
          {data.value.map((user) => (
            <tr key={user.id}>
              <td className={styles.td}>
                <div className={styles.userCell}>
                  <Avatar name={user.displayName} size={28} />
                  <div>
                    <Text weight="semibold" size={200} block>
                      {user.displayName}
                    </Text>
                    <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>
                      {user.userPrincipalName}
                    </Text>
                  </div>
                </div>
              </td>
              <td className={styles.td}>
                <Text size={200}>{user.department || "—"}</Text>
              </td>
              <td className={styles.td}>
                {user.mfaEnabled ? (
                  <div className={styles.mfaEnabled}>
                    <ShieldCheckmark20Filled /> Aktiviert
                  </div>
                ) : (
                  <div className={styles.mfaDisabled}>
                    <ShieldDismiss20Filled /> Deaktiviert
                  </div>
                )}
              </td>
              <td className={styles.td}>
                {user.isAdmin ? (
                  <div className={styles.adminBadge}>
                    <PersonKey20Filled style={{ color: tokens.colorPaletteYellowForeground1 }} />
                    {user.adminRoles?.map((role) => (
                      <Badge key={role} size="small" appearance="outline" color="warning">
                        {role}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                    Standardbenutzer
                  </Text>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
