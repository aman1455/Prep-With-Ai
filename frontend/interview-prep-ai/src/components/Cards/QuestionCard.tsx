import { useState, useEffect, useRef } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";

interface QuestionCardProps {
  question: string;
  answer: string;
  onLearnMore: () => void;
  isPinned: boolean;
  onTogglePin: () => void;
}

const QuestionCard = ({ question, answer, onLearnMore, isPinned, onTogglePin }: QuestionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <div className="group glass-panel rounded-2xl overflow-hidden transition-all duration-200 hover:border-accent/15 card-hover">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 cursor-pointer">
          <div className="flex items-start gap-3 flex-1 min-w-0" onClick={toggleExpand}>
            <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-[10px] font-bold text-accent mt-0.5">
              Q
            </span>
            <h3 className="text-sm sm:text-[15px] font-medium text-text-primary leading-snug">
              {question}
            </h3>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onTogglePin}
              className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-all ${
                isPinned
                  ? "bg-accent/10 border-accent/20 text-accent"
                  : "bg-surface border-border text-text-muted hover:border-accent/20 hover:text-accent"
              }`}
            >
              {isPinned ? <LuPinOff size={13} /> : <LuPin size={13} />}
            </button>

            <button
              onClick={() => { setIsExpanded(true); onLearnMore(); }}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface border border-border text-text-muted hover:border-accent/20 hover:text-accent transition-all"
            >
              <LuSparkles size={13} />
            </button>

            <button
              onClick={toggleExpand}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:bg-surface-hover hover:text-text-primary transition-all"
            >
              <LuChevronDown
                size={16}
                className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: `${height}px` }}
        >
          <div ref={contentRef} className="mt-4 pt-4 border-t border-border">
            <div className="bg-surface rounded-xl p-4">
              <AIResponsePreview content={answer} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
