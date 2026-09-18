import LetterDrop from "./LetterDrop";
import type { DropLetter } from "../data/task";
import type { DragEvent, PointerEvent } from "react";

type PointerDragStyle = {
  transform: string;
  zIndex: number;
  position: "relative";
  pointerEvents: "none";
};

type LettersBoardProps = {
  letters: DropLetter[];
  placedLetterIds: Set<string>;
  errorLetterId: string | null;
  draggingLetterId: string | null;
  pointerDragStyle?: PointerDragStyle;
  onDragStart: (event: DragEvent<HTMLButtonElement>, id: string) => void;
  onPointerDragStart: (
    event: PointerEvent<HTMLButtonElement>,
    id: string,
  ) => void;
  onPointerDragMove: (event: PointerEvent<HTMLButtonElement>) => void;
  onPointerDragEnd: (event: PointerEvent<HTMLButtonElement>) => void;
};

const LettersBoard = ({
  letters,
  placedLetterIds,
  errorLetterId,
  draggingLetterId,
  pointerDragStyle,
  onDragStart,
  onPointerDragStart,
  onPointerDragMove,
  onPointerDragEnd,
}: LettersBoardProps) => {
  return (
    <section className="mx-auto mt-10 w-[1130px]">
      <div className="flex flex-wrap justify-center gap-x-20">
        {letters
          .filter((letter) => !placedLetterIds.has(letter.id))
          .map((letter) => (
            <LetterDrop
              key={letter.id}
              id={letter.id}
              letter={letter.letter}
              isError={letter.id === errorLetterId}
              pointerDragStyle={
                letter.id === draggingLetterId ? pointerDragStyle : undefined
              }
              onDragStart={onDragStart}
              onPointerDragStart={onPointerDragStart}
              onPointerDragMove={onPointerDragMove}
              onPointerDragEnd={onPointerDragEnd}
            />
          ))}
      </div>
    </section>
  );
};

export default LettersBoard;
