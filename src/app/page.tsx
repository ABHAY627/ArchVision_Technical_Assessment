'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Nav from '@/components/Nav';
import StyleSelector from '@/components/StyleSelector';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ErrorMessage from '@/components/ErrorMessage';
import ImageResult from '@/components/ImageResult';

function GeneratorContent() {
  const searchParams = useSearchParams();
  const [prompt, setPrompt] = useState('');
  const [styles, setStyles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ imagePath: string; prompt: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const prefill = searchParams.get('prompt');
    if (prefill) setPrompt(decodeURIComponent(prefill));
  }, [searchParams]);

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setSaved(false);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, styles }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? 'Something went wrong. The AI returned an unexpected response.');
      } else {
        setResult({ imagePath: data.imagePath, prompt: data.prompt });
      }
    } catch {
      setError('Something went wrong. The AI returned an unexpected response.');
    } finally {
      setLoading(false);
    }
  };

  const saveToGallery = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 300);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl font-semibold mb-2 leading-tight">
        Generate Architectural Concepts
      </h1>
      <p className="text-muted text-sm font-light mb-10 leading-relaxed">
        Describe a building, space, or structural vision. ArchVision renders it as professional concept art.
      </p>

      <div className="space-y-6">
        <div className="relative group">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your architectural concept..."
            maxLength={500}
            rows={4}
            className="w-full border border-border/80 bg-white px-5 py-4 text-[15px] font-sans placeholder-muted focus:outline-none focus:border-terracotta/60 focus:ring-4 focus:ring-terracotta/10 rounded-2xl resize-none transition-all duration-200 shadow-sm group-hover:border-border"
          />
          <div className="absolute bottom-4 right-4 flex items-center justify-end">
            <span className="text-xs text-muted font-medium bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md">{prompt.length}/500</span>
          </div>
        </div>

        <StyleSelector selected={styles} onChange={setStyles} />

        <button
          onClick={generate}
          disabled={loading || !prompt.trim()}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Concept'
          )}
        </button>
      </div>

      {error && <ErrorMessage message={error} />}
      {loading && <LoadingSkeleton />}
      {result && !loading && (
        <ImageResult
          imagePath={result.imagePath}
          prompt={result.prompt}
          onSave={saveToGallery}
          saving={saving}
          saved={saved}
        />
      )}
    </div>
  );
}

export default function GeneratorPage() {
  return (
    <>
      <Nav />
      <Suspense fallback={null}>
        <GeneratorContent />
      </Suspense>
    </>
  );
}
