var mymap = L.map('mapid').setView([52.3555, 1.1743], 5);


var Stamen_Toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(mymap);

// var redMarker = L.ExtraMarkers.icon({
    
//     iconSize: [34, 34],
//     markerColor: 'red',
//     prefix: 'fa',
//     icon: 'fa-spinner',
//     iconColor: '#fff',
//     iconRotate: 0,
//     extraClasses: 'fa-spin',
//     number: '',
//     svg: false
//   });

//   L.marker([52.3555, 1.1743], {icon: redMarker}).addTo(mymap);

$(document).ready(() => {
    $('#countriesDataList').on('change', function() {
        if ($('#countriesDataList').val() == '' ){
            mymap.remove()
        }
    })
})

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
                        style: {color: "rgb(245, 49, 49)", fillColor: "rgba(0, 119, 73, 0.747)"} 
                    }).addTo(mymap);

                    mapBounds = L.geoJSON(countryPolygon).getBounds();
                    mymap.fitBounds(mapBounds, {padding: [50,50]})
                    
                   
                   }
            }
    
        });
    })
    
// Buttons //

//Information
 $('#countriesDataList').on('change', function(){
    $.ajax({
        url: "php/getcountryinfo.php",
        type: "POST",
        dataType: "json",
        data: {
            selectedCountry: $('#countriesDataList').val(),
            selectedCountryName: $('#countriesDataList option:selected').text()
        },
    
        success: function(result){
            console.log(result);
            if(result.status.name == "ok") {
                
                
                let wikipediaInfo = result['wikipediaInfo'];
                let countriesInfo = result['getCountryInfo'];
    
                // Information Button
                // const informationButton = L.easyButton('fa-solid fa-info fa-lg', function(){
                    $('#countryInfoModalLabel').html(countriesInfo[0]['countryName'] + ' -  ' + countriesInfo[0]['countryCode']);
                    $('#countryInfoModalBody').html(
                        `<p class="modalInfo capitalCity" id="modalP">
                            <b>Capital:</b> ${countriesInfo[0]['capital']}
                        </p>
                        <p class="modalInfo">
                            <b>Continent:</b> ${countriesInfo[0]['continentName']}
                        </p>
                        <p class="modalInfo">
                            <b>Population:</b> ${countriesInfo[0]['population']}
                        </p>
                        <p class="modalInfo" id="wiki">
                        <img src=${wikipediaInfo[0]['thumbnailImg']} height="90"/>
                        ${wikipediaInfo[0]['summary']}
                        <a href="https://${wikipediaInfo[0]['wikipediaUrl']}" target="_blank">Learn More</a>
                        </p>
                    `)
                //     $('#countryInfoModal').modal('show');
                // }).addTo(mymap);
 }}})});

 // Information Buttton               
 L.easyButton('fa-solid fa-info fa-lg', function(){
    $('#countryInfoModal').modal('show');
                }).addTo(mymap);




//Weather
$('#countriesDataList').on('change', function(){
    $.ajax({
        url: "php/getweather.php",
        type: "POST",
        dataType: "json",
        data: {
            selectedCountry: $('#countriesDataList').val()
    
        },

        success: function(result){
            console.log(result);
            if(result.status.name == "ok") {

               let weather = result['getWeather'];
               let countriesInfo = result['getCountryInfo'];
                
               // Weather Button
               
                $('#weatherModalLabel').html(`Weather in ${countriesInfo[0]['capital']}`)
                $('#weatherModalBody').html(`
                <div class="weatherContainer">
                <p class="weatherTitle">
                <b>Current Condition</b>
                </p>
                <img src="http://openweathermap.org/img/w/${weather['weather'][0]['icon']}.png" height="66px"/>
                <div class="weatherBar">
                <p>Temp: ${weather['main']['temp']}°C | ${weather['weather'][0]['description']}
                 | Feels like: ${weather['main']['feels_like']}°C | Wind: ${weather['wind']['speed']}mph
                 </p>
                </div>
                </div>
                `)
                }}});
            })

// Weather Button
L.easyButton("fas fa-cloud-sun-rain fa-lg", function(){
    $('#weatherModal').modal('show');
}).addTo(mymap);

 
    
    
    
    
    
        // Currency
    $('#countriesDataList').on('change', function(){
         $.ajax({
            url: "php/getcurrency.php",
            type: "POST",
            dataType: "json",
            data: {
             selectedCountry: $('#countriesDataList').val()
            },
            
            success: function(result){
                console.log(result);
                if(result.status.name == "ok") {
            
                   
                    let currency = result['getCurrency'];
                    let countriesInfo = result['getCountryInfo'];

                    $('#currencyModalLabel').html(`Exchange rates - ${countriesInfo[0]['countryName']}`)
                    $('#currencyModalBody').html(`
                        <p class="modalInfo">
                            $1 = ${currency} ${countriesInfo[0]['currencyCode']}
                        </p>
                        `) 
                        }}});
                        })

// Currency Button             
 L.easyButton("fa-solid fa-coins fa-lg", function(){
     $('#currencyModal').modal('show');
}).addTo(mymap);



// Country Coords
$('#countriesDataList').on('change', function(){
    $.ajax({
        url: "php/getcountrymarkers.php",
        type: "POST",
        dataType: "json",
        data: {
            selectedCountry: $('#countriesDataList').val()
        },

        success: function(result){
            console.log(result);
            if(result.status.name == "ok") {

            coords = result['geocoding'];
            markers = result['getMarkers'];
                
               }
        }

    });
})