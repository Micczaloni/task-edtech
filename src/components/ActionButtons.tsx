import reset from "../assets/reset.svg";
import showAnswer from "../assets/show-answer.svg";

type ActionButtonsProps = {
  onReset: () => void;
  onShowAnswer: () => void;
};

const ActionButtons = ({ onReset, onShowAnswer }: ActionButtonsProps) => {
  return (
    <footer className="flex h-[100px] shrink-0 items-start justify-end px-6 pt-6">
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onReset}
          className="flex h-[52px] cursor-pointer items-center gap-1.5 rounded-full border border-primary bg-surface py-2 pl-4 pr-[22px] text-primary transition-colors hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <img src={reset} alt="" aria-hidden="true" />
          Zacznij od nowa
        </button>

        <button
          type="button"
          onClick={onShowAnswer}
          className="flex h-[52px] cursor-pointer items-center gap-1.5 rounded-full bg-primary py-2 pl-4 pr-[22px] text-surface transition-colors hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <img src={showAnswer} alt="" aria-hidden="true" />
          Pokaż odpowiedź
        </button>
      </div>
    </footer>
  );
};

export default ActionButtons;
