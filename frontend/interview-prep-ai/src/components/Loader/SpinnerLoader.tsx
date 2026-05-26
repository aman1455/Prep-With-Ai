interface SpinnerLoaderProps {
  fullscreen?: boolean;
  size?: number;
  text?: string;
}

const SpinnerLoader = ({ fullscreen = false, size = 20, text = "" }: SpinnerLoaderProps) => {
  const spinnerSize = { width: `${size}px`, height: `${size}px` };

  return (
    <div
      className={
        fullscreen
          ? "fixed inset-0 z-50 flex items-center justify-center bg-base/60 backdrop-blur-sm"
          : "flex items-center justify-center"
      }
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-3">
        <svg aria-hidden="true" style={spinnerSize} className="animate-spin text-accent/30 fill-accent" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.203 38.4038 97.0079 35.904 95.7905 33.7559C94.1311 30.8201 91.9548 28.1404 89.3404 25.7977C85.5478 22.3861 80.9324 19.9579 75.8906 18.7296" fill="currentFill" />
        </svg>
        {text && <p className="text-sm font-medium text-text-muted animate-pulse">{text}</p>}
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SpinnerLoader;
