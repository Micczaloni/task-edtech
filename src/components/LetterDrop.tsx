import drop from "../assets/drop.svg";
import type { DragEvent, PointerEvent } from "react";

type PointerDragStyle = {
  transform: string;
  zIndex: number;
  position: "relative";
  pointerEvents: "none";
};

type LetterDropProps = {
  id: string;
  letter: string;
  isError: boolean;
  pointerDragStyle?: PointerDragStyle;
  onDragStart: (event: DragEvent<HTMLButtonElement>, id: string) => void;
  onPointerDragStart: (
    event: PointerEvent<HTMLButtonElement>,
    id: string,
  ) => void;
  onPointerDragMove: (event: PointerEvent<HTMLButtonElement>) => void;
  onPointerDragEnd: (event: PointerEvent<HTMLButtonElement>) => void;
};

const LetterDrop = ({
  id,
  letter,
  isError,
  pointerDragStyle,
  onDragStart,
  onPointerDragStart,
  onPointerDragMove,
  onPointerDragEnd,
}: LetterDropProps) => {
  const lowerCaseLetter = letter.toLowerCase();

  return (
    <button
      type="button"
      draggable
      onDragStart={(event) => onDragStart(event, id)}
      onPointerDown={(event) => onPointerDragStart(event, id)}
      onPointerMove={onPointerDragMove}
      onPointerUp={onPointerDragEnd}
      onPointerCancel={onPointerDragEnd}
      aria-label={`Litera ${lowerCaseLetter}`}
      style={pointerDragStyle}
      className={`relative shrink-0 cursor-grab touch-none p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        isError ? "animate-drop-reject" : ""
      }`}
    >
      <img src={drop} alt="" aria-hidden="true" className="block" />

      <span className="absolute inset-0 flex justify-center pt-8 font-halcom text-[24px] font-medium leading-[32px] tracking-[-1%] text-text">
        {lowerCaseLetter}
      </span>
    </button>
  );
};

export default LetterDrop;
