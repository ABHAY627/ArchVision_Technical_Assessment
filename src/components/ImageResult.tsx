'use client';
import Image from 'next/image';

interface Props {
  imagePath: string;
  prompt: string;
  onSave: () => void;
  saving: boolean;
  saved: boolean;
}

export default function ImageResult({ imagePath, prompt, onSave, saving, saved }: Props) {
  return (
    <div className="mt-10 card animate-scale-in overflow-hidden border border-border/70">
      <div className="relative w-full overflow-hidden group" style={{ paddingBottom: '56.25%' }}>
        <Image
          src={imagePath}
          alt={prompt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
      <div className="p-6 sm:p-8 bg-white">
        <h3 className="text-xs font-semibold tracking-widest text-muted uppercase mb-2">Generated Concept</h3>
        <p className="text-[15px] text-charcoal font-light leading-relaxed mb-6 italic">
          &ldquo;{prompt}&rdquo;
        </p>
        <button
          onClick={onSave}
          disabled={saving || saved}
          className={`btn-primary w-full sm:w-auto px-8 py-3.5 transition-all duration-300 ${
            saved
              ? 'bg-emerald-600 hover:bg-emerald-600 text-white cursor-default translate-y-0 shadow-none'
              : ''
          }`}
        >
          {saved ? (
            <span className="flex items-center justify-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
              </svg>
              Saved to Gallery
            </span>
          ) : saving ? (
            'Saving to Gallery...'
          ) : (
            'Save to Gallery'
          )}
        </button>
      </div>
    </div>
  );
}
