// Departments select
function departmentSelect(){
    $(document).ready(function(){
        $.ajax({
            url: "libs/php/getAllDepartments.php",
            type: "POST",
            dataType: "json",
        
            success: function(result){
                console.log(result)
                
                result.data.forEach(department => {
                    $('#department').append(`<option value="${department.name}">${department.name}</option>`)
                    $('#departmentInput').append(`<option value="${department.id}">${department.name}</option>`)
                    $('#departmentInputNew').append(`<option value="${department.id}">${department.name}</option>`)
                    
                })}})
    })
}



// Location select 
function locationSelect(){
    $(document).ready(function(){
        $.ajax({
            url: "libs/php/getAllLocations.php",
            type: "POST",
            dataType: "json",
    
            success: function(result){
                console.log(result)
    
                result.data.forEach(location => {
                    $('#location').append(`<option value="${location.name}">${location.name}</option>`);
                    $('#locationInput').append(`<option value="${location.id}">${location.name}</option>`)
                    $('#newDepartmentLocation').append(`<option value="${location.id}">${location.name}</option>`)
                })
            },
            error:function(jqXHR){
                console.log(jqXHR);
            }
        })
    })
}

  

// Departments List
function departmentsList(){
    $(document).ready(function(){
        $.ajax({
                url: "libs/php/getAllDepartments.php",
                type: "POST",
                dataType: "json",
            
                success: function(result){
                    console.log(result)
                    
            result.data.forEach(department => {
            $('#departmentsList').append(`<li><a href="#" onClick="getDepartmentPersonnel(${department.id})" data-bs-toggle="modal" data-bs-target="#editDepartmentModal">${department.name}</a></li>`);
                        
        
        
                    })}})})
}


//Personell List
function personnelList(){
    $(document).ready(function(){
        $.ajax({
                url: "libs/php/getAll.php",
                type: "POST",
                dataType: "json",
            
                success: function(result){
                    // console.log(result)
    
                    // $('#department').html(`<option value="">All Departments</option>`)
                    // $('#location').html(`<option value="">All Locations</option>`)
                    
                    result.data.forEach((person) => {
                        // console.log(person);
                        $('#personnelList').append(`
                        <li><a href="#" onClick="getPersonDetails(${person.id})" data-bs-toggle="modal" data-bs-target="#personnelModal"> 
                        <div class="personIcon">${person.firstName[0]}${person.lastName[0]}</div>
                        <div class="personName">${person.firstName} ${person.lastName}<br>
                        <p class="smallText">${person.department}, ${person.location}</p>
                        </div></a></li>`)
                    })
        
        
                    }})})
}


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
                    <p class="smallText">${person.department}, ${person.location}</p>
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
            <p class="smallText">${person.department}, ${person.location}</p>
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
            <p class="smallText">${person.department}, ${person.location}</p>
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
            <p class="smallText">${person.department}, ${person.location}</p>
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
            $('#departmentInput').append(`<option selected="selected" value="${person.departmentID}">${person.department}</option>`)
            $('#locationInput').append(`<option selected="selected">${person.location}</option>`)
            $('#saveFormBtn').attr('onClick', `updateContact(${person.id})`);
            $('#deleteModalName').html(person.firstName + " " + person.lastName);
            $('#deletePersonBtn').attr('onClick', `deleteContact(${person.id})`);
    }})

}

// Update contact function
let updateContact = (personId) => {
    $.ajax({
        url: "libs/php/editPersonnel.php",
        type: "POST",
        dataType: "json",
        data: {id: personId,
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        jobTitle: $('#jobTitle').val(),
        email: $('#email').val(),
        departmentID: $('#departmentInput').val(),
        },

        success: function(result){
            console.log(result)
            $('#personnelModal').modal('hide');
            $('#responseMessage').html('Successfully Saved')
            $('.toast').toast('show');

            $.ajax({
                url: "libs/php/getAll.php",
                type: "POST",
                dataType: "json",
            
                success: function(result){
                    // console.log(result)
                    $('#personnelList').html(``);
                    
                    
                    result.data.forEach((person) => {
                        // console.log(person);
                        $('#personnelList').append(`
                        <li><a href="#" onClick="getPersonDetails(${person.id})" data-bs-toggle="modal" data-bs-target="#personnelModal"> 
                        <div class="personIcon">${person.firstName[0]}${person.lastName[0]}</div>
                        <div class="personName">${person.firstName} ${person.lastName}<br>
                        <p class="smallText">${person.department}, ${person.location}</p>
                        </div></a></li>`)
        })}})}})}
 // Delete contact   

let deleteContact = (id) => {
    $.ajax({
        url: "libs/php/deletePersonnelById.php",
        type: "POST",
        dataType: "json",
        data: {
            id: id
        },
        success: function(result){
            console.log(result)
            
            $('#responseMessage').html('Successfully Deleted')
            $('.toast').toast('show');
            
            $.ajax({
                url: "libs/php/getAll.php",
                type: "POST",
                dataType: "json",
            
                success: function(result){
                    // console.log(result)
                    $('#personnelList').html(``);
                    
                    
                    result.data.forEach((person) => {
                        // console.log(person);
                        $('#personnelList').append(`
                        <li><a href="#" onClick="getPersonDetails(${person.id})" data-bs-toggle="modal" data-bs-target="#personnelModal"> 
                        <div class="personIcon">${person.firstName[0]}${person.lastName[0]}</div>
                        <div class="personName">${person.firstName} ${person.lastName}<br>
                        <p class="smallText">${person.department}, ${person.location}</p>
                        </div></a></li>`)
                    }) }})
        }})}

