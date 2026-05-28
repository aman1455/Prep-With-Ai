import { LuClock, LuMessagesSquare, LuCalendar, LuTarget } from "react-icons/lu";

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
  const topics = topicsToFocus?.split(",").map((t) => t.trim()).filter(Boolean) || [];

  return (
    <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-surface/60 via-base to-surface/40">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-40%] right-[10%] w-[350px] h-[350px] bg-accent/8 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-50%] left-[5%] w-[250px] h-[250px] bg-accent-secondary/8 blur-[100px] rounded-full" />
        <div className="absolute top-[20%] left-[40%] w-[150px] h-[150px] bg-pink/5 blur-[80px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-10 md:py-14">
          {/* Role badge */}
          <div className="inline-flex items-center gap-2 text-[10px] font-medium text-accent bg-accent-soft/30 border border-accent/20 px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            <LuTarget size={11} />
            Interview Session
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-bold text-text-primary leading-tight tracking-tight">
            {role || "Interview Prep"}
          </h1>

          {description && (
            <p className="text-sm text-text-secondary mt-3 leading-relaxed max-w-2xl">
              {description}
            </p>
          )}

          {/* Topic tags */}
          {topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="px-3 py-1 text-[11px] font-medium text-text-secondary bg-surface border border-border rounded-lg"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-5 mt-7 pt-6 border-t border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                <LuClock size={14} className="text-accent" />
              </div>
              <div>
                <p className="text-xs text-text-muted">Experience</p>
                <p className="text-sm font-semibold text-text-primary">{experience} {exp === 1 ? "year" : "years"}</p>
              </div>
            </div>

            <div className="w-px h-8 bg-border hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-secondary/10 border border-accent-secondary/20 flex items-center justify-center">
                <LuMessagesSquare size={14} className="text-accent-secondary" />
              </div>
              <div>
                <p className="text-xs text-text-muted">Questions</p>
                <p className="text-sm font-semibold text-text-primary">{questions}</p>
              </div>
            </div>

            {lastUpdated && (
              <>
                <div className="w-px h-8 bg-border hidden sm:block" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center">
                    <LuCalendar size={14} className="text-text-muted" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Last Updated</p>
                    <p className="text-sm font-semibold text-text-primary">{lastUpdated}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
