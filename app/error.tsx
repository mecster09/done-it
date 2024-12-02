"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-red-600 dark:text-red-400 text-lg font-semibold mb-2">
          Something went wrong!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={reset}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
} 