
$(document).ready(function() {

    $('.btn1').click(function() {

        $.ajax({
            url: "php/weather.php",
            type: 'GET',
            dataType: 'json',
            data: {
    
                lat: $('#nearbyweatherlat').val(),
                lng: $('#nearbyweatherlng').val()
            },
    
            success: function(result) {
                console.log(result);

            if(result.status.name == "ok") {
                
                $('.results').html(result['temperature']);
            }
    
    
            }
        })
    
       }) 
    })






