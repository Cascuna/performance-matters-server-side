(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){const sparqlQueryHandler=require("../utils/sparql");const config=require("../config");const churchQuery=`\n\tSELECT * WHERE {\n\t  ?building rdf:type hg:Building .\n\t  ?building rdf:type hg:Building .\n\t  ?building skos:prefLabel ?label .\n\t  ?building geo:hasGeometry/geo:asWKT ?wkt .\n\t  optional{?building owl:sameAs ?sameas } .\n\t  optional{?building sem:hasEarliestBeginTimeStamp ?earliestBegin } .\n\t  optional{?building sem:hasLatestBeginTimeStamp ?latestBegin } .\n\t  optional{?building sem:hasEarliestEndTimeStamp ?earliestEnd } .\n\t} `;var buildings=[];exports.allBuildings=function(req,res){return sparqlQueryHandler.sendQuery(churchQuery).then(data=>{buildings=data.results.bindings.map(binding=>{return binding});return buildings})};exports.determineActiveBuildings=function(year,obj){let end=2020;let begin=0;try{end=obj.earliestEnd.value}catch(e){}try{begin=obj.earliestBegin.value}catch(e){}try{return obj.earliestBegin.value-year<10&&obj.earliestBegin.value-year>-1}catch(e){return false}};exports.allBuildingsByYear=(year=>{return this.allBuildings().then(buildings=>{var newBuildings=buildings.filter(building=>{if(this.determineActiveBuildings(year,building)){return building}});return newBuildings})})},{"../config":2,"../utils/sparql":5}],2:[function(require,module,exports){var config={};config.title="Amsterdam door de jaren heen";config.sparqlEndpoints={};config.sparqlEndpoints.adamEndpointPrefix=`https://api.data.adamlink.nl/datasets/AdamNet/all/services/endpoint/sparql?default-graph-uri=&query=`,config.sparqlEndpoints.adamEndpointSuffix=`&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on`,config.sparqlEndpoints.gettyPrefix=`http://vocab.getty.edu/sparql.json?query=`,config.sparqlEndpoints.gettySuffix=`&implicit=false&implicit=true&equivalent=false&form=%2Fsparql`;module.exports=config},{}],3:[function(require,module,exports){module.exports=exports=window.fetch;exports.Headers=window.Headers;exports.Request=window.Request;exports.Response=window.Response},{}],4:[function(require,module,exports){var select=require("../../building/sparql");{var yearSelect=document.getElementById("yearselection");yearSelect.addEventListener("change",event=>{select.allBuildingsByYear(event.target.value).then(buildings=>{var buildingList=document.getElementById("buildings-container");buildingList.innerHTML="";for(var building of buildings){var buildingEl=document.createElement("div");buildingEl.innerHTML=building.label.value;buildingList.appendChild(buildingEl);console.log(buildingList)}})})}},{"../../building/sparql":1}],5:[function(require,module,exports){const fetch=require("node-fetch");const config=require("../config");module.exports=sparqlQueryHandler={queryPrefixes:`\n    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n    PREFIX hg: <http://rdf.histograph.io/>\n    PREFIX dc: <http://purl.org/dc/elements/1.1/>\n    PREFIX dct: <http://purl.org/dc/terms/>\n    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\n    PREFIX sem: <http://semanticweb.cs.vu.nl/2009/11/sem/>\n    PREFIX owl: <http://www.w3.org/2002/07/owl#>\n    PREFIX geo: <http://www.opengis.net/ont/geosparql#>\n    PREFIX foaf: <http://xmlns.com/foaf/0.1/>`,sendQuery:function(query,urlPrefix=config.sparqlEndpoints.adamEndpointPrefix,urlSuffix=config.sparqlEndpoints.adamEndpointSuffix){return new Promise((resolve,reject)=>{var self=this;completeQuery=this.constructQuery(query);completeUrl=this.prepareUrl(completeQuery,urlPrefix,urlSuffix);fetch(completeUrl).then(resp=>{resolve(resp.json())}).catch(error=>reject(error))})},constructQuery:function(query){return this.queryPrefixes+query},prepareUrl:function(query,prefix,suffix){encodedQuery=encodeURIComponent(query);return prefix+encodedQuery+suffix}};function generatePopup(object){let datestring="";try{datestring=object.earliestBegin.value}catch(e){datestring="geen begin datum"}return popupText=`${object.label.value} ${datestring}`}},{"../config":2,"node-fetch":3}]},{},[4]);