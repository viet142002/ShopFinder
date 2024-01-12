import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        mkcert(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['manifest.json'],
            manifest: {
                name: 'My React PWA',
                short_name: 'ReactPWA',
                description:
                    'My Progressive Web App built with Vite and React.',
                start_url: '.',
                display: 'standalone',
                theme_color: '#000000',
                orientation: 'portrait',
                icons: [
                    {
                        src: '/vite.svg',
                        sizes: '32x32',
                        // type: 'image/png'
                        type: 'image/svg+xml'
                    }
                ]
            }
        })
    ],
    server: {
        proxy: {
            '/api': 'http://localhost:5000'
        },
        port: 3000,
        https: true
    }
});
