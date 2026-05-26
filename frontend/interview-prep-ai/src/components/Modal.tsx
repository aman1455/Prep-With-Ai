import { type ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  hideHeader?: boolean;
}

const Modal = ({ children, isOpen, onClose, title, hideHeader }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-base/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[600px] max-h-[90vh] glass-panel-elevated rounded-2xl overflow-hidden flex flex-col animate-scale-in">
        {!hideHeader && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h3 className="font-display font-semibold text-base text-text-primary">
              {title}
            </h3>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-text-muted hover:bg-surface-hover hover:text-text-primary rounded-lg w-8 h-8 flex items-center justify-center transition z-10"
        >
          <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>

        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
