window.onload = function(){
	console.log("Main.js is connected");

var day = document.querySelector('.days');
var hours = document.querySelector('.hours');
var minutes = document.querySelector('.minutes');
var seconds = document.querySelector('.seconds');

console.log(day, hours, minutes, seconds.innerText);


var timer = setInterval(function(){
	// console.log("Set Interval timer for 1 second")
	if(seconds.value === "59"){
		
	}
}, 1000)


}

