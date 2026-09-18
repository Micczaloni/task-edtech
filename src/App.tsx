import { useRef, useState } from "react";
import type { DragEvent, PointerEvent } from "react";

import ModalHeader from "./components/ModalHeader";
import TaskBoard from "./components/TaskBoard";
import LettersBoard from "./components/LettersBoard";
import ActionButtons from "./components/ActionButtons";

import { dropLetters, taskImages, type DropLetter } from "./data/task";

import polecenieSound from "./assets/polecenie.mp3";
import pudloSound from "./assets/pudlo.mp3";
import trafienieSound from "./assets/trafienie.mp3";
import zwyciestwoSound from "./assets/zwyciestwo.mp3";

function shuffleLetters() {
  const shuffled = [...dropLetters];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
}

type PlacedLetters = Record<string, DropLetter[]>;

type PointerDrag = {
  letterId: string;
  startX: number;
  startY: number;
  dx: number;
  dy: number;
};

function App() {
  const [letters, setLetters] = useState(shuffleLetters);
  const [placedLetters, setPlacedLetters] = useState<PlacedLetters>({});
  const [errorLetterId, setErrorLetterId] = useState<string | null>(null);
  const [pointerDrag, setPointerDrag] = useState<PointerDrag | null>(null);
  const pointerDragRef = useRef<PointerDrag | null>(null);

  const playSound = (sound: string) => {
    const audio = new Audio(sound);
    void audio.play();
  };

  const handlePlayInstruction = () => {
    playSound(polecenieSound);
  };

  const tryPlaceLetter = (letterId: string, taskId: string) => {
    const letter = letters.find((item) => item.id === letterId);

    if (!letter) {
      return;
    }

    const task = taskImages.find((item) => item.id === taskId);

    if (!task) {
      return;
    }

    const currentPlacedLetters = placedLetters[taskId] ?? [];
    const nextLetterIndex = currentPlacedLetters.length;
    const expectedLetter = task.answer[nextLetterIndex];

    if (
      !expectedLetter ||
      letter.letter.toLowerCase() !== expectedLetter.toLowerCase()
    ) {
      setErrorLetterId(letter.id);
      playSound(pudloSound);

      window.setTimeout(() => {
        setErrorLetterId(null);
      }, 350);

      return;
    }

    setErrorLetterId(null);

    const updatedPlacedLetters = {
      ...placedLetters,
      [taskId]: [...currentPlacedLetters, letter],
    };

    setPlacedLetters(updatedPlacedLetters);
    playSound(trafienieSound);

    const totalPlaced = Object.values(updatedPlacedLetters).reduce(
      (total, taskLetters) => total + taskLetters.length,
      0,
    );

    if (totalPlaced === dropLetters.length) {
      playSound(zwyciestwoSound);
    }
  };

  const handleDragStart = (event: DragEvent<HTMLButtonElement>, id: string) => {
    event.dataTransfer.setData("text/plain", id);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>, taskId: string) => {
    event.preventDefault();

    const letterId = event.dataTransfer.getData("text/plain");

    if (!letterId) {
      return;
    }

    tryPlaceLetter(letterId, taskId);
  };

  const handlePointerDragStart = (
    event: PointerEvent<HTMLButtonElement>,
    id: string,
  ) => {
    if (event.pointerType === "mouse") {
      return;
    }

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);

    const nextDrag = {
      letterId: id,
      startX: event.clientX,
      startY: event.clientY,
      dx: 0,
      dy: 0,
    };

    pointerDragRef.current = nextDrag;
    setPointerDrag(nextDrag);
  };

  const handlePointerDragMove = (event: PointerEvent<HTMLButtonElement>) => {
    const currentDrag = pointerDragRef.current;

    if (
      !currentDrag ||
      !event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      return;
    }

    const nextDrag = {
      ...currentDrag,
      dx: event.clientX - currentDrag.startX,
      dy: event.clientY - currentDrag.startY,
    };

    pointerDragRef.current = nextDrag;
    setPointerDrag(nextDrag);
  };

  const handlePointerDragEnd = (event: PointerEvent<HTMLButtonElement>) => {
    const currentDrag = pointerDragRef.current;

    if (
      !currentDrag ||
      !event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);

    const target = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest("[data-task-id]");

    const taskId = target?.getAttribute("data-task-id");

    if (taskId) {
      tryPlaceLetter(currentDrag.letterId, taskId);
    }

    pointerDragRef.current = null;
    setPointerDrag(null);
  };

  const placedLetterIds = new Set(
    Object.values(placedLetters)
      .flat()
      .map((letter) => letter.id),
  );

  const handleReset = () => {
    setErrorLetterId(null);
    pointerDragRef.current = null;
    setPointerDrag(null);
    setLetters(shuffleLetters());
    setPlacedLetters({});
  };

  const handleShowAnswer = () => {
    const answer = taskImages.reduce<PlacedLetters>((result, task) => {
      result[task.id] = task.answer.split("").map((letter, index) => ({
        id: `${task.id}-${index}`,
        letter,
      }));

      return result;
    }, {});

    setPlacedLetters(answer);
  };

  const pointerDragStyle = pointerDrag
    ? {
        transform: `translate(${pointerDrag.dx}px, ${pointerDrag.dy}px)`,
        zIndex: 50,
        position: "relative" as const,
        pointerEvents: "none" as const,
      }
    : undefined;

  return (
    <main className="min-h-screen bg-neutral-100 p-6">
      <section className="mx-auto flex h-[720px] w-[1280px] flex-col overflow-hidden rounded-[32px] border border-primary bg-surface">
        <ModalHeader
          title={`Z której chmurki spadły literowe krople deszczu?
Przeciągnij krople z literami pod odpowiednie chmurki.`}
          onPlayInstruction={handlePlayInstruction}
        />

        <div className="flex-1">
          <TaskBoard placedLetters={placedLetters} onDrop={handleDrop} />

          <LettersBoard
            letters={letters}
            placedLetterIds={placedLetterIds}
            errorLetterId={errorLetterId}
            draggingLetterId={pointerDrag?.letterId ?? null}
            pointerDragStyle={pointerDragStyle}
            onDragStart={handleDragStart}
            onPointerDragStart={handlePointerDragStart}
            onPointerDragMove={handlePointerDragMove}
            onPointerDragEnd={handlePointerDragEnd}
          />
        </div>

        <ActionButtons onReset={handleReset} onShowAnswer={handleShowAnswer} />
      </section>
    </main>
  );
}

export default App;
