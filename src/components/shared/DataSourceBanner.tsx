"use client";

import {
  makeStyles,
  tokens,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  banner: {
    marginBottom: tokens.spacingVerticalM,
  },
});

interface DataSourceBannerProps {
  isLive: boolean;
  isAuthenticated: boolean;
  error: Error | null;
  label: string;
}

export function DataSourceBanner({
  isLive,
  isAuthenticated,
  error,
  label,
}: DataSourceBannerProps) {
  const styles = useStyles();

  if (isLive) {
    return (
      <MessageBar intent="success" className={styles.banner}>
        <MessageBarBody>
          <MessageBarTitle>Live-Daten</MessageBarTitle>
          {label}-Daten werden live aus deinem Microsoft-Tenant geladen.
        </MessageBarBody>
      </MessageBar>
    );
  }

  if (isAuthenticated && error) {
    const message = error.message || "";
    let hint = "Unbekannter Fehler beim Laden der Daten.";

    if (message.includes("not provisioned")) {
      hint =
        "Dein Tenant hat keinen Microsoft Defender aktiviert. Du benötigst Microsoft 365 E3/E5 oder Defender for Office 365.";
    } else if (message.includes("premium license")) {
      hint =
        "Dein Tenant benötigt Azure AD P1/P2 Lizenz für dieses Feature. Verfügbar in Microsoft 365 Business Premium, E3 oder E5.";
    } else if (message.includes("Forbidden") || message.includes("403")) {
      hint =
        "Fehlende Berechtigung. Bitte prüfe die API-Berechtigungen in der Azure App Registration und erteile Admin-Consent.";
    }

    return (
      <MessageBar intent="warning" className={styles.banner}>
        <MessageBarBody>
          <MessageBarTitle>Nicht verfügbar ({label})</MessageBarTitle>
          {hint}
        </MessageBarBody>
      </MessageBar>
    );
  }

  if (!isAuthenticated) {
    return (
      <MessageBar intent="info" className={styles.banner}>
        <MessageBarBody>
          <MessageBarTitle>Demo-Modus</MessageBarTitle>
          Melde dich an, um echte Daten aus deinem Microsoft-Tenant zu sehen.
        </MessageBarBody>
      </MessageBar>
    );
  }

  return null;
}
