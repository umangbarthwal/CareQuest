var geocoder = platform.getSearchService();

function geocoderSearch(){
    var loc = prompt("Enter your location");
    if(loc==null)
        alert("Null is not accepted");
    
    let geocodeParam ={
        q: loc,
        limit: 5, //Search results limitation
        //Coutry limitation here
        in: 'countryCode:USA',
                
    }
    function onResult(result){
        console.log(result);
        if(result.items.length>0){
            for(var i =0 ; i < result.items.length ; i++){
            let mrk = new H.map.Marker(result.items[i].position);
             map.addObject(mrk);
             mrk.setData(result.items[i].title);
        }
        document.getElementById("status").innerHTML = result.items.length + " Results Found";
    }
            
        
    }
    if(loc!="")
        geocoder.geocode(geocodeParam,onResult, alert);
        
        
}

function geocodeAndSearch(){
    var rad = prompt("Define Search Radius (in meters) : ");
    let geocodeParam ={
        q: 'hospitals',
        in: 'circle:'+ map.getCenter().lat +',' + map.getCenter().lng +';r='+rad
                
    }
    function onResult(result){
        console.log(result);
        if(result.items.length>0){
            for(var i =0 ; i < result.items.length ; i++){
                var mkr = new H.map.Marker(result.items[i].position);
                map.addObject(mkr);
                mkr.setData(result.items[i].title + ' (' + result.items[i].distance +' m)');
            }
            
        }
        ui.addBubble(new H.ui.InfoBubble(result.items[0].position,{
            content: result.items[0].title + ' (' + result.items[0].distance +' m)'
        }));
        document.getElementById("status").innerHTML = result.items.length + " Hospitals Found in " + rad + " meters";        
        //info bubble
        
       
    }

    
    geocoder.discover(geocodeParam,onResult, alert);
        
        
}

function geocodeBrowse(){
    var cat = prompt("Mention category id(s) to be included, seperated by commas : " + '\n' + "800-8000-0000 : Hospital or Health Care Facility" + '\n' + "800-8000-0154 : Dentist-Dental Office" + '\n' +"800-8000-0155 : Family-General Practice Physicians" + '\n' + "800-8000-0156 : Psychiatric Institute" + '\n' + "800-8000-0157 : Nursing Home" + '\n' + "800-8000-0158 : Medical Services-Clinics" + '\n' + "800-8000-0159 : Hospital" + '\n' + "800-8000-0161 : Optical" + '\n' + "800-8000-0162 : Veterinarian" + '\n' + "800-8000-0325 : Hospital Emergency Room" + '\n' + "800-8000-0340 : Therapist" + '\n' + "800-8000-0341 : Chiropractor" + '\n' + "800-8000-0367 : Blood Bank");
    let geocodeParam ={
        name: 'hospitals',
        at: map.getCenter().lat +',' + map.getCenter().lng, //use this for facilities
        categories: cat, 
        limit: 5
                
    }
    function onResult(result){
        console.log(result);
        if(result.items.length>0){
            for(var i =0 ; i < result.items.length ; i++){
                var mkrk = new H.map.Marker(result.items[i].position);
                map.addObject(mkrk);
                mkrk.setData(result.items[i].title + ' (' + result.items[i].distance +' m)');
            }
            
        }
        
       ui.addBubble(new H.ui.InfoBubble(result.items[0].position,{
            content: result.items[0].title + ' (' + result.items[0].distance +' m)'
        }));
        document.getElementById("status").innerHTML = result.items.length + " Suitable Medical Units Found Around You";
        
    }

    
    
    geocoder.browse(geocodeParam,onResult, alert);
}

function revGeocode(lat, lon){
    var sol = lat + "," + lon;
    let geocodeParam ={
        at: sol
                
    }

    function onResult(result){
        console.log(result);
        if(result.items.length>0){
            var x = result.items[0].title;
            document.getElementById("status").innerHTML = x;
            var i = x.split(",");
            if(getNumber(i)=="Nothing"){
                document.getElementById("card4").innerHTML = "Nothing";
            }else{
                document.getElementById("card4").innerHTML = getNumber(i);
            }
        }else if(result.items.length==0){
            document.getElementById("status").innerHTML = "Here Maps : BITSians";
        }
    }
   
    geocoder.reverseGeocode(geocodeParam,onResult, alert);

}



function covid(){
  let geocodeParam ={
      name: 'covid',
      at: map.getCenter().lat +',' + map.getCenter().lng, 
      limit: 50
              
  }
  
  function onResult(result){
      console.log(result);
      let covidIcon = new H.map.Icon('covid.png');
      if(result.items.length>0){
        for(var i =0 ; i < result.items.length ; i++){
            var covidMarker = new H.map.Marker(result.items[i].position, {icon: covidIcon});
            map.addObject(covidMarker);
            covidMarker.setData(result.items[i].title + ' (' + result.items[i].distance +' m)');
        }
        
    }
            
     ui.addBubble(new H.ui.InfoBubble(result.items[0].position,{
          content: result.items[0].title + ' (' + result.items[0].distance +' m)'
      }));
      document.getElementById("status").innerHTML = result.items.length + " COVID-19 Testing Sites Found Around You";
      
  }

  
  
  geocoder.browse(geocodeParam,onResult, alert);
}

