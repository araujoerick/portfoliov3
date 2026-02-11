"use client";

import React, { useState } from "react";
import { Minus, Square, X } from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";
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
      <div className="relative group">
        <div className="relative overflow-hidden bg-linear-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-900/30 border border-neutral-800/60 backdrop-blur-xl hover:border-neutral-700/50 transition-all duration-500">
          {/* Linux Terminal Header */}
          <div className="bg-neutral-800/80 px-3 py-2 flex items-center justify-between border-b border-neutral-700/50">
            <div className="flex items-center gap-2">
              {/* Linux Window Controls - Left Side */}
              &gt;_
            </div>

            {/* Center - Title */}
            <span className="text-xs text-neutral-300 font-medium">
              Terminal - erick@dev
            </span>

            {/* Right - Minimize, Maximize, Close Icons */}
            <div className="flex gap-2">
              <button className="text-neutral-400 hover:text-white transition-colors">
                <Minus className="w-3 h-3" />
              </button>
              <button className="text-neutral-400 hover:text-white transition-colors">
                <Square className="w-3 h-3" />
              </button>
              <button className="text-neutral-400 hover:text-red-400 transition-colors">
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-neutral-900/60 px-2 pt-1 flex gap-1 border-b border-neutral-700/30">
            <button
              onClick={() => setActiveTab("techstack")}
              className={`px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === "techstack"
                  ? "bg-neutral-900/95 text-emerald-400 border-t-2 border-emerald-500"
                  : "bg-neutral-800/40 text-neutral-400 hover:text-neutral-200 border-t-2 border-transparent"
              }`}
            >
              techstack.ts
            </button>
            <button
              onClick={() => setActiveTab("snake")}
              className={`px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === "snake"
                  ? "bg-neutral-900/95 text-emerald-400 border-t-2 border-emerald-500"
                  : "bg-neutral-800/40 text-neutral-400 hover:text-neutral-200 border-t-2 border-transparent"
              }`}
            >
              snake-game
            </button>
          </div>

          {/* Content Area */}
          <div className="bg-neutral-900/95 p-4 h-115  lg:h-100 overflow-hidden">
            {activeTab === "techstack" ? (
              <pre className="text-xs font-mono leading-relaxed h-full overflow-y-auto scrollbar-hide">
                <code style={{ color: "rgb(248, 248, 242)" }}>
                  {renderCode(displayedText)}
                  {!isComplete && (
                    <span
                      style={{ color: "#50fa7b" }}
                      className="animate-pulse inline-block ml-0.5"
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
          <div className="bg-neutral-800/60 px-4 py-1.5 flex items-center justify-between text-xs text-neutral-400 border-t border-neutral-700/30">
            <span>TypeScript</span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">Full Stack Developer</span>
              <span className="sm:hidden">Dev</span>
            </span>
          </div>
        </div>

        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-linear-to-r from-emerald-500/20 to-teal-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      </div>
    </div>
  );
};

// Snake Game Wrapper Component
const SnakeGameWrapper = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
      <div className="flex flex-col gap-4">
        <button
          onClick={() => setIsPlaying(false)}
          className="px-2 py-1 self-start text-xs text-neutral-400 hover:text-white transition-all"
        >
          ← Voltar
        </button>
        <div className="w-full flex justify-center">
          <SnakeGame percentageWidth={isMobile ? 95 : 70} startSnakeSize={4} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-emerald-400 text-sm font-mono">
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
        <div className="space-y-2 text-neutral-400 text-xs font-mono">
          <p>
            🎮 Use <span className="text-emerald-400">W S A D</span> or{" "}
            <span className="text-emerald-400">Arrow Keys</span> to Move
          </p>
          <p>🍎 Eat some food to grow</p>
          <p>💀 Don&apos;t hit yourself!</p>
          <div className="mt-4 pt-4 border-t border-neutral-700/50">
            <button
              onClick={() => setIsPlaying(true)}
              className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/30 transition-all"
            >
              Press SPACE to Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeTerminal;
