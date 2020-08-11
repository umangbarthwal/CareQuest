var faqCounter = 1;
var segmentNo = 1;
// keep account of active segment
var activeSegment = 1;

document.getElementById('faqContent').innerHTML += `
    <div class="ui segment" id="faqSegment${segmentNo}" style="display:none;min-height:140vh;">
    </div>
`

fetch("./faq_dump/faq1.json")
    .then(response => response.text())
    .then(results => {
        let requiredRegex = /\{([^}]+)\}/g
        var faqData = results.match(requiredRegex);
        for(var i=0;i<faqData.length;i++){
            var data = JSON.parse(faqData[i]);
            if(removeTags(data.answer)){
                document.getElementById(`faqSegment${segmentNo}`).innerHTML  += `
                <div class="ui styled fluid accordion" id="faq${faqCounter}" >
                    <div class="title" onclick="accordionClicked('faq${faqCounter}')"><i class="dropdown icon"></i>${data.question}</div>
                    <div class="content"><p class="transition hidden">${data.answer}</p></div>
                </div>
                `
                faqCounter += 1;
                if( faqCounter%25 == 0){
                    segmentNo += 1;
                    document.getElementById('faqContent').innerHTML += `
                    <div class="ui segment" id="faqSegment${segmentNo}" style="display:none;min-height:140vh;">
                    </div>
                    `
                }
            }
        }
    })
    .then(function(){
        fetch("./faq_dump/faq2.json")
            .then(response => response.text())
            .then(results => {
                let requiredRegex = /\{([^}]+)\}/g
                var faqData = results.match(requiredRegex);
                for(var i=0;i<faqData.length;i++){
                    var data = JSON.parse(faqData[i]);
                    if(removeTags(data.answer)){
                        document.getElementById(`faqSegment${segmentNo}`).innerHTML  += `
                        <div class="ui styled fluid accordion" id="faq${faqCounter}" >
                            <div class="title" onclick="accordionClicked('faq${faqCounter}')"><i class="dropdown icon"></i>${data.question}</div>
                            <div class="content"><p class="transition hidden">${data.answer}</p></div>
                        </div>
                        `
                        faqCounter += 1;
                        if( faqCounter%25 == 0){
                            segmentNo += 1;
                            document.getElementById('faqContent').innerHTML += `
                            <div class="ui segment" id="faqSegment${segmentNo}" style="display:none;min-height:140vh;">
                            </div>
                            `
                        }
                    }
                }
            })
            .then(function(){
                fetch("./faq_dump/faq3.json")
                    .then(response => response.text())
                    .then(results => {
                        let requiredRegex = /\{([^}]+)\}/g
                        var faqData = results.match(requiredRegex);
                        for(var i=0;i<faqData.length;i++){
                            var data = JSON.parse(faqData[i]);
                            if(removeTags(data.answer)){
                                document.getElementById(`faqSegment${segmentNo}`).innerHTML  += `
                                <div class="ui styled fluid accordion" id="faq${faqCounter}" >
                                    <div class="title" onclick="accordionClicked('faq${faqCounter}')"><i class="dropdown icon"></i>${data.question}</div>
                                    <div class="content"><p class="transition hidden">${data.answer}</p></div>
                                </div>
                                `
                                faqCounter += 1;
                                if( faqCounter%25 == 0){
                                    segmentNo += 1;
                                    document.getElementById('faqContent').innerHTML += `
                                    <div class="ui segment" id="faqSegment${segmentNo}" style="display:none;min-height:140vh;">
                                    </div>
                                    `
                                }
                            }
                        }    
                    })
                    .then(function(){
                        // Total segments
                        var segments = document.getElementById('faqContent').children;
                        
                        // Adding page nav at bottom
                        document.getElementById('faqPageNavContainer').innerHTML += `
                            <div class="ui horizontal list" id="faqPageNav" ></div>
                        `;
                        
                        // Adding prev button
                        document.getElementById('faqPageNav').innerHTML +=`
                            <a class="item" onclick="faqNavPageBtn(${segments.length},'prev')" style="font-size:18px;"><i class="angle double left icon"></i></a>
                        `
        
                        // Adding items in page nav 
                        for(var j=1;j<=segments.length;j++){
                            document.getElementById('faqPageNav').innerHTML +=`
                            <a class="item" id="segmentPageTab${j}" onclick="displayFaqSegment(${j},${segments.length})" style="font-size:18px;width:30px;height:30px;padding:5.5px;">${j}</a>
                            `
                        }
        
                        // Adding next button
                        document.getElementById('faqPageNav').innerHTML +=`
                            <a class="item" onclick="faqNavPageBtn(${segments.length},'next')" style="font-size:18px;"><i class="angle double right icon"></i></a>
                        `
        
                        // Displaying first Page initially
                        displayFaqSegment(activeSegment,segments.length);
                    })
                    .catch(error => console.log('error', error));
            })
            .catch(error => console.log('error', error));
    })
    .catch(error => console.log('error', error));

// Prev Nav Page Btn Functionality
function faqNavPageBtn(k,faqmove){
    if(faqmove.localeCompare('prev')==0){
        displayFaqSegment(activeSegment-1,k);
    }else if(faqmove.localeCompare('next')==0){
        displayFaqSegment(activeSegment+1,k);
    }else{
        console.log("this was not supposed to happen");
    }
}



// nav page function
function displayFaqSegment(i,k){
    if(i!=0 && i<=k){
        activeSegment = i;
        for(var j=1;j<=k;j++){
            if(j!=i){
                document.getElementById(`segmentPageTab${j}`).style.backgroundColor = "transparent";
                document.getElementById(`faqSegment${j}`).style.display = "none";
            }else{
                document.getElementById(`segmentPageTab${j}`).style.backgroundColor = "rgba(5, 165, 78,0.3)";
                document.getElementById(`faqSegment${j}`).style.display = "block";
            }
        }   
    }else{
        console.log("No such Page exists!!")
    }
}




// Function to remove unnecessary tags from scrapped data
function removeTags(str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
    return str.replace( /(<([^>]+)>)/ig, '');
}


// Function for  Accordion 
function accordionClicked(i){
    var childElements = document.getElementById(i).children;
    if(childElements[0].classList.contains('active')){
        childElements[0].classList.remove('active');
        childElements[1].classList.remove('active');
    }
    else{
        childElements[0].classList.add('active');
        childElements[1].classList.add('active');
    }
};
