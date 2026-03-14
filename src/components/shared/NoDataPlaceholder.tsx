"use client";

import { makeStyles, tokens, Text } from "@fluentui/react-components";
import { CloudDismiss24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 24px",
    textAlign: "center",
    gap: "12px",
    borderRadius: "8px",
    border: `1px dashed ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground3,
  },
  icon: {
    fontSize: "40px",
    color: tokens.colorNeutralForeground3,
  },
  hint: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground3,
    maxWidth: "400px",
  },
});

interface NoDataPlaceholderProps {
  label: string;
  errorMessage?: string | null;
}

export function NoDataPlaceholder({ label, errorMessage }: NoDataPlaceholderProps) {
  const styles = useStyles();

  let hint = "Dieses Feature benötigt eine entsprechende Microsoft 365 Lizenz (Business Premium, E3 oder E5).";
  if (errorMessage?.includes("not provisioned")) {
    hint = "Dein Tenant hat den benötigten Service nicht aktiviert. Du brauchst Microsoft 365 Business Premium, E3 oder E5.";
  } else if (errorMessage?.includes("Forbidden") || errorMessage?.includes("403")) {
    hint = "Fehlende Berechtigung. Bitte prüfe die API-Berechtigungen in der Azure App Registration und erteile Admin-Consent.";
  }

  return (
    <div className={styles.root}>
      <CloudDismiss24Regular className={styles.icon} />
      <Text size={400} weight="semibold">
        Keine {label}-Daten verfügbar
      </Text>
      <Text className={styles.hint}>{hint}</Text>
    </div>
  );
}
