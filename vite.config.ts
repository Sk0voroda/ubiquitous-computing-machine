import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

import analyze from 'rollup-plugin-analyzer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({ exportAsDefault: true })],
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
  resolve: {
    alias: {
      '@views': path.resolve(__dirname, 'src/views'),
    },
  },
});
