import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import type { SubmitScoreRequest, LeaderboardEntry } from "@/types/leaderboard";

const redis = Redis.fromEnv();

const MAX_SCORE = 999;
const MIN_NAME_LENGTH = 1;
const MAX_NAME_LENGTH = 10;
const RATE_LIMIT_WINDOW = 60; // 1 minute
const MAX_SUBMISSIONS_PER_WINDOW = 5;

/**
 * Rate limiting check using IP address
 */
async function checkRateLimit(ip: string): Promise<boolean> {
  const key = `rate-limit:${ip}`;
  const current = await redis.get<number>(key);

  if (current && current >= MAX_SUBMISSIONS_PER_WINDOW) {
    return false;
  }

  await redis.incr(key);
  await redis.expire(key, RATE_LIMIT_WINDOW);
  return true;
}

function validatePlayerName(name: string): boolean {
  if (!name || typeof name !== "string") return false;

  const trimmedName = name.trim().toUpperCase();

  if (
    trimmedName.length < MIN_NAME_LENGTH ||
    trimmedName.length > MAX_NAME_LENGTH
  ) {
    return false;
  }

  return /^[A-Z0-9]+$/.test(trimmedName);
}

function validateScore(score: number): boolean {
  if (typeof score !== "number") return false;
  if (score < 0 || score > MAX_SCORE) return false;
  if (!Number.isInteger(score)) return false;
  return true;
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    const canSubmit = await checkRateLimit(ip);
    if (!canSubmit) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many submissions. Please wait a moment.",
        },
        { status: 429 },
      );
    }

    const body = (await request.json()) as SubmitScoreRequest;
    const { playerName, score } = body;

    if (!validatePlayerName(playerName)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid player name. Use 1-10 letters/numbers only.",
        },
        { status: 400 },
      );
    }

    if (!validateScore(score)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid score.",
        },
        { status: 400 },
      );
    }

    const normalizedName = playerName.trim().toUpperCase();

    const entry: LeaderboardEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      playerName: normalizedName,
      score,
      timestamp: Date.now(),
    };

    // Using negative score for descending order in Redis
    await redis.zadd("snake-leaderboard", {
      score: -score,
      member: JSON.stringify(entry),
    });

    // Keep only top 100 entries to save space
    await redis.zremrangebyrank("snake-leaderboard", 100, -1);

    // Get player rank
    const allEntries = await redis.zrange("snake-leaderboard", 0, -1);
    const rank =
      allEntries.findIndex((e) => {
        const parsed = JSON.parse(e as string) as LeaderboardEntry;
        return parsed.id === entry.id;
      }) + 1;

    const isTopScore = rank === 1;

    return NextResponse.json(
      {
        success: true,
        message: isTopScore ? "New high score!" : "Score submitted!",
        rank,
        isTopScore,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Error submitting score:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit score.",
      },
      { status: 500 },
    );
  }
}
