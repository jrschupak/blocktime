window.onload = function(){
	console.log("Main.js is connected");

var day = document.querySelector('.days');
var hours = document.querySelector('.hours');
var minutes = document.querySelector('.minutes');
var seconds = document.querySelector('.seconds');

console.log(day, hours, minutes, seconds.innerText);


var timer = setInterval(function(){ //if needed this function is to make the timer tick
	// console.log("Set Interval timer for 1 second")
	if(seconds.value === "59"){
		
	}
}, 1000)

$.ajax({
	url: "http://api.coindesk.com/v1/bpi/currentprice.json",
	dataType: "JSON"
}).done(function(response){
	console.log(response)

});

} //end of window.onload


