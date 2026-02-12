"use client";

import React, { useEffect, useState } from "react";
import type { LeaderboardEntry } from "@/types/leaderboard";

interface LeaderboardProps {
  fontSize?: number;
  width?: number;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  fontSize = 16,
  width = 400,
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/leaderboard");
      const data = await response.json();

      if (data.success) {
        setEntries(data.entries);
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
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div
        className="flex flex-col items-center p-4 bg-black/50 border-2 border-lime-400"
        style={{ width, fontSize }}
      >
        <div className="font-mono font-bold text-lime-400 mb-4">
          LEADERBOARD
        </div>
        <div className="font-mono text-gray-400 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex flex-col items-center p-4 bg-black/50 border-2 border-red-400"
        style={{ width, fontSize }}
      >
        <div className="font-mono font-bold text-red-400 mb-4">LEADERBOARD</div>
        <div className="font-mono text-red-400 text-center">{error}</div>
        <button
          onClick={fetchLeaderboard}
          className="mt-4 px-4 py-2 font-mono text-sm bg-lime-400 text-black hover:bg-lime-300"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col p-4 bg-black/50 border-2 border-lime-400"
      style={{ width, fontSize }}
    >
      <div className="font-mono font-bold text-lime-400 text-center mb-4">
        🏆 TOP 10 LEADERBOARD 🏆
      </div>

      {entries.length === 0 ? (
        <div className="font-mono text-gray-400 text-center py-4">
          No scores yet. Be the first!
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map((entry, index) => (
            <div
              key={entry.id}
              className={`flex justify-between items-center px-3 py-2 font-mono ${
                index === 0
                  ? "bg-yellow-400/20 text-yellow-400 font-bold"
                  : index === 1
                    ? "bg-gray-300/20 text-gray-300"
                    : index === 2
                      ? "bg-orange-400/20 text-orange-400"
                      : "bg-lime-400/10 text-lime-400"
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="w-8 text-right">
                  {index === 0
                    ? "🥇"
                    : index === 1
                      ? "🥈"
                      : index === 2
                        ? "🥉"
                        : `${index + 1}.`}
                </span>
                <span className="font-bold tracking-wide">
                  {entry.playerName}
                </span>
              </div>
              <span className="font-bold tabular-nums">
                {entry.score.toString().padStart(3, "0")}
              </span>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={fetchLeaderboard}
        className="mt-4 px-4 py-2 font-mono text-sm bg-lime-400/20 text-lime-400 hover:bg-lime-400/30 border border-lime-400"
      >
        Refresh
      </button>
    </div>
  );
};

export default Leaderboard;
