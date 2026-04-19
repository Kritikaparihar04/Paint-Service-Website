module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        ink:    '#0f172a',
        paper:  '#f8fafc',
        ash:    '#f1f5f9',
        silver: '#e2e8f0',
        muted:  '#64748b',
        blue:   '#2563eb',
        'blue-light': '#60a5fa',
        'blue-dark':  '#1d4ed8',
        'blue-pale':  '#eff6ff',
        slate:  '#475569',
      },
    },
  },
  plugins: [],
};
