/* The Roundtable service worker.
 * Strategy: network-first for pages/data (deploys show up immediately),
 * cache-first for heavy static assets (fast repeat loads in the field).
 * Bump CACHE_V on breaking asset changes. */
/* MUST be bumped whenever anything under voices/ changes. Those files are
   cache-first, so a stale entry is served forever otherwise: the fix that
   stripped dossier scaffolding ("Our doctrine: ...") out of 33 voice libraries
   shipped while this string stood still, and every installed app kept serving
   the broken scripts. */
const CACHE_V = 'rt-v4-voices-2026-08-24';
const STATIC_FIRST = [/\/xlsx\.full\.min\.js$/, /\/voices\/.+\.json$/, /\/icons\/.+\.png$/, /fonts\.(googleapis|gstatic)\.com/];

self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => {
    e.waitUntil((async () => {
        for (const k of await caches.keys()) if (k !== CACHE_V) await caches.delete(k);
        await self.clients.claim();
    })());
});

self.addEventListener('fetch', (e) => {
    const req = e.request;
    if (req.method !== 'GET') return;
    const url = req.url;
    const isStatic = STATIC_FIRST.some((rx) => rx.test(url));

    e.respondWith((async () => {
        const cache = await caches.open(CACHE_V);
        if (isStatic) {
            const hit = await cache.match(req);
            if (hit) return hit;
            const res = await fetch(req);
            if (res.ok) cache.put(req, res.clone());
            return res;
        }
        // network-first with cache fallback (offline shell for pages/data)
        try {
            const res = await fetch(req);
            if (res.ok && new URL(url).origin === location.origin) cache.put(req, res.clone());
            return res;
        } catch (err) {
            const hit = await cache.match(req);
            if (hit) return hit;
            throw err;
        }
    })());
});
