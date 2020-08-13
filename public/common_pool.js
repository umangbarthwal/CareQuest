
var adddonorref = firebase.database().ref().child("donor");
adddonorref.on("value", function(snapshot) {
    $("#show-donor").empty();
    var donorHTMLitem = "<h1> Donor List </h1>"

    snapshot.forEach(function(childsnapshot){
      var item = childsnapshot.val();
      donorHTMLitem += "<div class'patientHTMLitem'><hr><ul></div>";
      //patientHTMLitem += "<li> Time : <span>"+ item.time + "</span></li>"
      donorHTMLitem += "<li><b> Date : </b><span>"+ item.date + "</span></li>"
      //patientHTMLitem += "<li> Contact : <span>"+ item.contact + "</span></li>"
      donorHTMLitem += "<li><b> Patient Name : </b><span>"+ item.patientName + "</span></li>"
      donorHTMLitem += "<li><b> Mobile Number : </b><span>"+ item.mobileNumber + "</span></li>"
      donorHTMLitem += "<li><b> Email : </b><span>"+ item.emailAddress + "</span></li>"
      donorHTMLitem += "<li><b> Age : </b><span>"+ item.age + "</span></li>"
      donorHTMLitem += "<li><b> Gender : </b><span>"+ item.gender + "</span></li>"
      donorHTMLitem += "<li><b> City : </b><span>"+ item.city + "</span></li>"
      donorHTMLitem += "<li><b> Country : </b><span>"+ item.country + "</span></li>"
      donorHTMLitem += "<li><b> Blood Group : </b><span>"+ item.bloodGroup + "</span></li>"
      donorHTMLitem += "<li><b> Diabetes : </b><span>"+ item.diabetes + "</span></li>"
      donorHTMLitem += "<li><b> Liver Disease : </b><span>"+ item.liver + "</span></li>"
      donorHTMLitem += "<li><b> Kidney Disease : </b><span>"+ item.kidney + "</span></li>"
      donorHTMLitem += "<li><b> Blood Pressure Problem : </b><span>"+ item.bloodPressure + "</span></li>"
      donorHTMLitem += "<li><b> Recovery Date : </b><span>"+ item.recoveryDate + "</span></li>"
      donorHTMLitem += "</ul></div>";

  });
  $("#show-donor").html(donorHTMLitem);
});
  
    var addcabref2 = firebase.database().ref().child("patient");
    addcabref2.on("value", function(snapshot) {
        $("#show-patient").empty();
        var patientHTMLitem = "<h1> Patient List</h1>"
  
        snapshot.forEach(function(childsnapshot){
          var item = childsnapshot.val();
          patientHTMLitem += "<div class'patientHTMLitem'><hr><ul></div>";
          //patientHTMLitem += "<li> Time : <span>"+ item.time + "</span></li>"
          patientHTMLitem += "<li><b> Date : </b><span>"+ item.date + "</span></li>"
          //patientHTMLitem += "<li> Contact : <span>"+ item.contact + "</span></li>"
          patientHTMLitem += "<li><b> Patient Name : </b><span>"+ item.patientName + "</span></li>"
          patientHTMLitem += "<li><b> Mobile Number : </b><span>"+ item.mobileNumber + "</span></li>"
          patientHTMLitem += "<li><b> Email : </b><span>"+ item.emailAddress + "</span></li>"
          patientHTMLitem += "<li><b> Age : </b><span>"+ item.age + "</span></li>"
          patientHTMLitem += "<li><b> Gender : </b><span>"+ item.gender + "</span></li>"
          patientHTMLitem += "<li><b> Hospital Name : </b><span>"+ item.hospitalName + "</span></li>"
          patientHTMLitem += "<li><b> City : </b><span>"+ item.city + "</span></li>"
          patientHTMLitem += "<li><b> Country : </b><span>"+ item.country + "</span></li>"
          patientHTMLitem += "<li><b> Blood Group : </b><span>"+ item.bloodGroup + "</span></li>"
          patientHTMLitem += "</ul></div>";
  
  
      });
      $("#show-patient").html(patientHTMLitem);
    });

function donorFuzzy(){
  console.log("HEY DONOR");
  var donorfilter = firebase.database().ref().child("donor");
  donorfilter.on("value", function(snapshot) {
      $("#show-filter").empty();
      var donorHTMLitem = '<div class="container pt-4">'
      donorHTMLitem += '<div class="row">'
      snapshot.forEach(function(childsnapshot){
        var item = childsnapshot.val();
        if(filter(item)){
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
        }
    });
    donorHTMLitem += "</div>"
    donorHTMLitem += "</div>"

    $("#show-filter").html(donorHTMLitem);
  });
      
    }

    
