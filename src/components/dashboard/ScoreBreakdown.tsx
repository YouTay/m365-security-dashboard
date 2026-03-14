"use client";

import { makeStyles, Text, tokens } from "@fluentui/react-components";
import type { ControlScore } from "@/types/secureScore";

const useStyles = makeStyles({
  root: {
    padding: "24px",
    borderRadius: "12px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
    flex: 1,
  },
  title: {
    marginBottom: "20px",
    fontWeight: 600,
  },
  category: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "14px",
  },
  categoryDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  categoryName: {
    width: "180px",
    flexShrink: 0,
    fontSize: "13px",
  },
  progressContainer: {
    flex: 1,
    height: "12px",
    borderRadius: "6px",
    backgroundColor: tokens.colorNeutralBackground4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: "6px",
    transition: "width 0.5s ease",
  },
  scoreText: {
    width: "100px",
    textAlign: "right" as const,
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
    flexShrink: 0,
  },
});

const categoryColors: Record<string, string> = {
  Identity: "#4CAF50",
  Device: "#FF9800",
  Apps: "#FFD700",
  Data: "#F44336",
  Infrastructure: "#4CAF50",
  Compliance: "#F44336",
};

const categoryNames: Record<string, string> = {
  Identity: "Identity & Access",
  Device: "Geräteverwaltung",
  Apps: "Exchange / E-Mail",
  Data: "SharePoint / Data",
  Infrastructure: "Defender / Endpoint",
  Compliance: "Compliance Center",
};

function getBarColor(percentage: number): string {
  if (percentage >= 70) return "#4CAF50";
  if (percentage >= 50) return "#FF9800";
  return "#F44336";
}

interface GroupedCategory {
  category: string;
  score: number;
  maxScore: number;
}

function groupByCategory(controlScores: ControlScore[]): GroupedCategory[] {
  const groups: Record<string, { score: number; maxScore: number }> = {};

  for (const cs of controlScores) {
    const cat = cs.controlCategory || "Other";
    if (!groups[cat]) {
      groups[cat] = { score: 0, maxScore: 0 };
    }
    groups[cat].score += cs.score || 0;
    groups[cat].maxScore += cs.maxScore || 0;
  }

  return Object.entries(groups)
    .map(([category, { score, maxScore }]) => ({
      category,
      score: Math.round(score * 100) / 100,
      maxScore: Math.round(maxScore * 100) / 100,
    }))
    .filter((g) => g.maxScore > 0)
    .sort((a, b) => b.maxScore - a.maxScore);
}

export function ScoreBreakdown({
  controlScores,
}: {
  controlScores: ControlScore[];
}) {
  const styles = useStyles();
  const grouped = groupByCategory(controlScores);

  return (
    <div className={styles.root}>
      <Text className={styles.title} size={400} block>
        Score-Breakdown nach Kategorie
      </Text>

      {grouped.map((g) => {
        const percentage =
          g.maxScore > 0 ? Math.round((g.score / g.maxScore) * 100) : 0;
        const color = getBarColor(percentage);
        const name = categoryNames[g.category] || g.category;
        const dotColor = categoryColors[g.category] || color;

        return (
          <div key={g.category} className={styles.category}>
            <div
              className={styles.categoryDot}
              style={{ backgroundColor: dotColor }}
            />
            <Text className={styles.categoryName}>{name}</Text>
            <div className={styles.progressContainer}>
              <div
                className={styles.progressBar}
                style={{ width: `${percentage}%`, backgroundColor: color }}
              />
            </div>
            <Text className={styles.scoreText}>
              {percentage}% &nbsp; {Math.round(g.score)}/{Math.round(g.maxScore)} Pkt
            </Text>
          </div>
        );
      })}
    </div>
  );
}
