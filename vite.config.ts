import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      '@component': 'src/component',
    },
  },
  server: {
    open: true,
  },
  esbuild: {
    jsxInject: "import React from 'react';",
  },
});
