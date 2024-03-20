import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import mkcert from 'vite-plugin-mkcert';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        // mkcert(),
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
                background_color: '#ffffff',
                orientation: 'portrait',
                icons: [
                    {
                        src: '/vite.svg',
                        sizes: '32x32',
                        type: 'image/svg+xml'
                    },
                    {
                        src: '/logo.jpg',
                        sizes: '192x192',
                        type: 'image/jpg'
                    },
                    {
                        src: '/logo.jpg',
                        sizes: '512x512',
                        type: 'image/jpg'
                    },
                    {
                        src: '/logo.jpg',
                        sizes: '180x180',
                        type: 'image/jpg',
                        purpose: 'apple touch icon'
                    },
                    {
                        src: '/logo.jpg',
                        sizes: '225x225',
                        type: 'image/jpg',
                        purpose: 'any maskable'
                    }
                ]
            }
        })
    ],
    server: {
        port: 3000
        // https: true
    },
    build: {
        outDir: 'build'
    }
});
