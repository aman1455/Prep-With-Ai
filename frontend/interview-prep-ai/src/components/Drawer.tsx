import { type ReactNode } from "react";
import { LuX, LuSparkles } from "react-icons/lu";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Drawer = ({ isOpen, onClose, title, children }: DrawerProps) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-base/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed top-16 right-0 z-40 h-[calc(100dvh-64px)] overflow-y-auto transition-transform duration-300 ease-out w-full md:w-[42vw] lg:w-[36vw] border-l border-border bg-surface-elevated/95 backdrop-blur-xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        tabIndex={-1}
        aria-labelledby="drawer-right-label"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-border bg-surface-elevated/90 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <LuSparkles size={13} className="text-accent" />
            </div>
            <h5 id="drawer-right-label" className="font-display font-semibold text-sm text-text-primary truncate max-w-[250px]">
              {title || "AI Explanation"}
            </h5>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-text-muted hover:bg-surface-hover hover:text-text-primary rounded-lg w-8 h-8 flex items-center justify-center transition-all"
          >
            <LuX size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-sm text-text-secondary">
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;
