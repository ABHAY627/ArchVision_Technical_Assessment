import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#EAE7E0', // Slightly darker, sophisticated warm gray/beige
        charcoal: '#2A2928', // Soft black for better readability
        terracotta: '#D97757', // Claude signature orange/terracotta
        'terracotta-dark': '#C26243',
        muted: '#736F6A', // Soft gray
        border: '#D2CEC6', // Visible but soft borders
        white: '#F6F4EF', // Used for cards and inputs to stand out slightly from background
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'claude': '0 2px 8px -2px rgba(42, 41, 40, 0.08), 0 4px 16px -4px rgba(42, 41, 40, 0.04)',
        'claude-hover': '0 4px 12px -2px rgba(42, 41, 40, 0.12), 0 8px 24px -4px rgba(42, 41, 40, 0.06)',
      }
    },
  },
  plugins: [],
}
export default config
