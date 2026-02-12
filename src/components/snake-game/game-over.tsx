import React, { useState } from "react";
import PlayerNameInput from "./PlayerNameInput";
import Leaderboard from "./Leaderboard";

interface GameOverProps {
  width: number;
  height: number;
  score: number;
  highScore: number;
  newHighScore: boolean;
  onRestart: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({
  width,
  height,
  score,
  highScore,
  newHighScore,
  onRestart,
}) => {
  const [showNameInput, setShowNameInput] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleSubmitScore = async (playerName: string) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch("/api/leaderboard/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerName,
          score,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage(
          data.isTopScore
            ? `🏆 NEW #1 HIGH SCORE! 🏆`
            : `Score submitted! Rank: #${data.rank}`,
        );
        setShowNameInput(false);
        setShowLeaderboard(true);
      } else {
        setSubmitMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting score:", error);
      setSubmitMessage("Failed to submit score. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    setShowNameInput(false);
    setShowLeaderboard(true);
  };

  return (
    <div className="pb-12 flex flex-col items-center gap-6">
      <div
        id="GameBoard"
        className="relative mx-auto outline outline-lime-400"
        style={{
          width: width,
          height: height,
          outlineWidth: width / 50,
        }}
      >
        <div
          className="flex h-full flex-col justify-around text-center px-4"
          style={{ fontSize: width / 15 }}
        >
          <div className="font-bold text-red-600">GAME OVER</div>
          <div>Your score: {score}</div>
          <div>
            {newHighScore ? "New h" : "H"}igh score: {highScore}
          </div>
          <div className="hidden animate-pulse font-bold text-white md:inline-block">
            Press Space to restart
          </div>
          <button
            onClick={onRestart}
            className="animate-pulse px-4 py-2 font-bold text-white md:hidden"
          >
            Press to restart
          </button>
        </div>
      </div>

      {showNameInput && !submitMessage && (
        <div className="flex flex-col items-center gap-4">
          <PlayerNameInput
            onSubmit={handleSubmitScore}
            isSubmitting={isSubmitting}
            fontSize={width / 20}
          />
          <button
            onClick={handleSkip}
            className="font-mono text-sm text-gray-400 hover:text-gray-300 underline"
          >
            Skip
          </button>
        </div>
      )}

      {submitMessage && (
        <div
          className="font-mono font-bold text-center text-lime-400 animate-pulse"
          style={{ fontSize: width / 20 }}
        >
          {submitMessage}
        </div>
      )}

      {showLeaderboard && (
        <Leaderboard fontSize={width / 25} width={width * 0.9} />
      )}
    </div>
  );
};

export default GameOver;
