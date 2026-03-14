"use client";

import { useState, useEffect, useCallback } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { createGraphClient } from "@/lib/graph/graphClient";
import type { Client } from "@microsoft/microsoft-graph-client";

interface UseGraphDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  isLive: boolean;
  isAuthenticated: boolean;
  errorMessage: string | null;
  refetch: () => void;
}

export function useGraphData<T>(
  fetcher: (client: Client) => Promise<T>,
  mockData: T,
  label?: string
): UseGraphDataResult<T> {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isLive, setIsLive] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      if (isAuthenticated && accounts[0]) {
        const tag = label || fetcher.name || "unknown";
        console.log(`[Graph:${tag}] Authenticated as:`, accounts[0].username, "- fetching live data...");
        const client = createGraphClient(instance, accounts[0]);
        const result = await fetcher(client);
        console.log(`[Graph:${tag}] ✅ Live data fetched successfully`);
        setData(result);
        setError(null);
        setIsLive(true);
      } else {
        console.log("[Graph] Not authenticated, using mock data");
        setData(mockData);
        setIsLive(false);
      }
    } catch (err) {
      const tag = label || fetcher.name || "unknown";
      const message = (err as Error).message || "Unknown error";
      console.error(`[Graph:${tag}] ❌ API call failed:`, message);
      setError(err as Error);
      // When authenticated: show null (no mock mixing). When not auth: impossible path.
      setData(null);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, accounts, fetcher, mockData, instance, label]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    data,
    loading,
    error,
    isLive,
    isAuthenticated,
    errorMessage: error?.message || null,
    refetch: load,
  };
}
