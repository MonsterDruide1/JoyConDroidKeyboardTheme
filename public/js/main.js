function log(text) {
	console.log(text);
	document.getElementById("log").value += "\n"+text;
}

var noOfChars = 0;
var pos = [0,0];

// Redirect errors to logging
window.onerror = function(message) {
	log("ERROR: " + message);
}

window.onload = function(){
  // Log version
  log("V 1.0.0");
  document.getElementById("textToSend").addEventListener("keyup",function(key){
    log("trigger");
    if(noOfChars > key.target.value.length){
      send(8,pos); //backspace
    }
    else {
      pos = send(key.target.value.charAt(event.target.selectionStart - 1),pos);
    }
    noOfChars = key.target.value.length;
  });
}