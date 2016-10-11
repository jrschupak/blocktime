window.onload = function(){
	console.log("Main.js is connected");

var day = document.querySelector('.days');
var hours = document.querySelector('.hours');
var minutes = document.querySelector('.minutes');
var seconds = document.querySelector('.seconds');

console.log(day.innerText);


var timer = setInterval(function(){ //if needed this function is to make the timer tick
	// console.log("Set Interval timer for 1 second")
	
}, 000)

$.ajax({
	url: "http://api.coindesk.com/v1/bpi/currentprice.json",
	dataType: "JSON"
}).done(function(response){
	console.log(response.time)
	day.innerText = response.time.updateduk;
});

} //end of window.onload


