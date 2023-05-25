// Names of categories
const categoryNames = {
    "pl_name": "Planet name",
    "hostname": "Star name",
    "sy_snum": "Number of stars",
    "sy_pnum": "Number of planets",
    "discoverymethod": "Discovery method",
    "disc_year": "Discovery year",
    "disc_facility": "Discovered by",
    "pl_controv_flag": "Controversial flag",
    "pl_orbper": "Orbital period (days)",
    "pl_orbpererr1": "Orbital period error plus",
    "pl_orbpererr2": "Orbital period error minus",
    "pl_orbperlim": "Orbital period limit",
    "pl_orbsmax": "Semi-major axis (AU)",
    "pl_orbsmaxerr1": "Semi-major axis error plus",
    "pl_orbsmaxerr2": "Semi-major axis error minus",
    "pl_orbsmaxlim": "Semi-major axis limit",
    "pl_rade": "Radius (Earth radii)",
    "pl_radeerr1": "Radius error plus",
    "pl_radeerr2": "Radius error minus",
    "pl_radelim": "Radius limit",
    "pl_radj": "Radius (Jupiter radii)",
    "pl_radjerr1": "Radius error plus",
    "pl_radjerr2": "Radius error minus",
    "pl_radjlim": "Radius limit",
    "pl_bmasse": "Mass (Earth masses)",
    "pl_bmasseerr1": "Mass error plus",
    "pl_bmasseerr2": "Mass error minus",
    "pl_bmasselim": "Mass limit",
    "pl_bmassj": "Mass (Jupiter masses)",
    "pl_bmassjerr1": "Mass error plus",
    "pl_bmassjerr2": "Mass error minus",
    "pl_bmassjlim": "Mass limit",
    "pl_bmassprov": "Mass provenance",
    "pl_orbeccen": "Orbital eccentricity",
    "pl_orbeccenerr1": "Orbital eccentricity error plus",
    "pl_orbeccenerr2": "Orbital eccentricity error minus",
    "pl_orbeccenlim": "Orbital eccentricity limit",
    "pl_insol": "Insolation flux (Earth flux)",
    "pl_insolerr1": "Insolation flux error plus",
    "pl_insolerr2": "Insolation flux error minus",
    "pl_insollim": "Insolation flux limit",
    "pl_eqt": "Equilibrium temperature (Kelvin)",
    "pl_eqterr1": "Equilibrium temperature error plus",
    "pl_eqterr2": "Equilibrium temperature error minus",
    "pl_eqtlim": "Equilibrium temperature limit",
    "ttv_flag": "TTV flag",
    "st_spectype": "Stellar spectral type",
    "st_teff": "Stellar effective temperature (Kelvin)",
    "st_tefferr1": "Stellar effective temperature error plus",
    "st_tefferr2": "Stellar effective temperature error minus",
    "st_tefflim": "Stellar effective temperature limit",
    "st_rad": "Stellar radius (Solar radii)",
    "st_raderr1": "Stellar radius error plus",
    "st_raderr2": "Stellar radius error minus",
    "st_radlim": "Stellar radius limit",
    "st_mass": "Stellar mass (Solar masses)",
    "st_masserr1": "Stellar mass error plus",
    "st_masserr2": "Stellar mass error minus",
    "st_masslim": "Stellar mass limit",
    "st_met": "Stellar metallicity",
    "st_meterr1": "Stellar metallicity error plus",
    "st_meterr2": "Stellar metallicity error minus",
    "st_metlim": "Stellar metallicity limit",
    "st_metratio": "Stellar metallicity ratio",
    "st_logg": "Stellar surface gravity (log g)",
    "st_loggerr1": "Stellar surface gravity error plus",
    "st_loggerr2": "Stellar surface gravity error minus",
    "st_logglim": "Stellar surface gravity limit",
    "rastr": "Right Ascension (string)",
    "ra": "Right Ascension (decimal degrees)",
    "decstr": "Declination (string)",
    "dec": "Declination (decimal degrees)",
    "sy_dist": "Distance from Sun (parsecs)",
    "sy_disterr1": "Distance error plus",
    "sy_disterr2": "Distance error minus",
    "sy_vmag": "Visual magnitude",
    "sy_vmagerr1": "Visual magnitude error plus",
    "sy_vmagerr2": "Visual magnitude error minus",
    "sy_kmag": "K-band magnitude",
    "sy_kmagerr1": "K-band magnitude error plus",
    "sy_kmagerr2": "K-band magnitude error minus",
    "sy_gaiamag": "Gaia magnitude",
    "sy_gaiamagerr1": "Gaia magnitude error plus",
    "sy_gaiamagerr2": "Gaia magnitude error minus"
}

// Add categories to table
let tableBody = d3.select("#tableBody");
for (const key in categoryNames) {
    if (key!="pl_name") {
        tableBody.append("tr").attr("id", key).append("td").text(categoryNames[key]);
    }
}

let dataset = [];

// Add planets to svg
let canvas = d3.select("#svg-canvas")
d3.json("data/dataset.json").then((data, index) => {
    console.log(data.length)
    data.forEach((planet, index) => {
        data[index].id = index;
        // draw planet circle
        canvas.append("circle")
            .attr("cx", planet.ra)
            .attr("cy", planet.dec)
            .attr("r", 0.2)
            .attr("fill", "#afa")
            // Assign index as uuid of planets to easily find them
            .attr("id", index)
            .attr("class", "planet")
            .attr("onclick", "displayData(" + index + ")");
    })
    dataset = data;
    //displayData(data[0]);
})

function displayData(id) {
    let head = d3.select("#tableHeadRow");
    let body = d3.select("#tableBody");
    // Get the desired planet using its id
    element = dataset[id];
    head.append("td").text(element.pl_name).attr("class", "id" + element.id).append("div").text("[X]").attr("onclick", "removeData(" + element.id + ")");
    for (const key in element) {
        if (element.hasOwnProperty(key) && key!="pl_name") {
            d3.select("#" + key).append("td").text(element[key]).attr("class", "id" + element.id);
        }
    }
}

function removeData(id) {
    console.log(id)
    table = d3.select("#table").selectAll(".id" + id).remove();
}