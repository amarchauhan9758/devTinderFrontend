// public/service-worker.js

self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    // Cache files, etc.
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated!');
});

self.addEventListener('fetch', (event) => {
    // You can respond to network requests here (optional)
});
