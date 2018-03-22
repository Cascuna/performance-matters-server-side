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