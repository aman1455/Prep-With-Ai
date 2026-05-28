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
    <div
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 border ${
        isPinned
          ? "bg-accent-soft/10 border-accent/20 shadow-md shadow-accent/5"
          : "bg-surface/80 backdrop-blur-sm border-border/50 hover:border-accent/15 hover:shadow-lg hover:shadow-accent/5"
      }`}
    >
      {/* Pinned indicator bar */}
      {isPinned && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-accent-secondary to-accent" />
      )}

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          {/* Question */}
          <div className="flex items-start gap-3 flex-1 min-w-0 cursor-pointer" onClick={toggleExpand}>
            <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-accent/20 to-accent-secondary/10 border border-accent/20 flex items-center justify-center text-[10px] font-bold text-accent mt-0.5">
              Q
            </span>
            <h3 className="text-sm sm:text-[15px] font-medium text-text-primary leading-relaxed pt-0.5">
              {question}
            </h3>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={onTogglePin}
              title={isPinned ? "Unpin" : "Pin for revision"}
              className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
                isPinned
                  ? "bg-accent/15 border border-accent/30 text-accent hover:bg-accent/25"
                  : "border border-transparent text-text-muted hover:bg-surface-hover hover:text-accent hover:border-border"
              }`}
            >
              {isPinned ? <LuPinOff size={13} /> : <LuPin size={13} />}
            </button>

            <button
              onClick={() => { setIsExpanded(true); onLearnMore(); }}
              title="AI Explanation"
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-transparent text-text-muted hover:bg-accent/10 hover:text-accent hover:border-accent/20 transition-all duration-200"
            >
              <LuSparkles size={13} />
            </button>

            <button
              onClick={toggleExpand}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:bg-surface-hover hover:text-text-primary transition-all duration-200"
            >
              <LuChevronDown
                size={16}
                className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Expandable answer */}
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: `${height}px` }}
        >
          <div ref={contentRef} className="mt-5 pt-5 border-t border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-medium text-accent-secondary uppercase tracking-wider">Answer</span>
              <div className="flex-1 h-px bg-border/50" />
            </div>
            <div className="bg-surface-hover/50 rounded-xl p-4 sm:p-5 border border-border/30">
              <AIResponsePreview content={answer} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
