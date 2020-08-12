  // function to create donor

  function addDonor(h){
    firebase.database().ref('donor/' + h.id).set(h);
  }

  $(function(){

    var check = true;
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          check =false;
          //alert("event js listener activated");
        }
        else{check=true;}
        form.classList.add('was-validated');
      },false);
    });

   $("form").submit(function(){
    if(check)
    {
      var donor = {
        //id: $("#v1").val() + Date.now(),
        id: Date.now(),
        date: Date(Date.now()),
        //date: $("#v1").val(),
        //time: $("#v2").val(),
        
        //contact: $("#v5").val(),
        //comments: $("#v6").val(),
  
        donorName: $("#v7").val(),
        mobileNumber: $("#v8").val(),
        emailAddress: $("#v9").val(),
        age: $("#v10").val(),
        gender: $("#v11").val(),
        city: $("#cityId").val(),
        state: $("#stateId").val(),
        country: $("#countryId").val(),
        bloodGroup: $("#v14").val(),
        diabetes: $("#v15").val(),
        liver: $("#v16").val(),
        kidney: $("#v17").val(),
        lung: $("#v18").val(),
        bloodPressure: $("#v19").val(),
        recoveryDate: $("#v20").val()
      };
      addDonor(donor);
      alert("Form Submitted Successfully !");
    }
    else
    {
      alert("Please Try Again");
    }
  });
});


  /*$(add_donor).click(function(e){
    var donor = {
      //id: $("#v1").val() + Date.now(),
      id: Date.now(),
      date: Date(Date.now()),
      //date: $("#v1").val(),
      //time: $("#v2").val(),
      
      //contact: $("#v5").val(),
      //comments: $("#v6").val(),

      donorName: $("#v7").val(),
      mobileNumber: $("#v8").val(),
      emailAddress: $("#v9").val(),
      age: $("#v10").val(),
      gender: $("#v11").val(),
      city: $("#v12").val(),
      country: $("#v13").val(),
      bloodGroup: $("#v14").val(),
      diabetes: $("#v15").val(),
      liver: $("#v16").val(),
      kidney: $("#v17").val(),
      lung: $("#v18").val(),
      bloodPressure: $("#v19").val(),
      recoveryDate: $("#v20").val()
    };

        var empty = true;
  
        $("input,select").filter('[required]').each(function(){
            if(jQuery(this).val() == ""){
                empty = false;
                return false;
              }
        });

        if(empty){
          addDonor(donor);
          alert("Created!");
        }
        else{
            alert('Invalid Field');
        }
    
    });*/
  

    // 
  var adddonorref = firebase.database().ref().child("donor");
    adddonorref.on("value", function(snapshot) {
        $("#show-donor").empty();
        //var donorHTMLitem = "<h3> Donor List </h3>"
        //donorHTMLitem = '<div class="card-columns">';
        //donorHTMLitem += '<div class="container pt-4">'
        //donorHTMLitem += '<div class="card-columns">';
        var donorHTMLitem = '<div class="container pt-4">'
        donorHTMLitem += '<div class="row">'
        snapshot.forEach(function(childsnapshot){
          var item = childsnapshot.val();
          //donorHTMLitem += "<div class'patientHTMLitem'><hr><ul></div>";
          //patientHTMLitem += "<li> Time : <span>"+ item.time + "</span></li>"
          //donorHTMLitem += "<li><b> Date : </b><span>"+ item.date + "</span></li>";
          //patientHTMLitem += "<li> Contact : <span>"+ item.contact + "</span></li>"
          //donorHTMLitem += '<div class="container">';
          //donorHTMLitem += '<div class="row">';
          donorHTMLitem += '<div class="col-12 col-sm-6 p-5">'
          donorHTMLitem += '<div class="card bg-light mb-3 border-dark" style="max-width: auto;">';//1
          donorHTMLitem += '<div class="card-header text-center bg-dark">'
          donorHTMLitem += '  <ul class="nav nav-tabs card-header-tabs">'
          donorHTMLitem += '  <li class="nav-item mr-auto"><a class="nav-link bg-light text-success" role="button" data-toggle="collapse" aria-expanded="true" href="#active">Active</a></li>'
          donorHTMLitem += '  <div class="text-white"><h5>Donor Card</h5></div>'
          donorHTMLitem += '  <li class="nav-item ml-auto"><a class="nav-link bg-light text-primary" role="button" data-toggle="collapse" aria-expanded="true" href="#info">Info</a></li>'
          donorHTMLitem += '  </ul>'
          donorHTMLitem += '</div>'
          
          //donorHTMLitem +=    '<h5 class="card-title">Info card title</h5>'

          donorHTMLitem += "<div id='active'>"
          donorHTMLitem +=  '<div class="card-body text-dark text-center pr-5">'//2
          donorHTMLitem +=    "<div class='card-text text-left pt-4'><ul>";//3
          donorHTMLitem +=      "<li><b> Donor Name : </b><span>"+ item.donorName + "</span></li>"
          donorHTMLitem +=      "<li><b> Age : </b><span>"+ item.age + "</span></li>"
          donorHTMLitem +=      "<li><b> Gender : </b><span>"+ item.gender + "</span></li>"
          donorHTMLitem +=      "<li><b> Blood Group : </b><span>"+ item.bloodGroup + "</span></li>"
          donorHTMLitem +=      "<li><b> City : </b><span>"+ item.city + "</span></li>"
          donorHTMLitem +=      "<li><b> State : </b><span>"+ item.state + "</span></li>"
          donorHTMLitem +=      "<li><b> Country : </b><span>"+ item.country + "</span></li>"
          donorHTMLitem +=    "</ul></div>";//3
          donorHTMLitem +=  "</div>"
          donorHTMLitem += "</div>"

          donorHTMLitem += "<div class='collapse' id='info'>"
          donorHTMLitem +=  '<div class="card-body text-dark text-center pr-5">'//2
          donorHTMLitem += "<hr>"
          donorHTMLitem +=    '<h5 class="card-title text-danger pb-3"><b>More Info</b></h5>'
          donorHTMLitem +=    "<div class='card-text text-left'><ul>";//3
          donorHTMLitem +=      "<li><b> Recovery Date : </b><span>"+ item.recoveryDate + "</span></li><br>"
          donorHTMLitem +=      "<li><b> Diabetes : </b><span>"+ item.diabetes + "</span></li>"
          donorHTMLitem +=      "<li><b> Liver Disease : </b><span>"+ item.liver + "</span></li>"
          donorHTMLitem +=      "<li><b> Kidney Disease : </b><span>"+ item.kidney + "</span></li>"
          donorHTMLitem +=      "<li><b> Blood Pressure Problem : </b><span>"+ item.bloodPressure + "</span></li><br>"
          donorHTMLitem +=      "<li><b> Mobile Number : </b><span class='text-primary'>"+ item.mobileNumber + "</span></li>"
          donorHTMLitem +=      "<li><b> Email : </b><span class='text-primary'>"+ item.emailAddress + "</span></li>"
          donorHTMLitem +=    "</ul></div>";//3
          donorHTMLitem +=  "</div>"
          donorHTMLitem += "</div>"

          donorHTMLitem +=    "<button type='button' class='btn btn-outline-danger delete-donor btn-sm mx-2' id="+item.id+">Delete Donor</button>";
          donorHTMLitem +=    '<footer class="blockquote-footer text-center text-muted p-2">'
          donorHTMLitem +=      "<small>Created On: "+ item.date + "</small>";
          donorHTMLitem +=    '</footer>'
          //donorHTMLitem +=  '</div>'//2
          donorHTMLitem += '</div>'//1
          donorHTMLitem += "</div>"

      });
      donorHTMLitem += "</div>"
      donorHTMLitem += "</div>"

      $("#show-donor").html(donorHTMLitem);
    });
  
    $(document).on("click", ".delete-donor", function(){
      var pass_key = window.prompt('ONLY admins are allowed to delete. Enter your admin key : ');
      if(pass_key == "team_bitsians"){
        alert("Accepted!");
        var donorID = $(this).attr('id');
      firebase.database().ref("donor/" + donorID).remove();
      alert("Deleted!");
    }else{
      alert("Unauthorized!");
      $(this).prop('disabled', true);
    }
        
    });
