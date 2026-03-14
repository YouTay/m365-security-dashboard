"use client";

import { makeStyles, Text, tokens, Badge } from "@fluentui/react-components";
import {
  ShieldKeyhole24Regular,
  PersonKey24Regular,
  ShieldLock24Regular,
  PersonWarning24Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
  },
  card: {
    padding: "20px",
    borderRadius: "12px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardIcon: {
    fontSize: "20px",
    color: tokens.colorNeutralForeground3,
  },
  cardValue: {
    fontSize: "36px",
    fontWeight: 700,
    lineHeight: 1.1,
  },
  cardLabel: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground3,
  },
  cardTrend: {
    fontSize: "12px",
    marginTop: "4px",
  },
  trendNegative: {
    color: tokens.colorPaletteRedForeground1,
  },
  trendPositive: {
    color: tokens.colorPaletteGreenForeground1,
  },
  trendNeutral: {
    color: tokens.colorNeutralForeground3,
  },
});

interface SummaryCard {
  icon: React.ReactNode;
  value: number;
  label: string;
  trend: string;
  trendType: "positive" | "negative" | "neutral";
  severity: "danger" | "warning" | "success" | "important";
  severityLabel: string;
}

export function SummaryCards({
  mfaDisabled,
  globalAdmins,
  caPolicies,
  riskyUsers,
}: {
  mfaDisabled: number;
  globalAdmins: number;
  caPolicies: number;
  riskyUsers: number;
}) {
  const styles = useStyles();

  const cards: SummaryCard[] = [
    {
      icon: <ShieldKeyhole24Regular />,
      value: mfaDisabled,
      label: "Benutzer ohne MFA",
      trend: "↑ 3 neue seit gestern",
      trendType: "negative",
      severity: "danger",
      severityLabel: "KRITISCH",
    },
    {
      icon: <PersonKey24Regular />,
      value: globalAdmins,
      label: "Global Admins aktiv",
      trend: "↑ Microsoft empfiehlt max. 2",
      trendType: "negative",
      severity: "warning",
      severityLabel: "WARNUNG",
    },
    {
      icon: <ShieldLock24Regular />,
      value: caPolicies,
      label: "CA-Policies aktiv",
      trend: "↓ 2 in Report-Only Modus",
      trendType: "neutral",
      severity: "success",
      severityLabel: "GUT",
    },
    {
      icon: <PersonWarning24Regular />,
      value: riskyUsers,
      label: "Risiko-Benutzer (Entra ID)",
      trend: "↑ Sofortige Maßnahme nötig",
      trendType: "negative",
      severity: "danger",
      severityLabel: "KRITISCH",
    },
  ];

  return (
    <div className={styles.root}>
      {cards.map((card) => (
        <div key={card.label} className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon}>{card.icon}</span>
            <Badge size="small" appearance="filled" color={card.severity}>
              {card.severityLabel}
            </Badge>
          </div>
          <Text className={styles.cardValue}>{card.value}</Text>
          <Text className={styles.cardLabel}>{card.label}</Text>
          <Text
            className={`${styles.cardTrend} ${
              card.trendType === "negative"
                ? styles.trendNegative
                : card.trendType === "positive"
                ? styles.trendPositive
                : styles.trendNeutral
            }`}
          >
            {card.trend}
          </Text>
        </div>
      ))}
    </div>
  );
}
