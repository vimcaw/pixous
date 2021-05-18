import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { getAliases } from 'vite-aliases';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: getAliases(),
  },
  server: {
    open: true,
  },
  esbuild: {
    jsxInject: "import React from 'react';",
  },
});
