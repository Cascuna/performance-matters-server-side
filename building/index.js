const sparql = require('./sparql')
var express = require('express')
var router = express.Router()
var app = express();
const jsdom = require("jsdom")
var components = require("server-components")
const config = require('../config')
const { JSDOM } = jsdom
var L = require('leaflet-headless')
app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies
// Configuring the nj path as /templates

var components = require("server-components")

router.all('/', function (req, res) {
 
  sparql.allBuildings().then((buildings) => {
    res.render('index.html', {
      buildings: buildings, 
      config: config
    })
  })
})


router.all('/buildings/', function (req, res) {
    newBuildings = sparql.allBuildingsByYear(req.query.year).then((newBuildings)=>
  {
    res.render('index.html', {
      year: req.query.year, 
      buildings: newBuildings,
      config: config
    })
  })
})

module.exports = router 