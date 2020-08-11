var myHeaders = new Headers();
myHeaders.append("Subscription-Key", "e4db10f1ac324ea7a370a0f2564f800e");
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

$(function() {
  $.getJSON("https://extreme-ip-lookup.com/json/",
   function(json) {
   fetch("https://api.smartable.ai/coronavirus/stats/"+json.countryCode, requestOptions)
    .then(response => response.json())
    //.then(result => x.innerHTML = "Country : "+result.location.countryOrRegion + " [ "+result.location.isoCode +" ]"+"<br>Confirmed : " + result.stats.totalConfirmedCases + " ( +" + result.stats.newlyConfirmedCases +" )"+ '<br>' +"Recovered : " + result.stats.totalRecoveredCases + " ( +" + result.stats.newlyRecoveredCases +" )"+ "<br>Deaths : " + result.stats.totalDeaths + " ( +" + result.stats.newDeaths +" )"+ "<br>Last Updated on " + result.updatedDateTime.replace('T'," @ ").replace('Z'," ").replace(".",":")+ "<br><br><i> + shows new cases reported yesterday</i>")
    //.then(result => console.log(result))
    .then(result => (function(){
      document.getElementById("country").innerHTML = result.location.countryOrRegion;
      document.getElementById("totalCases").innerHTML = result.stats.totalConfirmedCases;
      document.getElementById("totalRecoveredCases").innerHTML = result.stats.totalRecoveredCases;
      document.getElementById("totalNewCases").innerHTML = result.stats.newlyConfirmedCases;
      $('#totalCases,#totalRecoveredCases,#totalNewCases').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
    })())
    .catch(error => console.log('error', error));

   }
  );
  
  });

