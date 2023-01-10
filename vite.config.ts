import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';

import analyze from 'rollup-plugin-analyzer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    sourcemap: false,
    rollupOptions: {
      plugins: [splitVendorChunkPlugin(), analyze({ summaryOnly: true })],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
});
