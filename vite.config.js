import path from 'path';
import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
};
