const hash = 'f01156038aea2400d28b';
const staticCacheName = `converter-static-${hash}`;

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll([
                '/',
                `main.${hash}.js`,
                'https://fonts.googleapis.com/css?family=Lato:300,400,700,900',
                'https://free.currencyconverterapi.com/api/v5/currencies',
                'https://fonts.gstatic.com/s/lato/v14/S6u9w4BMUTPHh7USSwiPGQ.woff2',
                'https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wXg.woff2'
            ]);
          })
    )
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.filter(cacheName => {
                        return cacheName.startsWith('converter-static-') && cacheName !== staticCacheName; 
                    }).map(cacheName => {
                        return caches.delete(cacheName);
                    })
                )
            })
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then( response=> {
                if (response) return response;
                return fetch(event.request);
            })
    );
});
