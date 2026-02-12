"use client";

import React, { useState, useRef, useEffect } from "react";

interface PlayerNameInputProps {
  onSubmit: (name: string) => void;
  isSubmitting?: boolean;
  fontSize?: number;
}

export const PlayerNameInput: React.FC<PlayerNameInputProps> = ({
  onSubmit,
  isSubmitting = false,
  fontSize = 24,
}) => {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (value.length <= 10) {
      setName(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.length >= 1 && name.length <= 3 && !isSubmitting) {
      onSubmit(name);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <div className="text-center font-bold font-mono" style={{ fontSize }}>
        ENTER YOUR NAME
      </div>

      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          maxLength={10}
          className="w-64 px-4 py-2 text-center font-mono font-bold text-2xl tracking-wider uppercase bg-black/50 border-2 border-lime-400 text-lime-400 focus:outline-none focus:border-lime-300 focus:ring-2 focus:ring-lime-400/50"
          placeholder="YOURNAME"
          disabled={isSubmitting}
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      <div
        className="text-center text-gray-400 font-mono"
        style={{ fontSize: fontSize * 0.6 }}
      >
        1-10 letters or numbers
      </div>

      <button
        type="submit"
        disabled={name.length < 1 || isSubmitting}
        className="px-6 py-2 font-mono font-bold bg-lime-400 text-black hover:bg-lime-300 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        style={{ fontSize: fontSize * 0.8 }}
      >
        {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
      </button>

      <div
        className="hidden md:block text-center text-gray-400 font-mono animate-pulse"
        style={{ fontSize: fontSize * 0.6 }}
      >
        Press ENTER to submit
      </div>
    </form>
  );
};

export default PlayerNameInput;
