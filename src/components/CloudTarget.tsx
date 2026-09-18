import type { DragEvent } from "react";

import cloud from "../assets/cloud.svg";
import drop from "../assets/drop.svg";
import emptyDrop from "../assets/empty-drop.svg";

import type { DropLetter } from "../data/task";

type CloudTargetProps = {
  taskId: string;
  image: string;
  answer: string;
  placedLetters: DropLetter[];
  onDrop: (event: DragEvent<HTMLDivElement>, taskId: string) => void;
};

const CloudTarget = ({
  taskId,
  image,
  answer,
  placedLetters,
  onDrop,
}: CloudTargetProps) => {
  return (
    <div
      data-task-id={taskId}
      className="flex w-[336px] flex-col items-center gap-4"
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => onDrop(event, taskId)}
    >
      <div className="relative">
        <img src={cloud} alt="" aria-hidden="true" />

        <img src={image} alt={answer} className="absolute inset-0 m-auto" />
      </div>

      <div className="flex items-center justify-center gap-2">
        {answer.split("").map((_, index) => {
          const placedLetter = placedLetters[index];

          if (!placedLetter) {
            return (
              <img
                key={`${taskId}-empty-${index}`}
                src={emptyDrop}
                alt=""
                aria-hidden="true"
              />
            );
          }

          return (
            <div key={placedLetter.id} className="relative shrink-0">
              <img src={drop} alt="" aria-hidden="true" />

              <span className="absolute inset-0 flex items-center justify-center font-halcom text-[20px] font-medium text-brand-800">
                {placedLetter.letter}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CloudTarget;
