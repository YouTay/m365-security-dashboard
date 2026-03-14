"use client";

import { Badge } from "@fluentui/react-components";

type Severity = "high" | "medium" | "low" | "informational" | "critical" | "good";

const severityConfig: Record<Severity, { label: string; color: "danger" | "warning" | "success" | "informative" | "important" }> = {
  critical: { label: "KRITISCH", color: "danger" },
  high: { label: "HOCH", color: "important" },
  medium: { label: "MITTEL", color: "warning" },
  low: { label: "NIEDRIG", color: "informative" },
  informational: { label: "INFO", color: "informative" },
  good: { label: "GUT", color: "success" },
};

export function SeverityBadge({ severity }: { severity: string }) {
  const config = severityConfig[severity as Severity] || severityConfig.informational;

  return (
    <Badge size="small" appearance="filled" color={config.color}>
      {config.label}
    </Badge>
  );
}
