'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Generation } from '@/types';
import GalleryModal from './GalleryModal';

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

interface Props {
  images: Generation[];
  onDelete: (id: string) => void;
}

export default function GalleryGrid({ images, onDelete }: Props) {
  const [selected, setSelected] = useState<Generation | null>(null);

  if (images.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="font-serif text-2xl text-charcoal mb-3">No concepts yet</p>
        <p className="text-muted text-sm font-light mb-6">
          Generate your first architectural concept to start building your gallery.
        </p>
        <Link href="/" className="btn-primary inline-block">
          Start Generating
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {images.map((img) => (
          <div
            key={img.id}
            className="card cursor-pointer group overflow-hidden"
            onClick={() => setSelected(img)}
          >
            <div className="relative w-full" style={{ paddingBottom: '66%' }}>
              <Image
                src={img.imagePath}
                alt={img.prompt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-charcoal font-light leading-snug line-clamp-2 mb-2">
                {img.prompt}
              </p>
              <p className="text-xs text-muted">{timeAgo(img.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <GalleryModal
          item={selected}
          onClose={() => setSelected(null)}
          onDelete={onDelete}
        />
      )}
    </>
  );
}
