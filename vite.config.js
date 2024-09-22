import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
    plugins: [
        react(),
        nodePolyfills({
            include: ['path', 'crypto', 'os', 'fs', 'http', 'child_process']
        })
    ],
    resolve: {
        alias: {
            './runtimeConfig': './runtimeConfig.browser',
        },
    },
    define: {
        global: {},
    },
});