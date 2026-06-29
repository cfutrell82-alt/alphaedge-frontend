// AlphaEdge Service Worker — Push Notifications
const CACHE_NAME = 'alphaedge-v1';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

self.addEventListener('push', (e) => {
  const data = e.data ? e.data.json() : {};
  const options = {
    body: data.body || 'New signal from AlphaEdge',
    icon: '/alphaedge-coin.png',
    badge: '/alphaedge-coin.png',
    image: data.image || null,
    vibrate: [200, 100, 200],
    data: { url: data.url || 'https://alphaedgetrading.site/alphaedge-dashboard.html' },
    actions: [
      { action: 'view', title: '📊 View Signal' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };
  e.waitUntil(self.registration.showNotification(data.title || '⚡ AlphaEdge Signal', options));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  if (e.action === 'view' || !e.action) {
    e.waitUntil(clients.openWindow(e.notification.data.url));
  }
});
