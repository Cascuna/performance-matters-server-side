const sparql = require('./sparql')
var express = require('express')
var router = express.Router()
var app = express();
const jsdom = require("jsdom")
var components = require("server-components")
const { JSDOM } = jsdom
var L = require('leaflet-headless')
app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies
// Configuring the nj path as /templates

var components = require("server-components")

router.all('/', function (req, res) {
 
  // // console.log(L.map('test'))
  // // const map = L.map(document.createElement('div')).setView([52, 4], 10)
  // var map = L.map(document.createElement('div')).setView([52.3367, 4.9000], 10);

  // var marker = L.marker([52, 4]).addTo(map);

  // var latlngs = [[52, 4], [54, 4], [54, 6], [52, 6], [52, 4]];
  // var polyline = L.polyline(latlngs).addTo(map);
  // var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   maxZoom: 19,
  //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  // }).addTo(map);
  
  // map.saveImage('test.png', function (filename) {
  //   console.log('Saved map image to ' + filename);
  // });
  sparql.allBuildings().then((buildings) => {
    res.render('index.html', 
    {buildings: buildings,
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
    res.render('index.html', 
    {buildings: newBuildings,
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