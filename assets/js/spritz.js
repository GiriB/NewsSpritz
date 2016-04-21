// lights off effect
$(".on").click(function () {
    console.log("on clicked");
    // $(".overlay").style.;
});

$(".off").click(function () {
	console.log("off clicked");
    // $(".overlay").fadeOut();
});





// *********************************************** //

// text to be read
var $words = [ ]


var $current_word = 0;
var $displayInterval = null;

// setting spritzer for all the spritz-buttons 
var buttons = $('.mybutton');
for(i=0;i<buttons.length;i++){
	buttons[i].addEventListener("click",spritzer);
}


//
$('#spritz-play')[0].addEventListener("click",play);
$('#spritz-pause')[0].addEventListener("click",pause);
$('#spritz-reset')[0].addEventListener("click",reset);



// display wpm for slider 
$('#slider')[0].addEventListener("change",displaySpeed);
// changeSpeed while running
$('#slider')[0].addEventListener("change",changeSpeed);




//close button for the #spritz-div 
var bSpritzClose = $('#spritz-close')[0];
bSpritzClose.addEventListener("click",closeSpritz);




// hide #spritz-div 
function closeSpritz(){
	$('#spritz-div')[0].style.display="none";
	$current_word = 0;
	$words = []
	$(".overlay")[0].style.zIndex = -1 ;
	$(".overlay")[0].style.display = "none" ;
	clearInterval($displayInterval);
}




// get the news
function spritzer(){
	$(".overlay")[0].style.zIndex = 13 ;
	$(".overlay")[0].style.display = "block";
	console.log(this.id + " is clicked ");
	var Id=this.id.split('-')[2];
	console.log(Id + "was clicked");	
	$('#spritz-div')[0].style.display="block";

	var cardId = "news-card-"+Id;

	//getting the body of the news card 
	var body = $('#'+cardId+" .cd-timeline-content .content-body")[0];
	// getting text from the body
	var text = body.innerHTML;
	$words = text.split(' ');
	$('#spritz-text')[0].innerHTML = $words[$current_word];

	console.log(text + " loaded " + $words.length);

}

// display speed to the user 
function displaySpeed(){
	$('#wpm')[0].innerHTML = $('#slider')[0].value+" wpm";
	console.log($('#slider')[0].value);
}

function changeSpeed(){
	console.log("change speed inteval == " ,$displayInterval);
	if($displayInterval) {
		clearInterval($displayInterval);
		console.log("Changing speed");
		play();
	}else {
		console.log("DisplayiNterval not set");
	}
}

// get the current set speed
function getSpeed () {
	var speed = $('#slider')[0].value;
	console.log("return speed " + speed);
	return parseInt(speed);
}

// when play is pressed 
function play() {
	// interval in ms 
	var interval = (60 / getSpeed()) * 1000;
	console.log("interval  -- ",interval);
	$displayInterval = setInterval(display, interval);

}

// get the ith word and display it 
function display(){
 showWord($current_word);
 $current_word+=1;
}

// show thw word
function showWord(i){
	// if at the end
	if(i == $words.length){
		clearInterval($displayInterval);
		$current_word = 0;
		// $('#spritz-text')[0].innerHTML = $words[0];
	}else {
		$('#spritz-text')[0].innerHTML = $words[i];
		// console.log("showing " + $words[$current_word]);
	}
}

// when paused
function pause(){
	if($displayInterval) {
		clearInterval($displayInterval);
	}
}


// reset 
function reset(){
	if($displayInterval) {
		clearInterval($displayInterval);
	}

	$current_word=0;
	console.log("Resetting " + $words[$current_word]);
	$('#spritz-text')[0].innerHTML = $words[$current_word];

}
