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
      <p className="text-xs text-muted uppercase tracking-widest mb-3 font-semibold">
        Style Presets
      </p>
      <div className="flex flex-wrap gap-2.5">
        {STYLES.map((style) => {
          const isSelected = selected.includes(style);
          return (
            <button
              key={style}
              onClick={() => toggle(style)}
              className={`px-4 py-2 text-[13px] font-medium rounded-full border transition-all duration-300 ${
                isSelected
                  ? 'border-terracotta bg-terracotta text-white shadow-md shadow-terracotta/20 scale-[1.03] hover:brightness-105'
                  : 'border-border bg-white text-muted hover:border-charcoal/40 hover:text-charcoal hover:bg-cream/20'
              }`}
            >
              {style}
            </button>
          );
        })}
      </div>
    </div>
  );
}
