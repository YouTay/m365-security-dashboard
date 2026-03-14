"use client";

import { useGraphData } from "./useGraphData";
import { fetchConditionalAccessPolicies } from "@/lib/graph/conditionalAccess";
import { mockConditionalAccess } from "@/data/mock/conditionalAccess";

export function useConditionalAccess() {
  return useGraphData(fetchConditionalAccessPolicies, mockConditionalAccess, "ConditionalAccess");
}
