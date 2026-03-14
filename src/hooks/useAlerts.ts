"use client";

import { useGraphData } from "./useGraphData";
import { fetchAlerts } from "@/lib/graph/alerts";
import { mockAlertsResponse } from "@/data/mock/alerts";

export function useAlerts() {
  return useGraphData(fetchAlerts, mockAlertsResponse, "Alerts");
}
