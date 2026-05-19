export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: { 950: '#050507', 900: '#090a0d', 800: '#111318' },
        amberline: '#d99b42',
        smoke: '#e7dac4'
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        body: ['DM Sans', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
