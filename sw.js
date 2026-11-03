var C='dimple-v10',A=['./','index.html','hero.jpg','drawing.jpg','icon-192.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return Promise.all(A.map(function(u){return c.add(u).catch(function(){})}))}));self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}));self.clients.claim()});
self.addEventListener('fetch',function(e){if(e.request.destination==='video'||e.request.headers.has('range')||e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
e.respondWith(fetch(e.request).then(function(r){if(r.ok&&r.status===200){var c=r.clone();caches.open(C).then(function(x){x.put(e.request,c)}).catch(function(){})}return r}).catch(function(){return caches.match(e.request).then(function(r){return r||caches.match('index.html')})}))});
