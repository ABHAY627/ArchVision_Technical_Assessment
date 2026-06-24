'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Nav() {
  const pathname = usePathname();
  const links = [
    { href: '/', label: 'Generate' },
    { href: '/gallery', label: 'Gallery' },
  ];

  return (
    <nav className="glass sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-serif text-[22px] font-medium tracking-tight text-charcoal">
          Arch<span className="text-terracotta italic ml-0.5">Vision</span>
        </Link>
        <div className="flex items-center gap-8">
          <div className="flex gap-8">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium tracking-wide transition-all ${
                  pathname === href
                    ? 'text-terracotta border-b border-terracotta pb-0.5'
                    : 'text-muted hover:text-charcoal'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
