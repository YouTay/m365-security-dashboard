"use client";

import { useGraphData } from "./useGraphData";
import { fetchRiskyUsers } from "@/lib/graph/riskyUsers";
import { mockRiskyUsers } from "@/data/mock/riskyUsers";

export function useRiskyUsers() {
  return useGraphData(fetchRiskyUsers, mockRiskyUsers, "RiskyUsers");
}
