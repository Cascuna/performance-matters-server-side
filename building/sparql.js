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
