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
            cache.addAll([
                '/',
                'static/js/bundle.js',
                'https://fonts.googleapis.com/css?family=Ubuntu+Mono'
            ])
        })
        .catch(function(error) {console.log(swConsolePrefix + 'Issue while trying to precache ' + error)})
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
                .then(function(newResponse){
                    return caches.open('dynamiccache')
                        .then(function(cache) {
                            // Put differs from add, requires you to define a key it gets saved under aswell. Doesn't make any requests unlinke Add
                            // .clone() clones the response because otherwise the newResponse is consumed and we can't return it. Remember, you can only use a result of a promise one
                            cache.put(event.request.url, newResponse.clone())
                            return newResponse
                        })
                    })
                    .catch(function(error){ swConsolePrefix + ' Fetch had a error' + error} 
                    )
                }
        })
    )
})