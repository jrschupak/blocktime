var bst = document.querySelector('.bst');
var dollar = document.querySelector('.dollars');
var pound = document.querySelector('.pound');
var euro = document.querySelector('.euro');
var address = '';
var responseObj = {responseArr: []};

window.onload = function(){
	console.log("Main.js is connected");



console.log(bst.innerText);

var dateTimeCall = function(){
	$.ajax({
	url: "http://api.coindesk.com/v1/bpi/currentprice.json", //http://www.coindesk.com/api/
		dataType: "JSON"
}).done(function(response){
	console.log(response)
	bst.innerText = response.time.updateduk;
	dollar.innerHTML = "USD: " + response.bpi.USD.symbol + response.bpi.USD.rate;
	euro.innerHTML = "Euro: " + response.bpi.EUR.symbol + response.bpi.EUR.rate;
	pound.innerHTML = "Pound: " + response.bpi.GBP.symbol + response.bpi.GBP.rate;
});
}

var searchButton = document.querySelector('.search-onename');
searchButton.addEventListener('click', function(){
	console.log("Search button clicked")

	var container = document.getElementById('handlebars-output');

	responseObj.responseArr = [];
	container.innerHTML = " ";
	addressCall();
});

var blockCount = function(){ //ajaxcall to blockexplorer for block height/count
	$.ajax({
		url: "https://blockexplorer.com/api/status?q=getBlockCount",
		dataType: "JSON"
	}).done(function(response){
		console.log(response)
	})
}

blockCount()

var addressCall = function(){ //ajax call to onename API to get bitcoin address
	var onenameInput = document.querySelector('.onename-input');
	var query = "https://api.onename.com/v1/search?query=" + onenameInput.value + "&app-id=" + appID + "&app-secret=" + appSecret;
    console.log(query);

    $.ajax({
      url: query,
      dataType: "JSON"
    }).done(function(response){
      console.log(response);
      //loop through each object and grab the bitcoin address of each user in the object. 
      for(var i = 0; i < response.results.length; i++){
      	// console.log(response.results[i].profile.bitcoin.address);
      	var address = response.results[i].profile.bitcoin.address;
      	console.log(address);
      	balanceCall(address);
      }
      //make a balanceCall for each address
    })//end of done function
};

var balanceCall = function(address){ //Takes the address(es) from onename API and makes an ajax call to get balance in Shatoshi then converts it into BITCOIN
	$.ajax({
	url: "https://blockexplorer.com/api/addr/" + address + "/balance",
	// url: "https://blockexplorer.com/api/addr/1DTRDHkWt3xyhrMCRHz1XV5DjCe9VxRoRW/balance",
	dataType: "JSON"
}).done(function(response){
	console.log("balanceCall, ", response)
	response = response * 0.00000001;
	responseObj.responseArr.push({amount: response});
	console.log(responseObj);

	
	
	//use handlebars template to display each amount

	//first grab the template from the index.html page
var source = document.getElementById('handlebars-template').innerHTML;

//compile the source and turn it into a function
var template = Handlebars.compile(source);

//pass the object to the function, store it in the "html" variable
//the function will return computed html to us
var computedHtml = template(responseObj);

var container = document.getElementById('handlebars-output');
container.innerHTML = computedHtml;	
})//end of done function
}; //end of balanceCall function





balanceCall();
dateTimeCall();

var timer = setInterval(function(){ //if needed this function is to make the timer tick

dateTimeCall();
	
}, 10000)



} //end of window.onload


