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
    case 'b':
      posX = 4;
      posY = 3;
      break;
    case 'c':
      posX = 2;
      posY = 3;
      break;
    case 'd':
      posX = 2;
      posY = 2;
      break;
    case 'e':
      posX = 2;
      posY = 1;
      break;
    case 'f':
      posX = 3;
      posY = 2;
      break;
    case 'g':
      posX = 4;
      posY = 2;
      break;
    case 'h':
      posX = 5;
      posY = 2;
      break;
    default:
      switch(key.keyCode){
        case 8:
        case 46:
          window.joyconJS["onB"](true);
          sleep(30);
          window.joyconJS["onB"](false);
          return;
        default:
          log("Key not found: "+key+", keyCode: "+key.keyCode+", keyName: "+key.key);
          return;
      }
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
  
  log("DONE: "+key.key);
}