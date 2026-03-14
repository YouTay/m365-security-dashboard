"use client";

import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "@/lib/msal/msalInstance";

export function MsalProviderWrapper({ children }: { children: React.ReactNode }) {
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}
