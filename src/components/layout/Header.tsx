"use client";

import {
  makeStyles,
  tokens,
  Text,
  Badge,
  Avatar,
  Button,
  Tooltip,
} from "@fluentui/react-components";
import {
  WeatherMoon24Regular,
  WeatherSunny24Regular,
  SignOut24Regular,
  PersonCircle24Regular,
} from "@fluentui/react-icons";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "@/lib/msal/scopes";
import { useThemeMode } from "@/providers/ThemeContext";

const useStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "12px",
    padding: "12px 24px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
    minHeight: "56px",
  },
  liveBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  liveDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    animation: "pulse 2s infinite",
  },
  liveDotGreen: {
    backgroundColor: tokens.colorPaletteGreenBackground3,
  },
  liveDotOrange: {
    backgroundColor: tokens.colorPaletteYellowBackground3,
  },
  tenant: {
    padding: "4px 12px",
    borderRadius: "4px",
    backgroundColor: tokens.colorNeutralBackground3,
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
});

export function Header() {
  const styles = useStyles();
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const { mode, toggle } = useThemeMode();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch(console.error);
  };

  const handleLogout = () => {
    instance.logoutRedirect().catch(console.error);
  };

  const userName = accounts[0]?.name || "Demo-Benutzer";
  const tenantName = isAuthenticated
    ? accounts[0]?.username?.split("@")[1] || "Tenant"
    : "contoso.onmicrosoft.com";

  return (
    <header className={styles.header}>
      <div className={styles.liveBadge}>
        <div
          className={`${styles.liveDot} ${
            isAuthenticated ? styles.liveDotGreen : styles.liveDotOrange
          }`}
        />
        <Badge
          size="small"
          appearance="outline"
          color={isAuthenticated ? "success" : "warning"}
        >
          {isAuthenticated ? "LIVE" : "DEMO"}
        </Badge>
      </div>

      <div className={styles.tenant}>{tenantName}</div>

      <Tooltip
        content={mode === "dark" ? "Light Mode" : "Dark Mode"}
        relationship="label"
      >
        <Button
          appearance="subtle"
          icon={mode === "dark" ? <WeatherSunny24Regular /> : <WeatherMoon24Regular />}
          onClick={toggle}
          size="small"
        />
      </Tooltip>

      {isAuthenticated ? (
        <div className={styles.userSection}>
          <Avatar
            name={userName}
            size={32}
            color="brand"
          />
          <Tooltip content="Abmelden" relationship="label">
            <Button
              appearance="subtle"
              icon={<SignOut24Regular />}
              onClick={handleLogout}
              size="small"
            />
          </Tooltip>
        </div>
      ) : (
        <Button
          appearance="primary"
          icon={<PersonCircle24Regular />}
          onClick={handleLogin}
          size="small"
        >
          Anmelden
        </Button>
      )}
    </header>
  );
}
