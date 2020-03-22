function log(text) {
	console.log(text);
	document.getElementById("log").value += "\n"+text;
}


// Redirect errors to logging
window.onerror = function(message) {
	log("ERROR: " + message);
}

window.onload = function(){
  // Log version
  log("V 1.0.0");
  document.getElementById("textToSend").addEventListener("keypress",function(key){
    log("trigger");
    send(key);
  });
}