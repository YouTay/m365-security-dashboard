"use client";

import { makeStyles, tokens, Text, Avatar, Badge } from "@fluentui/react-components";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { DataSourceBanner } from "@/components/shared/DataSourceBanner";
import { NoDataPlaceholder } from "@/components/shared/NoDataPlaceholder";
import { useUsers } from "@/hooks/useUsers";
import {
  ShieldCheckmark20Filled,
  ShieldDismiss20Filled,
  Warning20Filled,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  summary: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    marginBottom: "24px",
  },
  summaryCard: {
    padding: "20px",
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
    textAlign: "center" as const,
  },
  section: {
    marginBottom: "24px",
  },
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
    fontWeight: 600,
  },
  userRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 12px",
    borderRadius: "6px",
    border: `1px solid ${tokens.colorNeutralStroke3}`,
    backgroundColor: tokens.colorNeutralBackground2,
    marginBottom: "6px",
  },
  userInfo: {
    flex: 1,
  },
  mfaMethods: {
    display: "flex",
    gap: "6px",
  },
});

export default function MfaStatusPage() {
  const styles = useStyles();
  const { data, loading, isLive, isAuthenticated, error, errorMessage } = useUsers();

  if (loading) return <LoadingSpinner />;
  if (!data) {
    return (
      <>
        <DataSourceBanner isLive={isLive} isAuthenticated={isAuthenticated} error={error} label="MFA Status" />
        <NoDataPlaceholder label="MFA Status" errorMessage={errorMessage} />
      </>
    );
  }

  const usersWithoutMfa = data.value.filter((u) => !u.mfaEnabled);
  const usersWithMfa = data.value.filter((u) => u.mfaEnabled);
  const percentage = Math.round(
    (data.mfaEnabledCount / data.totalCount) * 100
  );

  return (
    <>
      <PageHeader
        title="MFA Status"
        description="Übersicht der Multi-Faktor-Authentifizierung aller Benutzer"
      />

      <div className={styles.summary}>
        <div className={styles.summaryCard}>
          <Text size={800} weight="bold" block style={{ color: "#4CAF50" }}>
            {percentage}%
          </Text>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
            MFA-Abdeckung
          </Text>
        </div>
        <div className={styles.summaryCard}>
          <Text size={800} weight="bold" block style={{ color: "#4CAF50" }}>
            {data.mfaEnabledCount}
          </Text>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
            MFA aktiviert
          </Text>
        </div>
        <div className={styles.summaryCard}>
          <Text size={800} weight="bold" block style={{ color: "#F44336" }}>
            {data.mfaDisabledCount}
          </Text>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
            MFA deaktiviert
          </Text>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <ShieldDismiss20Filled style={{ color: "#F44336" }} />
          <Text size={400} weight="semibold">
            Benutzer ohne MFA ({usersWithoutMfa.length})
          </Text>
          <Badge size="small" color="danger">Aktion erforderlich</Badge>
        </div>
        {usersWithoutMfa.map((user) => (
          <div key={user.id} className={styles.userRow}>
            <Avatar name={user.displayName} size={28} />
            <div className={styles.userInfo}>
              <Text weight="semibold" size={200} block>
                {user.displayName}
              </Text>
              <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>
                {user.userPrincipalName}
              </Text>
            </div>
            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
              {user.department || "—"}
            </Text>
            {user.isAdmin && (
              <Badge size="small" color="danger" icon={<Warning20Filled />}>
                Admin ohne MFA!
              </Badge>
            )}
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <ShieldCheckmark20Filled style={{ color: "#4CAF50" }} />
          <Text size={400} weight="semibold">
            Benutzer mit MFA ({usersWithMfa.length})
          </Text>
        </div>
        {usersWithMfa.map((user) => (
          <div key={user.id} className={styles.userRow}>
            <Avatar name={user.displayName} size={28} />
            <div className={styles.userInfo}>
              <Text weight="semibold" size={200} block>
                {user.displayName}
              </Text>
              <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>
                {user.userPrincipalName}
              </Text>
            </div>
            <div className={styles.mfaMethods}>
              {user.mfaMethods?.map((method) => (
                <Badge key={method} size="small" appearance="outline" color="success">
                  {method}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
