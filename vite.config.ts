import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { ViteAliases } from 'vite-aliases';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), ViteAliases()],
  server: {
    open: true,
  },
  esbuild: {
    jsxInject: "import React from 'react';",
  },
});
