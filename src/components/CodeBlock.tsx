import React from "react";

interface CodeToken {
  type: "keyword" | "string" | "property" | "function" | "comment" | "normal";
  value: string;
}

const tokenize = (code: string): CodeToken[] => {
  const tokens: CodeToken[] = [];
  const keywords = [
    "interface",
    "const",
    "readonly",
    "string",
    "return",
    "type",
  ];
  const lines = code.split("\n");

  lines.forEach((line, lineIndex) => {
    // Coments
    if (line.trim().startsWith("//")) {
      tokens.push({ type: "comment", value: line });
      if (lineIndex < lines.length - 1) {
        tokens.push({ type: "normal", value: "\n" });
      }
      return;
    }

    // Process line for keywords, strings, properties, functions, etc.
    const words = line.split(/(\s+|[(){}[\]:;,])/);
    words.forEach((word) => {
      if (word === "") return;

      // Keywords
      if (keywords.includes(word)) {
        tokens.push({ type: "keyword", value: word });
      }
      // Strings
      else if (word.match(/^['"].*['"]$/)) {
        tokens.push({ type: "string", value: word });
      }
      // Properties followed by :
      else if (word.match(/^\w+$/)) {
        const nextNonSpace = words[words.indexOf(word) + 1];
        if (nextNonSpace === ":") {
          tokens.push({ type: "property", value: word });
        }
        // Functions names followed by ()
        else if (
          ["TechStack", "createDeveloperStack", "stack"].includes(word)
        ) {
          tokens.push({ type: "function", value: word });
        } else {
          tokens.push({ type: "normal", value: word });
        }
      } else {
        tokens.push({ type: "normal", value: word });
      }
    });

    if (lineIndex < lines.length - 1) {
      tokens.push({ type: "normal", value: "\n" });
    }
  });

  return tokens;
};

interface CodeBlockProps {
  code: string;
  showCursor?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, showCursor = false }) => {
  const tokens = tokenize(code);

  const getTokenColor = (type: CodeToken["type"]): string => {
    switch (type) {
      case "keyword":
        return "#ff79c6";
      case "string":
        return "#f1fa8c";
      case "property":
        return "#50fa7b";
      case "function":
        return "#8be9fd";
      case "comment":
        return "#6272a4";
      default:
        return "#f8f8f2";
    }
  };

  return (
    <code
      style={{
        color: "rgb(248, 248, 242)",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {tokens.map((token, index) => (
        <span key={index} style={{ color: getTokenColor(token.type) }}>
          {token.value}
        </span>
      ))}
      {showCursor && (
        <span style={{ color: "#50fa7b" }} className="animate-pulse">
          |
        </span>
      )}
    </code>
  );
};

export default CodeBlock;
