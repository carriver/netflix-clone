import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const REQUIRED_ENV_VARS = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_TMDB_API_KEY',
];

function assertRequiredEnv(mode) {
  const env = loadEnv(mode, process.cwd());
  const missing = REQUIRED_ENV_VARS.filter((name) => !env[name]);
  if (missing.length) {
    throw new Error(
      `Missing environment variables: ${missing.join(', ')}. Copy .env.example to .env.local and fill them in.`,
    );
  }
}

export default defineConfig(({ mode }) => {
  if (mode !== 'test') assertRequiredEnv(mode);

  return {
    plugins: [react()],
    // firebase.json (kept out of git) deploys build/, the Create React App output folder.
    build: { outDir: 'build' },
  };
});
