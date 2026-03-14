"use client";

import { useGraphData } from "./useGraphData";
import { fetchSecureScores } from "@/lib/graph/secureScore";
import { mockSecureScore } from "@/data/mock/secureScore";

export function useSecureScore() {
  return useGraphData(fetchSecureScores, mockSecureScore, "SecureScore");
}
