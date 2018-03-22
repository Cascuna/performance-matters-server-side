var config = {}


config.title = 'Amsterdam door de jaren heen'

config.sparqlEndpoints = {} 

// Endpoints
config.sparqlEndpoints.adamEndpointPrefix = `https://api.data.adamlink.nl/datasets/AdamNet/all/services/endpoint/sparql?default-graph-uri=&query=`,
config.sparqlEndpoints.adamEndpointSuffix =  `&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on`,
config.sparqlEndpoints.gettyPrefix = `http://vocab.getty.edu/sparql.json?query=`,
config.sparqlEndpoints.gettySuffix = `&implicit=false&implicit=true&equivalent=false&form=%2Fsparql`

module.exports = config;
