"use client";

import { useEffect, useState } from "react";
import type { LeaderboardEntry } from "@/types/leaderboard";

interface UseLeaderboardOptions {
  limit?: number;
  autoFetch?: boolean;
}

export const useLeaderboard = (options: UseLeaderboardOptions = {}) => {
  const { limit, autoFetch = true } = options;
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/leaderboard");
      const data = await response.json();

      if (data.success) {
        const allEntries = data.entries;
        setEntries(limit ? allEntries.slice(0, limit) : allEntries);
      } else {
        setError(data.message || "Failed to load leaderboard");
      }
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setError("Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchLeaderboard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    entries,
    loading,
    error,
    refetch: fetchLeaderboard,
  };
};
