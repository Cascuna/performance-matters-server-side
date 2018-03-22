const express = require('express')
const nunjucks = require('nunjucks')
const sparqlIndex = require('./building/index')
const app = express()
// Using config like settings
const config = require('./config')

var router = express.Router();
console.log(sparqlIndex)

// Fixes static file bug, docs are outdated
express.static('global')
app.use(express.static('static'))

// Configuring the nj path as /templates
nunjucks.configure('templates', {
    autoescape: true,
    express: app
})


app.use('/', sparqlIndex)

app.listen(3080, () => {console.log('houston, we have connection')})