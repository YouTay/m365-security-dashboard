"use client";

import { makeStyles, Text, tokens } from "@fluentui/react-components";
import { SecurityScoreGauge } from "@/components/dashboard/SecurityScoreGauge";
import { ScoreBreakdown } from "@/components/dashboard/ScoreBreakdown";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { AlertsList } from "@/components/dashboard/AlertsList";
import { SecurityRecommendations } from "@/components/dashboard/SecurityRecommendations";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { DataSourceBanner } from "@/components/shared/DataSourceBanner";
import { NoDataPlaceholder } from "@/components/shared/NoDataPlaceholder";
import { useSecureScore } from "@/hooks/useSecureScore";
import { useAlerts } from "@/hooks/useAlerts";
import { useUsers } from "@/hooks/useUsers";
import { useConditionalAccess } from "@/hooks/useConditionalAccess";
import { useRiskyUsers } from "@/hooks/useRiskyUsers";
import { formatDateTime } from "@/lib/utils/formatDate";
import { useMsal } from "@azure/msal-react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  header: {
    marginBottom: "0px",
  },
  subtitle: {
    color: tokens.colorNeutralForeground3,
    fontSize: "13px",
  },
  topRow: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: "16px",
  },
});

export default function DashboardPage() {
  const styles = useStyles();
  const { accounts } = useMsal();
  const {
    data: scoreData,
    loading: scoreLoading,
    isLive: scoreIsLive,
    isAuthenticated: scoreIsAuth,
    error: scoreError,
  } = useSecureScore();
  const {
    data: alertsData,
    loading: alertsLoading,
    isLive: alertsIsLive,
    isAuthenticated: alertsIsAuth,
    error: alertsError,
  } = useAlerts();
  const { data: usersData } = useUsers();
  const { data: caData } = useConditionalAccess();
  const { data: riskyData } = useRiskyUsers();

  if (scoreLoading || alertsLoading) {
    return <LoadingSpinner />;
  }

  const score = scoreData?.value?.[0];
  const alerts = alertsData?.value || [];

  // Dynamic tenant info
  const tenantDomain = accounts[0]?.username?.split("@")[1] || "Demo Tenant";
  const tenantName = accounts[0] ? tenantDomain : "Contoso GmbH (Demo)";

  // Compute real summary card values from live data
  const mfaDisabled = usersData?.mfaDisabledCount ?? 0;
  const globalAdmins = usersData?.globalAdminCount ?? 0;
  const caPolicies = caData?.enabledCount ?? 0;
  const riskyUsers = riskyData?.value?.length ?? 0;

  return (
    <div className={styles.root}>
      <DataSourceBanner
        isLive={scoreIsLive}
        isAuthenticated={scoreIsAuth}
        error={scoreError}
        label="Secure Score"
      />
      {alertsIsAuth && !alertsIsLive && alertsError && (
        <DataSourceBanner
          isLive={alertsIsLive}
          isAuthenticated={alertsIsAuth}
          error={alertsError}
          label="Alerts"
        />
      )}

      <div className={styles.header}>
        <Text as="h1" size={700} weight="bold" block>
          Security Score Übersicht
        </Text>
        <Text className={styles.subtitle}>
          {score
            ? `Letzte Synchronisierung: ${formatDateTime(score.createdDateTime)} · Tenant: ${tenantName}`
            : `Tenant: ${tenantName}`}
        </Text>
      </div>

      {score ? (
        <div className={styles.topRow}>
          <SecurityScoreGauge
            currentScore={score.currentScore}
            maxScore={score.maxScore}
            trend={8}
          />
          <ScoreBreakdown controlScores={score.controlScores} />
        </div>
      ) : scoreIsAuth ? (
        <NoDataPlaceholder label="Secure Score" errorMessage={scoreError?.message} />
      ) : null}

      <SummaryCards
        mfaDisabled={mfaDisabled}
        globalAdmins={globalAdmins}
        caPolicies={caPolicies}
        riskyUsers={riskyUsers}
      />

      <AlertsList alerts={alerts} />

      <SecurityRecommendations />
    </div>
  );
}
