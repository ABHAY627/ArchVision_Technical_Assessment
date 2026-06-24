'use client';

const STYLES = [
  'Brutalist',
  'Minimalist Japanese',
  'Bauhaus',
  'Futuristic',
  'Art Deco',
  'Organic',
];

interface Props {
  selected: string[];
  onChange: (styles: string[]) => void;
}

export default function StyleSelector({ selected, onChange }: Props) {
  const toggle = (style: string) =>
    onChange(
      selected.includes(style)
        ? selected.filter((s) => s !== style)
        : [...selected, style]
    );

  return (
    <div>
      <p className="text-xs text-muted uppercase tracking-widest mb-3 font-medium">
        Style Presets
      </p>
      <div className="flex flex-wrap gap-2">
        {STYLES.map((style) => (
          <button
            key={style}
            onClick={() => toggle(style)}
            className={`px-4 py-1.5 text-[13px] font-medium rounded-full border transition-all duration-200 ${
              selected.includes(style)
                ? 'border-terracotta bg-terracotta text-white shadow-sm shadow-terracotta/20 scale-[1.02]'
                : 'border-border/80 bg-white text-muted hover:border-charcoal/30 hover:text-charcoal hover:bg-gray-50'
            }`}
          >
            {style}
          </button>
        ))}
      </div>
    </div>
  );
}
