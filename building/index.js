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

function determineActiveBuildings(year, obj){
  let end = 2020
  let begin = 0
  try {
    end = obj.earliestEnd.value
  } catch(e) {}
  try {
    begin = obj.earliestBegin.value
  } catch(e) {}
  
  try{
  return(obj.earliestBegin.value-year < 10 && obj.earliestBegin.value-year > -1)
  }catch(e){return false}
}

router.all('/buildings/', function (req, res) {
    newBuildings = sparql.allBuildingsByYear(req.query.year).then((newBuildings)=>
  {
    res.render('index.html', {
      buildings: newBuildings,
    })
  })

router.all('/building/:name', function(request, response){
  
  res.render('buildingdetail.html', {
    building: request.params.name
  })
})
   
   
   
})

router.all('/test', function (req, res) {
  res.send('Birds home page')
})

module.exports = router 