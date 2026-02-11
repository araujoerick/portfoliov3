import React from "react";

interface ScoreBoardProps {
  score: number;
  highScore: number;
  fontSize: number;
  gap: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  highScore,
  fontSize,
  gap,
}) => {
  return (
    <div
      className="flex text-center font-bold font-mono"
      style={{
        fontSize,
        gap,
      }}
    >
      <span>HIGH-SCORE: {highScore}</span>
      <span>SCORE: {score}</span>
    </div>
  );
};

export default ScoreBoard;
