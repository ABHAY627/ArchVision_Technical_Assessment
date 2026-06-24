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
    <div className="mt-8 card">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <Image src={imagePath} alt={prompt} fill className="object-cover" unoptimized />
      </div>
      <div className="p-5">
        <p className="text-sm text-muted font-light leading-relaxed mb-4">{prompt}</p>
        <button onClick={onSave} disabled={saving || saved} className="btn-primary">
          {saved ? 'Saved to Gallery ✓' : saving ? 'Saving...' : 'Save to Gallery'}
        </button>
      </div>
    </div>
  );
}