function patientFuzzy(){
  console.log("HEY Patient");
  var patientfilter = firebase.database().ref().child("patient");
  patientfilter.on("value", function(snapshot) {
      $("#show-filter").empty();
      var patientHTMLitem = '<div class="container pt-4">'
      patientHTMLitem += '<div class="row">'

      snapshot.forEach(function(childsnapshot){
        var item = childsnapshot.val();
        if(filter(item)){
          patientHTMLitem += '<div class="col-12 col-sm-6 p-5">'
          patientHTMLitem += '<div class="card bg-light mb-3 border-dark" style="max-width: auto;">';//1
          patientHTMLitem += '<div class="card-header text-center bg-dark">'
          patientHTMLitem += '  <ul class="nav nav-tabs card-header-tabs">'
          patientHTMLitem += '  <li class="nav-item mr-auto"><a class="nav-link bg-light text-success" role="button" data-toggle="collapse" aria-expanded="true" href="#active">Active</a></li>'
          patientHTMLitem += '  <div class="text-white"><h5>Patient Card</h5></div>'
          patientHTMLitem += '  <li class="nav-item ml-auto"><a class="nav-link bg-light text-primary" role="button" data-toggle="collapse" aria-expanded="true" href="#info">Info</a></li>'
          patientHTMLitem += '  </ul>'
          patientHTMLitem += '</div>'

          patientHTMLitem += "<div id='active'>"
          patientHTMLitem +=  '<div class="card-body text-dark text-center pr-5">'//2
          patientHTMLitem +=    "<div class='card-text text-left pt-4'><ul>";//3
          patientHTMLitem +=      "<li><b> Donor Name : </b><span>"+ item.patientName + "</span></li>"
          patientHTMLitem +=      "<li><b> Age : </b><span>"+ item.age + "</span></li>"
          patientHTMLitem +=      "<li><b> Gender : </b><span>"+ item.gender + "</span></li>"
          patientHTMLitem +=      "<li><b> Blood Group : </b><span>"+ item.bloodGroup + "</span></li>"
          patientHTMLitem +=      "<li><b> City : </b><span>"+ item.city + "</span></li>"
          patientHTMLitem +=      "<li><b> State : </b><span>"+ item.state + "</span></li>"
          patientHTMLitem +=      "<li><b> Country : </b><span>"+ item.country + "</span></li>"
          patientHTMLitem +=    "</ul></div>";//3
          patientHTMLitem +=  "</div>"
          patientHTMLitem += "</div>"

          patientHTMLitem += "<div class='collapse' id='info'>"
          patientHTMLitem +=  '<div class="card-body text-dark text-center pr-5">'//2
          patientHTMLitem += "<hr>"
          patientHTMLitem +=    '<h5 class="card-title text-danger pb-3"><b>More Info</b></h5>'
          patientHTMLitem +=    "<div class='card-text text-left'><ul>";//3
          patientHTMLitem += "<li><b> Hospital Name : </b><span>"+ item.hospitalName + "</span></li><br>"
          patientHTMLitem +=      "<li><b> Mobile Number : </b><span class='text-primary'>"+ item.mobileNumber + "</span></li>"
          patientHTMLitem +=      "<li><b> Email : </b><span class='text-primary'>"+ item.emailAddress + "</span></li>"
          patientHTMLitem +=    "</ul></div>";//3
          patientHTMLitem +=  "</div>"
          patientHTMLitem += "</div>"

          patientHTMLitem +=    "<button type='button' class='btn btn-outline-danger delete-patient btn-sm mx-2' id="+item.id+">Delete Patient</button>";
          patientHTMLitem +=    '<footer class="blockquote-footer text-center text-muted p-2">'
          patientHTMLitem +=      "<small>Created On: "+ item.date + "</small>";
          patientHTMLitem +=    '</footer>'
          //donorHTMLitem +=  '</div>'//2
          patientHTMLitem += '</div>'//1
          patientHTMLitem += "</div>"
        }
    });

    patientHTMLitem += "</div>"
    patientHTMLitem += "</div>"
    $("#show-filter").html(patientHTMLitem);
  });
  
}

function filter(item){
    var age = $("#age").val();
    var bloodGroup = $("#bloodGroup").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var country = $("#country").val();
    
    if(item.age ==  age && item.bloodGroup == bloodGroup && item.city == city && item.state == state && item.country == country){
        return true;
    } else {
      return false;
    }
  }