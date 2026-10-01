/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx,html}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dk: {
          bg: 'var(--dk-bg)',
          surface: 'var(--dk-surface)',
          'surface-hover': 'var(--dk-surface-hover)',
          text: 'var(--dk-text)',
          muted: 'var(--dk-muted)',
          border: 'var(--dk-border)',
          primary: 'var(--dk-primary)',
          'primary-hover': 'var(--dk-primary-hover)',
          'accent-blue': 'var(--dk-accent-blue)',
          'accent-violet': 'var(--dk-accent-violet)',
          'accent-teal': 'var(--dk-accent-teal)',
          'accent-amber': 'var(--dk-accent-amber)',
          canvas: 'var(--dk-canvas)',
          success: 'var(--dk-success)',
          warning: 'var(--dk-warning)',
          danger: 'var(--dk-danger)',
        }
      },
      fontFamily: {
        sans: ['Inter', '"Noto Sans Gujarati"', '"Noto Sans Devanagari"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        math: ['KaTeX_Main', 'serif']
      },
      boxShadow: {
        'dk-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'dk-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'dk-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'dk-sm': '6px',
        'dk': '10px',
        'dk-lg': '16px',
      }
    },
  },
  plugins: [],
}
