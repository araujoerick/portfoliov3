"use client";

import { Terminal } from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";

const CodeTerminal = () => {
  const codeSnippet = `// Construindo aplicações modernas
interface TechStack {
  frontend: readonly string[];
  backend: readonly string[];
  web3: readonly string[];
  tools: readonly string[];
}

const createDeveloperStack = (): TechStack => ({
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
  backend: ['NestJS', 'Node.js', 'RabbitMQ', 'PostgreSQL'],
  web3: ['Crypto_APIs', 'Wagmi', 'Ethers.js', 'Web3.js'],
  tools: ['Docker', 'Git', 'AWS', 'Vercel']
});

const stack = createDeveloperStack();`;

  const { displayedText, isComplete } = useTypewriter(codeSnippet, {
    speed: 15,
    loop: true,
    pauseDuration: 10000, // 10s pause
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

      // Split for keywords, strings, properties, etc.
      const parts = line.split(/(\s+|[{}()[\]:;,=>])/);

      parts.forEach((part, idx) => {
        if (!part) return;

        // Strings
        if (part.match(/^'.*'$/)) {
          tokens.push(
            <span key={`${i}-${idx}`} style={{ color: "#f1fa8c" }}>
              {part}
            </span>,
          );
        }
        // Keywords
        else if (keywords.includes(part)) {
          tokens.push(
            <span key={`${i}-${idx}`} style={{ color: "#ff79c6" }}>
              {part}
            </span>,
          );
        }
        // Functions/Types
        else if (functions.includes(part)) {
          tokens.push(
            <span key={`${i}-${idx}`} style={{ color: "#8be9fd" }}>
              {part}
            </span>,
          );
        }
        // Properties followed by :
        else if (idx < parts.length - 1 && parts[idx + 1] === ":") {
          tokens.push(
            <span key={`${i}-${idx}`} style={{ color: "#50fa7b" }}>
              {part}
            </span>,
          );
        }
        // Normal text
        else {
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
        <div className="relative overflow-hidden bg-linear-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-900/30 border border-neutral-800/60 backdrop-blur-xl p-4 sm:p-6 hover:border-neutral-700/50 transition-all duration-500">
          {/* Window Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-neutral-400 ml-2">
                techstack.ts
              </span>
            </div>
            <Terminal className="w-4 h-4 text-neutral-400" />
          </div>

          {/* Code Content */}
          <div className="bg-neutral-900/95 p-3 sm:p-4 h-75 sm:h-87.5 lg:h-100 overflow-y-auto scrollbar-hide">
            <pre className="text-xs font-mono leading-relaxed">
              <code
                style={{
                  color: "rgb(248, 248, 242)",
                }}
              >
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
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between text-xs text-neutral-400">
            <span>TypeScript</span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="hidden sm:inline">Full Stack Developer</span>
              <span className="sm:hidden">Dev Full Stack</span>
            </span>
          </div>
        </div>

        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-linear-to-r from-emerald-500/20 to-teal-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      </div>
    </div>
  );
};

export default CodeTerminal;
