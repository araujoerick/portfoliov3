/**
 * Utility functions for managing Snake Game high score in localStorage
 */

const HIGH_SCORE_KEY = "snake-game-high-score";

/**
 * Gets the high score from localStorage
 * @returns The high score, or 0 if not found
 */
export const getHighScore = (): number => {
  if (typeof window === "undefined") return 0;

  try {
    const storedScore = localStorage.getItem(HIGH_SCORE_KEY);
    if (storedScore) {
      const score = parseInt(storedScore, 10);
      return isNaN(score) ? 0 : score;
    }
    return 0;
  } catch (error) {
    console.error("Error reading high score from localStorage:", error);
    return 0;
  }
};

/**
 * Saves the high score to localStorage
 * @param score The score to save
 * @returns true if successful, false otherwise
 */
export const saveHighScore = (score: number): boolean => {
  if (typeof window === "undefined") return false;

  try {
    localStorage.setItem(HIGH_SCORE_KEY, score.toString());
    return true;
  } catch (error) {
    console.error("Error saving high score to localStorage:", error);
    return false;
  }
};

/**
 * Checks if the current score is a new high score and saves it if necessary
 * @param currentScore The current score to check
 * @param previousHighScore The previous high score
 * @returns true if a new high score was set, false otherwise
 */
export const updateHighScore = (
  currentScore: number,
  previousHighScore: number,
): boolean => {
  if (currentScore > previousHighScore) {
    saveHighScore(currentScore);
    return true;
  }
  return false;
};
