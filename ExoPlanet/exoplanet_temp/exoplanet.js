// All categories except errors
const categoryNames = {"pl_name": "Planet name",
    "hostname": "Star name",
    "sy_snum": "Number of Stars",
    "sy_pnum": "Number of Planets",
    "discoverymethod": "Discovery method",
    "disc_year": "Discovery year",
    "disc_facility": "Discovered by",
    "pl_controv_flag": 0,
    "pl_orbper": 136.75,
    "pl_orbpererr1": 0.25,
    "pl_orbpererr2": -0.25,
    "pl_orbperlim": 0,
    "pl_orbsmax": 0.68,
    "pl_orbsmaxerr1": "",
    "pl_orbsmaxerr2": "",
    "pl_orbsmaxlim": 0,
    "pl_rade": 13.2,
    "pl_radeerr1": "",
    "pl_radeerr2": "",
    "pl_radelim": 0,
    "pl_radj": 1.18,
    "pl_radjerr1": "",
    "pl_radjerr2": "",
    "pl_radjlim": 0,
    "pl_bmasse": 890,
    "pl_bmasseerr1": "",
    "pl_bmasseerr2": "",
    "pl_bmasselim": 0,
    "pl_bmassj": 2.8,
    "pl_bmassjerr1": "",
    "pl_bmassjerr2": "",
    "pl_bmassjlim": 0,
    "pl_bmassprov": "Msini",
    "pl_orbeccen": 0,
    "pl_orbeccenerr1": "",
    "pl_orbeccenerr2": "",
    "pl_orbeccenlim": 0,
    "pl_insol": "",
    "pl_insolerr1": "",
    "pl_insolerr2": "",
    "pl_insollim": "",
    "pl_eqt": "",
    "pl_eqterr1": "",
    "pl_eqterr2": "",
    "pl_eqtlim": "",
    "ttv_flag": 0,
    "st_spectype": "G9 III",
    "st_teff": 4780,
    "st_tefferr1": 30,
    "st_tefferr2": -30,
    "st_tefflim": 0,
    "st_rad": 12,
    "st_raderr1": "",
    "st_raderr2": "",
    "st_radlim": 0,
    "st_mass": 2.2,
    "st_masserr1": "",
    "st_masserr2": "",
    "st_masslim": 0,
    "st_met": -0.205,
    "st_meterr1": 0.039,
    "st_meterr2": -0.039,
    "st_metlim": 0,
    "st_metratio": "[Fe/H]",
    "st_logg": 2.66,
    "st_loggerr1": 0.11,
    "st_loggerr2": -0.11,
    "st_logglim": 0,
    "rastr": "19h54m14.99s",
    "ra": 298.5624491,
    "decstr": "+08d27m39.98s",
    "dec": 8.4611051,
    "sy_dist": 56.1858,
    "sy_disterr1": 0.55975,
    "sy_disterr2": -0.55975,
    "sy_vmag": 4.70964,
    "sy_vmagerr1": 0.023,
    "sy_vmagerr2": -0.023,
    "sy_kmag": 2.171,
    "sy_kmagerr1": 0.22,
    "sy_kmagerr2": -0.22,
    "sy_gaiamag": 4.42501,
    "sy_gaiamagerr1": 0.0038369,
    "sy_gaiamagerr2": -0.0038369
}

// Add categories to table
let table = d3.select("#categoryTable")

// Add planets to svg
let canvas = d3.select("#svg-canvas")
d3.json("data/dataset.json").then((data, index) => {
    console.log(data.length)
    data.forEach(planet => {
        // draw planet circle
        canvas.append("circle")
            .attr("cx", planet.ra)
            .attr("cy", planet.dec)
            .attr("r", 0.2)
            .attr("fill", "#afa")
            // Assign index as uuid of planets to easily find them
            .attr("class", "planet " + index);
            
        planet.id = index;
    })
})