import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // firebase.json (kept out of git) deploys build/, the Create React App output folder.
  build: { outDir: 'build' },
});
