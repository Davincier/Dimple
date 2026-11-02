var C='dimple-v1',A=['./','index.html','hero.mp4','drawing.mp4','hero.jpg','drawing.jpg','icon-192.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(A)}));self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}));self.clients.claim()});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET')return;
e.respondWith(fetch(e.request).then(function(r){if(r.ok&&r.status===200){var c=r.clone();caches.open(C).then(function(x){x.put(e.request,c)}).catch(function(){})}return r}).catch(function(){return caches.match(e.request).then(function(r){return r||caches.match('index.html')})}))});
