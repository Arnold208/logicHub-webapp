export const Loader = ({ size = 'md', text = '', showReset = false }) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`${sizes[size as keyof typeof sizes]} animate-spin`}>
        <svg
          className="text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
      {text && <p className="text-gray-600 text-sm font-medium">{text}</p>}
      {showReset && (
        <button
          onClick={() => { localStorage.clear(); window.location.reload(); }}
          className="mt-2 text-[10px] text-gray-400 hover:text-red-500 underline transition-colors uppercase tracking-widest font-bold"
        >
          Session stuck? Click to Reset
        </button>
      )}
    </div>
  );
};
