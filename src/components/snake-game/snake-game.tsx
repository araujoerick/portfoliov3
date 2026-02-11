"use client";

import React from "react";
import { useSnakeGame } from "@/hooks/useSnakeGame";
import GameOver from "./game-over";
import GameBoard from "./GameBoard";
import ScoreBoard from "./ScoreBoard";
import GameControls from "./GameControls";

interface SnakeGameProps {
  percentageWidth?: number;
  startSnakeSize?: number;
  snakeColor?: string;
  appleColor?: string;
}

export const SnakeGame: React.FC<SnakeGameProps> = ({
  percentageWidth = 40,
  startSnakeSize = 6,
  snakeColor,
  appleColor,
}) => {
  const {
    dimensions,
    snake,
    apple,
    isGameOver,
    snakeColor: currentSnakeColor,
    appleColor: currentAppleColor,
    score,
    highScore,
    newHighScore,
    goLeft,
    goUp,
    goRight,
    goDown,
    resetGame,
  } = useSnakeGame({
    percentageWidth,
    startSnakeSize,
    initialSnakeColor: snakeColor,
    initialAppleColor: appleColor,
  });

  if (isGameOver) {
    return (
      <GameOver
        width={dimensions.width}
        height={dimensions.height}
        highScore={highScore}
        newHighScore={newHighScore}
        score={score}
        onRestart={resetGame}
      />
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <GameBoard
        dimensions={dimensions}
        snake={snake}
        apple={apple}
        snakeColor={currentSnakeColor}
        appleColor={currentAppleColor}
      />

      <ScoreBoard
        score={score}
        highScore={highScore}
        fontSize={dimensions.width / 20}
        gap={dimensions.width / 10}
      />

      <GameControls
        onUp={goUp}
        onDown={goDown}
        onLeft={goLeft}
        onRight={goRight}
      />
    </div>
  );
};

export default SnakeGame;
