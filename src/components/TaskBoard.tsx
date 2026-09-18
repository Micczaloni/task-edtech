import type { DragEvent } from "react";

import CloudTarget from "./CloudTarget";

import { taskImages, type DropLetter } from "../data/task";

type TaskBoardProps = {
  placedLetters: Record<string, DropLetter[]>;
  onDrop: (event: DragEvent<HTMLDivElement>, taskId: string) => void;
};

const TaskBoard = ({ placedLetters, onDrop }: TaskBoardProps) => {
  return (
    <div className="flex justify-center gap-10 px-6 pt-10">
      {taskImages.map((task) => (
        <CloudTarget
          key={task.id}
          taskId={task.id}
          image={task.image}
          answer={task.answer}
          placedLetters={placedLetters[task.id] ?? []}
          onDrop={onDrop}
        />
      ))}
    </div>
  );
};

export default TaskBoard;
