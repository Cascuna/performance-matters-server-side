var select = require("../../building/sparql")

{
    var yearSelect = document.getElementById("yearselection")
    
    // TODO : Change with virtual dom :)
    yearSelect.addEventListener("change", (event) => {

        select.allBuildingsByYear(event.target.value).then((buildings) => {
            var buildingList = document.getElementById('buildings-container')
            buildingList.innerHTML = ''
            for(var building of buildings) {
                var buildingEl = document.createElement("div")
                buildingEl.innerHTML = building.label.value
                buildingList.appendChild(buildingEl)
                console.log(buildingList)
            }
        })
    })
}