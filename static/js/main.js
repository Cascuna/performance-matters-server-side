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