import { LuClock, LuMessagesSquare, LuCalendar } from "react-icons/lu";

interface RoleInfoHeaderProps {
  role?: string;
  topicsToFocus?: string;
  experience: string | number;
  questions: string | number;
  description?: string;
  lastUpdated?: string;
}

const RoleInfoHeader = ({ role, topicsToFocus, experience, questions, description, lastUpdated }: RoleInfoHeaderProps) => {
  const exp = Number(experience);

  return (
    <div className="relative overflow-hidden border-b border-border bg-surface/40">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-accent-secondary/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-30%] left-[-5%] w-[200px] h-[200px] bg-pink/10 blur-[80px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="min-h-[180px] flex flex-col justify-center py-8 md:py-10">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-display font-bold text-text-primary leading-tight tracking-tight">
              {role || "Frontend Developer"}
            </h2>

            <p className="text-sm md:text-base text-text-secondary mt-2">
              {topicsToFocus || "React, Node.js, MongoDB"}
            </p>

            {description && (
              <p className="text-xs md:text-sm text-text-muted mt-4 leading-relaxed max-w-xl">
                {description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-accent bg-accent-soft/20 border border-accent/15 px-3 py-1.5 rounded-full">
              <LuClock size={12} />
              {experience} {exp === 1 ? "year" : "years"}
            </div>

            <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-accent bg-accent-soft/20 border border-accent/15 px-3 py-1.5 rounded-full">
              <LuMessagesSquare size={12} />
              {questions} questions
            </div>

            {lastUpdated && (
              <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-text-muted bg-surface border border-border px-3 py-1.5 rounded-full">
                <LuCalendar size={12} />
                {lastUpdated}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
