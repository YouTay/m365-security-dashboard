"use client";

import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
} from "@fluentui/react-components";
import { useThemeMode } from "./ThemeContext";

export function FluentProviderWrapper({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeMode();
  const theme = mode === "dark" ? webDarkTheme : webLightTheme;

  return (
    <FluentProvider
      theme={theme}
      style={{ backgroundColor: "transparent", minHeight: "100vh" }}
    >
      {children}
    </FluentProvider>
  );
}
