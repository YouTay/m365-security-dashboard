"use client";

import { useGraphData } from "./useGraphData";
import { fetchAuditLogs } from "@/lib/graph/auditLogs";
import { mockAuditLogs } from "@/data/mock/auditLogs";

export function useAuditLogs() {
  return useGraphData(fetchAuditLogs, mockAuditLogs, "AuditLogs");
}
