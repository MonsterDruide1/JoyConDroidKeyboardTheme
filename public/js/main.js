var gMO = moment();

function log(text) {
	console.log(text);
}

// Log version
log("V 1.0.0");

// Redirect errors to logging
window.onerror = function(message) {
	log("ERROR: " + message);
}

window.onload = function(){
  document.getElementById("textToSend").onkeypress = function(key){
    send(key);
  };
}