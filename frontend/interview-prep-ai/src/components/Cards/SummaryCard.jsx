import React from "react";
import { LuTrash2, LuClock, LuMessagesSquare } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      onClick={onSelect}
      className="group glass-panel rounded-2xl overflow-hidden cursor-pointer card-hover"
    >
      <div className="relative p-5" style={{ background: colors.bgcolor }}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-11 h-11 bg-base/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/5">
            <span className="text-sm font-display font-semibold text-text-primary">
              {getInitials(role)}
            </span>
          </div>

          <div className="flex-grow min-w-0">
            <h3 className="font-display font-semibold text-base text-text-primary truncate">
              {role}
            </h3>
            <p className="text-xs text-text-secondary mt-1 line-clamp-2 leading-relaxed">
              {topicsToFocus}
            </p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="absolute top-3 right-3 flex items-center justify-center w-7 h-7 rounded-lg text-text-muted bg-base/40 hover:bg-danger/20 hover:text-danger border border-white/5 transition-all opacity-0 group-hover:opacity-100"
          >
            <LuTrash2 size={13} />
          </button>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-text-secondary bg-surface border border-border px-2.5 py-1 rounded-full">
            <LuClock size={11} />
            {experience} {experience == 1 ? "yr" : "yrs"}
          </div>

          <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-text-secondary bg-surface border border-border px-2.5 py-1 rounded-full">
            <LuMessagesSquare size={11} />
            {questions} Q&A
          </div>

          <div className="text-[11px] font-medium text-text-muted px-2.5 py-1">
            {lastUpdated}
          </div>
        </div>

        {description && (
          <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
