//hamburger button 
document.querySelector("body > div.ui.pointing.menu.stackable > div.hamburger").addEventListener("click", function(e) { 
		$menu = $(this).parent();
		if(!$(this).hasClass('active')) {
			$(this).addClass('active');
			$menu.addClass('open');
		} else {
			$(this).removeClass('active');
			$menu.removeClass('open');
		}
		e.preventDefault();
	});

// this one is jut to wait for the page to load
// this one is jut to wait for the page to load
document.addEventListener('DOMContentLoaded', () => {

    const themeStylesheet = document.getElementById('theme');
    const storedTheme = localStorage.getItem('theme');
    if(storedTheme){
        themeStylesheet.href = storedTheme;
    }
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        // if it's light -> go dark
        if(themeStylesheet.href.includes('light')){
            themeStylesheet.href = 'dark-theme.css';
            themeToggle.innerHTML = '<i class="sun icon"></i>';
            
        } else {
            // if it's dark -> go light
            themeStylesheet.href = 'light-theme.css';
            themeToggle.innerHTML = '<i class="moon icon"></i>';
        }
        // save the preference to localStorage
        localStorage.setItem('theme',themeStylesheet.href)  
    })
})

function displaydetail(i){
    var x = document.getElementById("route"+i);
    
    x.style.display = "block";
    document.getElementById("closebtn"+i).style.display = "block";
    document.getElementById("openbtn"+i).style.display = "none";    
    var j ;
    for(j=0;j<4;j++){
        if(j!=i){
            document.getElementById("route"+j).style.display = "none";
            document.getElementById("openbtn"+j).classList.add("disabled");
        }
    }
}

function closebutton(i){
    //document.getElementById("route-detail"+i).style.display = "none";
    document.getElementById("route"+i).style.display = "none";
    document.getElementById("closebtn"+i).style.display = "none";
    document.getElementById("openbtn"+i).style.display = "block";
    for(j=0;j<4;j++){
        if(j!=i){
            document.getElementById("openbtn"+j).classList.remove("disabled");
        }
    }
}
//===========Post Login interface==================//
function displayMainPage(i){
    var pages = ["dashboard-page","profile-page","Manage-Hospital","chat","settings-page"];
    for(j=0;j<pages.length;j++){
        if(pages[j].localeCompare(i)==0){
            document.getElementById(i).style.display = "block";
        }
        else{
           document.getElementById(pages[j]).style.display = "none";    
        }
    }
}

  //=============TRANSITION ANIMATION LOGIN PAGE===========//
$(document).ready(function(){
    $('.forgot-interface').hide();
})
$('#register-interface a').click(function(){

$('.login-form').hide(1000);

    $('.registration-form').show(1000);
    
});
$('#login-interface a').click(function(){

    $('.registration-form').hide(1000);
    $('.login-form').show(1000);
    
});
$('#forgot-password a').click(function(){

    $('.login-form').hide(1000);
    $('.forgot-interface').show();
})
$('#back-interface a').click(function(){

    $('.forgot-interface').hide(1000);
    $('.login-form').show(1000);
})

