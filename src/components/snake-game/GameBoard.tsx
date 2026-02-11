import React from "react";
import { Apple, GameDimensions, SnakePart } from "@/types/snake-game";

interface GameBoardProps {
  dimensions: GameDimensions;
  snake: SnakePart[];
  apple: Apple;
  snakeColor: string;
  appleColor: string;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  dimensions,
  snake,
  apple,
  snakeColor,
  appleColor,
}) => {
  return (
    <div
      id="GameBoard"
      className="relative mx-auto outline outline-neutral-600"
      style={{
        width: dimensions.width,
        height: dimensions.height,
        outlineWidth: dimensions.width / 50,
      }}
    >
      {snake.map((snakePart, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            width: dimensions.blockWidth,
            height: dimensions.blockHeight,
            left: snakePart.Xpos,
            top: snakePart.Ypos,
            background: snakeColor,
          }}
        />
      ))}
      <div
        className="absolute"
        style={{
          width: dimensions.blockWidth,
          height: dimensions.blockHeight,
          left: apple.Xpos,
          top: apple.Ypos,
          background: appleColor,
        }}
      />
    </div>
  );
};

export default GameBoard;
