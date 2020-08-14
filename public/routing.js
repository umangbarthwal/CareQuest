function route(){
  document.getElementById('card4').style.display = "none";
  map.addLayer(defaultLayers.vector.normal.traffic);
  document.getElementById("status").innerHTML = "Routing...";
  console.log(str);
   // Get an instance of the routing service version 8:
var router = platform.getRoutingService(null, 8);
// Create the parameters for the routing request:
var routingParameters = {
  transportMode:'car',
  routingMode: 'fast',
  mode:"balanced;car;traffic:enabled",
  origin: str,
  //via:'17,75!stopDuration=900',
  destination: end,
  return:'polyline,summary,actions,instructions', //summary + actions + instr included
  alternatives: 4, //alternative route option
  departureTime:'2020-05-13T09:00:00',  // arrival and departure
  spans:'speedLimit,duration,streetAttributes,names' //speed limit value
};


let startIcon = new H.map.Icon('start.png');

let endIcon = new H.map.Icon('end.png');

let viaIcon = new H.map.Icon('via.png');
// Define a callback function to process the routing response:
var onResult = function(result) {
  console.log(result);
  if (result.routes.length) {
    let routeNum = 0;
	  let cardNum = 0;

    result.routes.forEach(route =>{

      let totalLength = 0; 
      let totalDuration = 0;

      let colors = ["#9400D3","#f461c3","#8B4513","#000000"]
      let card_colors = ["rgba(5, 165, 78,0.7)","rgba(4, 172, 236,0.7)","rgba(5, 165, 78,0.7)","rgba(4, 172, 236,0.7)"]
      route.sections.forEach((section) => {
        // Create a linestring to use as a point source for the route line
       let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
        
       // Create a polyline to display the route:
       /* let routeLine = new H.map.Polyline(linestring, {
         style: { strokeColor: colors[result.routes.indexOf(route)], lineWidth: 5}
       }); */
       // Create an outline for the route polyline:
var routeOutline = new H.map.Polyline(linestring, {
  style: {
    lineWidth: 10,
    strokeColor: colors[result.routes.indexOf(route)],
    lineTailCap: 'arrow-tail',
    lineHeadCap: 'arrow-head'
  }
});
// Create a patterned polyline:
var routeArrows = new H.map.Polyline(linestring, {
  style: {
    lineWidth: 10,
    fillColor: colors[result.routes.indexOf(route)],
    strokeColor: 'rgb(255, 255, 255)',
    lineDash: [0, 2],
    lineTailCap: 'arrow-tail',
    lineHeadCap: 'arrow-head' }
  }
);
// create a group that represents the route line and contains
// outline and the pattern
var routeLine = new H.map.Group();
routeLine.addObjects([routeOutline, routeArrows]);

       // Create a marker for the start point:
       
       let startMarker = new H.map.Marker(section.departure.place.location, {icon: startIcon});
      
       startMarker.setData("Routing Starts Here!"); 
       // Create a marker for the end point:
       let endMarker = new H.map.Marker(section.arrival.place.location, {icon: endIcon});
     
       endMarker.setData("Routing Ends Here!"); 
       totalLength += section.summary.length;
       totalDuration += section.summary.duration;
	      document.getElementById("cards-collector").innerHTML += '<div class="column" id="card'+routeNum+'"+> <div class="content"><div class="ui buttons"><button class="ui compact button" id="closebtn'+routeNum+'" onclick="closebutton('+routeNum+')" >X</button><button class="ui large button" id="route-detail'+routeNum+'"></button><button class="ui compact button" id="openbtn'+routeNum+'" onclick="displaydetail('+routeNum+')" ><span style="font-size:x-large;">&gt</span></button></div><div class="description" id="route'+cardNum+'"></div> </div></div>' 
        document.getElementById("card"+routeNum).style.marginTop = "2vh";
        document.getElementById("card"+routeNum).style.marginBottom = "auto";
       
        //document.getElementById("closebtn"+routeNum).style.boxShadow = "-8px 6px 17px -8px rgba(0,0,0,0.75)"; 
        //document.getElementById("closebtn"+routeNum).style.zIndex = "2";
        document.getElementById("closebtn"+routeNum).style.backgroundColor = card_colors[routeNum];
        document.getElementById("closebtn"+routeNum).style.color = "white";
        document.getElementById("closebtn"+routeNum).style.display = "none";
        
        //document.getElementById("openbtn"+routeNum).style.boxShadow = "-8px 6px 17px -8px rgba(0,0,0,0.75)"; 
       // document.getElementById("openbtn"+routeNum).style.zIndex = "2";
        document.getElementById("openbtn"+routeNum).style.backgroundColor = card_colors[routeNum];
        document.getElementById("openbtn"+routeNum).style.color = "white";
        document.getElementById("openbtn"+routeNum).style.display = "block";
        
        document.getElementById("route"+routeNum).style.zIndex = "3";
        document.getElementById("route"+routeNum).style.position = "fixed";
        document.getElementById("route"+routeNum).style.borderRadius = "15px 15px 5px 30px";
        document.getElementById("route"+routeNum).style.top = "10vh";
        document.getElementById("route"+routeNum).style.right = "2vh";
        document.getElementById("route"+routeNum).style.paddingBottom = "1vh";
        document.getElementById("route"+routeNum).style.display = "none";
        document.getElementById("route"+routeNum).style.backgroundColor =  card_colors[routeNum] ;
        document.getElementById("route"+routeNum).style.color =  "white" ;
        document.getElementById("route"+routeNum).style.pointerEvents = "none";
        document.getElementById("route"+routeNum).style.cursor = "default";
        document.getElementById("route"+routeNum).style.boxShadow = "-8px 6px 17px -8px rgba(0,0,0,0.75)";

      //document.getElementById("route-detail"+routeNum).style.zIndex = "2";
        document.getElementById("route-detail"+routeNum).style.fontSize = "small";
        document.getElementById("route-detail"+routeNum).style.backgroundColor =  card_colors[routeNum] ;
       document.getElementById("route-detail"+routeNum).style.color =  "white" ;
       //document.getElementById("route-detail"+routeNum).style.boxShadow = "-8px 6px 17px -8px rgba(0,0,0,0.75)";
       
       section.actions.forEach(action =>{
         document.getElementById("route"+cardNum+"").innerHTML += `<br>`+ action.instruction;

       });
       //document.getElementById("route"+cardNum+"").innerHTML += `<hr>`;
 
       // Add the route polyline and the two markers to the map:
       map.addObjects([routeLine, startMarker, endMarker]);

       // Set the map's viewport to make the whole route visible:
       map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
	 cardNum++;
      });

      document.getElementById("route-detail"+routeNum+"").innerHTML += `<b>`+'Route '+(result.routes.indexOf(route)+1) +`<br>`+ totalLength/1000 +' Km'+`<br>`+ totalDuration.toMMSS() + `</b>`;

      routeNum++;
    });
      
  }
};



var onError = function(error) {
  alert(error.message);
};

Number.prototype.toMMSS = function () {
  return  Math.floor(this / 60)  +' minutes '+ (this % 60)  + ' seconds.';
}
  

// Call calculateRoute() with the routing parameters,
// the callback and an error callback function (called if a
// communication error occurs):

document.getElementById("status").innerHTML = "Routing Complete";
router.calculateRoute(routingParameters, onResult, onError);
}
