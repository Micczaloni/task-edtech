import arrow from "../assets/arrow.svg";
import mute from "../assets/mute.svg";
import close from "../assets/close.svg";

type ModalHeaderProps = {
  title: string;
  onPlayInstruction: () => void;
};

const ModalHeader = ({ title, onPlayInstruction }: ModalHeaderProps) => {
  return (
    <header className="flex h-[88px] shrink-0 items-start gap-8 px-6 pt-6">
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-soft">
          <img src={arrow} alt="" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="whitespace-pre-line font-silka text-[24px] font-medium leading-[32px] tracking-[-1%] text-text">
            {title}
          </h2>
        </div>

        <button
          type="button"
          onClick={onPlayInstruction}
          aria-label="Odtwórz polecenie"
          className="relative mt-1.5 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-surface transition-colors hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <img src={mute} alt="" aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        aria-label="Zamknij ćwiczenie"
        className="mt-1 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <img src={close} alt="" aria-hidden="true" />
      </button>
    </header>
  );
};

export default ModalHeader;
