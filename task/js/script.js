$('.btn1').click(function(){
    

        $.ajax({
            url: "php/weather.php",
            type: 'POST',
            dataType: 'json',
            data: {
    
                lat: $('.lat').val(),
                lng: $('.lng').val()
            },
    
            success: function(result) {
                console.log(result);
    
    
            }
        })
    })

