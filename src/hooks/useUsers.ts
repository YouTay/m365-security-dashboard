"use client";

import { useGraphData } from "./useGraphData";
import { fetchUsers } from "@/lib/graph/users";
import { mockUsers } from "@/data/mock/users";

export function useUsers() {
  return useGraphData(fetchUsers, mockUsers, "Users");
}
