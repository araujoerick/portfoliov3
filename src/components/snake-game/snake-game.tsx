"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import GameOver from "./game-over";
import {
  Apple,
  Direction,
  GameDimensions,
  SnakePart,
} from "@/types/snake-game";
import {
  BiChevronDown,
  BiChevronLeft,
  BiChevronRight,
  BiChevronUp,
} from "react-icons/bi";

interface SnakeGameProps {
  percentageWidth?: number;
  startSnakeSize?: number;
  snakeColor?: string;
  appleColor?: string;
}

export const SnakeGame: React.FC<SnakeGameProps> = ({
  percentageWidth = 40,
  startSnakeSize = 6,
  snakeColor: initialSnakeColor,
  appleColor: initialAppleColor,
}) => {
  const SNAKE_COLOR = "#4CAF50";
  const APPLE_COLOR = "#F44336";
  const SNAKE_SPEED = 85;

  const [dimensions, setDimensions] = useState<GameDimensions>({
    width: 0,
    height: 0,
    blockWidth: 0,
    blockHeight: 0,
  });

  const [gameLoopTimeout, setGameLoopTimeout] = useState(SNAKE_SPEED);
  const [snake, setSnake] = useState<SnakePart[]>([]);
  const [apple, setApple] = useState<Apple>({ Xpos: 0, Ypos: 0 });
  const [direction, setDirection] = useState<Direction>("right");
  const [directionChanged, setDirectionChanged] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [snakeColor, setSnakeColor] = useState(
    initialSnakeColor || SNAKE_COLOR,
  );
  const [appleColor, setAppleColor] = useState(
    initialAppleColor || APPLE_COLOR,
  );
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [newHighScore, setNewHighScore] = useState(false);

  const directionRef = useRef(direction);
  const directionChangedRef = useRef(directionChanged);
  const snakeRef = useRef(snake);
  const gameLoopTimeoutIdRef = useRef<number | null>(null);
  const isGameOverRef = useRef(isGameOver);
  const dimensionsRef = useRef(dimensions);

  useEffect(() => {
    directionRef.current = direction;
    directionChangedRef.current = directionChanged;
    snakeRef.current = snake;
    isGameOverRef.current = isGameOver;
    dimensionsRef.current = dimensions;
  }, [direction, directionChanged, snake, isGameOver, dimensions]);

  const normalizePosition = useCallback(
    (pos: number, maxPos: number, blockSize: number): number => {
      const normalizedPos = Math.round(pos / blockSize) * blockSize;
      if (normalizedPos < 0) return maxPos - blockSize;
      if (normalizedPos >= maxPos) return 0;
      return normalizedPos;
    },
    [],
  );

  const initGame = useCallback(() => {
    const gameBoard = document.getElementById("GameBoard")?.parentElement;
    if (!gameBoard) return;

    let width = gameBoard.offsetWidth * (percentageWidth / 100);
    width -= width % 30;
    if (width < 30) width = 30;

    const height = (width / 3) * 2;
    const blockWidth = width / 30;
    const blockHeight = height / 20;

    const newDimensions = { width, height, blockWidth, blockHeight };
    setDimensions(newDimensions);
    dimensionsRef.current = newDimensions;

    const centerX = Math.floor(width / 2 / blockWidth) * blockWidth;
    const centerY = Math.floor(height / 2 / blockHeight) * blockHeight;

    const newSnake: SnakePart[] = [];
    let Xpos = centerX;
    const Ypos = centerY;

    newSnake.push({ Xpos: centerX, Ypos: centerY });

    for (let i = 1; i < startSnakeSize; i++) {
      Xpos -= blockWidth;
      if (Xpos < 0) Xpos = width - blockWidth;
      newSnake.push({ Xpos, Ypos });
    }

    setSnake(newSnake);
    snakeRef.current = newSnake;

    let appleXpos: number, appleYpos: number;
    do {
      appleXpos = Math.floor(Math.random() * (width / blockWidth)) * blockWidth;
      appleYpos =
        Math.floor(Math.random() * (height / blockHeight)) * blockHeight;
    } while (
      newSnake.some(
        (part) => part.Xpos === appleXpos && part.Ypos === appleYpos,
      )
    );

    setApple({ Xpos: appleXpos, Ypos: appleYpos });
  }, [percentageWidth, startSnakeSize]);

  const isAppleOnSnake = useCallback(
    (appleXpos: number, appleYpos: number): boolean => {
      return snakeRef.current.some(
        (part) => appleXpos === part.Xpos && appleYpos === part.Ypos,
      );
    },
    [],
  );

  const moveHead = useCallback(() => {
    const currentSnake = [...snakeRef.current];
    const head = currentSnake[0];
    const { width, height, blockWidth, blockHeight } = dimensionsRef.current;

    let newHeadX = head.Xpos;
    let newHeadY = head.Ypos;

    switch (directionRef.current) {
      case "left":
        newHeadX -= blockWidth;
        break;
      case "up":
        newHeadY -= blockHeight;
        break;
      case "right":
        newHeadX += blockWidth;
        break;
      case "down":
        newHeadY += blockHeight;
        break;
    }

    newHeadX = normalizePosition(newHeadX, width, blockWidth);
    newHeadY = normalizePosition(newHeadY, height, blockHeight);

    currentSnake[0] = { Xpos: newHeadX, Ypos: newHeadY };

    setSnake(currentSnake);
    snakeRef.current = currentSnake;
  }, [normalizePosition]);

  const moveSnake = useCallback(() => {
    const currentSnake = [...snakeRef.current];
    const positions = currentSnake.map((part) => ({
      Xpos: part.Xpos,
      Ypos: part.Ypos,
    }));

    moveHead();

    const newSnake = [...snakeRef.current];
    for (let i = 1; i < newSnake.length; i++) {
      newSnake[i] = positions[i - 1];
    }

    setSnake(newSnake);
    snakeRef.current = newSnake;
  }, [moveHead]);

  const tryToEatSnake = useCallback(() => {
    const head = snakeRef.current[0];

    for (let i = 1; i < snakeRef.current.length; i++) {
      if (
        head.Xpos === snakeRef.current[i].Xpos &&
        head.Ypos === snakeRef.current[i].Ypos
      ) {
        setIsGameOver(true);
        isGameOverRef.current = true;
        return;
      }
    }
  }, []);

  const tryToEatApple = useCallback(() => {
    const head = snakeRef.current[0];

    if (head.Xpos === apple.Xpos && head.Ypos === apple.Ypos) {
      const { width, height, blockWidth, blockHeight } = dimensionsRef.current;
      const currentSnake = [...snakeRef.current];
      const tail = currentSnake[currentSnake.length - 1];
      currentSnake.push({ Xpos: tail.Xpos, Ypos: tail.Ypos });

      setSnake(currentSnake);
      snakeRef.current = currentSnake;

      let newAppleXpos: number, newAppleYpos: number;
      do {
        newAppleXpos =
          Math.floor(Math.random() * (width / blockWidth)) * blockWidth;
        newAppleYpos =
          Math.floor(Math.random() * (height / blockHeight)) * blockHeight;
      } while (isAppleOnSnake(newAppleXpos, newAppleYpos));

      setApple({ Xpos: newAppleXpos, Ypos: newAppleYpos });

      const newScore = score + 1;
      setScore(newScore);

      if (newScore > highScore) {
        setHighScore(newScore);
        setNewHighScore(true);
      }

      if (gameLoopTimeout > 25) {
        setGameLoopTimeout((prev) => prev - 0.5);
      }
    }
  }, [apple, gameLoopTimeout, highScore, isAppleOnSnake, score]);

  const goLeft = useCallback(() => {
    if (directionRef.current !== "right") {
      setDirection("left");
      directionRef.current = "left";
    }
  }, []);

  const goUp = useCallback(() => {
    if (directionRef.current !== "down") {
      setDirection("up");
      directionRef.current = "up";
    }
  }, []);

  const goRight = useCallback(() => {
    if (directionRef.current !== "left") {
      setDirection("right");
      directionRef.current = "right";
    }
  }, []);

  const goDown = useCallback(() => {
    if (directionRef.current !== "up") {
      setDirection("down");
      directionRef.current = "down";
    }
  }, []);

  const resetGame = useCallback(() => {
    const { width, height, blockWidth, blockHeight } = dimensionsRef.current;

    const centerX = Math.floor(width / 2 / blockWidth) * blockWidth;
    const centerY = Math.floor(height / 2 / blockHeight) * blockHeight;

    const newSnake: SnakePart[] = [];
    let Xpos = centerX;
    const Ypos = centerY;

    newSnake.push({ Xpos: centerX, Ypos: centerY });

    for (let i = 1; i < startSnakeSize; i++) {
      Xpos -= blockWidth;
      if (Xpos < 0) Xpos = width - blockWidth;
      newSnake.push({ Xpos, Ypos });
    }

    let newAppleXpos: number, newAppleYpos: number;
    do {
      newAppleXpos =
        Math.floor(Math.random() * (width / blockWidth)) * blockWidth;
      newAppleYpos =
        Math.floor(Math.random() * (height / blockHeight)) * blockHeight;
    } while (
      newSnake.some(
        (part) => part.Xpos === newAppleXpos && part.Ypos === newAppleYpos,
      )
    );

    setSnake(newSnake);
    snakeRef.current = newSnake;

    setApple({ Xpos: newAppleXpos, Ypos: newAppleYpos });

    setDirection("right");
    directionRef.current = "right";

    setDirectionChanged(false);
    directionChangedRef.current = false;

    setIsGameOver(false);
    isGameOverRef.current = false;

    setGameLoopTimeout(SNAKE_SPEED);
    setSnakeColor(initialSnakeColor || SNAKE_COLOR);
    setAppleColor(initialAppleColor || APPLE_COLOR);
    setScore(0);
    setNewHighScore(false);
  }, [initialSnakeColor, initialAppleColor, startSnakeSize]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Prevent default behavior for game keys
      if (
        event.code === "Space" ||
        event.code === "ArrowLeft" ||
        event.code === "ArrowUp" ||
        event.code === "ArrowRight" ||
        event.code === "ArrowDown"
      ) {
        event.preventDefault();
      }

      if (isGameOverRef.current && event.code === "Space") {
        resetGame();
        return;
      }

      if (directionChangedRef.current) return;

      switch (event.code) {
        case "ArrowLeft":
        case "KeyA":
          goLeft();
          break;
        case "ArrowUp":
        case "KeyW":
          goUp();
          break;
        case "ArrowRight":
        case "KeyD":
          goRight();
          break;
        case "ArrowDown":
        case "KeyS":
          goDown();
          break;
        default:
          return;
      }

      setDirectionChanged(true);
      directionChangedRef.current = true;
    },
    [goDown, goLeft, goRight, goUp, resetGame],
  );

  const gameLoop = useCallback(() => {
    if (gameLoopTimeoutIdRef.current) {
      window.clearTimeout(gameLoopTimeoutIdRef.current);
    }

    const timeoutId = window.setTimeout(() => {
      if (!isGameOverRef.current) {
        moveSnake();
        tryToEatSnake();
        tryToEatApple();
        setDirectionChanged(false);
        directionChangedRef.current = false;
      }
      gameLoop();
    }, gameLoopTimeout);

    gameLoopTimeoutIdRef.current = timeoutId;
  }, [gameLoopTimeout, moveSnake, tryToEatApple, tryToEatSnake]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    gameLoop();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (gameLoopTimeoutIdRef.current) {
        window.clearTimeout(gameLoopTimeoutIdRef.current);
      }
    };
  }, [gameLoop, handleKeyDown]);

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
    <>
      <div
        id="GameBoard"
        className="relative mx-auto outline outline-lime-400"
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
      <div
        className="flex text-center font-bold"
        style={{
          fontSize: dimensions.width / 20,
          gap: dimensions.width / 10,
        }}
      >
        <span>HIGH-SCORE: {highScore}</span>
        <span>SCORE: {score}</span>
      </div>

      <div className="bottom-4 flex flex-col items-center gap-2 md:hidden">
        <button
          onClick={goUp}
          className="btn-primary bg-lime-300 px-4 py-3 text-black"
          aria-label="Mover para cima"
        >
          <BiChevronUp size={24} />
        </button>
        <div className="flex gap-4">
          <button
            onClick={goLeft}
            className="btn-primary bg-lime-300 px-4 py-3 text-black"
            aria-label="Mover para a esquerda"
          >
            <BiChevronLeft size={24} />
          </button>
          <button
            onClick={goDown}
            className="btn-primary bg-lime-300 px-4 py-3 text-black"
            aria-label="Mover para baixo"
          >
            <BiChevronDown size={24} />
          </button>
          <button
            onClick={goRight}
            className="btn-primary bg-lime-300 px-4 py-3 text-black"
            aria-label="Mover para a direita"
          >
            <BiChevronRight size={24} />
          </button>
        </div>
      </div>
    </>
  );
};

export default SnakeGame;
