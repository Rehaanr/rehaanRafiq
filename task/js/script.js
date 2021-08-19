$document.ready(function(){

    $('.btn1').on('click', () => {

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
                $('.results').html(result['data']);
            }
    
    
            }
        })
    
       }) 
})






