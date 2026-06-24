'use client';

interface Props {
  message: string;
}

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="mt-6 border border-rose-200 bg-rose-50/50 dark:bg-rose-950/20 dark:border-rose-900/50 px-5 py-4 rounded-2xl animate-scale-in flex items-start gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-rose-500 shrink-0 mt-0.5">
        <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
      </svg>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-rose-800 dark:text-rose-300">Generation Failed</p>
        <p className="text-xs text-rose-700/90 dark:text-rose-400/90 leading-relaxed">{message}</p>
      </div>
    </div>
  );
}
