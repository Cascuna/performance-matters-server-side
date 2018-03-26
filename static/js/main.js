var select = require("../../building/sparql")


var yearSelect = document.getElementById("yearselection")

// TODO : Change with virtual dom :)
yearSelect.addEventListener("change", (event) => {   
    document.getElementById('yearform').submit(event.target.value)
})



// Feature detection for serviceWorkers
// you can use a JS object with {scope} to define the down-traversal of the scope future, eg if you only want to acces templates you can do /templates
// Note that this doesn't work for up-traversal
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('../../sw.js', {scope: '/'})
    .then(() => {
        console.log('Service worker has been registered')
    })
}