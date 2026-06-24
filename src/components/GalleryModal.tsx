'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Generation } from '@/types';

interface Props {
  item: Generation;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export default function GalleryModal({ item, onClose, onDelete }: Props) {
  const router = useRouter();

  const handleRefine = () => {
    onClose();
    router.push(`/?prompt=${encodeURIComponent(item.prompt)}`);
  };

  const handleDelete = async () => {
    await fetch(`/api/gallery/${item.id}`, { method: 'DELETE' });
    onDelete(item.id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 dark:bg-black/75 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl border border-border/50 animate-scale-in my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <Image src={item.imagePath} alt={item.prompt} fill className="object-cover" unoptimized />
        </div>
        <div className="p-6 sm:p-8 bg-white">
          <p className="text-[15px] text-charcoal font-light leading-relaxed mb-5 italic">
            &ldquo;{item.prompt}&rdquo;
          </p>
          {item.styles?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {item.styles.map((s) => (
                <span key={s} className="text-xs border border-border px-2.5 py-1 rounded-full text-muted font-medium bg-cream/10">
                  {s}
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-3 flex-wrap items-center">
            <button onClick={handleRefine} className="btn-primary">
              Refine &amp; Regenerate
            </button>
            <button
              onClick={handleDelete}
              className="border border-rose-200 text-rose-600 px-6 py-3.5 text-sm font-medium rounded-xl hover:bg-rose-50/50 hover:border-rose-300 transition-colors"
            >
              Delete
            </button>
            <button onClick={onClose} className="btn-secondary ml-auto py-3.5">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
