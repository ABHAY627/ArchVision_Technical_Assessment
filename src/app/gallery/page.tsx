'use client';
import { useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import GalleryGrid from '@/components/GalleryGrid';
import GalleryModal from '@/components/GalleryModal';
import { Generation } from '@/types';

export default function GalleryPage() {
  const [images, setImages] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Generation | null>(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => r.json())
      .then((data) => {
        setImages(data.images ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="min-h-screen bg-cream/30 dark:bg-cream transition-colors duration-300">
      <Nav />
      
      <div className="max-w-5xl mx-auto px-6 py-16 animate-fade-in">
        <div className="flex items-baseline justify-between mb-10 border-b border-border/40 pb-4">
          <h1 className="font-serif text-4xl font-semibold text-charcoal">Your Gallery</h1>
          {images.length > 0 && (
            <p className="text-muted text-sm font-light">
              {images.length} concept{images.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        {loading ? (
          <div className="text-center py-24 text-muted text-sm font-light flex flex-col items-center justify-center gap-3">
            <span className="inline-block w-6 h-6 border-2 border-terracotta border-t-transparent rounded-full animate-spin" />
            Loading your gallery...
          </div>
        ) : (
          <GalleryGrid
            images={images}
            onSelect={setSelected}
          />
        )}
      </div>

      {selected && (
        <GalleryModal
          item={selected}
          onClose={() => setSelected(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
