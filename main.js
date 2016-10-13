window.onload = function(){
	console.log("Main.js is connected");

var bst = document.querySelector('.bst');
var dollar = document.querySelector('.dollars');
var pound = document.querySelector('.pound');
var euro = document.querySelector('.euro');
var address = '';

console.log(bst.innerText);

var dateTimeCall = function(){
	$.ajax({
	url: "http://api.coindesk.com/v1/bpi/currentprice.json",
	dataType: "JSON"
}).done(function(response){
	console.log(response)
	bst.innerText = response.time.updateduk;
	dollar.innerHTML = "USD: " + response.bpi.USD.symbol + response.bpi.USD.rate;
	euro.innerHTML = "Euro: " + response.bpi.EUR.symbol + response.bpi.EUR.rate;
	pound.innerHTML = "Pound: " + response.bpi.GBP.symbol + response.bpi.GBP.rate;
});
}

var addressCall = function(){ //ajax call to onename API to get bitcoin address
	var onenameInput = document.querySelector('.onename-input');
	var query = "https://api.onename.com/v1/search?query=" + onenameInput.value + "&app-id=" + appID + "&app-secret=" + appSecret;
    console.log(query);

    $.ajax({
      url: query,
      dataType: "JSON"
    }).done(function(response){
      console.log(response);

    })//end of done function
};

var balanceCall = function(){ //Takes the address(es) from onename API and makes an ajax call to get balance in Shatoshi then converts it into BITCOIN
	$.ajax({
	// url: "https://blockexplorer.com/api/addr/" + address + "/balance",
	url: "https://blockexplorer.com/api/addr/1DTRDHkWt3xyhrMCRHz1XV5DjCe9VxRoRW/balance",
	dataType: "JSON"
}).done(function(response){
	console.log(response)
}) //end of done function
}; //end of balanceCall function





balanceCall();
dateTimeCall();

var timer = setInterval(function(){ //if needed this function is to make the timer tick

dateTimeCall();
	
}, 10000)



} //end of window.onload


