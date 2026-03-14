"use client";

import {
  makeStyles,
  Text,
  tokens,
  Badge,
  Button,
  Tooltip,
  Spinner,
} from "@fluentui/react-components";
import {
  Lightbulb24Regular,
  ShieldCheckmark20Regular,
  PersonLock20Regular,
  Laptop20Regular,
  LockClosed20Regular,
  Warning20Regular,
  ArrowRight16Regular,
  Open16Regular,
} from "@fluentui/react-icons";
import {
  generateRecommendations,
  type Recommendation,
  type Priority,
  type RecommendationCategory,
} from "@/lib/recommendations";
import { useSecureScore } from "@/hooks/useSecureScore";
import { useUsers } from "@/hooks/useUsers";
import { useConditionalAccess } from "@/hooks/useConditionalAccess";
import { useRiskyUsers } from "@/hooks/useRiskyUsers";
import { useDevices } from "@/hooks/useDevices";
import { useAlerts } from "@/hooks/useAlerts";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    paddingBottom: "8px",
    borderBottom: `2px solid ${tokens.colorBrandBackground}`,
  },
  headerIcon: {
    color: tokens.colorBrandForeground1,
    fontSize: "24px",
  },
  headerBadge: {
    marginLeft: "auto",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  card: {
    padding: "16px",
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    transition: "box-shadow 0.15s ease",
    ":hover": {
      boxShadow: tokens.shadow4,
    },
  },
  cardHigh: {
    borderLeft: `4px solid ${tokens.colorPaletteRedBorderActive}`,
  },
  cardMedium: {
    borderLeft: `4px solid ${tokens.colorPaletteDarkOrangeBorderActive}`,
  },
  cardLow: {
    borderLeft: `4px solid ${tokens.colorPaletteYellowBorderActive}`,
  },
  cardTop: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },
  categoryIcon: {
    flexShrink: 0,
    marginTop: "2px",
    fontSize: "20px",
  },
  categoryIdentity: {
    color: tokens.colorPaletteBlueForeground2,
  },
  categoryDevice: {
    color: tokens.colorPaletteTealForeground2,
  },
  categoryAccess: {
    color: tokens.colorPalettePurpleForeground2,
  },
  categoryThreat: {
    color: tokens.colorPaletteRedForeground2,
  },
  categoryCompliance: {
    color: tokens.colorPaletteDarkOrangeForeground2,
  },
  cardContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  cardTitle: {
    fontWeight: 600,
    fontSize: "14px",
  },
  cardDescription: {
    color: tokens.colorNeutralForeground3,
    fontSize: "13px",
    lineHeight: "18px",
  },
  cardMeta: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  impactTag: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  actionRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    paddingTop: "8px",
    borderTop: `1px solid ${tokens.colorNeutralStroke3}`,
  },
  actionText: {
    fontSize: "13px",
    color: tokens.colorBrandForeground1,
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  summary: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "8px",
  },
  summaryItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 12px",
    borderRadius: "6px",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  summaryCount: {
    fontWeight: 700,
    fontSize: "18px",
  },
  summaryCountHigh: {
    color: tokens.colorPaletteRedForeground1,
  },
  summaryCountMedium: {
    color: tokens.colorPaletteDarkOrangeForeground1,
  },
  summaryCountLow: {
    color: tokens.colorPaletteYellowForeground1,
  },
  summaryLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px",
  },
  emptyState: {
    textAlign: "center",
    padding: "24px",
    color: tokens.colorNeutralForeground3,
  },
});

const categoryIcons: Record<RecommendationCategory, React.ReactNode> = {
  identity: <PersonLock20Regular />,
  device: <Laptop20Regular />,
  access: <LockClosed20Regular />,
  threat: <Warning20Regular />,
  compliance: <ShieldCheckmark20Regular />,
};

const priorityBadge: Record<Priority, { color: "danger" | "warning" | "important"; label: string }> = {
  high: { color: "danger", label: "HOCH" },
  medium: { color: "warning", label: "MITTEL" },
  low: { color: "important", label: "NIEDRIG" },
};

