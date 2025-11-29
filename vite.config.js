import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: '/simultaneous-equation-cannons/', // Set base url for gh-pages
    build: {
        outDir: 'build', // Maintain 'build' output directory for consistency with previous deploy scripts or change to dist
    },
});
