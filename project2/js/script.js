// Departments select
const getDepartments = (element) => {
$.ajax({
        url: "libs/php/getAllDepartments.php",
        type: "POST",
        dataType: "json",
    
        success: function(result){
            // console.log(result)
            
            result.data.forEach(department => {
                element.append(`<option value="${department.name}">${department.name}</option>`)


            })}})}

// Location select 
const getLocation = (element) => {
    $.ajax({
        url: "libs/php/getAllLocations.php",
        type: "POST",
        dataType: "json",

        success: function(result){
            // console.log(result)

            result.data.forEach(location => {
                element.append(`<option value="${location.name}">${location.name}</option>`);
            })
        }
    })
}
// Departments List
$(document).ready(function(){
    $.ajax({
            url: "libs/php/getAllDepartments.php",
            type: "POST",
            dataType: "json",
        
            success: function(result){
                // console.log(result)
                
                result.data.forEach(department => {
                    $('#departmentsList').append(`<li><a href="#">${department.name}</a></li>`);
                    
    
    
                })}})})
//Personell List
$(document).ready(function(){
    $.ajax({
            url: "libs/php/getAll.php",
            type: "POST",
            dataType: "json",
        
            success: function(result){
                // console.log(result)
                
                result.data.forEach((person) => {
                    $('#personnelList').append(`
                    <li><a href="#"> 
                    <div class="personIcon">${person.firstName[0]}${person.lastName[0]}</div>
                    <div class="personName">${person.firstName} ${person.lastName}<br>
                    <p class="smallText">${person.department}, ${person.location}<br></p>
                    </div></a></li>`)
                })
    
    
                }})})

// Search filters

$('#searchInput').on('keyup', function(){
            $.ajax({
                url: "libs/php/getAll.php",
                type: "POST",
                dataType: "json",
                data: '#searchInput.val()',
    
                success: function(result){
                    console.log(result)
                
                

                

                    result.data.forEach((person) => {
                    
                    let fullName = person.firstName + '' + person.lastName;
                    
                    if(fullName.toLowerCase().includes($('#searchInput').val().toLowerCase())){
                    
                    $('#personnelList').append(`
                    <li><a href="#"> 
                    <div class="personIcon">${person.firstName[0]}${person.lastName[0]}</div>
                    <div class="personName">${person.firstName} ${person.lastName}<br>
                    <p class="smallText">${person.department}, ${person.location}<br></p>
                    </div></a></li>`)
                    }})
                    

                
               
        
    }})
})

    

$(document).ready(function(){
   getDepartments($('#department'));
   getLocation($('#location'));
   });
    