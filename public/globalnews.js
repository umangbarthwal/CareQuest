var settings = {
    "url": "https://www.who.int/feeds/entity/csr/don/en/rss.xml",
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {
    //console.log(response);
    //var xmlDoc = $.parseXML(response);
    //var $xml = $(xmlDoc);
    //var $items = $xml.find("channel");
    var $xml = $(response);
    var $items = $xml.find("item");
    
    $("#globalnews" ).append(`<ul>`);
    $items.each(function(){

      var pubDate = $(this).find('pubDate').text();
      var title = $(this).find('title').text();
      var link = $(this).find('link').text();
      var description = $(this).find('description').text().slice(0,88);

      $("#globalnews" ).append(`<li>${pubDate} | <a href="${link}">${title}</a> | ${description}...</li><br><br>`);

    });
    $("#globalnews" ).append(`</ul>`);
  });