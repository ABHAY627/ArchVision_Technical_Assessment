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
            className={`px-4 py-1.5 text-sm border transition-colors duration-150 ${
              selected.includes(style)
                ? 'border-terracotta bg-terracotta text-white'
                : 'border-border text-muted hover:border-charcoal hover:text-charcoal'
            }`}
          >
            {style}
          </button>
        ))}
      </div>
    </div>
  );
}
