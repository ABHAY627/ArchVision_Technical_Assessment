'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Generation } from '@/types';

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
  onSelect: (generation: Generation) => void;
}

export default function GalleryGrid({ images, onSelect }: Props) {
  if (images.length === 0) {
    return (
      <div className="text-center py-28 card max-w-xl mx-auto px-6 animate-scale-in">
        <p className="font-serif text-2xl text-charcoal mb-3">No concepts yet</p>
        <p className="text-muted text-sm font-light mb-8">
          Generate your first architectural concept to start building your gallery.
        </p>
        <Link href="/" className="btn-primary inline-block">
          Start Generating
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
      {images.map((img) => (
        <div
          key={img.id}
          className="card cursor-pointer group flex flex-col h-full border border-border/70"
          onClick={() => onSelect(img)}
        >
          <div className="relative w-full overflow-hidden" style={{ paddingBottom: '66%' }}>
            <Image
              src={img.imagePath}
              alt={img.prompt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between">
            <p className="text-[14px] text-charcoal font-light leading-relaxed line-clamp-3 mb-4 group-hover:text-terracotta transition-colors duration-300">
              {img.prompt}
            </p>
            <div className="flex items-center justify-between text-xs text-muted mt-auto pt-3 border-t border-border/30">
              <span>{timeAgo(img.createdAt)}</span>
              {img.styles && img.styles.length > 0 && (
                <span className="text-[10px] uppercase font-semibold tracking-wider text-terracotta px-2 py-0.5 rounded-full bg-terracotta/10">
                  {img.styles[0]}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
