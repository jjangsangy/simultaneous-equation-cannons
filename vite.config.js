import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const ReactCompilerConfig = {
    target: '18',
    runtimeModule: "react-compiler-runtime",
};

export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [
                    ["babel-plugin-react-compiler", ReactCompilerConfig],
                ],
            },
        }),
    ],
    base: '/simultaneous-equation-cannons/', // Set base url for gh-pages
    build: {
        outDir: 'build', // Maintain 'build' output directory for consistency with previous deploy scripts or change to dist
    },
});
