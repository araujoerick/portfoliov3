import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import type {
  LeaderboardEntry,
  LeaderboardResponse,
} from "@/types/leaderboard";

const redis = Redis.fromEnv();

const TOP_ENTRIES_COUNT = 10;

export async function GET() {
  try {
    // Get top entries from sorted set
    const entries = await redis.zrange<string[]>(
      "snake-leaderboard",
      0,
      TOP_ENTRIES_COUNT - 1,
      { rev: true },
    );

    if (!entries || entries.length === 0) {
      return NextResponse.json(
        {
          success: true,
          entries: [],
        } as LeaderboardResponse,
        { status: 200 },
      );
    }

    // Parse entries
    const parsedEntries = entries.map((entry) => {
      if (typeof entry === "string") {
        return JSON.parse(entry) as LeaderboardEntry;
      }
      return entry as LeaderboardEntry;
    });

    return NextResponse.json(
      {
        success: true,
        entries: parsedEntries,
      } as LeaderboardResponse,
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      {
        success: false,
        entries: [],
        message: "Failed to fetch leaderboard.",
      } as LeaderboardResponse,
      { status: 500 },
    );
  }
}
