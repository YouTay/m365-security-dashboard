"use client";

import { useGraphData } from "./useGraphData";
import { fetchDevices } from "@/lib/graph/devices";
import { mockDevices } from "@/data/mock/devices";

export function useDevices() {
  return useGraphData(fetchDevices, mockDevices, "Devices");
}
