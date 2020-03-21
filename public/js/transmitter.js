function sleep(ms) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < ms);
}

function send(key){
  var posX = 0;
  var posY = 0;
  switch(key.key){
    case 'a':
      posY = 2;
      break;
    default:
      log("Key not found: "+key+", keyCode: "+key.code+", keyName: "+key.key);
      return;
  }
  
  for(var i=0;i<posX;i++){
    window.joyconJS["onRight"](true);
    sleep(30);
    window.joyconJS["onRight"](false);
    sleep(30);
  }
  for(var i=0;i<posY;i++){
    window.joyconJS["onDown"](true);
    sleep(30);
    window.joyconJS["onDown"](false);
    sleep(30);
  }
  
  window.joyconJS["onA"](true);
  sleep(30);
  window.joyconJS["onA"](false);
  
  window.joyconJS["onUp"](true);
  sleep(1000);
  window.joyconJS["onUp"](false);
  window.joyconJS["onLeft"](true);
  sleep(1000);
  window.joyconJS["onLeft"](false);
}