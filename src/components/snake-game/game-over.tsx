import React, { useState } from "react";
import PlayerNameInput from "./PlayerNameInput";
import Leaderboard from "./Leaderboard";

interface GameOverProps {
  width: number;
  score: number;
  highScore: number;
  newHighScore: boolean;
  onRestart: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({
  width,
  score,
  highScore,
  newHighScore,
  onRestart,
}) => {
  const [currentScreen, setCurrentScreen] = useState<
    "nameInput" | "leaderboard"
  >("nameInput");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

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
        // Wait a moment to show the success message before transitioning
        setTimeout(() => {
          setCurrentScreen("leaderboard");
        }, 1500);
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
    setCurrentScreen("leaderboard");
  };

  // First screen: Name input
  if (currentScreen === "nameInput") {
    return (
      <div className="flex flex-col items-center gap-6 pt-4 pb-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <div
            className="font-mono font-bold text-red-600"
            style={{ fontSize: width / 14 }}
          >
            GAME OVER
          </div>
          <div className="font-mono" style={{ fontSize: width / 20 }}>
            Your score: <span className="font-bold text-lime-400">{score}</span>
          </div>
          <div className="font-mono" style={{ fontSize: width / 22 }}>
            {newHighScore ? (
              <span className="animate-pulse font-bold text-yellow-400">
                🏆 New High Score: {highScore} 🏆
              </span>
            ) : (
              <span className="text-gray-400">High score: {highScore}</span>
            )}
          </div>
        </div>

        {submitMessage ? (
          <div
            className="animate-pulse text-center font-mono font-bold text-lime-400"
            style={{ fontSize: width / 20 }}
          >
            {submitMessage}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <PlayerNameInput
              onSubmit={handleSubmitScore}
              isSubmitting={isSubmitting}
              fontSize={width / 22}
            />
            <button
              onClick={handleSkip}
              className="font-mono text-xs text-gray-400 underline transition-colors hover:text-gray-300"
            >
              Skip and view leaderboard
            </button>
          </div>
        )}
      </div>
    );
  }

  // Second screen: Leaderboard with play again
  return (
    <div className="flex flex-col items-center gap-2 pt-7 pb-4">
      <Leaderboard fontSize={width / 28} width={width * 0.9} />
      <div className="text-center font-mono" style={{ fontSize: width / 24 }}>
        Your score: <span className="font-bold text-lime-400">{score}</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <button
          onClick={onRestart}
          className="border border-emerald-500/50 bg-emerald-500/20 px-4 py-2 text-emerald-400 transition-all hover:bg-emerald-500/30"
        >
          Press SPACE to Restart
        </button>
      </div>
    </div>
  );
};

export default GameOver;
