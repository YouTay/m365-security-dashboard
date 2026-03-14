"use client";

import { makeStyles, tokens, Text, Badge } from "@fluentui/react-components";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { DataSourceBanner } from "@/components/shared/DataSourceBanner";
import { NoDataPlaceholder } from "@/components/shared/NoDataPlaceholder";
import { useConditionalAccess } from "@/hooks/useConditionalAccess";
import {
  CheckmarkCircle24Filled,
  ErrorCircle24Filled,
  Warning24Filled,
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
  policyCard: {
    padding: "16px",
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
    marginBottom: "8px",
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },
  stateIcon: {
    marginTop: "2px",
    fontSize: "20px",
  },
  policyContent: {
    flex: 1,
  },
  policyName: {
    fontWeight: 600,
    fontSize: "14px",
    marginBottom: "4px",
  },
  policyDesc: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground3,
    marginBottom: "8px",
  },
  policyMeta: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap" as const,
  },
});

function getStateConfig(state: string) {
  switch (state) {
    case "enabled":
      return {
        icon: <CheckmarkCircle24Filled style={{ color: "#4CAF50" }} />,
        label: "Aktiv",
        color: "success" as const,
      };
    case "enabledForReportingButNotEnforced":
      return {
        icon: <Warning24Filled style={{ color: "#FF9800" }} />,
        label: "Report-Only",
        color: "warning" as const,
      };
    case "disabled":
      return {
        icon: <ErrorCircle24Filled style={{ color: "#F44336" }} />,
        label: "Deaktiviert",
        color: "danger" as const,
      };
    default:
      return {
        icon: <ErrorCircle24Filled />,
        label: state,
        color: "informative" as const,
      };
  }
}

export default function ConditionalAccessPage() {
  const styles = useStyles();
  const { data, loading, isLive, isAuthenticated, error, errorMessage } = useConditionalAccess();

  if (loading) return <LoadingSpinner />;
  if (!data) {
    return (
      <>
        <DataSourceBanner isLive={isLive} isAuthenticated={isAuthenticated} error={error} label="Conditional Access" />
        <NoDataPlaceholder label="Conditional Access" errorMessage={errorMessage} />
      </>
    );
  }

  return (
    <>
      <DataSourceBanner isLive={isLive} isAuthenticated={isAuthenticated} error={error} label="Conditional Access" />
      <PageHeader
        title="Conditional Access Policies"
        description={`${data.totalCount} Policies konfiguriert`}
      />

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <Text size={800} weight="bold" block style={{ color: "#4CAF50" }}>
            {data.enabledCount}
          </Text>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
            Aktiv
          </Text>
        </div>
        <div className={styles.statCard}>
          <Text size={800} weight="bold" block style={{ color: "#FF9800" }}>
            {data.reportOnlyCount}
          </Text>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
            Report-Only
          </Text>
        </div>
        <div className={styles.statCard}>
          <Text size={800} weight="bold" block style={{ color: "#F44336" }}>
            {data.disabledCount}
          </Text>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
            Deaktiviert
          </Text>
        </div>
      </div>

      {data.value.map((policy) => {
        const stateConfig = getStateConfig(policy.state);
        return (
          <div key={policy.id} className={styles.policyCard}>
            <span className={styles.stateIcon}>{stateConfig.icon}</span>
            <div className={styles.policyContent}>
              <Text className={styles.policyName} block>
                {policy.displayName}
              </Text>
              <Text className={styles.policyDesc} block>
                {policy.description}
              </Text>
              <div className={styles.policyMeta}>
                <Badge size="small" appearance="outline" color={stateConfig.color}>
                  {stateConfig.label}
                </Badge>
                {policy.grantControls?.builtInControls.map((control) => (
                  <Badge key={control} size="small" appearance="tint" color="informative">
                    {control}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
