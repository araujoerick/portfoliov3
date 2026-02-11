import { useState, useEffect, useCallback, useRef } from "react";
import {
  Apple,
  Direction,
  GameDimensions,
  SnakePart,
} from "@/types/snake-game";

interface UseSnakeGameOptions {
  percentageWidth?: number;
  startSnakeSize?: number;
  initialSnakeColor?: string;
  initialAppleColor?: string;
  initialSpeed?: number;
}

export const useSnakeGame = ({
  percentageWidth = 40,
  startSnakeSize = 6,
  initialSnakeColor,
  initialAppleColor,
  initialSpeed = 85,
}: UseSnakeGameOptions) => {
  const SNAKE_COLOR = "#00bc7d";
  const APPLE_COLOR = "#F44336";

  const [dimensions, setDimensions] = useState<GameDimensions>({
    width: 0,
    height: 0,
    blockWidth: 0,
    blockHeight: 0,
  });

  const [gameLoopTimeout, setGameLoopTimeout] = useState(initialSpeed);
  const [snake, setSnake] = useState<SnakePart[]>([]);
  const [apple, setApple] = useState<Apple>({ Xpos: 0, Ypos: 0 });
  const [direction, setDirection] = useState<Direction>("right");
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
  const snakeRef = useRef(snake);
  const appleRef = useRef(apple);
  const isGameOverRef = useRef(isGameOver);
  const dimensionsRef = useRef(dimensions);
  const gameLoopTimeoutIdRef = useRef<number | null>(null);
  const directionChangedRef = useRef(false);

  // Sync refs with states
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

  useEffect(() => {
    appleRef.current = apple;
  }, [apple]);

  useEffect(() => {
    isGameOverRef.current = isGameOver;
  }, [isGameOver]);

  useEffect(() => {
    dimensionsRef.current = dimensions;
  }, [dimensions]);

  const normalizePosition = useCallback(
    (pos: number, maxPos: number, blockSize: number): number => {
      const normalizedPos = Math.round(pos / blockSize) * blockSize;
      if (normalizedPos < 0) return maxPos - blockSize;
      if (normalizedPos >= maxPos) return 0;
      return normalizedPos;
    },
    [],
  );

  const isAppleOnSnake = useCallback(
    (
      appleXpos: number,
      appleYpos: number,
      currentSnake: SnakePart[],
    ): boolean => {
      return currentSnake.some(
        (part) => appleXpos === part.Xpos && appleYpos === part.Ypos,
      );
    },
    [],
  );

  const generateApplePosition = useCallback(
    (currentSnake: SnakePart[], dims: GameDimensions): Apple => {
      let appleXpos: number, appleYpos: number;
      do {
        appleXpos =
          Math.floor(Math.random() * (dims.width / dims.blockWidth)) *
          dims.blockWidth;
        appleYpos =
          Math.floor(Math.random() * (dims.height / dims.blockHeight)) *
          dims.blockHeight;
      } while (isAppleOnSnake(appleXpos, appleYpos, currentSnake));

      return { Xpos: appleXpos, Ypos: appleYpos };
    },
    [isAppleOnSnake],
  );

  const createInitialSnake = useCallback(
    (dims: GameDimensions): SnakePart[] => {
      const centerX =
        Math.floor(dims.width / 2 / dims.blockWidth) * dims.blockWidth;
      const centerY =
        Math.floor(dims.height / 2 / dims.blockHeight) * dims.blockHeight;

      const newSnake: SnakePart[] = [];
      let Xpos = centerX;
      const Ypos = centerY;

      newSnake.push({ Xpos: centerX, Ypos: centerY });

      for (let i = 1; i < startSnakeSize; i++) {
        Xpos -= dims.blockWidth;
        if (Xpos < 0) Xpos = dims.width - dims.blockWidth;
        newSnake.push({ Xpos, Ypos });
      }

      return newSnake;
    },
    [startSnakeSize],
  );

  const initGame = useCallback(() => {
    const gameBoard = document.getElementById("GameBoard");
    if (!gameBoard) return;

    const container = gameBoard.parentElement;
    if (!container) return;

    // Use container width or fallback to window width
    const containerWidth = container.offsetWidth || window.innerWidth;

    let width = containerWidth * (percentageWidth / 100);
    width -= width % 30;
    if (width < 30) width = 30;

    const height = (width / 3) * 2;
    const blockWidth = width / 30;
    const blockHeight = height / 20;

    const newDimensions = { width, height, blockWidth, blockHeight };
    setDimensions(newDimensions);

    const newSnake = createInitialSnake(newDimensions);
    setSnake(newSnake);

    const newApple = generateApplePosition(newSnake, newDimensions);
    setApple(newApple);
  }, [percentageWidth, createInitialSnake, generateApplePosition]);

  const moveHead = useCallback((): SnakePart[] => {
    const currentSnake = [...snakeRef.current];

    if (currentSnake.length === 0) {
      return currentSnake;
    }

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

    return currentSnake;
  }, [normalizePosition]);

  const moveSnake = useCallback(() => {
    if (snakeRef.current.length === 0) {
      return snakeRef.current;
    }

    const positions = snakeRef.current.map((part) => ({
      Xpos: part.Xpos,
      Ypos: part.Ypos,
    }));

    const newSnake = moveHead();

    for (let i = 1; i < newSnake.length; i++) {
      newSnake[i] = positions[i - 1];
    }

    setSnake(newSnake);
    return newSnake;
  }, [moveHead]);

  const tryToEatSnake = useCallback((currentSnake: SnakePart[]): boolean => {
    if (currentSnake.length === 0) {
      return false;
    }

    const head = currentSnake[0];

    for (let i = 1; i < currentSnake.length; i++) {
      if (
        head.Xpos === currentSnake[i].Xpos &&
        head.Ypos === currentSnake[i].Ypos
      ) {
        setIsGameOver(true);
        return true;
      }
    }
    return false;
  }, []);

  const tryToEatApple = useCallback(
    (currentSnake: SnakePart[]) => {
      if (currentSnake.length === 0) {
        return;
      }

      const head = currentSnake[0];

      if (
        head.Xpos === appleRef.current.Xpos &&
        head.Ypos === appleRef.current.Ypos
      ) {
        const tail = currentSnake[currentSnake.length - 1];
        const newSnake = [
          ...currentSnake,
          { Xpos: tail.Xpos, Ypos: tail.Ypos },
        ];

        setSnake(newSnake);

        const newApple = generateApplePosition(newSnake, dimensionsRef.current);
        setApple(newApple);

        // Update score and high score
        setScore((prevScore) => {
          const newScore = prevScore + 1;
          setHighScore((prevHighScore) => {
            if (newScore > prevHighScore) {
              setNewHighScore(true);
              return newScore;
            }
            return prevHighScore;
          });
          return newScore;
        });

        // Accelerate the game gradually
        setGameLoopTimeout((prev) => (prev > 25 ? prev - 0.5 : prev));
      }
    },
    [generateApplePosition],
  );

  const goLeft = useCallback(() => {
    if (directionRef.current !== "right" && !directionChangedRef.current) {
      setDirection("left");
      directionChangedRef.current = true;
    }
  }, []);

  const goUp = useCallback(() => {
    if (directionRef.current !== "down" && !directionChangedRef.current) {
      setDirection("up");
      directionChangedRef.current = true;
    }
  }, []);

  const goRight = useCallback(() => {
    if (directionRef.current !== "left" && !directionChangedRef.current) {
      setDirection("right");
      directionChangedRef.current = true;
    }
  }, []);

  const goDown = useCallback(() => {
    if (directionRef.current !== "up" && !directionChangedRef.current) {
      setDirection("down");
      directionChangedRef.current = true;
    }
  }, []);

  const resetGame = useCallback(() => {
    const newSnake = createInitialSnake(dimensionsRef.current);
    setSnake(newSnake);

    const newApple = generateApplePosition(newSnake, dimensionsRef.current);
    setApple(newApple);

    setDirection("right");
    setIsGameOver(false);
    setGameLoopTimeout(initialSpeed);
    setSnakeColor(initialSnakeColor || SNAKE_COLOR);
    setAppleColor(initialAppleColor || APPLE_COLOR);
    setScore(0);
    setNewHighScore(false);

    directionChangedRef.current = false;
  }, [
    createInitialSnake,
    generateApplePosition,
    initialSpeed,
    initialSnakeColor,
    initialAppleColor,
  ]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
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

      if (isGameOverRef.current || directionChangedRef.current) return;

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
      }
    },
    [goDown, goLeft, goRight, goUp, resetGame],
  );

  // Main game loop
  useEffect(() => {
    if (snakeRef.current.length === 0) {
      return;
    }

    const gameLoop = () => {
      if (gameLoopTimeoutIdRef.current) {
        window.clearTimeout(gameLoopTimeoutIdRef.current);
      }

      const timeoutId = window.setTimeout(() => {
        if (!isGameOverRef.current && snakeRef.current.length > 0) {
          const newSnake = moveSnake();
          const isDead = tryToEatSnake(newSnake);
          if (!isDead) {
            tryToEatApple(newSnake);
          }
          directionChangedRef.current = false;
        }
        gameLoop();
      }, gameLoopTimeout);

      gameLoopTimeoutIdRef.current = timeoutId;
    };

    gameLoop();

    return () => {
      if (gameLoopTimeoutIdRef.current) {
        window.clearTimeout(gameLoopTimeoutIdRef.current);
      }
    };
  }, [gameLoopTimeout, moveSnake, tryToEatApple, tryToEatSnake, snake]);

  // Add event listener for keyboard input
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Initialize the game and handle window resizing
  // Use timeout to ensure the DOM is ready
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      initGame();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [initGame]);

  return {
    dimensions,
    snake,
    apple,
    isGameOver,
    snakeColor,
    appleColor,
    score,
    highScore,
    newHighScore,
    goLeft,
    goUp,
    goRight,
    goDown,
    resetGame,
  };
};
