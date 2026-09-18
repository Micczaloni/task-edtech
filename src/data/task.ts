import umbrella from "../assets/umbrella.svg";
import lamp from "../assets/lamp.svg";
import cactus from "../assets/cactus.svg";

export type TaskImage = {
  id: string;
  answer: string;
  image: string;
};

export type DropLetter = {
  id: string;
  letter: string;
};

export const taskImages: TaskImage[] = [
  {
    id: "umbrella",
    answer: "PARASOL",
    image: umbrella,
  },
  {
    id: "lamp",
    answer: "LAMPKA",
    image: lamp,
  },
  {
    id: "cactus",
    answer: "KAKTUS",
    image: cactus,
  },
];

export const dropLetters: DropLetter[] = taskImages.flatMap((task) =>
  task.answer.split("").map((letter, index) => ({
    id: `${task.id}-${index}`,
    letter,
  })),
);
