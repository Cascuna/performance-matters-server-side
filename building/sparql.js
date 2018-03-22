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
