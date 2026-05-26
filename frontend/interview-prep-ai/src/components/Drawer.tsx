import { type ReactNode } from "react";
import { LuX } from "react-icons/lu";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Drawer = ({ isOpen, onClose, title, children }: DrawerProps) => {
  return (
    <div
      className={`fixed top-16 right-0 z-40 h-[calc(100dvh-64px)] p-5 overflow-y-auto transition-transform duration-300 ease-out glass-panel-elevated w-full md:w-[40vw] border-l border-border ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      tabIndex={-1}
      aria-labelledby="drawer-right-label"
    >
      <div className="flex items-center justify-between mb-6">
        <h5 id="drawer-right-label" className="font-display font-semibold text-sm text-text-primary">
          {title || "AI Explanation"}
        </h5>
        <button
          type="button"
          onClick={onClose}
          className="text-text-muted hover:bg-surface-hover hover:text-text-primary rounded-lg w-8 h-8 flex items-center justify-center transition"
        >
          <LuX className="text-lg" />
        </button>
      </div>

      <div className="text-sm text-text-secondary">
        {children}
      </div>
    </div>
  );
};

export default Drawer;
