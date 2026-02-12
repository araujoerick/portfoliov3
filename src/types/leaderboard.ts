/**
 * Types for Snake Game Leaderboard
 */

export interface LeaderboardEntry {
  playerName: string;
  score: number;
  timestamp: number;
  id: string;
}

export interface SubmitScoreRequest {
  playerName: string;
  score: number;
  gameHash?: string;
}

export interface SubmitScoreResponse {
  success: boolean;
  message?: string;
  rank?: number;
  isTopScore?: boolean;
}

export interface LeaderboardResponse {
  success: boolean;
  entries: LeaderboardEntry[];
  message?: string;
}
