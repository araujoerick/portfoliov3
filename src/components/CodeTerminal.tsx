"use client";

import React, { useState } from "react";
import { Minus, Square, X } from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import SnakeGame from "@/components/snake-game/snake-game";

type TabType = "techstack" | "snake";

const CodeTerminal = () => {
  const [activeTab, setActiveTab] = useState<TabType>("techstack");

  const codeSnippet = `// Construindo aplicações modernas
interface TechStack {
  frontend: string[];
  backend: string[];
  web3: string[];
  tools: string[];
}

const createDeveloperStack = () => ({
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
  backend: ['NestJS', 'Node.js', 'RabbitMQ', 'PostgreSQL'],
  web3: ['Crypto APIs', 'Wagmi', 'Ethers.js', 'Web3.js'],
  tools: ['Docker', 'Git', 'AWS', 'Vercel']
} as const);

const stack = createDeveloperStack();`;

  const { displayedText, isComplete } = useTypewriter(codeSnippet, {
    speed: 15,
    loop: true,
    pauseDuration: 10000,
  });

  // Syntax highlighting function
  const renderCode = (code: string) => {
    return code.split("\n").map((line, i) => {
      // Comments
      if (line.trim().startsWith("//")) {
        return (
          <div key={i}>
            <span style={{ color: "#6272a4" }}>{line}</span>
          </div>
        );
      }

      const tokens: React.ReactElement[] = [];
      const keywords = ["interface", "const", "readonly", "string", "return"];
      const functions = ["TechStack", "createDeveloperStack", "stack"];
      const parts =
        line.match(/'[^']*'|\s+|[{}()[\]:;,=>]|[^\s{}()[\]:;,=>]+/g) || [];

      parts.forEach((part, idx) => {
        if (!part) return;

        if (part.match(/^'.*'$/)) {
          tokens.push(
            <span key={`${i}-${idx}`} style={{ color: "#f1fa8c" }}>
              {part}
            </span>,
          );
        } else if (keywords.includes(part)) {
          tokens.push(
            <span key={`${i}-${idx}`} style={{ color: "#ff79c6" }}>
              {part}
            </span>,
          );
        } else if (functions.includes(part)) {
          tokens.push(
            <span key={`${i}-${idx}`} style={{ color: "#8be9fd" }}>
              {part}
            </span>,
          );
        } else if (idx < parts.length - 1 && parts[idx + 1] === ":") {
          tokens.push(
            <span key={`${i}-${idx}`} style={{ color: "#50fa7b" }}>
              {part}
            </span>,
          );
        } else {
          tokens.push(
            <span key={`${i}-${idx}`} style={{ color: "#f8f8f2" }}>
              {part}
            </span>,
          );
        }
      });

      return <div key={i}>{tokens.length > 0 ? tokens : "\u00A0"}</div>;
    });
  };

  return (
    <div className="w-full">
      <div className="group relative">
        <div className="relative overflow-hidden border border-neutral-800/60 bg-linear-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-900/30 backdrop-blur-xl transition-all duration-500 hover:border-neutral-700/50">
          {/* Linux Terminal Header */}
          <div className="flex items-center justify-between border-b border-neutral-700/50 bg-neutral-800/80 px-3 py-2">
            <div className="flex items-center gap-2">
              {/* Linux Window Controls - Left Side */}
              &gt;_
            </div>

            {/* Center - Title */}
            <span className="text-xs font-medium text-neutral-300">
              Terminal - erick@dev
            </span>

            {/* Right - Minimize, Maximize, Close Icons */}
            <div className="flex gap-2">
              <button className="text-neutral-400 transition-colors hover:text-white">
                <Minus className="h-3 w-3" />
              </button>
              <button className="text-neutral-400 transition-colors hover:text-white">
                <Square className="h-3 w-3" />
              </button>
              <button className="text-neutral-400 transition-colors hover:text-red-400">
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-neutral-700/30 bg-neutral-900/60 px-2 pt-1">
            <button
              onClick={() => setActiveTab("techstack")}
              className={`px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === "techstack"
                  ? "border-t-2 border-emerald-500 bg-neutral-900/95 text-emerald-400"
                  : "border-t-2 border-transparent bg-neutral-800/40 text-neutral-400 hover:text-neutral-200"
              }`}
            >
              techstack.ts
            </button>
            <button
              onClick={() => setActiveTab("snake")}
              className={`px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === "snake"
                  ? "border-t-2 border-emerald-500 bg-neutral-900/95 text-emerald-400"
                  : "border-t-2 border-transparent bg-neutral-800/40 text-neutral-400 hover:text-neutral-200"
              }`}
            >
              snake-game
            </button>
          </div>

          {/* Content Area */}
          <div className="h-115 overflow-hidden bg-neutral-900/95 p-4">
            {activeTab === "techstack" ? (
              <pre className="scrollbar-hide h-full overflow-y-auto font-mono text-xs leading-relaxed">
                <code style={{ color: "rgb(248, 248, 242)" }}>
                  {renderCode(displayedText)}
                  {!isComplete && (
                    <span
                      style={{ color: "#50fa7b" }}
                      className="ml-0.5 inline-block animate-pulse"
                    >
                      |
                    </span>
                  )}
                </code>
              </pre>
            ) : (
              <SnakeGameWrapper />
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-neutral-700/30 bg-neutral-800/60 px-4 py-1.5 text-xs text-neutral-400">
            <span>TypeScript</span>
            <span className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse bg-emerald-400" />
              <span className="hidden sm:inline">Full Stack Developer</span>
              <span className="sm:hidden">Dev</span>
            </span>
          </div>
        </div>

        {/* Glow Effect */}
        <div className="absolute -inset-0.5 -z-10 bg-linear-to-r from-emerald-500/20 to-teal-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </div>
  );
};

// Snake Game Wrapper Component
const SnakeGameWrapper = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { entries: topScores, loading: loadingScores } = useLeaderboard({
    limit: 3,
  });

  // Detect screen size
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle space key to start game and prevent scrolling
  React.useEffect(() => {
    if (!isPlaying) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.code === "Space") {
          e.preventDefault();
          setIsPlaying(true);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isPlaying]);

  if (isPlaying) {
    return (
      <div className="relative">
        {/* <div className="flex flex-col gap-4"> */}
        <button
          onClick={() => setIsPlaying(false)}
          className="absolute top-0 left-0 self-start px-2 py-1 text-xs text-neutral-400 transition-all hover:text-white"
        >
          ← Voltar
        </button>
        <div className="flex min-w-full justify-center">
          <SnakeGame percentageWidth={isMobile ? 95 : 70} startSnakeSize={4} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-center px-4">
      <div className="space-y-4 text-center">
        <div className="font-mono text-sm text-emerald-400">
          <pre className="text-xs">
            {`        _____ _   _          _  ________
       / ____| \\ | |   /\\   | |/ /  ____|
  | (___ |  \\| |  /  \\  | ' /| |__
   \\___ \\| . \` | / /\\ \\ |  < |  __|
   ____) | |\\  |/ ____ \\| . \\| |____
  |_____/|_| \\_/_/    \\_\\_|\\_\\______|

  🐍 Classic Snake Game 🐍`}
          </pre>
        </div>
        <div className="space-y-2 font-mono text-xs text-neutral-400">
          <p>
            🎮 Use <span className="text-emerald-400">W S A D</span> or{" "}
            <span className="text-emerald-400">Arrow Keys</span> to Move
          </p>
          <p>🍎 Eat some food to grow</p>
          <p>💀 Don&apos;t hit yourself!</p>
          <div className="border-neutral-700/50 pt-4">
            <button
              onClick={() => setIsPlaying(true)}
              className="border border-emerald-500/50 bg-emerald-500/20 px-4 py-2 text-emerald-400 transition-all hover:bg-emerald-500/30"
            >
              Press SPACE to Start
            </button>
          </div>

          {/* Compact Top 3 Leaderboard */}
          {!loadingScores && topScores.length > 0 && (
            <div className="mt-6 border-t border-neutral-700/30 pt-4">
              <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                <span className="text-emerald-400/70">→</span> Hall of Fame
              </div>
              <div className="space-y-2">
                {topScores.map((entry, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between gap-3 rounded-sm border border-neutral-700/30 bg-neutral-800/20 px-3 py-1.5 font-mono text-[11px] transition-all hover:border-emerald-500/30 hover:bg-neutral-800/40"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={
                          index === 0
                            ? "text-yellow-400"
                            : index === 1
                              ? "text-gray-300"
                              : "text-orange-400"
                        }
                      >
                        {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                      </span>
                      <span className="truncate text-neutral-300 transition-colors group-hover:text-neutral-100">
                        {entry.playerName}
                      </span>
                    </div>
                    <span className="font-bold tabular-nums text-emerald-400">
                      {entry.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeTerminal;
