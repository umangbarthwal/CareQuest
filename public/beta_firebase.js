     /*Your web app's Firebase configuration*/
     var firebaseConfig = {
        apiKey: "AIzaSyChax-RIyl8an4nKJA0XLdIc8CyU3jeGgY",
        authDomain: "here-maps-bitsians.firebaseapp.com",
        databaseURL: "https://here-maps-bitsians.firebaseio.com",
        projectId: "here-maps-bitsians",
        storageBucket: "here-maps-bitsians.appspot.com",
        messagingSenderId: "517005193635",
        appId: "1:517005193635:web:846d53aebc789427b0ea16"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

//firebase.database().ref('location/' + firebase.auth().currentUser.uid).on('value',(snap)=>{
   // document.getElementById('covidstatus').value = snap.val().status;
//});

/*===========================adding locations to database - start==================================*/
function add_location(){
    function add_loc(h){
        firebase.database().ref('location/' + h.user_id).set(h);
    }

    var covidStatus = $('#covidstatus').val();

    var location = {
      user_id: firebase.auth().currentUser.uid,
      mob: firebase.auth().currentUser.phoneNumber,
      time: new Date().toLocaleString(),
      latitude: user_lat,
      longitude: user_lng,
      status: covidStatus
    };

    console.log(user_lat + " @ "+ user_lng);

    add_loc(location);
    }
/*===========================adding locations to database - end==================================*/

/*===========================fetching locations from database - start==================================*/
    var flag = 0;

    var addonref = firebase.database().ref().child("location");

    addonref.on("value", function(snapshot) {

      var currentUserPhoneNumber = firebase.auth().currentUser.phoneNumber;

      map.removeObjects(map.getObjects());

      snapshot.forEach(function(childsnapshot){
        var item = childsnapshot.val();
        firebase.database().ref('location/' + firebase.auth().currentUser.uid).on('value',(snap)=>{
               document.getElementById('covidstatus').value = snap.val().status;
     });


        var userPosition = {lat: item.latitude , lng: item.longitude };
        console.log(userPosition);
        console.log(`status : ${item.status}`);

        //var checkUser = ((user_lat.toFixed(2)) == (item.latitude.toFixed(2)) && (user_lng.toFixed(2)) == (item.longitude.toFixed(2)));
        var checkUser = (currentUserPhoneNumber == item.mob);
        var checkRed = (item.status == "red");
        var checkYellow = (item.status == "yellow");
        var userIcon = (checkUser) ? (new H.map.Icon('./beta_icons/icons8-standing-man-48.png')) : ( (checkRed) ? (new H.map.Icon('./beta_icons/icons8-man-50.png')) : ( (checkYellow) ? (new H.map.Icon('./beta_icons/icons8-man-50 (2).png')) : (new H.map.Icon('./beta_icons/icons8-man-50 (1).png'))) );
        //console.log(checkUser);

        let userMarker = new H.map.Marker(userPosition, {icon: userIcon});
        map.addObject(userMarker);



        //checking the coordinate range

        point = new H.geo.Point(item.latitude , item.longitude);
        var checkPosition = turf.booleanPointInPolygon(point.toGeoJSON(), circle.toGeoJSON());

        console.log("Is there someone ?")
        console.log(checkPosition);

       if(checkPosition && !checkUser){
          if(item.status == "red"){
            console.log("range mein aagaya red wala");
            firebase.database().ref('location/' + firebase.auth().currentUser.uid).update({status: "yellow"});
            console.log("changed to yellow");
            map.removeObject(map.getObjects()[1]);

          }
          else if(item.status == "yellow"){
            console.log("range mein aagaya yellow wala");
            firebase.database().ref('location/' + firebase.auth().currentUser.uid).update({status: "yellow"});
            console.log("changed to yellow");
            map.removeObject(map.getObjects()[1]);

          }
          if(flag == 0){
            alert("Alert !!! There might be some Covid carriers around YOU.");
            flag++;
          }
       }

       switch(document.getElementById('covidstatus').value){
         case 'green':
          map.addObject(green_circle);
          break;
        case 'yellow':
          map.addObject(yellow_circle);
          break;
        case 'red':
          map.addObject(red_circle);
          break;
        default:
          map.addObject(circle);

       }


      /*====current user update - start====*/
      var updates = {
        time: new Date().toLocaleString(),
        latitude: user_lat,
        longitude: user_lng
      }
      firebase.database().ref('location/' + firebase.auth().currentUser.uid).update(updates);
      /*====current user update -end ====*/

      userMarker.setData(firebase.auth().currentUser.phoneNumber);

    });

  });

/*===========================fetching locations from database - end==================================*/
