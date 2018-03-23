var select = require("../../building/sparql")

{
    var yearSelect = document.getElementById("yearselection")
    
    // TODO : Change with virtual dom :)
    yearSelect.addEventListener("change", (event) => {   
        document.getElementById('yearform').submit(event.target.value)
    })
}