/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#070a12',
          900: '#0b0f19',
          850: '#0f172a',
          800: '#141d2f',
          750: '#172033',
          700: '#1e293b',
          600: '#334155',
        },
        grid: {
          cyan: '#38bdf8',
          teal: '#06b6d4',
          emerald: '#34d399',
          green: '#4ade80',
          amber: '#f59e0b',
          gold: '#fbbf24',
          danger: '#ef4444',
          red: '#f87171',
        },
        quality: {
          poor: '#9d9d9d',
          common: '#f8fafc',
          uncommon: '#1eff00',
          rare: '#0070dd',
          epic: '#a335ee',
          legendary: '#ff8000',
        }
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        display: ['Trebuchet MS', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow': '0 0 25px -5px rgba(56, 189, 248, 0.25)',
        'emerald-glow': '0 0 25px -5px rgba(52, 211, 153, 0.25)',
        'amber-glow': '0 0 25px -5px rgba(245, 158, 11, 0.25)',
        'obsidian-modal': '0 25px 50px -12px rgba(0, 0, 0, 0.85)',
      }
    },
  },
  plugins: [],
}
