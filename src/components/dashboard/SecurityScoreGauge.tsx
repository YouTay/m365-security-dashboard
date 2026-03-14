"use client";

import { makeStyles, Text, tokens } from "@fluentui/react-components";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const useStyles = makeStyles({
  root: {
    padding: "24px",
    borderRadius: "12px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: "16px",
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
    color: tokens.colorNeutralForeground3,
    fontSize: "11px",
    fontWeight: 600,
  },
  gaugeContainer: {
    position: "relative",
    width: "200px",
    height: "200px",
  },
  scoreOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
  scoreNumber: {
    fontSize: "48px",
    fontWeight: 700,
    lineHeight: 1,
  },
  scoreMax: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground3,
  },
  trend: {
    marginTop: "16px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "13px",
  },
  trendPositive: {
    color: tokens.colorPaletteGreenForeground1,
  },
});

function getScoreColor(percentage: number): string {
  if (percentage >= 70) return "#4CAF50";
  if (percentage >= 40) return "#FF9800";
  return "#F44336";
}

export function SecurityScoreGauge({
  currentScore,
  maxScore,
  trend,
}: {
  currentScore: number;
  maxScore: number;
  trend?: number;
}) {
  const styles = useStyles();
  const percentage = Math.round((currentScore / maxScore) * 100);
  const color = getScoreColor(percentage);

  const data = [
    { name: "Score", value: currentScore },
    { name: "Remaining", value: maxScore - currentScore },
  ];

  return (
    <div className={styles.root}>
      <div className={styles.title}>Microsoft Secure Score</div>

      <div className={styles.gaugeContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={color} />
              <Cell fill={tokens.colorNeutralStroke2} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className={styles.scoreOverlay}>
          <div className={styles.scoreNumber} style={{ color }}>
            {percentage}
          </div>
          <div className={styles.scoreMax}>/ 100</div>
        </div>
      </div>

      {trend !== undefined && (
        <div className={`${styles.trend} ${trend > 0 ? styles.trendPositive : ""}`}>
          <Text size={200}>
            {trend > 0 ? "↑" : "↓"} {trend > 0 ? "+" : ""}
            {trend} Punkte letzte 30 Tage
          </Text>
        </div>
      )}
    </div>
  );
}