export function SecurityRecommendations() {
  const styles = useStyles();

  const { data: users, loading: usersLoading } = useUsers();
  const { data: secureScore, loading: scoreLoading } = useSecureScore();
  const { data: ca, loading: caLoading } = useConditionalAccess();
  const { data: risky, loading: riskyLoading } = useRiskyUsers();
  const { data: devices, loading: devicesLoading } = useDevices();
  const { data: alerts, loading: alertsLoading } = useAlerts();

  const anyLoading = usersLoading || scoreLoading || caLoading || riskyLoading || devicesLoading || alertsLoading;

  if (anyLoading) {
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <Lightbulb24Regular className={styles.headerIcon} />
          <Text size={500} weight="bold">AI Security Empfehlungen</Text>
        </div>
        <div className={styles.loading}>
          <Spinner size="small" label="Analysiere Tenant-Daten..." />
        </div>
      </div>
    );
  }

  const recommendations = generateRecommendations({
    users,
    secureScore,
    conditionalAccess: ca,
    riskyUsers: risky,
    devices,
    alerts,
  });

  const highCount = recommendations.filter((r) => r.priority === "high").length;
  const mediumCount = recommendations.filter((r) => r.priority === "medium").length;
  const lowCount = recommendations.filter((r) => r.priority === "low").length;

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Lightbulb24Regular className={styles.headerIcon} />
        <Text size={500} weight="bold">AI Security Empfehlungen</Text>
        <div className={styles.headerBadge}>
          <Badge size="medium" appearance="filled" color="brand">
            {recommendations.length} Empfehlungen
          </Badge>
        </div>
      </div>

      {recommendations.length === 0 ? (
        <div className={styles.emptyState}>
          <ShieldCheckmark20Regular />
          <Text block>Keine Empfehlungen — Ihre Sicherheitskonfiguration sieht gut aus!</Text>
        </div>
      ) : (
        <>
          <div className={styles.summary}>
            <div className={styles.summaryItem}>
              <Text className={`${styles.summaryCount} ${styles.summaryCountHigh}`}>
                {highCount}
              </Text>
              <Text className={styles.summaryLabel}>Hoch</Text>
            </div>
            <div className={styles.summaryItem}>
              <Text className={`${styles.summaryCount} ${styles.summaryCountMedium}`}>
                {mediumCount}
              </Text>
              <Text className={styles.summaryLabel}>Mittel</Text>
            </div>
            <div className={styles.summaryItem}>
              <Text className={`${styles.summaryCount} ${styles.summaryCountLow}`}>
                {lowCount}
              </Text>
              <Text className={styles.summaryLabel}>Niedrig</Text>
            </div>
          </div>

          <div className={styles.list}>
            {recommendations.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} styles={styles} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function RecommendationCard({
  recommendation: rec,
  styles,
}: {
  recommendation: Recommendation;
  styles: ReturnType<typeof useStyles>;
}) {
  const priorityClass = {
    high: styles.cardHigh,
    medium: styles.cardMedium,
    low: styles.cardLow,
  }[rec.priority];

  const categoryClass = {
    identity: styles.categoryIdentity,
    device: styles.categoryDevice,
    access: styles.categoryAccess,
    threat: styles.categoryThreat,
    compliance: styles.categoryCompliance,
  }[rec.category];

  const badge = priorityBadge[rec.priority];

  return (
    <div className={`${styles.card} ${priorityClass}`}>
      <div className={styles.cardTop}>
        <span className={`${styles.categoryIcon} ${categoryClass}`}>
          {categoryIcons[rec.category]}
        </span>
        <div className={styles.cardContent}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Text className={styles.cardTitle}>{rec.title}</Text>
            <Badge size="small" appearance="filled" color={badge.color}>
              {badge.label}
            </Badge>
          </div>
          <Text className={styles.cardDescription}>{rec.description}</Text>
        </div>
      </div>

      <div className={styles.actionRow}>
        <span className={styles.actionText}>
          <ArrowRight16Regular />
          {rec.action}
        </span>
        {rec.link && (
          <Tooltip content="Im Azure Portal öffnen" relationship="label">
            <Button
              size="small"
              appearance="subtle"
              icon={<Open16Regular />}
              as="a"
              href={rec.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Öffnen
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
