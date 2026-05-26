interface LoadingMessageProps {
  message?: string;
}

const LoadingMessage = ({ message = "Loading..." }: LoadingMessageProps) => {
  return (
    <div className="flex items-center justify-center px-4 py-10">
      <div className="flex flex-col items-center justify-center gap-4 glass-panel rounded-2xl p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface border border-border">
          <div className="h-6 w-6 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
        </div>
        <p className="max-w-xs text-sm font-medium text-text-secondary">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingMessage;
