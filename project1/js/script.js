// Loading map
var mymap = L.map('mapid').setView([52.3555, 1.1743], 5);

var Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(mymap);

// Adding country Lists

    $.ajax({
        url: "php/getallcountries.php",
        type: 'GET',
        dataType: 'json',
        data: {},

        success: function(result) {
        console.log(result);
        if(result.status.name == "ok") {
            
            countryList = result['countryList'];

            
                countryList.forEach(country => {
                    let option = document.createElement("option");
                    option.classList.add("option");
                    option.value = country['code'];
                    option.text = country['name'];
                    $("#countriesDataList").append(option);
                    
                });
        }
    }
    });

   
    // Country Polygons

    $.ajax({
        url: "php/getcountrypolygon.php",
        type: "GET",
        dataType: "json",
        data: {
           selectedCountry: $('.option').val()
        },

        success: function(result){
            console.log(result);
            if(result.status.name == "ok") {

                countryPolygon = result["countryPolygons"];

                L.geoJSON(countryPolygon, {
                    style: {color: "rgba(0, 28, 119, 0.678)", fillColor: "#fff"} 
                }).addTo(mymap);

                $('.option').append({
                    value: countryPolygon['properties']['iso_a2'],
                    selected: countryPolygon['properties']['name']
                })
            }
        }

    });

        