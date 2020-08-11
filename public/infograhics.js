//const { response } = require("express");

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://bing-image-search1.p.rapidapi.com/images/search?count=100&q=covid%20infographic",
	"method": "GET",
	//"dataType": 'JSON',
	"headers": {
		"x-rapidapi-host": "bing-image-search1.p.rapidapi.com",
		"x-rapidapi-key": "e84e9db187msh8b37ae8b89861e8p10b89ejsne35c4c328189"
	}
}

$.ajax(settings).done(function (response) {

	for(i=0; i<99; i++){
		if(response.value[i].thumbnail.width > response.value[i].thumbnail.height && response.value[i].height < 1100 && i!=71){
			document.getElementById("slideshow").innerHTML += '<img id="myImg'+i+'"src="'+response.value[i].contentUrl+'"alt="insert text here" style="max-width:100%;cursor:pointer" onclick="onClick(this)"/>'
		}
	//document.getElementById("val").innerHTML += "<div class='carousel-item active'>" + "<img src=\""+ response.value[0].thumbnailUrl +"\" class='d-block w-100 h-100'</img>" + "</div>" + "<div class='carousel-item'>" + "<img src=\""+ response.value[i].thumbnailUrl +"\" class='d-block w-100 h-100'</img>" + "</div>";
	}
	console.log(response);
});

(function(){

	var slideshow = document.getElementById('slideshow'),
		imgs = slideshow.getElementsByTagName('img'),
		count = 0,
		timer,
		previous;
  
	function next(){
	  previous = count > 0 ? count - 1 : 0;
	  imgs[ previous ].className = imgs[ previous ].className.replace(/\bis\-active\b/i, '' );
	  
	  if( count < imgs.length ){
		imgs[ count ].className += 'is-active';
		count++;
	  }  
	  else{
		count = 0;
		next();
	  }
	}
  
	next();
  
	timer = setInterval(function(){
	  next();
	}, 6000);
  
  })();