function getNumber(i){
    var numbers = [
        {
          "Country": "Afghanistan",
          "Emergency": "",
          "Police": 119,
          "Ambulance": 102,
          "Fire": 119,
          "Call Codes": 93
        },
        {
          "Country": "Albania",
          "Emergency": "",
          "Police": 129,
          "Ambulance": 127,
          "Fire": 128,
          "Call Codes": 355
        },
        {
          "Country": "Algeria",
          "Emergency": "",
          "Police": 17,
          "Ambulance": 14,
          "Fire": 14,
          "Call Codes": 213
        },
        {
          "Country": "American Samoa",
          "Emergency": 911,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 1684
        },
        {
          "Country": "Andorra",
          "Emergency": 112,
          "Police": 110,
          "Ambulance": 118,
          "Fire": 118,
          "Call Codes": 376
        },
        {
          "Country": "Angola",
          "Emergency": "",
          "Police": 113,
          "Ambulance": 112,
          "Fire": 115,
          "Call Codes": 244
        },
        {
          "Country": "Anguilla",
          "Emergency": 911,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 1264
        },
        {
          "Country": "Antigua & Barbuda",
          "Emergency": "911 or 999",
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 1268
        },
        {
          "Country": "Argentina",
          "Emergency": 911,
          "Police": 101,
          "Ambulance": 107,
          "Fire": 100,
          "Call Codes": 54
        },
        {
          "Country": "Armenia",
          "Emergency": "911 or 112",
          "Police": 102,
          "Ambulance": 103,
          "Fire": 101,
          "Call Codes": 374
        },
        {
          "Country": "Aruba",
          "Emergency": 911,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 297
        },
        {
          "Country": "Ascension Island",
          "Emergency": 999,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 247
        },
        {
          "Country": "Australia",
          "Emergency": "000, 112 mobiles\n0 landlines",
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 61
        },
        {
          "Country": "Austria",
          "Emergency": 112,
          "Police": 113,
          "Ambulance": 144,
          "Fire": 122,
          "Call Codes": 43
        },
        {
          "Country": "Azerbaijan",
          "Emergency": "",
          "Police": 102,
          "Ambulance": 103,
          "Fire": 101,
          "Call Codes": 94
        },
        {
          "Country": "Bahamas",
          "Emergency": "911 or 919\n112 mobiles",
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 1242
        },
        {
          "Country": "Bahrain",
          "Emergency": 999,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 973
        },
        {
          "Country": "Bangladesh",
          "Emergency": "",
          "Police": 999,
          "Ambulance": 199,
          "Fire": "9 555 555",
          "Call Codes": 880
        },
        {
          "Country": "Barbados",
          "Emergency": "",
          "Police": 211,
          "Ambulance": 511,
          "Fire": 311,
          "Call Codes": 1246
        },
        {
          "Country": "Belarus",
          "Emergency": "",
          "Police": 102,
          "Ambulance": 103,
          "Fire": 101,
          "Call Codes": 375
        },
        {
          "Country": "Belgium",
          "Emergency": 112,
          "Police": 101,
          "Ambulance": 100,
          "Fire": 100,
          "Call Codes": 32
        },
        {
          "Country": "Belize",
          "Emergency": 911,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 501
        },
        {
          "Country": "Benin",
          "Emergency": "",
          "Police": 117,
          "Ambulance": 112,
          "Fire": 118,
          "Call Codes": 229
        },
        {
          "Country": "Bermuda",
          "Emergency": 911,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 1441
        },
        {
          "Country": "Bhutan",
          "Emergency": "",
          "Police": 113,
          "Ambulance": 112,
          "Fire": 110,
          "Call Codes": 975
        },
        {
          "Country": "Bolivia",
          "Emergency": "",
          "Police": 110,
          "Ambulance": 118,
          "Fire": 119,
          "Call Codes": 591
        },
        {
          "Country": "Bosnia & Herzegovina",
          "Emergency": "",
          "Police": 122,
          "Ambulance": 124,
          "Fire": 123,
          "Call Codes": 387
        },
        {
          "Country": "Botswana",
          "Emergency": "997 or 911",
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 267
        },
        {
          "Country": "Brazil",
          "Emergency": "",
          "Police": 190,
          "Ambulance": 192,
          "Fire": 193,
          "Call Codes": 55
        },
        {
          "Country": "British Indian Ocean Territory",
          "Emergency": "",
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 246
        },
        {
          "Country": "British Virgin Islands",
          "Emergency": "999 or 911",
          "Police": "",
          "Ambulance": 999,
          "Fire": 999,
          "Call Codes": 1284
        },
        {
          "Country": "Brunei",
          "Emergency": "",
          "Police": 993,
          "Ambulance": 991,
          "Fire": 995,
          "Call Codes": 673
        },
        {
          "Country": "Bulgaria",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 359
        },
        {
          "Country": "Burkina Faso",
          "Emergency": "",
          "Police": 17,
          "Ambulance": 112,
          "Fire": 18,
          "Call Codes": 226
        },
        {
          "Country": "Burundi",
          "Emergency": "",
          "Police": 117,
          "Ambulance": 112,
          "Fire": 118,
          "Call Codes": 257
        },
        {
          "Country": "Cambodia",
          "Emergency": "",
          "Police": 117,
          "Ambulance": 119,
          "Fire": 118,
          "Call Codes": 855
        },
        {
          "Country": "Cameroon",
          "Emergency": "",
          "Police": 17,
          "Ambulance": "",
          "Fire": 18,
          "Call Codes": 237
        },
        {
          "Country": "Canada",
          "Emergency": 911,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 1
        },
        {
          "Country": "Cape Verde / Cabo Verde",
          "Emergency": "",
          "Police": 132,
          "Ambulance": 130,
          "Fire": 131,
          "Call Codes": 238
        },
        {
          "Country": "Cayman Islands",
          "Emergency": 911,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 1345
        },
        {
          "Country": "Central African Republic",
          "Emergency": "",
          "Police": 117,
          "Ambulance": 1220,
          "Fire": 118,
          "Call Codes": 236
        },
        {
          "Country": "Chad",
          "Emergency": "",
          "Police": 17,
          "Ambulance": "2251-4242",
          "Fire": 18,
          "Call Codes": 235
        },
        {
          "Country": "Chile",
          "Emergency": "",
          "Police": 133,
          "Ambulance": 131,
          "Fire": 132,
          "Call Codes": 56
        },
        {
          "Country": "China",
          "Emergency": "",
          "Police": 110,
          "Ambulance": 120,
          "Fire": 119,
          "Call Codes": 86
        },
        {
          "Country": "Christmas Island",
          "Emergency": 0,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 61891
        },
        {
          "Country": "Cocos (Keeling) Islands",
          "Emergency": 0,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 61891
        },
        {
          "Country": "Colombia",
          "Emergency": "112 or 123",
          "Police": 156,
          "Ambulance": 132,
          "Fire": 119,
          "Call Codes": 57
        },
        {
          "Country": "Comoros",
          "Emergency": "",
          "Police": 17,
          "Ambulance": "772-03-73",
          "Fire": 18,
          "Call Codes": 269
        },
        {
          "Country": "DR Congo / Democratic Republic of the Congo",
          "Emergency": "",
          "Police": "",
          "Ambulance": "",
          "Fire": 118,
          "Call Codes": 243
        },
        {
          "Country": "Congo / Congo Republic",
          "Emergency": "",
          "Police": 112,
          "Ambulance": "",
          "Fire": 118,
          "Call Codes": 242
        },
        {
          "Country": "Cook Islands",
          "Emergency": "",
          "Police": 999,
          "Ambulance": 998,
          "Fire": 996,
          "Call Codes": 682
        },
        {
          "Country": "Costa Rica",
          "Emergency": "112 or 911",
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 506
        },
        {
          "Country": "Côte d’Ivoire / Ivory Coast",
          "Emergency": "",
          "Police": 111,
          "Ambulance": 185,
          "Fire": 180,
          "Call Codes": 225
        },
        {
          "Country": "Croatia",
          "Emergency": 112,
          "Police": 192,
          "Ambulance": 194,
          "Fire": 193,
          "Call Codes": 385
        },
        {
          "Country": "Cuba",
          "Emergency": "",
          "Police": 106,
          "Ambulance": 104,
          "Fire": 105,
          "Call Codes": 53
        },
        {
          "Country": "Curaçao / Curacao",
          "Emergency": "",
          "Police": 911,
          "Ambulance": 912,
          "Fire": 911,
          "Call Codes": 599
        },
        {
          "Country": "Cyprus",
          "Emergency": "112 or 199",
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 357
        },
        {
          "Country": "Northern Cyprus",
          "Emergency": 112,
          "Police": 155,
          "Ambulance": "",
          "Fire": 199,
          "Call Codes": 357
        },
        {
          "Country": "Czechia / Czech Republic",
          "Emergency": 112,
          "Police": 158,
          "Ambulance": 155,
          "Fire": 150,
          "Call Codes": 420
        },
        {
          "Country": "Denmark",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 45
        },
        {
          "Country": "Djibouti",
          "Emergency": "",
          "Police": 17,
          "Ambulance": 351351,
          "Fire": 18,
          "Call Codes": 253
        },
        {
          "Country": "Dominica",
          "Emergency": 999,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 1767
        },
        {
          "Country": "Dominican Republic",
          "Emergency": "112 or 911",
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": "1809/829/849"
        },
        {
          "Country": "East Timor / Timor-Leste",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 670
        },
        {
          "Country": "Ecuador",
          "Emergency": 911,
          "Police": 101,
          "Ambulance": 911,
          "Fire": 102,
          "Call Codes": 593
        },
        {
          "Country": "Egypt",
          "Emergency": "",
          "Police": 122,
          "Ambulance": 123,
          "Fire": 180,
          "Call Codes": 20
        },
        {
          "Country": "El Salvador",
          "Emergency": 911,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 503
        },
        {
          "Country": "Equatorial Guinea",
          "Emergency": "",
          "Police": 114,
          "Ambulance": 112,
          "Fire": 155,
          "Call Codes": 240
        },
        {
          "Country": "Eritrea",
          "Emergency": "",
          "Police": 113,
          "Ambulance": 114,
          "Fire": 116,
          "Call Codes": 291
        },
        {
          "Country": "Estonia",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 372
        },
        {
          "Country": "Eswatini (Swaziland)",
          "Emergency": "",
          "Police": 999,
          "Ambulance": 977,
          "Fire": 933,
          "Call Codes": 268
        },
        {
          "Country": "Ethiopia",
          "Emergency": 911,
          "Police": 991,
          "Ambulance": 907,
          "Fire": 939,
          "Call Codes": 251
        },
        {
          "Country": "Falkland Islands",
          "Emergency": 999,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 500
        },
        {
          "Country": "Faroe Islands",
          "Emergency": 112,
          "Police": "298 351448",
          "Ambulance": 1870,
          "Fire": "298 314544",
          "Call Codes": 298
        },
        {
          "Country": "Fiji",
          "Emergency": "",
          "Police": 911,
          "Ambulance": 911,
          "Fire": 9170,
          "Call Codes": 679
        },
        {
          "Country": "Finland",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 358
        },
        {
          "Country": "France",
          "Emergency": 112,
          "Police": 17,
          "Ambulance": 15,
          "Fire": 18,
          "Call Codes": 33
        },
        {
          "Country": "French Guiana",
          "Emergency": 112,
          "Police": 17,
          "Ambulance": 15,
          "Fire": 18,
          "Call Codes": 594
        },
        {
          "Country": "French Polynesia",
          "Emergency": 112,
          "Police": 17,
          "Ambulance": 15,
          "Fire": 18,
          "Call Codes": 689
        },
        {
          "Country": "Gabon",
          "Emergency": "",
          "Police": 1730,
          "Ambulance": 1300,
          "Fire": 18,
          "Call Codes": 241
        },
        {
          "Country": "Gambia",
          "Emergency": "",
          "Police": "117 or 112",
          "Ambulance": 116,
          "Fire": 118,
          "Call Codes": 220
        },
        {
          "Country": "Georgia",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 995
        },
        {
          "Country": "Germany",
          "Emergency": 112,
          "Police": 110,
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 49
        },
        {
          "Country": "Ghana",
          "Emergency": 999,
          "Police": 191,
          "Ambulance": 193,
          "Fire": 192,
          "Call Codes": 233
        },
        {
          "Country": "Gibraltar",
          "Emergency": "112 or 199",
          "Police": "",
          "Ambulance": 190,
          "Fire": 190,
          "Call Codes": 350
        },
        {
          "Country": "Greece",
          "Emergency": 112,
          "Police": 100,
          "Ambulance": 166,
          "Fire": 199,
          "Call Codes": 30
        },
        {
          "Country": "Greenland",
          "Emergency": "112 mobiles only",
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 299
        },
        {
          "Country": "Grenada",
          "Emergency": 911,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 1473
        },
        {
          "Country": "Guadeloupe",
          "Emergency": "",
          "Police": 17,
          "Ambulance": 15,
          "Fire": 18,
          "Call Codes": 590
        },
        {
          "Country": "Guam",
          "Emergency": 911,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 1671
        },
        {
          "Country": "Guatemala",
          "Emergency": "",
          "Police": "110, 120",
          "Ambulance": "122, 123 or 1554",
          "Fire": "122, 123 or 1554",
          "Call Codes": 502
        },
        {
          "Country": "Guinea",
          "Emergency": "",
          "Police": 122,
          "Ambulance": "442-020",
          "Fire": 1717,
          "Call Codes": 224
        },
        {
          "Country": "Guinea-Bissau",
          "Emergency": 112,
          "Police": 117,
          "Ambulance": 119,
          "Fire": 118,
          "Call Codes": 245
        },
        {
          "Country": "Guyana",
          "Emergency": 112,
          "Police": "",
          "Ambulance": 913,
          "Fire": 912,
          "Call Codes": 592
        },
        {
          "Country": "Haiti",
          "Emergency": 118,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 509
        },
        {
          "Country": "Honduras",
          "Emergency": 199,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 504
        },
        {
          "Country": "Hong Kong",
          "Emergency": "999 on landlines\n112 on mobiles",
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 852
        },
        {
          "Country": "Hungary",
          "Emergency": 112,
          "Police": 107,
          "Ambulance": 104,
          "Fire": 105,
          "Call Codes": 36
        },
        {
          "Country": "Iceland",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 354
        },
        {
          "Country": "India",
          "Emergency": 108,
          "Police": 100,
          "Ambulance": 102,
          "Fire": 101,
          "Call Codes": 91
        },
        {
          "Country": "Indonesia",
          "Emergency": "",
          "Police": 110,
          "Ambulance": "118 or 119",
          "Fire": 113,
          "Call Codes": 62
        },
        {
          "Country": "Iran",
          "Emergency": "112 on mobiles",
          "Police": 110,
          "Ambulance": 115,
          "Fire": 125,
          "Call Codes": 98
        },
        {
          "Country": "Iraq",
          "Emergency": 122,
          "Police": 104,
          "Ambulance": "",
          "Fire": 115,
          "Call Codes": 964
        },
        {
          "Country": "Ireland",
          "Emergency": "112 or 199",
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 353
        },
        {
          "Country": "Israel",
          "Emergency": "",
          "Police": 100,
          "Ambulance": 101,
          "Fire": 102,
          "Call Codes": 972
        },
        {
          "Country": "Italy",
          "Emergency": 112,
          "Police": 113,
          "Ambulance": 118,
          "Fire": 115,
          "Call Codes": 39
        },
        {
          "Country": "Jamaica",
          "Emergency": "",
          "Police": 119,
          "Ambulance": 110,
          "Fire": 110,
          "Call Codes": 1876
        },
        {
          "Country": "Japan",
          "Emergency": "",
          "Police": 110,
          "Ambulance": 119,
          "Fire": 119,
          "Call Codes": 81
        },
        {
          "Country": "Jordan",
          "Emergency": "112 or 911",
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 962
        },
        {
          "Country": "Kazakhstan",
          "Emergency": 112,
          "Police": "102, 02",
          "Ambulance": "103, 03",
          "Fire": "101, 01",
          "Call Codes": "7-6xx"
        },
        {
          "Country": "Kenya",
          "Emergency": 999,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 254
        },
        {
          "Country": "Kiribati",
          "Emergency": "",
          "Police": 992,
          "Ambulance": 994,
          "Fire": 993,
          "Call Codes": 686
        },
        {
          "Country": "North Korea",
          "Emergency": "112 or 119",
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 850
        },
        {
          "Country": "South Korea",
          "Emergency": "",
          "Police": 112,
          "Ambulance": 119,
          "Fire": 119,
          "Call Codes": 82
        },
        {
          "Country": "Kosovo",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 383
        },
        {
          "Country": "Kuwait",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 965
        },
        {
          "Country": "Kyrgyzstan",
          "Emergency": "",
          "Police": 102,
          "Ambulance": 103,
          "Fire": 101,
          "Call Codes": 996
        },
        {
          "Country": "Laos / Lao",
          "Emergency": "",
          "Police": 191,
          "Ambulance": 195,
          "Fire": 190,
          "Call Codes": 856
        },
        {
          "Country": "Latvia",
          "Emergency": 112,
          "Police": 2,
          "Ambulance": 3,
          "Fire": 1,
          "Call Codes": 371
        },
        {
          "Country": "Lebanon",
          "Emergency": "",
          "Police": "112 or 999",
          "Ambulance": 140,
          "Fire": 175,
          "Call Codes": 961
        },
        {
          "Country": "Lesotho",
          "Emergency": "",
          "Police": 123,
          "Ambulance": 121,
          "Fire": 122,
          "Call Codes": 266
        },
        {
          "Country": "Liberia",
          "Emergency": 911,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 231
        },
        {
          "Country": "Libya",
          "Emergency": 1515,
          "Police": "",
          "Ambulance": "",
          "Fire": 193,
          "Call Codes": 218
        },
        {
          "Country": "Liechtenstein",
          "Emergency": 112,
          "Police": 117,
          "Ambulance": 144,
          "Fire": 118,
          "Call Codes": 423
        },
        {
          "Country": "Lithuania",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 370
        },
        {
          "Country": "Luxembourg",
          "Emergency": 112,
          "Police": 113,
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 352
        },
        {
          "Country": "Macao",
          "Emergency": "999\n110 or 112 on mobiles",
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 853
        },
        {
          "Country": "Madagascar",
          "Emergency": "",
          "Police": 117,
          "Ambulance": 124,
          "Fire": 118,
          "Call Codes": 261
        },
        {
          "Country": "Malawi",
          "Emergency": "",
          "Police": "997 or 990",
          "Ambulance": 998,
          "Fire": 999,
          "Call Codes": 265
        },
        {
          "Country": "Malaysia",
          "Emergency": "112 or 999",
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 60
        },
        {
          "Country": "Maldives",
          "Emergency": 102,
          "Police": 119,
          "Ambulance": 102,
          "Fire": 118,
          "Call Codes": 960
        },
        {
          "Country": "Mali",
          "Emergency": "",
          "Police": 18,
          "Ambulance": 15,
          "Fire": 17,
          "Call Codes": 223
        },
        {
          "Country": "Malta",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 356
        },
        {
          "Country": "Marshall Islands",
          "Emergency": 911,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 692
        },
        {
          "Country": "Martinique",
          "Emergency": "",
          "Police": 17,
          "Ambulance": 15,
          "Fire": 18,
          "Call Codes": 596
        },
        {
          "Country": "Mauritania",
          "Emergency": "",
          "Police": 117,
          "Ambulance": 101,
          "Fire": 118,
          "Call Codes": 222
        },
        {
          "Country": "Mauritius",
          "Emergency": 999,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 230
        },
        {
          "Country": "Mayotte",
          "Emergency": "",
          "Police": 17,
          "Ambulance": 15,
          "Fire": 18,
          "Call Codes": 262
        },
        {
          "Country": "Mexico",
          "Emergency": "911 or 066",
          "Police": 66,
          "Ambulance": 65,
          "Fire": 68,
          "Call Codes": 52
        },
        {
          "Country": "Micronesia, Federated States of",
          "Emergency": 911,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 691
        },
        {
          "Country": "Moldova",
          "Emergency": 112,
          "Police": 122,
          "Ambulance": 124,
          "Fire": 123,
          "Call Codes": 373
        },
        {
          "Country": "Monaco",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 377
        },
        {
          "Country": "Mongolia",
          "Emergency": 100,
          "Police": 102,
          "Ambulance": 103,
          "Fire": 101,
          "Call Codes": 976
        },
        {
          "Country": "Montenegro",
          "Emergency": 112,
          "Police": 102,
          "Ambulance": 124,
          "Fire": 123,
          "Call Codes": 382
        },
        {
          "Country": "Montserrat",
          "Emergency": "",
          "Police": 999,
          "Ambulance": 911,
          "Fire": 911,
          "Call Codes": 1664
        },
        {
          "Country": "Morocco",
          "Emergency": "",
          "Police": 19,
          "Ambulance": 15,
          "Fire": 15,
          "Call Codes": 212
        },
        {
          "Country": "Mozambique",
          "Emergency": "",
          "Police": 119,
          "Ambulance": 117,
          "Fire": 198,
          "Call Codes": 258
        },
        {
          "Country": "Myanmar (Burma)",
          "Emergency": 191,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 95
        },
        {
          "Country": "Namibia",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 264
        },
        {
          "Country": "Nauru",
          "Emergency": "",
          "Police": 110,
          "Ambulance": 111,
          "Fire": 112,
          "Call Codes": 674
        },
        {
          "Country": "Nepal",
          "Emergency": "112 on mobiles",
          "Police": "100 or 103",
          "Ambulance": 102,
          "Fire": 101,
          "Call Codes": 977
        },
        {
          "Country": "Netherlands",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 31
        },
        {
          "Country": "New Caledonia",
          "Emergency": 112,
          "Police": 17,
          "Ambulance": 15,
          "Fire": 18,
          "Call Codes": 687
        },
        {
          "Country": "New Zealand",
          "Emergency": 111,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 64
        },
        {
          "Country": "Nicaragua",
          "Emergency": 118,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 505
        },
        {
          "Country": "Niger",
          "Emergency": "",
          "Police": 17,
          "Ambulance": 15,
          "Fire": 18,
          "Call Codes": 227
        },
        {
          "Country": "Nigeria",
          "Emergency": 119,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 234
        },
        {
          "Country": "Niue",
          "Emergency": 999,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 683
        },
        {
          "Country": "Norfolk Island",
          "Emergency": 999,
          "Police": 977,
          "Ambulance": 911,
          "Fire": 955,
          "Call Codes": 672
        },
        {
          "Country": "North Macedonia",
          "Emergency": 112,
          "Police": 194,
          "Ambulance": 192,
          "Fire": 193,
          "Call Codes": 389
        },
        {
          "Country": "Northern Mariana Islands",
          "Emergency": 911,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 1670
        },
        {
          "Country": "Norway",
          "Emergency": "",
          "Police": 112,
          "Ambulance": 113,
          "Fire": 110,
          "Call Codes": 47
        },
        {
          "Country": "Oman",
          "Emergency": 999,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 968
        },
        {
          "Country": "Pakistan",
          "Emergency": "15, 1122 landlines\n112 mobiles",
          "Police": 15,
          "Ambulance": 115,
          "Fire": 16,
          "Call Codes": 92
        },
        {
          "Country": "Palau",
          "Emergency": 911,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 680
        },
        {
          "Country": "Palestinian Territories",
          "Emergency": "",
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 92
        },
        {
          "Country": "Panama",
          "Emergency": 911,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 507
        },
        {
          "Country": "Papua New Guinea",
          "Emergency": 111,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 675
        },
        {
          "Country": "Paraguay",
          "Emergency": 911,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 595
        },
        {
          "Country": "Peru",
          "Emergency": "",
          "Police": 105,
          "Ambulance": 117,
          "Fire": 116,
          "Call Codes": 51
        },
        {
          "Country": "Philippines",
          "Emergency": "117, 112 and 911",
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 63
        },
        {
          "Country": "Pitcairn Islands",
          "Emergency": "",
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 64
        },
        {
          "Country": "Poland",
          "Emergency": 112,
          "Police": 997,
          "Ambulance": 999,
          "Fire": 998,
          "Call Codes": 48
        },
        {
          "Country": "Portugal",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 351
        },
        {
          "Country": "Puerto Rico",
          "Emergency": 911,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 1787
        },
        {
          "Country": "Qatar",
          "Emergency": 999,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 974
        },
        {
          "Country": "Réunion",
          "Emergency": 112,
          "Police": 17,
          "Ambulance": 15,
          "Fire": 18,
          "Call Codes": 262
        },
        {
          "Country": "Romania",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 40
        },
        {
          "Country": "Russia",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 7
        },
        {
          "Country": "Rwanda",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 250
        },
        {
          "Country": "Saint Helena",
          "Emergency": "",
          "Police": 999,
          "Ambulance": 911,
          "Fire": 999,
          "Call Codes": 290
        },
        {
          "Country": "Saint Kitts & Nevis",
          "Emergency": "",
          "Police": 911,
          "Ambulance": 911,
          "Fire": 333,
          "Call Codes": 1869
        },
        {
          "Country": "Saint Lucia",
          "Emergency": "911 or 999",
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 1758
        },
        {
          "Country": "Saint Martin",
          "Emergency": "",
          "Police": 911,
          "Ambulance": 912,
          "Fire": 910,
          "Call Codes": 33
        },
        {
          "Country": "Saint Pierre & Miquelon",
          "Emergency": "",
          "Police": 17,
          "Ambulance": 15,
          "Fire": 18,
          "Call Codes": 508
        },
        {
          "Country": "Saint Vincent & Grenadines",
          "Emergency": "999 or 911",
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 1784
        },
        {
          "Country": "Samoa",
          "Emergency": 999,
          "Police": 995,
          "Ambulance": 996,
          "Fire": 994,
          "Call Codes": 685
        },
        {
          "Country": "San Marino",
          "Emergency": "",
          "Police": 113,
          "Ambulance": 118,
          "Fire": 115,
          "Call Codes": 378
        },
        {
          "Country": "São Tomé & Príncipe",
          "Emergency": "",
          "Police": 222222,
          "Ambulance": "221221, 221222 & 221234",
          "Fire": 112,
          "Call Codes": 239
        },
        {
          "Country": "Saudi Arabia",
          "Emergency": "",
          "Police": 999,
          "Ambulance": 997,
          "Fire": 998,
          "Call Codes": 966
        },
        {
          "Country": "Senegal",
          "Emergency": "",
          "Police": 17,
          "Ambulance": 15,
          "Fire": 18,
          "Call Codes": 221
        },
        {
          "Country": "Serbia",
          "Emergency": 112,
          "Police": 192,
          "Ambulance": 194,
          "Fire": 193,
          "Call Codes": 381
        },
        {
          "Country": "Seychelles",
          "Emergency": "112 or 999",
          "Police": 133,
          "Ambulance": 151,
          "Fire": "",
          "Call Codes": 248
        },
        {
          "Country": "Sierra Leone",
          "Emergency": "",
          "Police": 999,
          "Ambulance": 999,
          "Fire": 19,
          "Call Codes": 232
        },
        {
          "Country": "Singapore",
          "Emergency": "112 on foreign mobiles",
          "Police": 999,
          "Ambulance": 995,
          "Fire": 995,
          "Call Codes": 65
        },
        {
          "Country": "Slovakia",
          "Emergency": 112,
          "Police": 158,
          "Ambulance": 155,
          "Fire": 150,
          "Call Codes": 421
        },
        {
          "Country": "Slovenia",
          "Emergency": 112,
          "Police": 113,
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 386
        },
        {
          "Country": "Solomon Islands",
          "Emergency": 999,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 677
        },
        {
          "Country": "Somalia",
          "Emergency": "",
          "Police": 888,
          "Ambulance": 999,
          "Fire": 555,
          "Call Codes": 252
        },
        {
          "Country": "South Africa",
          "Emergency": "112 on mobiles",
          "Police": 10111,
          "Ambulance": 10177,
          "Fire": 10111,
          "Call Codes": 27
        },
        {
          "Country": "South Georgia & South Sandwich Islands",
          "Emergency": 999,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 500
        },
        {
          "Country": "South Sudan",
          "Emergency": 999,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 211
        },
        {
          "Country": "Spain",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 34
        },
        {
          "Country": "Sri Lanka",
          "Emergency": "",
          "Police": "119, 118",
          "Ambulance": 110,
          "Fire": 111,
          "Call Codes": 94
        },
        {
          "Country": "Sudan",
          "Emergency": 999,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 249
        },
        {
          "Country": "Suriname",
          "Emergency": 115,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 597
        },
        {
          "Country": "Sweden",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 46
        },
        {
          "Country": "Switzerland",
          "Emergency": 112,
          "Police": 117,
          "Ambulance": 144,
          "Fire": 118,
          "Call Codes": 41
        },
        {
          "Country": "Syria",
          "Emergency": "",
          "Police": 112,
          "Ambulance": 110,
          "Fire": 113,
          "Call Codes": 963
        },
        {
          "Country": "Taiwan, Republic of China",
          "Emergency": "112 on mobiles",
          "Police": 110,
          "Ambulance": 119,
          "Fire": 119,
          "Call Codes": 886
        },
        {
          "Country": "Tajikistan",
          "Emergency": "112 on mobiles",
          "Police": 102,
          "Ambulance": 103,
          "Fire": 101,
          "Call Codes": 992
        },
        {
          "Country": "Tanzania",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 255
        },
        {
          "Country": "Thailand",
          "Emergency": "",
          "Police": 191,
          "Ambulance": 1669,
          "Fire": 199,
          "Call Codes": 66
        },
        {
          "Country": "Togo",
          "Emergency": "",
          "Police": "117 or 161",
          "Ambulance": 8200,
          "Fire": 118,
          "Call Codes": 228
        },
        {
          "Country": "Tokelau",
          "Emergency": "",
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 690
        },
        {
          "Country": "Tonga",
          "Emergency": 911,
          "Police": 922,
          "Ambulance": 933,
          "Fire": 999,
          "Call Codes": 676
        },
        {
          "Country": "Trinidad & Tobago",
          "Emergency": "",
          "Police": 999,
          "Ambulance": 990,
          "Fire": 990,
          "Call Codes": 1868
        },
        {
          "Country": "Tunisia",
          "Emergency": "",
          "Police": 197,
          "Ambulance": 190,
          "Fire": 198,
          "Call Codes": 216
        },
        {
          "Country": "Turkey",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 90
        },
        {
          "Country": "Turkmenistan",
          "Emergency": 112,
          "Police": 102,
          "Ambulance": 103,
          "Fire": 101,
          "Call Codes": 993
        },
        {
          "Country": "Turks & Caicos Islands",
          "Emergency": "911 or 999",
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 1649
        },
        {
          "Country": "Tuvalu",
          "Emergency": "",
          "Police": 911,
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 688
        },
        {
          "Country": "Uganda",
          "Emergency": "199, 112 mobiles",
          "Police": "199, 112 mobiles",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 256
        },
        {
          "Country": "Ukraine",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 380
        },
        {
          "Country": "United Arab Emirates",
          "Emergency": "",
          "Police": "999, 112",
          "Ambulance": "999, 998",
          "Fire": 997,
          "Call Codes": 971
        },
        {
          "Country": "United Kingdom (UK; England, Scotland, Wales, Northern Island)",
          "Emergency": "112 0r 999",
          "Police": "999 or 112",
          "Ambulance": 999,
          "Fire": 999,
          "Call Codes": 44
        },
        {
          "Country": "United States of America",
          "Emergency": 911,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 1
        },
        {
          "Country": "Uruguay",
          "Emergency": 911,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 598
        },
        {
          "Country": "Uzbekistan",
          "Emergency": "",
          "Police": 102,
          "Ambulance": 103,
          "Fire": 101,
          "Call Codes": 998
        },
        {
          "Country": "Vanuatu",
          "Emergency": 112,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 678
        },
        {
          "Country": "Vatican City / Holy See",
          "Emergency": "",
          "Police": 113,
          "Ambulance": 118,
          "Fire": 115,
          "Call Codes": "39/379"
        },
        {
          "Country": "Venezuela",
          "Emergency": 171,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 58
        },
        {
          "Country": "Vietnam",
          "Emergency": "",
          "Police": 113,
          "Ambulance": 115,
          "Fire": 114,
          "Call Codes": 84
        },
        {
          "Country": "United States Virgin Islands",
          "Emergency": 911,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 1340
        },
        {
          "Country": "Wallis & Futuna",
          "Emergency": "",
          "Police": 18,
          "Ambulance": 15,
          "Fire": 17,
          "Call Codes": 681
        },
        {
          "Country": "Western Sahara",
          "Emergency": 150,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 212
        },
        {
          "Country": "Yemen",
          "Emergency": 199,
          "Police": "",
          "Ambulance": "",
          "Fire": "",
          "Call Codes": 967
        },
        {
          "Country": "Zambia",
          "Emergency": 112,
          "Police": 999,
          "Ambulance": 993,
          "Fire": 991,
          "Call Codes": 260
        },
        {
          "Country": "Zimbabwe",
          "Emergency": 999,
          "Police": 995,
          "Ambulance": 994,
          "Fire": 993,
          "Call Codes": 264
        }
      ];
    var countryName = i[i.length-1].slice(1);
    // console.log(countryName);
    // console.log(countryName.length);
    // console.log(numbers[0].Country);
    // console.log(numbers[0].Country.length);
    for(var j=0;j<numbers.length;j++){
        if(countryName == numbers[j].Country){
            return `<div class="ui seven column stackable grid">
                    <div class="ui tiny statistic column">
                        <div class="value">
                        ${emptlyValueNumbers(numbers[j].Country)}
                        </div>
                        <div class="label">
                        REGION
                        </div>
                    </div>
                    <div class="ui tiny statistic column">
                        <div class="value">
                        ${emptlyValueNumbers(numbers[j]["Call Codes"])}
                        </div>
                        <div class="label">
                        Call Codes
                        </div>
                    </div>
                    <div class="ui tiny statistic column">
                        <div class="value">
                        ${emptlyValueNumbers(numbers[j].Emergency)}
                        </div>
                        <div class="label">
                        Emergency
                        </div>
                    </div>
                    <div class="ui tiny statistic column">
                        <div class="value">
                        ${emptlyValueNumbers(numbers[j].Police)}
                        </div>
                        <div class="label">
                        Police
                        </div>
                    </div>
                    <div class="ui tiny statistic column">
                        <div class="value">
                        ${emptlyValueNumbers(numbers[j].Ambulance)}
                        </div>
                        <div class="label">
                        Ambulance
                        </div>
                    </div>
                    <div class="ui tiny statistic column">
                        <div class="value">
                        ${emptlyValueNumbers(numbers[j].Fire)}
                        </div>
                        <div class="label">
                        Fire
                        </div>
                    </div>
                    </div>`; 
        }

    }
    return `<div class="ui info message" style="margin-top: 0.1vh;">
                <div class="header">
                    Not Available for this region, please click somewhere else
                </div>
            Click <a href="https://www.adducation.info/general-knowledge-travel-and-transport/emergency-numbers/"><b>here</b></a> for countrywise list of emergency numbers
            </div>`;
}

function emptlyValueNumbers(k){
    if(k==""){
        return `<i class="ban icon"></i>`;
    }else{
        return k;
    }
}