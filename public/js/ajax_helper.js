
  function fuzzynameGet(){
    var search_query = {
      HOSPITAL_NAME : $("#hospital").val(),
      STATE_NAME : "",
      COUNTY_NAME : "",
      HQ_CITY : "",
    }
    $.ajax({
      type : "GET",
      contentType: "application/json",
      url : "/api/fuzzy",
      data : search_query,
      dataType:"json",
      success: function(result){
        $('#result1 .cards').empty();
        $('#hospitalResult').transition("scale","250ms");
          // Handler for .ready() called.

        $.each(result, function(i, hospital){
          $('#result1 .ui.cards').append("<div class='card'> <div class='content'> <strong>"+hospital.HOSPITAL_NAME + "</strong><div>Object Id:</div><span class='ids'>" + hospital._id +  "</span><i class='copy outline icon'></i><div>"+ hospital.HQ_CITY + ", "+ hospital.STATE_NAME +  "</div><div class='ui right floated blue button tiny hEditBtn' >Edit</div></div></div>");
        });
        $("#hospitalResult").removeClass("loading");
        $('html, body').animate({
          scrollTop: $('#hospitalResult').offset().top
      }, 'slow');
        console.log("Success: ", result);
        //Now attacching event listneres on those buttons
        $(".hEditBtn").click(function(e){
            var id = $(this).siblings("span")[0].textContent;
            console.log(id);
            $("#hospital_id").val(id);
            $("#eHospital").submit();
        })
      },
      error : function(e) {
        $("#result").html("<strong>Error</strong>");
        console.log("ERROR: ", e);
      }
    });  

  }
  function findEmail(){
    var search_query = {
      _id : $("#findEmail").val(),
    }
    $.ajax({
      type : "GET",
      contentType: "application/json",
      url : "/admin/findEmail",
      data : search_query,
      dataType:"json",
      success: function(result){
        $('#result2 ul').empty();
        $('#emailResult').transition("scale","500ms");
        result.forEach(function(item){
          $('#result2 .list-group').append(item.email);
        })
        console.log("Success: ", result);
      },
      error : function(e) {
        $("#result").html("<strong>Error</strong>");
        console.log("ERROR: ", e);
      }
    });  
  }
  $(document).ready(function(){
    var search_query = {
      uid : $("#uid").text()
    }
    $.ajax({
      type : "GET",
      contentType: "application/json",
      url : "/admin/role",
      data : search_query,
      dataType:"json",
      success: function(result){
        $('#id_verif').val(result.id_verif);
        $('#object_id').val(result.object_id);
        $('#time').val(result.time);
        if(result.admin){
          $("#admin")[0].textContent = "Admin"
        } else {
          $("#admin")[0].textContent = "General User"
        }
        $("#seg-2").removeClass("loading")
        console.log("Success: ", result);
        getHospital(result.object_id);
      },
      error : function(e) {
        console.log("ERROR: ", e);
      }
    });
    });
  function getHospital(id){
    //testing id - 5f1ff6422735334c686b92e3
      $.ajax({
      type : "GET",
      url : "/api/",
      data : {_id:id},
      dataType:"json",
      success: function(result){
      //first empty dashboard========>
      console.log(result);
      
      
      //- //these for profile
      //- $("#mh-x").val("");
      //- $("#mh-y").val("");
      $("#mh-fid").val("");
      $("#mh-hname").val("");
      //- $("#mh-htype").val("");
      $("#mh-hq-add").val("");
      //- $("#mh-hq-city").val("");
      //- $("#mh-hq-state").val("");
      //- $("#mh-hq-zip").val("");
      //- $("#mh-county").val("");
      //- $("#mh-state").val("");
      //- $("#mh-fips").val("");
      //- //these for manage
      //- $("#mh-beds").val("");
      //- $("#mh-mh-st-beds").val("");
      //- $("#mh-mh-icu-beds").val("");
      //- $("#mh-aicu-beds").val("");
      //- $("#mh-picu-beds").val("");
      //- $("#mh-util").val("");
      //- $("#mh-inc").val("");
      //- $("#mh-avg-vent").val("");
      //- //then append data=========>
      //- //profile tab
      //- $("#mh-x").val(result.X);
      //- $("#mh-y").val(result.Y);
      $("#mh-fid").val(result.FID);
      $("#mh-hname").val(result.HOSPITAL_NAME);
      //- $("#mh-htype").val(result.HOSPITAL_TYPE);
      $("#mh-hq-add").val(result.HQ_ADDRESS);
      //- $("#mh-hq-city").val(result.HQ_CITY);
      //- $("#mh-hq-state").val(result.HQ_STATE);
      //- $("#mh-hq-zip").val(result.HQ_ZIP_CODE);
      //- $("#mh-county").val(result.COUNTY_NAME);
      //- $("#mh-state").val(result.STATE_NAME);
      //- $("#mh-fips").val(result.FIPS);
      //- //manage tab
      //- $("#mh-beds").val(result.NUM_LICENSED_BEDS);
      //- $("#mh-st-beds").val(result.NUM_STAFFED_BEDS);
      //- $("#mh-icu-beds").val(result.NUM_ICU_BEDS);
      //- $("#mh-aicu-beds").val(result.ADULT_ICU_BEDS);
      //- $("#mh-picu-beds").val(result.PEDI_ICU_BEDS)
      //- $("#mh-util").val(result.BED_UTILIZATION);
      //- $("#mh-inc").val(result.Potential_Increase_In_Bed_Capac);
      //- $("#mh-avg-vent").val(result.AVG_VENTILATOR_USAGE);
      $("#seg-3").removeClass("loading")
    },
    error : function(e) {
      //user interactive errors
      console.log("ERROR: ", e);
        $("#seg-3").removeClass("loading");
        $("#seg-3").addClass("disabled");
      }
  })
}
function authRetriever(){
  $("#seg-1").addClass("loading");
  var search_query = {
    email : $("#email_id")[0].textContent,
  }
  $.ajax({
    type : "GET",
    contentType: "application/json",
    url : "/admin/getUser",
    data : search_query,
    dataType:"json",
    success: function(result){
      //clearing the  space
      console.log(result)
      $("#displayName").val("");
      $("#email").val("");
      $("#phoneNumber").val("");
      $("#emailVerified").val("");
      $("#disabled").val("");
      //=================FILling RESULT=====//
      $("#displayName").val(result.displayName);
      $("#email").val(result.email);
      $("#phoneNumber").val(result.phoneNumber);
      $("#emailVerified").val(result.emailVerified);
      $("#disabled").val(result.disabled);
      $("#seg-1").removeClass("loading");
    },
    error : function(e) {
      $("#seg-1").removeClass("loading");
      $("#seg-1").addClass("disabled");
      console.log("ERROR: ", e);
      
    }
  });  
}
function authUpdater(){
  $("#seg-1").addClass("loading");
  
  var search_query = {
    uid : $("#uid")[0].textContent,
    email : $("#email").val(),
    phoneNumber : $("#phoneNumber").val(),
    emailVerified : ($("#emailVerified")[0].checked),
    disabled : ($("#disabled")[0].checked),
    displayName : $("#displayName").val()
  }
  $.ajax({
    type : "GET",
    contentType: "application/json",
    url : "/admin/updateUser",
    data : search_query,
    dataType:"json",
    success: function(result){
      console.log(result)
      //clearing the  space
      if(result.message){
        $("#message").show();
        $("#serverError")[0].textContent =result.message;
      }
      $("#displayName").val("");
      $("#email").val("");
      $("#phoneNumber").val("");
      $("#emailVerified").val("");
      $("#disabled").val("");
      //=================FILling RESULT=====//
      $("#displayName").val(result.displayName);
      $("#email").val(result.email);
      $("#phoneNumber").val(result.phoneNumber);
      if(result.emailVerified){
        $("#emailVerified")[0].checked == true;
      } else {
        $("#emailVerified")[0].checked == false;
      }
      if(result.disabled){
        $("#disabled")[0].checked == true;
      } else {
        $("#disabled")[0].checked == false;
      }
      $("#seg-1").removeClass("loading");
    },
    error : function(e) {
      $("#seg-1").removeClass("loading");
      $("#seg-1").addClass("disabled");
      console.log("ERROR: ", e);
      
    }
  });  
}
function userRetriever(){
  $("#seg-2").addClass("loading");
  var search_query = {
    uid : $("#uid").text()
  }
  $.ajax({
    type : "GET",
    contentType: "application/json",
    url : "/admin/role",
    data : search_query,
    dataType:"json",
    success: function(result){
      $('#id_verif').val(result.id_verif);
      $('#object_id').val(result.object_id);
      $('#time').val(result.time);
      $("#seg-2").removeClass("loading")
      if(result.admin){
        $("#admin")[0].textContent = "Admin"
      } else {
        $("#admin")[0].textContent = "General User"
      }
      console.log("Success: ", result);
      getHospital(result.object_id);
    },
    error : function(e) {
      console.log("ERROR: ", e);
      $("#seg-2").removeClass("loading")
      $("#seg-2").addClass("disabled");
    }
  });
}
function userUpdater(){
  $("#seg-2").addClass("loading");
  
  var search_query = {
    uid : $("#uid").text(),
    email : $("#email_id").text(),
    emailVerified : $("#emailVerified")[0].checked,
    id_verif : $("#id_verif").val(),
    object_id : $("#object_id").val(),
    time : $("#time").val()
  }
  $.ajax({
    type : "GET",
    contentType: "application/json",
    url : "/admin/updateRole",
    data : search_query,
    dataType:"json",
    success: function(result){
      userRetriever();
    },
    error : function(e) {
      console.log("ERROR: ", e);
      userRetriever();
    }
  });
}
