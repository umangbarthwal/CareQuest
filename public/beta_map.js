/*===============gelocation start====================*/
var user_lat, user_lng;
var x = document.getElementById("demo");

(function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
})();

function showPosition(position) {
  x.innerHTML = "<b>Latitude: </b>" + position.coords.latitude +
  "<br><b>Longitude: </b>" + position.coords.longitude;
  user_lat = position.coords.latitude;
  user_lng = position.coords.longitude;
}
/*===============gelocation end====================*/

/*===============here map start====================*/
var platform = new H.service.Platform({
  'apikey': 'JP-gD6e4WWDbixevPMBGqYnruBv8wo_QO6h6a-aIErI'
});

// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
document.getElementById('mapContainer'),
defaultLayers.vector.normal.map,
{
  zoom: 10,
  center: { lat: 28.65381, lng: 77.22897} //set to delhi
});

var ui = H.ui.UI.createDefault(map, defaultLayers,'en-US');

    ui.getControl('mapsettings').setDisabled(false)
    ui.getControl('zoom').setDisabled(false)
    ui.getControl('scalebar').setDisabled(false)

    // Positions of the UI components:
    var mapSettings = ui.getControl('mapsettings');
    var scalebar = ui.getControl('scalebar');
    mapSettings.setAlignment('top-left');
    scalebar.setAlignment('bottom-right');

    // Enable the event system on the map instance:
    var mapEvents = new H.mapevents.MapEvents(map);
    var behavior = new H.mapevents.Behavior(mapEvents);

    //style to set at load time
    var provider = map.getBaseLayer().getProvider();
    var style = new H.map.Style('beta_map_style.yaml','https://js.api.here.com/v3/3.1/styles/omv/');

    // set the style on the existing layer
    provider.setStyle(style);
    map.getViewModel().setLookAtData({
       tilt: 45
    });

    // Define a variable holding SVG mark-up that defines an icon image:
    /* var svgMarkup = '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#228B22" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">.</text></svg>'; */

    //let imgIcon = new H.map.Icon('./icons/icons8-standing-man-48.png');

    var circle, green_circle, yellow_circle, red_circle;
      // Create a style object:
    var circleStyle = {
        strokeColor: 'rgb(0, 99, 198)',
        fillColor: 'rgba(21, 127, 234 , 0.2)',
      };
    var green_circleStyle = {
      strokeColor: 'rgb(0,100,0)',
      fillColor: 'rgba(152,251,152,0.3)',
    };
    var yellow_circleStyle = {
        strokeColor: 'rgb(255,255,0)',
        fillColor: 'rgba(255,255,153,0.4)',
    };
    var red_circleStyle = {
        strokeColor: 'rgb(255,0,0)',
        fillColor: 'rgba(233,150,122,0.3)',
    };

    function getBrowserPosition(){
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                console.log(position.coords);
                //user_lng = position.coords.longitude;
                //user_lat = position.coords.latitude;
                var browserPosition = {lat: position.coords.latitude , lng: position.coords.longitude };

                // Create a marker:
                var icon = new H.map.Icon('./beta_icons/icons8-standing-man-48.png');
                let marker = new H.map.Marker(browserPosition, {icon: icon});

                // Instantiate a circle object (using the default style):
                circle = new H.map.Circle({lat: position.coords.latitude + 0.015, lng: position.coords.longitude }, 10000, {style: circleStyle});
                green_circle = new H.map.Circle({lat: position.coords.latitude + 0.015, lng: position.coords.longitude }, 10000, {style: green_circleStyle});
                yellow_circle = new H.map.Circle({lat: position.coords.latitude + 0.015, lng: position.coords.longitude }, 10000, {style: yellow_circleStyle});
                red_circle = new H.map.Circle({lat: position.coords.latitude + 0.015, lng: position.coords.longitude }, 10000, {style: red_circleStyle});
                //marker.setData("You're here!");

                // Add the circle to the map:
                //map.addObject(circle);
                map.setCenter(browserPosition);
                //map.addObject(marker);
            });
        }
        else {
            alert("Geolocation is not supported by this browser!");
        }
    }

/*===============Here maps end====================*/

/*=========================== Markers : No use ==================================*/

    function clickToMark(){
        // Add event listener:
        map.addEventListener('longpress', function(evt) {
            if(evt.target instanceof H.map.Marker){
                //bubble
                // Create an info bubble object at a specific geographic location:
                var bubble = new H.ui.InfoBubble(evt.target.getGeometry(),{
                                content: evt.target.getData()
                             });
                // Add info bubble to the UI:
                ui.addBubble(bubble);
            }
            else{
                // Log 'tap' and 'mouse' events:
                var cnt =0;
                console.log(evt); // too much data here (try to minify)
                let pointer = evt.currentPointer;
                let pointerPoistion = map.screenToGeo(pointer.viewportX, pointer.viewportY);
                let pointerMarker = new H.map.Marker(pointerPoistion,{icon: imgIcon, volatility: true});
                pointerMarker.draggable = true;
                if(cnt == 0){
                    var userData = prompt("Enter some data for this pointer:");
                    pointerMarker.setData(userData);
                    console.log("Pointer added!");
                }else{
                    pointerMarker.getData();
                }

                map.addObject(pointerMarker);
            }
        });
    }
    function clickDragMarkers(){
            // disable the default draggability of the underlying map
            // and calculate the offset between mouse and target's position
            // when starting to drag a marker object:
            map.addEventListener('dragstart', function(ev) {
                var target = ev.target,
                    pointer = ev.currentPointer;
                if (target instanceof H.map.Marker) {
                var targetPosition = map.geoToScreen(target.getGeometry());
                target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
                behavior.disable();
                }
            }, false);
            // re-enable the default draggability of the underlying map
            // when dragging has completed
            map.addEventListener('dragend', function(ev) {
                var target = ev.target;
                if (target instanceof H.map.Marker) {


                behavior.enable();
                }
            }, false);
            // Listen to the drag event and move the position of the marker
            // as necessary
            map.addEventListener('drag', function(ev) {
                var target = ev.target,
                    pointer = ev.currentPointer;
                if (target instanceof H.map.Marker) {
                target.setGeometry(map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
                }
            }, false);
    }
    getBrowserPosition();
    clickToMark();
    clickDragMarkers();
/*=============================================================*/
