import React from "react";
import {
  BiChevronDown,
  BiChevronLeft,
  BiChevronRight,
  BiChevronUp,
} from "react-icons/bi";

interface GameControlsProps {
  onUp: () => void;
  onDown: () => void;
  onLeft: () => void;
  onRight: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  onUp,
  onDown,
  onLeft,
  onRight,
}) => {
  return (
    <div className="flex flex-col items-center gap-2 md:hidden">
      <button
        onClick={onUp}
        className="btn-primary bg-lime-300 px-4 py-3 text-black"
        aria-label="Mover para cima"
      >
        <BiChevronUp size={24} />
      </button>
      <div className="flex gap-4">
        <button
          onClick={onLeft}
          className="btn-primary bg-lime-300 px-4 py-3 text-black"
          aria-label="Mover para a esquerda"
        >
          <BiChevronLeft size={24} />
        </button>
        <button
          onClick={onDown}
          className="btn-primary bg-lime-300 px-4 py-3 text-black"
          aria-label="Mover para baixo"
        >
          <BiChevronDown size={24} />
        </button>
        <button
          onClick={onRight}
          className="btn-primary bg-lime-300 px-4 py-3 text-black"
          aria-label="Mover para a direita"
        >
          <BiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default GameControls;
