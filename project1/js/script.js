var mymap = L.map('mapid').setView([39.7837304, -100.445882], 2);

// var Stadia_Outdoors = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
// 	maxZoom: 20,
// 	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
// }).addTo(mymap);

var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
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
    
    let polygon;
   
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

                    if(polygon){
                        polygon.remove();
                    }

                  polygon = L.geoJSON(countryPolygon, {
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

                function numberWithCommas(x) {
                    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }

                population = numberWithCommas(countriesInfo[0]['population']);
    
                // Information Button
                // const informationButton = L.easyButton('fa-solid fa-info fa-lg', function(){
                    $('#countryInfoModalLabel').html(`<img src="https://www.countryflags.io/${countriesInfo[0]['countryCode']}/flat/64.png"> ${countriesInfo[0]['countryName']}`);
                    $('#countryInfoModalBody').html(
                        `<p class="modalInfo capitalCity" id="modalP">
                            <b>Capital:</b> ${countriesInfo[0]['capital']}
                        </p>
                        <p class="modalInfo">
                            <b>Continent:</b> ${countriesInfo[0]['continentName']}
                        </p>
                        <p class="modalInfo">
                            <b>Population:</b> ${population}
                        </p>
                        <p class="modalInfo" id="wiki">
                        <img src=${wikipediaInfo[1]['thumbnailImg']} height="90"/>
                        ${wikipediaInfo[1]['summary']}
                        <a href="https://${wikipediaInfo[1]['wikipediaUrl']}" target="_blank">Learn More</a>
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

               let weatherRounded = Math.round(weather['main']['temp']);
               let wind = Math.ceil(weather['wind']['speed']);

               function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }

            let weatherDescription = capitalizeFirstLetter(weather['weather'][0]['description']);
                
               // Weather Button
               
                $('#weatherModalLabel').html(`Weather in ${countriesInfo[0]['capital']}`)
                $('#weatherModalBody').html(`
                <div class="row">
                <h5 style="font-size: 2rem;">Today</h5>
                <div class="col-sm weatherTemp">
                <img src="http://openweathermap.org/img/w/${weather['weather'][0]['icon']}.png" height="95"/>
                <p style="font-size: 2.2rem;"><b>${weatherRounded}°C</b></p>
                <p style="color:black; font-size:1.15rem;">${weatherDescription}</p>
                <p style="color:black; font-size:1.15rem;">Wind: ${wind} MPH</p>
                </div>
                </div>
               
                
                `)
                
                // $('#weatherModalBody').html(`
                // <div class="weatherContainer">
                // <p class="weatherTitle">
                // <b>Current Condition</b>
                // </p>
                // <img src="http://openweathermap.org/img/w/${weather['weather'][0]['icon']}.png" height="66px"/>
                // <div class="weatherBar">
                // <p>Temp: ${weather['main']['temp']}°C | ${weather['weather'][0]['description']}
                //  | Feels like: ${weather['main']['feels_like']}°C | Wind: ${weather['wind']['speed']}mph
                //  </p>
                // </div>
                // </div>
                // `)
                }}});
            })

// Weather Button
L.easyButton("fas fa-cloud-sun-rain fa-lg", function(){
    $('#weatherModal').modal('show');
}).addTo(mymap);

 
    
    
    
    
    
        // News
    $('#countriesDataList').on('change', function(){
         $.ajax({
            url: "php/getnews.php",
            type: "POST",
            dataType: "json",
            data: {
             selectedCountry: $('#countriesDataList').val()
            },
            
            success: function(result){
                console.log(result);
                if(result.status.name == "ok") {
            
                   
                    let news = result['news']['sources'];
                    let countryInfo = result['getCountryInfo'];

                    $('#newsInfoBoxLabel').html(`News in ${countryInfo[0]['countryName']}`);
                    if(news[0]){
                        $('#newsInfoBoxBody').html(``);
                    news.forEach((item) => {
                        let listOption = document.createElement("li");
                        listOption.className = "list-group-item";

                        listOption.innerHTML = `
                        <h5>${item['name']}</h5>
                        <p>${item['description']}</p>
                        <p><a href="${item['url']}" class="btn btn-dark btn-sm" target="_blank">Visit Website</a></p>`
                        $('#newsInfoBoxBody').append(listOption);
                    }) 

                    } else {
                        $('#newsInfoBoxBody').html(`Sorry, we were unable to find any news providers in ${countryInfo[0]['countryName']}`);
                    }
                    

                       


                    
                        }}});
                        })

