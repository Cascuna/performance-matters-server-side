// This is located in root so it can access all html files that we would want to cache

var swConsolePrefix = '[Service Worker]'

self.addEventListener('install', function(event) {
    console.log(swConsolePrefix + 'Installing Service Worker ..', event)
    // create a new cache instance or open the instance
    // Wait untill cache preperation is done to continue
    event.waitUntil(
        caches.open('precache')
        .then(function(cache) {
            console.log(swConsolePrefix + ' Precaching App Shell')
            cache.add('static/js/bundle.js')
            cache.add('templates/index.html')
            cache.add('/')
        })
    )
      

})

// This won't fire after the install if you reload the tab, it has to be closed first
// the service worker does this to guarantee that the page will only use the new serviceworker if all pages that use the old one aren't activate anymore
self.addEventListener('activate', function(event) {
    console.log(swConsolePrefix + ' Activating Service Worker ..', event)
    // Ensure service workers are activated/loaded correctly
    return self.clients.claim()
})

// Works like a network proxy
self.addEventListener('fetch', function(event){
    console.log(swConsolePrefix + ' Fetching file ..', event)
    // Override event data
    event.respondWith(
        // The key is always a request object
        // Note that .match will NEVER hit .catch() if it doesn't find the item, it will simply return null
        caches.match(event.request)
        .then(function(response){
            if(response) {
                return response
            } else{
                return fetch(event.request)
            }
        })
    )
})