// Add new contact
    $('#newPersonSave').click(function(){
        if($('#firstNameInputNew').val() == "" ||  ($('#lastNameInputNew').val() == "")
                || ($('#jobTitleInputNew').val() == "") || ($('#emailInputNew').val() == "") || 
                ($('#departmentInputNew').val() == "")  ){

                    $('.addNewContactModalParent input').each(function(){
                        this.reportValidity()

                        $('.addNewContactModalParent input').css('border', '0.7px solid red');
                           
                        
                        
                        })
                    } else {
                        $.ajax({
                        url: "libs/php/insertPersonnel.php",
                        type: "POST",
                        dataType: "json",
                        data: {
                            firstName: $('#firstNameInputNew').val(),
                            lastName: $('#lastNameInputNew').val(),
                            jobTitle: $('#jobTitleInputNew').val(),
                                email:  $('#emailInputNew').val(),
                                departmentId: $('#departmentInputNew').val()
                            },
                    
                            success: function(result){

                                $('#addPersonModal').modal('hide');
                                
                                    
                                $('#responseMessage').html('Successfully Added')
                                    $('.toast').toast('show');

                                    personnelList();
                                    departmentsList();
                                    locationSelect();
                                    departmentSelect();
            
                    
                                   
                                }})}
    })
    
        
                
       
                
 
function getDepartmentPersonnel(departmentID){
    $.ajax({
        url: "libs/php/getDepartmentPersonnel.php",
        type: "POST",
        dataType: "json",
        data: {departmentId: departmentID},

        success: function(result){
            console.log(result)

            // console.log(personId_preventCopyPaste)
             let personnel = result['data']['personnel'];
             let department = result['data']['department'];

             $('#singleDepartmentName').html(personnel[0].department);
             console.log(personnel[0].department);
             console.log(personnel[0].departmentID);
             
            $('#deleteDepartmentBtn').attr('onClick',`deleteDepartment(${personnel[0].departmentID})`);
            $('#deleteDepartmentName').html(personnel[0].department);
             $('#departmentContacts').html("");
            
             for(const iterator of personnel) {
                 console.log(iterator);
                 $('#departmentContacts').append(`
                 <li><a href="#">
                 <div class="personIcon">${iterator.firstName[0]}${iterator.lastName[0]}</div>
                 <div class="personName">${iterator.firstName} ${iterator.lastName}<br>
                 <p class="smallText">${iterator.department}, ${iterator.location}</p>
                </div></a></li>`)

                    personnelList();
                    departmentsList();
                    locationSelect();
                    departmentSelect();
                 
             }}})}

// Delete Department
function deleteDepartment(departmentID){
    $.ajax({
        url: "libs/php/getDepartmentSize.php",
        type: "POST",
        dataType: "json",
        data: {departmentID: departmentID},

        success: function(result){
            console.log(result)

            if(result.data.length >= 1) {
                $('#RemoveDependModal').modal('show');
            } else {
                $.ajax({
                    url: "libs/php/deleteDepartmentByID.php",
                    type: "POST",
                    dataType: "json",
                    data: {departmentID: departmentID},
            
                    success: function(result){
                        console.log(result)
            
                    $('#responseMessage').html('Department Successfully Deleted')
                    $('.toast').toast('show')
            
                    personnelList();
                    departmentsList();
                    locationSelect();
                    departmentSelect();
            
            
                    
            
                      }})
            }

          }})
    }

// Add Department
$(document).ready(function(){
    $('#createDepartmentBtn').click(function(){
        $.ajax({
            url: "libs/php/insertDepartment.php",
            type: "POST",
            dataType: "json",
            data: {name: $('#newDepartment').val(),
            locationID: $('#locationInput').val()},
        
            success: function(result){
                console.log(result)
        
                $('#responseMessage').html('Department Successfully Added')
                $('.toast').toast('show')
    
                personnelList();
                departmentsList();
                locationSelect();
                departmentSelect();
    
            }
        
            })
    })
})


// Add new location 
$('#createLocationBtn').click(function(){
    $.ajax({
        url: "libs/php/insertLocation.php",
        type: "POST",
        dataType: "json",
        data: {name: $('#newLocation').val(),
              },
    
        success: function(result){
            console.log(result)
    
            $('#responseMessage').html('Location Successfully Added')
            $('.toast').toast('show')

            personnelList();
            departmentsList();
            locationSelect();
            departmentSelect();

        }
    
        })
})



// Function Calls
$(document).ready(function(){
   
    personnelList();
    departmentsList();
    locationSelect();
    departmentSelect();








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

    $('#personnelList').html(``);

   $('.addPerson').each(function(){
       this.reportValidity();

   })

   });
