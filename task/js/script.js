// Weather

$(document).ready(function() {

    $('.btn1').click(function() {

        $.ajax({
            url: "php/weather.php",
            type: 'POST',
            dataType: 'json',
            data: {
    
                lat: $('#nearbyweatherlat').val(),
                lng: $('#nearbyweatherlng').val()
            },
    
            success: function(result) {
                
                console.log(result);

            if(result.status.name == "ok") {
                
                $('#results').html(result.data.temperature);

            }
    
    
            }
        })
    
       }) 

    //NearbyPlace
    
    $('.btn2').click(function() {

        $.ajax({
            url: "php/nearbyplace.php",
            type: 'POST',
            dataType: 'json',
            data: {
    
                lat: $('#nearbyplacelat').val(),
                lng: $('#nearbyplacelng').val()
            },
    
            success: function(result) {
                
                console.log(result);

            if(result.status.name == "ok") {
                
                $('.results').html(result.data.map(a=> a.adminName1).join(','));
                

            }
    
    
            }
        })
    
       }) 

    //Timezone

    $('.btn3').click(function() {

        $.ajax({
            url: "php/timezone.php",
            type: 'POST',
            dataType: 'json',
            data: {
    
                lat: $('#timezonelat').val(),
                lng: $('#timezonelng').val()
            },
    
            success: function(result) {
                
                console.log(result);

            if(result.status.name == "ok") {
                
                $('#results').html(result.data);
                

            }
    
    
            }
        })
    
       }) 
    
    })






