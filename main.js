var bst = document.querySelector('.bst');
var dollar = document.querySelector('.dollars');
var pound = document.querySelector('.pound');
var euro = document.querySelector('.euro');
var address = '';
var responseObj = {responseArr: []};
var timeToBlocksBtn = document.getElementById('time-conversion');
var daysInput = document.getElementById('days-input');
var hoursInput = document.getElementById('hours-input');
var minsInput = document.getElementById('mins-input');

//average of blocks per day is 142
var blockDay = 142;
var blockHour = 5.9167;
var blockMin = .0986;

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



var blockCount = function(){ //ajaxcall to blockexplorer for block height/count
	var gbt = document.querySelector(".gbt-time");
	console.log(gbt)

	$.ajax({
		url: "https://blockexplorer.com/api/status?q=getBlockCount",
		dataType: "JSON"
	}).done(function(response){
		console.log(response)
		gbt.innerText = "GBT: " + response.blockcount;
	})
}
var lastHash = function(){ //ajaxcall to blockexplorer for last hash
	var gbh = document.querySelector(".gbt-hash");
	console.log(gbh)

	$.ajax({
		url: "https://blockexplorer.com/api/status?q=getLastBlockHash",
		dataType: "JSON"
	}).done(function(response){
		console.log(response)
		gbh.innerText = "Block Hash: " + response.lastblockhash;
	})
}

blockCount();
lastHash();



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

var currentBlockInfo = setInterval( function (){ //if needed this function is to make the timer tick

blockCount();
lastHash();
	
}, 20000);

//10/25/16
var blockDay25 = 142;
var blockHour25 = 5.9167;
var blockMin25 = .0986;

//10/24/16
var blockDay24 = 139;
var blockHour24 = 5.7916;
var blockMin24 = .0965;

//10/23/16
var blockDay23 = 145;
var blockHour23 = 6.0417;
var blockMin23 = .1007;

var timeToBlockConversion = function() { //function make conversion between gbt and human time
	var blocksPerDay = blockDay * daysInput.value;
	console.log(blocksPerDay);

	var blocksPerHour = blockHour * hoursInput.value;
	console.log(blocksPerHour);

	var blocksPerMin = blockMin * minsInput.value;
	console.log(blocksPerMin);

	var total = blocksPerDay + blocksPerHour + blocksPerMin;
	console.log(total);

	var display = document.getElementById("time-to-block-display");
	display.innerText = "Blocks: " + total;
};

timeToBlocksBtn.addEventListener("click", function(){
	timeToBlockConversion();
});

var blockToTimeConversion = function() {    // 3 equtions 1 for day 1 for hour 1 for min then add all together


}


} //end of window.onload


