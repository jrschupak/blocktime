window.onload = function(){
	console.log("Main.js is connected");

var bst = document.querySelector('.bst');
var dollar = document.querySelector('.dollars');
var pound = document.querySelector('.pound');
var euro = document.querySelector('.euro');

console.log(bst.innerText);


var timer = setInterval(function(){ //if needed this function is to make the timer tick
	// console.log("Set Interval timer for 1 second")
	
}, 000)

$.ajax({
	url: "http://api.coindesk.com/v1/bpi/currentprice.json",
	dataType: "JSON"
}).done(function(response){
	console.log(response.bpi)
	bst.innerText = response.time.updateduk;
	dollar.innerHTML = "USD: " + response.bpi.USD.symbol + response.bpi.USD.rate;
	euro.innerHTML = "Euro: " + response.bpi.EUR.symbol + response.bpi.EUR.rate;
	pound.innerHTML = "Pound: " + response.bpi.GBP.symbol + response.bpi.GBP.rate;
});

} //end of window.onload


