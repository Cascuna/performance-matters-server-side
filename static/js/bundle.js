(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
const sparqlQueryHandler = require('../utils/sparql')
const config = require('../config')

const churchQuery = `
	SELECT * WHERE {
	  ?building rdf:type hg:Building .
	  ?building rdf:type hg:Building .
	  ?building skos:prefLabel ?label .
	  ?building geo:hasGeometry/geo:asWKT ?wkt .
	  optional{?building owl:sameAs ?sameas } .
	  optional{?building sem:hasEarliestBeginTimeStamp ?earliestBegin } .
	  optional{?building sem:hasLatestBeginTimeStamp ?latestBegin } .
	  optional{?building sem:hasEarliestEndTimeStamp ?earliestEnd } .
	} `
var buildings = []

// function determineActiveBuildings(year, obj){

//     let end = 2020
//     let begin = 0
//     try {
//         end = obj.earliestEnd.value
//     } catch {}
//     try {
//         begin = obj.earliestBegin.value
//     } catch {}
    
//     try{
//     return(obj.earliestBegin.value-year < 10 && obj.earliestBegin.value-year > -1)
//     }catch{return false}
// }

// convertWktToGeoJson = function(building) {
//     const wkt = building.wkt.value
//     if (!wkt.includes('Array')){
//         var wicket = new Wkt.Wkt()
//         wicket.read(wkt)
//         wicket.write()
//         building.GeoJsonData = wicket.toJson()
//         building.geoJson = L.geoJSON(wicket.toJson(), {
//             pointToLayer: function(geoJsonPoint, latlng) {
//                 return L.marker(latlng, { icon: L.AwesomeMarkers.icon({
//                     icon: 'help-buoy',
//                     markerColor: 'red'
//                     })
//                 });
//             }
//         })
//         if(determineActiveBuildings(intialSlider, building)) {
//             building.geoJson
//             .bindPopup(generatePopup(building))
//             .setStyle({color: "#ff0000"})
//             .addTo(featuregroup)
//             .on('click', onClick)	
//         }	
//     } else {
//         building.geoJson = {_leaflet_id: -1}
//     }
//     return building
// }

exports.allBuildings = function(req, res) {
    return sparqlQueryHandler.sendQuery(churchQuery)
    .then((data) => {
        buildings = data.results.bindings.map((binding) => {
            // let newBinding = convertWktToGeoJson(binding)
            return binding 
            // return newBinding
            }
        )
    return buildings
    })
}


exports.determineActiveBuildings = function (year, obj){
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
    

  exports.allBuildingsByYear = (year) => {
    return this.allBuildings().then((buildings) => {
        var newBuildings = buildings.filter((building) =>
          {
            if(this.determineActiveBuildings(year, building)){
              return building
            } 
          })
          return newBuildings
      })
}

},{"../config":2,"../utils/sparql":5}],2:[function(require,module,exports){
var config = {}


config.title = 'Amsterdam door de jaren heen'

config.sparqlEndpoints = {} 

// Endpoints
config.sparqlEndpoints.adamEndpointPrefix = `https://api.data.adamlink.nl/datasets/AdamNet/all/services/endpoint/sparql?default-graph-uri=&query=`,
config.sparqlEndpoints.adamEndpointSuffix =  `&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on`,
config.sparqlEndpoints.gettyPrefix = `http://vocab.getty.edu/sparql.json?query=`,
config.sparqlEndpoints.gettySuffix = `&implicit=false&implicit=true&equivalent=false&form=%2Fsparql`

module.exports = config;

},{}],3:[function(require,module,exports){
module.exports = exports = window.fetch;
exports.Headers = window.Headers;
exports.Request = window.Request;
exports.Response = window.Response;

},{}],4:[function(require,module,exports){
const select = require("../../building/sparql")

{
    var yearSelect = document.getElementById("yearselection")

    yearSelect.addEventListener("change", (event) => {
        select.allBuildingsByYear(1970).then((buildings) => {
            for(var building of buildings) {
                var buildingEl = document.createElement("div")
                console.log(buildingEl)
                document.body.appendChild(buildingEl)
            }
        })
    })
}
},{"../../building/sparql":1}],5:[function(require,module,exports){
const fetch = require("node-fetch")
const config = require('../config')

module.exports = sparqlQueryHandler = {
    queryPrefixes: `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX hg: <http://rdf.histograph.io/>
    PREFIX dc: <http://purl.org/dc/elements/1.1/>
    PREFIX dct: <http://purl.org/dc/terms/>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX sem: <http://semanticweb.cs.vu.nl/2009/11/sem/>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX geo: <http://www.opengis.net/ont/geosparql#>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>`,
     
    // Dispatcher where you can interface to send the query
    sendQuery: function(query, urlPrefix = config.sparqlEndpoints.adamEndpointPrefix, urlSuffix = config.sparqlEndpoints.adamEndpointSuffix){
        return new Promise((resolve, reject) => {
            var self = this 
            completeQuery = this.constructQuery(query)
            completeUrl = this.prepareUrl(completeQuery, urlPrefix, urlSuffix)
            fetch(completeUrl)
            .then((resp) => {
                resolve(resp.json())})
            .catch((error) => reject(error))
        })	
    },
    constructQuery: function(query){
        return this.queryPrefixes + query
    },
    prepareUrl: function(query, prefix, suffix ) {
        encodedQuery = encodeURIComponent(query)
        return prefix + encodedQuery + suffix
    }
}



function generatePopup(object){
    let datestring = ''
        try {
            datestring = object.earliestBegin.value
        }
        catch(e){
            datestring = 'geen begin datum'
        }
    return popupText = `${object.label.value} ${datestring}`
}
},{"../config":2,"node-fetch":3}]},{},[4]);
