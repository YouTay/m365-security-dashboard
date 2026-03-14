"use client";

import { makeStyles, tokens, Text, Badge, Avatar } from "@fluentui/react-components";
import { PageHeader } from "@/components/shared/PageHeader";
import { SeverityBadge } from "@/components/shared/SeverityBadge";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { DataSourceBanner } from "@/components/shared/DataSourceBanner";
import { NoDataPlaceholder } from "@/components/shared/NoDataPlaceholder";
import { useRiskyUsers } from "@/hooks/useRiskyUsers";
import { formatRelativeTime } from "@/lib/utils/formatDate";

const useStyles = makeStyles({
  card: {
    padding: "20px",
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
    marginBottom: "12px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  },
  cardInfo: {
    flex: 1,
  },
  riskDetail: {
    padding: "12px",
    borderRadius: "6px",
    backgroundColor: tokens.colorNeutralBackground3,
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "12px",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
});

function riskLevelToSeverity(riskLevel: string): string {
  switch (riskLevel) {
    case "high": return "high";
    case "medium": return "medium";
    case "low": return "low";
    default: return "informational";
  }
}

export default function RiskyUsersPage() {
  const styles = useStyles();
  const { data, loading, isLive, isAuthenticated, error, errorMessage } = useRiskyUsers();

  if (loading) return <LoadingSpinner />;

  if (!data && isAuthenticated) {
    return (
      <>
        <DataSourceBanner isLive={isLive} isAuthenticated={isAuthenticated} error={error} label="Risiko-Benutzer" />
        <NoDataPlaceholder label="Risiko-Benutzer" errorMessage={errorMessage} />
      </>
    );
  }

  const users = data?.value || [];

  return (
    <>
      <DataSourceBanner isLive={isLive} isAuthenticated={isAuthenticated} error={error} label="Risiko-Benutzer" />
      <PageHeader
        title="Risiko-Benutzer"
        description={`${users.length} Benutzer mit erhöhtem Risiko erkannt`}
      />

      {users.map((user) => (
        <div key={user.id} className={styles.card}>
          <div className={styles.cardHeader}>
            <Avatar name={user.userDisplayName} size={40} />
            <div className={styles.cardInfo}>
              <Text weight="bold" size={400} block>
                {user.userDisplayName}
              </Text>
              <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                {user.userPrincipalName}
              </Text>
            </div>
            <SeverityBadge severity={riskLevelToSeverity(user.riskLevel)} />
          </div>

          <div className={styles.riskDetail}>{user.riskDetail}</div>

          <div className={styles.cardFooter}>
            <span>
              Status:{" "}
              <Badge size="small" appearance="outline" color="warning">
                {user.riskState === "atRisk" ? "Gefährdet" : user.riskState}
              </Badge>
            </span>
            <span>
              Letzte Aktualisierung: {formatRelativeTime(user.riskLastUpdatedDateTime)}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}
