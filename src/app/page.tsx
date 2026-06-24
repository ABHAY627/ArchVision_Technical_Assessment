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
    <div className="max-w-2xl mx-auto px-6 py-16 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold mb-3 leading-tight tracking-tight text-charcoal">
          Generate Architectural Concepts
        </h1>
        <p className="text-muted text-base font-light max-w-xl mx-auto leading-relaxed">
          Describe a building, space, or structural vision. ArchVision renders it as professional concept art.
        </p>
      </div>

      <div className="space-y-8 bg-white border border-border/60 rounded-3xl p-6 sm:p-8 shadow-claude transition-all duration-300">
        <div className="relative group">
          <label className="block text-xs font-semibold tracking-widest text-muted uppercase mb-2">
            Architectural Prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. A minimalist concrete villa overlooking a misty pine forest in Norway at dusk..."
            maxLength={500}
            rows={4}
            className="w-full border border-border/80 bg-cream/20 px-5 py-4 text-[15px] font-sans placeholder-muted/65 focus:outline-none focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 rounded-2xl resize-none transition-all duration-200 group-hover:border-border"
          />
          <div className="absolute bottom-4 right-4 flex items-center justify-end">
            <span className="text-xs text-muted/80 font-medium bg-white/90 dark:bg-white/10 backdrop-blur-sm px-2 py-1 rounded-md">
              {prompt.length}/500
            </span>
          </div>
        </div>

        <StyleSelector selected={styles} onChange={setStyles} />

        <button
          onClick={generate}
          disabled={loading || !prompt.trim()}
          className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base font-semibold"
        >
          {loading ? (
            <>
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating Concept...
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
    <div className="min-h-screen bg-cream/30 dark:bg-cream transition-colors duration-300">
      <Nav />
      <Suspense fallback={null}>
        <GeneratorContent />
      </Suspense>
    </div>
  );
}
