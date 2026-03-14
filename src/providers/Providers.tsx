"use client";

import { ThemeProvider } from "./ThemeContext";
import { FluentProviderWrapper } from "./FluentProviderWrapper";
import { MsalProviderWrapper } from "./MsalProviderWrapper";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MsalProviderWrapper>
      <ThemeProvider>
        <FluentProviderWrapper>{children}</FluentProviderWrapper>
      </ThemeProvider>
    </MsalProviderWrapper>
  );
}
