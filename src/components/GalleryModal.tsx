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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-3xl w-full mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <Image src={item.imagePath} alt={item.prompt} fill className="object-cover" unoptimized />
        </div>
        <div className="p-6">
          <p className="text-sm text-charcoal font-light leading-relaxed mb-4">{item.prompt}</p>
          {item.styles?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {item.styles.map((s) => (
                <span key={s} className="text-xs border border-border px-2 py-1 text-muted">
                  {s}
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-3 flex-wrap">
            <button onClick={handleRefine} className="btn-primary">
              Refine &amp; Regenerate
            </button>
            <button
              onClick={handleDelete}
              className="border border-red-200 text-red-600 px-6 py-3 text-sm hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
            <button onClick={onClose} className="btn-secondary ml-auto">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
