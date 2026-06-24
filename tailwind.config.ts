import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F5F0',
        charcoal: '#1A1A1A',
        terracotta: '#C4714A',
        'terracotta-dark': '#A85C38',
        muted: '#6B6B6B',
        border: '#E0DDD8',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
