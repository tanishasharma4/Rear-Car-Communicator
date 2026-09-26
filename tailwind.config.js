/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        safety: {
          green: '#10B981',
          yellow: '#F59E0B',
          red: '#EF4444',
          blue: '#3B82F6',
          purple: '#8B5CF6',
          cyan: '#06B6D4',
        },
        dark: {
          bg: '#0B0F17',
          card: '#131B2E',
          surface: '#1E293B',
          border: '#1E293B',
          hover: '#334155',
        },
        led: {
          red: '#FF0033',
          amber: '#FF9900',
          green: '#00FF66',
          cyan: '#00F0FF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite',
        'marquee': 'marquee 10s linear infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'beacon': 'beacon 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 15px rgba(239, 68, 68, 0.6)' },
          '50%': { opacity: '0.6', boxShadow: '0 0 5px rgba(239, 68, 68, 0.2)' },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        beacon: {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
};
