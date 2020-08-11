    //document.getElementById("news_").classList.add("active")
    $(function() {
        $.getJSON("https://extreme-ip-lookup.com/json/",
           function(json){
       
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      var i;
      fetch("https://api.coronatracker.com/news/trending?limit=25&offset&country="+json.country+"&countryCode", requestOptions)
        .then(response => response.json())
        //.then(results => console.log(results))
        .then(result => (function(){
              //document.getElementById("news1").innerHTML += '<marquee behavior="scroll" direction="up">';
              for(i = 0; i < 25 ; i++){
                document.getElementById("news1").innerHTML += "<li class=''><span>" + result.items[i].publishedAt.replace("T"," ").replace("Z"," ") + "</span>| <a href='" + result.items[i].url + "'>" + result.items[i].title + "</a> | "+result.items[i].description+"...</li><br><br>";
              }
       
              //document.getElementById("news1").innerHTML += '</marquee>';
        })())
        .catch(error => console.log('error', error));
       
        //<marquee behavior="scroll" direction="up">Here is some scrolling text... going up!</marquee>
      }   
                  );
      });