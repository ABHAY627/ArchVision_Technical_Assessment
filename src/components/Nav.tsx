'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  const links = [
    { href: '/', label: 'Generate' },
    { href: '/gallery', label: 'Gallery' },
  ];

  return (
    <nav className="border-b border-border/60 bg-cream/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-serif text-[22px] font-medium tracking-tight text-charcoal">
          Arch<span className="text-terracotta italic ml-0.5">Vision</span>
        </Link>
        <div className="flex gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium tracking-wide transition-colors ${
                pathname === href
                  ? 'text-terracotta border-b border-terracotta pb-0.5'
                  : 'text-muted hover:text-charcoal'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
