import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Expose standard Supabase Vercel integration variables as well as VITE_
  envPrefix: ['VITE_', 'SUPABASE_', 'NEXT_PUBLIC_'],
  server: {
    port: 3000,
  },
});
