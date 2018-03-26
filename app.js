const express = require('express')
const nunjucks = require('nunjucks')
const sparqlIndex = require('./building/index')
const app = express()
// Using config like settings
const config = require('./config')
var compression = require('compression')
var router = express.Router()
var path = require('path')


// Fixes static file bug, docs are outdated
express.static('global')
app.use(compression())
// Changed this from "/static" to "/" so i can register the serverworker! 
app.use(express.static(path.join(__dirname, '/')))

// Configuring the nj path as /templates
nunjucks.configure('templates', {
    autoescape: true,
    express: app
})


app.use('/', sparqlIndex)

app.get('/pwaoffline',function(request, response) {
    response.render('offline.html')
}) 

app.listen(config.port, () => {console.log(config.title + " running on port 3080")})