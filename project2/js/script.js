// Departments select
const getDepartments = (element) => {
$.ajax({
        url: "libs/php/getAllDepartments.php",
        type: "POST",
        dataType: "json",
    
        success: function(result){
            console.log(result)
            
            result.data.forEach(department => {
                element.append(`<option value="${department.name}">${department.name}</option>`)
                $('#departmentInput').append(`<option value="${department.ID}">${department.name}</option>`)

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
                $('#locationInput').append(`<option>${location.name}</option>`)
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

                $('#department').html(`<option value="">All Departments</option>`)
                $('#location').html(`<option value="">All Locations</option>`)
                
                result.data.forEach((person) => {
                    // console.log(person);
                    $('#personnelList').append(`
                    <li><a href="#" onClick="getPersonDetails(${person.id})" data-bs-toggle="modal" data-bs-target="#personnelModal"> 
                    <div class="personIcon">${person.firstName[0]}${person.lastName[0]}</div>
                    <div class="personName">${person.firstName} ${person.lastName}<br>
                    <p class="smallText">${person.department}, ${person.location}<br></p>
                    </div></a></li>`)
                })
    
    
                }})})

// Search filter

$('#searchInput').on('keyup', function(){
            $.ajax({
                url: "libs/php/getAll.php",
                type: "POST",
                dataType: "json",
                data: {value: $('#searchInput').val()},
    
                success: function(result){
                    console.log(result)
                
                

                
                    $('#personnelList').html(``);
                    
                    result.data.forEach((person) => {
                    
                    let fullName = person.firstName + '' + person.lastName;
                    
                    if(fullName.toLowerCase().includes($('#searchInput').val().toLowerCase())){
                    
                    $('#personnelList').append(`
                    <li><a href="#" onClick="getPersonDetails(${person.id})" data-bs-toggle="modal" data-bs-target="#personnelModal"> 
                    <div class="personIcon">${person.firstName[0]}${person.lastName[0]}</div>
                    <div class="personName">${person.firstName} ${person.lastName}<br>
                    <p class="smallText">${person.department}, ${person.location}<br></p>
                    </div></a></li>`)
                    }})
                    

                
               
        
    }})
})
// Location filter
$('#location').on('change', function(){
    $.ajax({
        url: "libs/php/getAll.php",
        type: "POST",
        dataType: "json",
        data: {value: $('#location').val()},

        success: function(result){
            // console.log(result)
        
        

        
            $('#personnelList').html(``);
            
            result.data.forEach((person) => {
            
            let fullName = person.firstName + '' + person.lastName;
            
            if(person.location.includes(($('#location').val()))){
            
            $('#personnelList').append(`
            <li><a href="#" onClick="getPersonDetails(${person.id})" data-bs-toggle="modal" data-bs-target="#personnelModal"> 
            <div class="personIcon">${person.firstName[0]}${person.lastName[0]}</div>
            <div class="personName">${person.firstName} ${person.lastName}<br>
            <p class="smallText">${person.department}, ${person.location}<br></p>
            </div></a></li>`)
            }})
            

        
       

}})
})

// Departments filter
$('#department').on('change', function(){
    $.ajax({
        url: "libs/php/getAll.php",
        type: "POST",
        dataType: "json",
        data: {value: $('#department').val()},

        success: function(result){
            // console.log(result)
        
        

        
            $('#personnelList').html(``);
            
            result.data.forEach((person) => {
            
            let fullName = person.firstName + '' + person.lastName;
            
            if(person.department.includes(($('#department').val()))){
            
            $('#personnelList').append(`
            <li><a href="#" onClick="getPersonDetails(${person.id})" data-bs-toggle="modal" data-bs-target="#personnelModal"> 
            <div class="personIcon">${person.firstName[0]}${person.lastName[0]}</div>
            <div class="personName">${person.firstName} ${person.lastName}<br>
            <p class="smallText">${person.department}, ${person.location}<br></p>
            </div></a></li>`)
            }
        })
        }})
})

// Location and Departments filter
$('#department, #location').on('change', function(){
    $.ajax({
        url: "libs/php/getAll.php",
        type: "POST",
        dataType: "json",
        data: {value: [$('#department').val(), $('#location').val()]},

        success: function(result){
            // console.log(result)
        
        

        
            $('#personnelList').html(``);
            
            result.data.forEach((person) => {
            
            let fullName = person.firstName + '' + person.lastName;
            
            if(person.department.includes(($('#department').val())) && person.location.includes($('#location').val())){
            
            $('#personnelList').append(`
            <li><a href="#" onClick="getPersonDetails(${person.id})" data-bs-toggle="modal" data-bs-target="#personnelModal"> 
            <div class="personIcon">${person.firstName[0]}${person.lastName[0]}</div>
            <div class="personName">${person.firstName} ${person.lastName}<br>
            <p class="smallText">${person.department}, ${person.location}<br></p>
            </div></a></li>`)
            }
        })
        }})
})

// Person modal details function
let getPersonDetails = (personId) => {
    $.ajax({
        url: "libs/php/getPersonnel.php",
        type: "POST",
        dataType: "json",
        data: {id: personId},

        success: function(result){
            console.log(result)

            // console.log(personId_preventCopyPaste)
             let personnel = result['data']['personnel'];
             let department = result['data']['department'];
             
             
            let findPerson;
            findPerson = personnel.filter(person => person.id == personId)
            console.log(findPerson);
             let person = findPerson[0];
             console.log(person);
             
             $('#personnelName').html(person.firstName + " " + person.lastName)
            $('#personDetails').html(`
            <p class="smallText">Department</p>
            <p class="personInfo">${person.department}</p>
            <p class="smallText">Location</p>
            <p class="personInfo">${person.location}</p>
            <p class="smallText">Email Address</p>
            <p class="personInfo">${person.email}</p>
            <p class="smallText">Job Title</p>
            <p class="personInfo">${person.jobTitle}</p>
            `)
        
            $('#firstName').val(person.firstName);
            $('#lastName').val(person.lastName);
            $('#email').val(person.email);
            $('#jobTitle').val(person.jobTitle);
            $('#departmentInput').append(`<option selected="selected" value="${person.department.ID}">${person.department}</option>`)
            $('#locationInput').append(`<option selected="selected">${person.location}</option>`)
            $('#saveFormBtn').attr('onclick', `updateContact(${person.id})`);
    }})

}

// Update contact function
let updateContact = (personId) => {
    $.ajax({
        url: "libs/php/editPersonnel.php",
        type: "POST",
        dataType: "json",
        data: {id: personId,
        jobTitle: $('#jobTitle').val(),
        email: $('#email').val(),
        departmentID: $('#departmentInput').val(),
        },

        success: function(result){
            console.log(result)
            $('#personnelModal').modal('hide');
            $('#responseMessage').html('Successfully Saved')
            $('.toast').toast('show');
            

}

    })}



// Function Calls
$(document).ready(function(){
   getDepartments($('#department'));
   getLocation($('#location'));

   $('#editFormBtn').click(() => {
       $('#editContactForm').toggle();
       $('#personDetails').hide();
       $('#editFormBtn').toggle();
       $('#saveFormBtn').toggle();
   })

   $('#saveFormBtn').click(() => {
    $('#personDetails').toggle()
    $('#editContactForm').toggle()
    $('#editFormBtn').toggle()
    $('#saveFormBtn').toggle()
})
   });
    