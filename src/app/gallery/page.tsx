'use client';
import { useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import GalleryGrid from '@/components/GalleryGrid';
import { Generation } from '@/types';

export default function GalleryPage() {
  const [images, setImages] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => r.json())
      .then((data) => {
        setImages(data.images ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Nav />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-baseline justify-between mb-10">
          <h1 className="font-serif text-4xl font-semibold">Your Gallery</h1>
          {images.length > 0 && (
            <p className="text-muted text-sm font-light">
              {images.length} concept{images.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        {loading ? (
          <div className="text-center py-16 text-muted text-sm font-light">
            Loading your gallery...
          </div>
        ) : (
          <GalleryGrid
            images={images}
            onDelete={(id) => setImages((prev) => prev.filter((img) => img.id !== id))}
          />
        )}
      </div>
    </>
  );
}
