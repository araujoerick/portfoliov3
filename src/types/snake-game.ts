export interface SnakePart {
  Xpos: number;
  Ypos: number;
}

export interface Apple {
  Xpos: number;
  Ypos: number;
}

export interface GameDimensions {
  width: number;
  height: number;
  blockWidth: number;
  blockHeight: number;
}

export type Direction = "up" | "down" | "left" | "right";
