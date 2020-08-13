var x = document.getElementById("geoloc");
var browserPos;
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
  
}

function showPosition(position) {

  browserPos = {lat: position.coords.latitude, lon: position.coords.longitude};
  x.innerHTML = "&ensp;<strong>Your Position</strong> -&ensp;Latitude: " + Math.trunc((position.coords.latitude*10000))/10000 + 
  "&ensp;&&ensp;Longitude: " + Math.trunc((position.coords.longitude*10000))/10000;
}

getLocation();

var platform = new H.service.Platform({
  'apikey': "JP-gD6e4WWDbixevPMBGqYnruBv8wo_QO6h6a-aIErI"
});
var geocoder = platform.getSearchService();
function geocodeAndSearch(){
  var rad = parseInt(document.getElementById("slider_value").innerHTML);
  var query = document.getElementById("service").value;
  
  // embeded map
  if(query != ""){
      document.getElementById("embededMap").innerHTML = '<iframe width="100%" height="400px" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/search?q='+ query.replace(" ","%20") +'%20nearby&key=AIzaSyACDxf4BL0zC3sYra6Eq72JAjthSwNSoXQ" allowfullscreen></iframe>'
    }

  let geocodeParam ={
      q: query ,
      in: 'circle:'+ browserPos.lat +',' + browserPos.lon +';r='+rad,
      limit: 50
  }
  function onResult(result){
      console.log(result);
      var decky = document.getElementById("card_deck_a");

      for(let i =0 ; i <result.items.length;i++){
        decky.innerHTML += '<div class="card cardie">'+
         '<div class="card-body text-center">'+
          '<h4 class="card-title">'+result.items[i].title+'</h4><hr>'+
           '<p class="card-text"><h5>'+result.items[i].distance/1000+' Kms</h5>'+result.items[i].address.label+'</p>'+
          '</div>' +
          '<div class="card-footer text-center">'+
            '<small><a target="_blank" href="'+ 'https://www.google.com/maps/@'+ result.items[i].position.lat+','+result.items[i].position.lng+',21z' +'"><i class="fa fa-map-o fa-2x" aria-hidden="true" style="padding-left: inherit;"></i></a></small>'+'<a target="_blank" href="'+'https://www.google.com/search?q='+result.items[i].title.replace(" ","+")+'"<i class="fa fa-google fa-2x" aria-hidden="true" ></i>'+'</a>'
          '</div>'+
      '  </div>'
        
      }
      document.getElementById("result_a").innerHTML = "<hr>&ensp;<h3><strong>"+result.items.length + " " + query +"(s) found in " + rad/1000 + " kilometers radius around you.</strong></h3><br><hr>";        
      //info bubble
               
  }
  geocoder.discover(geocodeParam,onResult, alert);
                
}
