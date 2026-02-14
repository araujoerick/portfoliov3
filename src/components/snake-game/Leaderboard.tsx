"use client";

import React from "react";
import { RefreshCwIcon } from "lucide-react";
import { useLeaderboard } from "@/hooks/useLeaderboard";

interface LeaderboardProps {
  fontSize?: number;
  width?: number;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  fontSize = 16,
  width = 400,
}) => {
  const { entries, loading, error, refetch } = useLeaderboard();

  if (loading) {
    return (
      <div
        className="flex flex-col items-center border-2 border-neutral-700 bg-neutral-900/80 p-4 backdrop-blur-sm"
        style={{ width, fontSize }}
      >
        <div className="mb-4 font-mono font-bold text-emerald-400">
          LEADERBOARD
        </div>
        <div className="animate-pulse font-mono text-neutral-400">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex flex-col items-center border-2 border-red-500/50 bg-neutral-900/80 p-4 backdrop-blur-sm"
        style={{ width, fontSize }}
      >
        <div className="mb-4 font-mono font-bold text-red-400">LEADERBOARD</div>
        <div className="text-center font-mono text-red-400">{error}</div>
        <button
          onClick={refetch}
          className="mt-4 border border-emerald-500/50 bg-emerald-500/20 px-4 py-2 font-mono text-sm text-emerald-400 transition-all hover:bg-emerald-500/30"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div
      className="relative flex flex-col overflow-hidden border-2 border-neutral-700 bg-neutral-900/80 backdrop-blur-sm"
      style={{ width, fontSize }}
    >
      {/* Header */}
      <div
        className="relative border-b border-neutral-700/50 bg-neutral-800/60 py-2 text-center font-mono font-bold text-emerald-400"
        style={{ fontSize: fontSize * 1.1 }}
      >
        <span className="text-yellow-400">🏆</span> TOP 10{" "}
        <span className="text-yellow-400">🏆</span>
      </div>

      {/* Refresh Button */}
      <button
        onClick={refetch}
        className="absolute top-2.5 right-3 text-neutral-400 transition-colors hover:text-emerald-400"
        aria-label="Refresh leaderboard"
      >
        <RefreshCwIcon size={18} />
      </button>

      {/* Content */}
      {entries.length === 0 ? (
        <div className="py-6 text-center font-mono text-neutral-500">
          No scores yet. Be the first!
        </div>
      ) : (
        <div className="scrollbar-thin scrollbar-thumb-emerald-500/30 scrollbar-track-transparent max-h-70 overflow-y-auto">
          <div className="space-y-1.5 p-3">
            {entries.map((entry, index) => (
              <div
                key={entry.id}
                className={`group flex items-center justify-between gap-3 rounded-sm border px-3 py-2 font-mono transition-all ${
                  index === 0
                    ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-400 hover:border-yellow-400/50 hover:bg-yellow-400/15"
                    : index === 1
                      ? "border-gray-300/30 bg-gray-300/10 text-gray-300 hover:border-gray-300/50 hover:bg-gray-300/15"
                      : index === 2
                        ? "border-orange-400/30 bg-orange-400/10 text-orange-400 hover:border-orange-400/50 hover:bg-orange-400/15"
                        : "border-neutral-700/30 bg-neutral-800/20 text-emerald-400 hover:border-emerald-500/30 hover:bg-neutral-800/40"
                }`}
              >
                <div className="flex flex-1 items-center gap-2">
                  <span className="w-6 text-center text-xs">
                    {index === 0
                      ? "🥇"
                      : index === 1
                        ? "🥈"
                        : index === 2
                          ? "🥉"
                          : `${index + 1}.`}
                  </span>
                  <span className="truncate font-bold tracking-wide">
                    {entry.playerName}
                  </span>
                </div>
                <span className="font-bold tabular-nums">
                  {entry.score.toString().padStart(3, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
