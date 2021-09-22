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
    $('#countriesDataList').on('change', function(){
        $.ajax({
            url: "php/getcountrypolygon.php?selectedCountry=" + $('#countriesDataList').val(),
            type: "GET",
            dataType: "json",
            data: {
                //selectedCountry: $('.option').val()
            },
    
            success: function(result){
                console.log(result);
                if(result.status.name == "ok") {
    
                    countryPolygon = result["countryPolygons"];
                    geocoding = result['geocoding'];

                    

                    L.geoJSON(countryPolygon, {
                        style: {color: "rgba(0, 28, 119, 0.678)", fillColor: "#595959"} 
                    }).addTo(mymap);
                    
                    if($('#countriesDataList').val() == '') {
                        mymap.remove();
                    }
                   }
            }
    
        });
    })
    
// Buttons //
 $('#countriesDataList').on('change', function(){
    $.ajax({
        url: "php/getcountryinfo.php",
        type: "POST",
        dataType: "json",
        data: {
            selectedCountry: $('#countriesDataList').val()
        },
    
        success: function(result){
            console.log(result);
            if(result.status.name == "ok") {
                
                
                let wikipediaInfo = result['wikipediaInfo'];
                let countriesInfo = result['getCountryInfo'];
    
                // Information Button
                const informationButton = L.easyButton('fa-solid fa-info fa-lg', function(){
                    $('#countryInfoModalLabel').html(countriesInfo[0]['countryName'] + ' -  ' + countriesInfo[0]['countryCode']);
                    $('#countryInfoModalBody').html(
                        `<p class="modalInfo" id="modalP">
                            <b>Capital:</b> ${countriesInfo[0]['capital']}
                        </p>
                        <p class="modalInfo">
                            <b>Continent:</b> ${countriesInfo[0]['continentName']}
                        </p>
                        <p class="modalInfo">
                            <b>Population:</b> ${countriesInfo[0]['population']}
                        </p>
                    `)
                    $('#countryInfoModal').modal('show');
                }).addTo(mymap);

               
}}})});


// Currency
L.easyButton("fa-solid fa-coins fa-lg", 
function(){

  }).addTo(mymap);


// Weather
L.easyButton("fas fa-cloud-sun-rain fa-lg",
function(){

  }).addTo(mymap);