// News Button            
L.easyButton("fas fa-file-alt fa-lg", function(){
    $('#newsModal').modal('show');
}).addTo(mymap);



//Images
$('#countriesDataList').on('change', function(){
    $.ajax({
       url: "php/getimages.php",
       type: "POST",
       dataType: "json",
       data: {
        selectedCountry: $('#countriesDataList').val()
       },
       
       success: function(result){
           console.log(result);
           if(result.status.name == "ok") {
       
            let countriesInfo = result['getCountryInfo'];
               let images = result['images'];
            //    https://live.staticflickr.com/65535/51476794494_c735ae1a0e_w.jpg
            //    https://live.staticflickr.com/{server-id}/{id}_{secret}.jpg
               $('#imagesModalLabel').html(`Images of ${countriesInfo[0]['countryName']}`)
            //    $('.d-block').attr("src",`https://live.staticflickr.com/65535/51476794494_c735ae1a0e.jpg`); 
            if(images['photos']['photo']['length'] > 0){
               $('.d-block1').attr("src",`https://live.staticflickr.com/${images['photos']['photo'][0]['server']}/${images['photos']['photo'][0]['id']}_${images['photos']['photo'][0]['secret']}_w.jpg`); 
               $('#header1').html(`${images['photos']['photo'][0]['title']}`);

               $('.d-block2').attr("src",`https://live.staticflickr.com/${images['photos']['photo'][1]['server']}/${images['photos']['photo'][1]['id']}_${images['photos']['photo'][1]['secret']}_w.jpg`); 
               $('#header2').html(`${images['photos']['photo'][1]['title']}`);

               $('.d-block3').attr("src",`https://live.staticflickr.com/${images['photos']['photo'][2]['server']}/${images['photos']['photo'][2]['id']}_${images['photos']['photo'][2]['secret']}_w.jpg`); 
               $('#header3').html(`${images['photos']['photo'][2]['title']}`);

               $('.d-block4').attr("src",`https://live.staticflickr.com/${images['photos']['photo'][3]['server']}/${images['photos']['photo'][3]['id']}_${images['photos']['photo'][3]['secret']}_w.jpg`); 
               $('#header4').html(`${images['photos']['photo'][3]['title']}`);

               $('.d-block5').attr("src",`https://live.staticflickr.com/${images['photos']['photo'][4]['server']}/${images['photos']['photo'][4]['id']}_${images['photos']['photo'][4]['secret']}_w.jpg`); 
               $('#header5').html(`${images['photos']['photo'][4]['title']}`);
            } else {
                $('#imagesModalBody').html(`Sorry, we were unable to find any images in ${countriesInfo[0]['countryName']}`);
            }

                   }}});
                   })


//Images Button      
L.easyButton("fas fa-image fa-lg", function(){
    $('#imagesModal').modal('show');
}).addTo(mymap);

       

// Icon



let stadiumMarkers;

// Country Markers
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

            let coords = result['geocoding'];
            let stadium = result['stadiums']['features'];

              if(stadiumMarkers){
                stadiumMarkers.remove();
            }

            var footballIcon = L.icon({
                iconUrl: './img/soccerfield.png',
                
            
                iconSize:     [32, 37], // size of the icon
                iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            });

            stadiumMarkers = L.markerClusterGroup();
                
        
            
            stadium.forEach(function(item) {
                // var title = ` <b>Stadium Name:</b> ${item['properties']['name']}`;
                
                    let smarker = stadiumMarkers.addLayer(L.marker([
                    item['geometry']['coordinates'][1],
                    item['geometry']['coordinates'][0]], {icon: footballIcon}).bindPopup(`<b>Stadium Name:</b><br> ${item['properties']['name']}`),
                    
                    
                    
                    )
                    
                
                
               
                
                
                })
                
                mymap.addLayer(stadiumMarkers);
                
                
               }
        }

    });
})

//Get user location
$(document).ready(() => {
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) =>{
            $.ajax({
                url: "php/getlocation.php",
                type: "POST",
                dataType: "json",
                data: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
        
                success: function(result){
                    console.log(result);
                    if(result.status.name == "ok") {
        
                        countryCode = result['countryCode'];
                        
                        mymap.setView([position.coords.latitude, position.coords.longitude], 5);
                        $('#countriesDataList').val(countryCode['countryCode']).change();
        }}});})}})

   


    
    

