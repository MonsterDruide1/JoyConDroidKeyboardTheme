function sleep(ms) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < ms);
}

function send(key){
  if((typeof key != "number" && typeof key != "undefined") && key == key.toUpperCase()){
    window.joyconJS["onLeftJoystick"](true);
    sleep(100);
    window.joyconJS["onLeftJoystick"](false);
    log("Uppercase: "+key+" restarting with "+key.toLowerCase());
    send(key.toLowerCase());
    window.joyconJS["onLeftJoystick"](false);
    sleep(100);
    window.joyconJS["onLeftJoystick"](true);
  }
  
  var posX = 0;
  var posY = 0;
  switch(key){
    case 8:
    case 46:
      window.joyconJS["onB"](true);
      sleep(30);
      window.joyconJS["onB"](false);
      return;
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
    case 'i':
      posX = 7;
      posY = 1;
      break;
    case 'j':
      posX = 6;
      posY = 2;
      break;
    case 'k':
      posX = 7;
      posY = 2;
      break;
    case 'l':
      posX = 8;
      posY = 2;
      break;
    case 'm':
      posX = 6;
      posY = 3;
      break;
    case 'n':
      posX = 5;
      posY = 3;
      break;
    case 'o':
      posX = 8;
      posY = 1;
      break;
    case 'p':
      posX = 9;
      posY = 1;
      break;
    case 'q':
      posY = 1;
      break;
    case 'r':
      posX = 3;
      posY = 1;
      break;
    case 's':
      posX = 1;
      posY = 2;
      break;
    case 't':
      posX = 4;
      posY = 1;
      break;
    case 'u':
      posX = 6;
      posY = 1;
      break;
    case 'v':
      posX = 3;
      posY = 3;
      break;
    case 'w':
      posX = 1;
      posY = 1;
      break;
    case 'x':
      posX = 1;
      posY = 3;
      break;
    case 'y':
      posY = 3;
      break;
    case 'z':
      posX = 5;
      posY = 1;
      break;
    default:
      log("Key not found: "+key+", keyCode: "+(key+"").charCodeAt());
      switch((key+"").charCodeAt()){
        default:
          return;
      }
  }
  
  for(var i=0;i<posX;i++){
    window.joyconJS["onRight"](true);
    sleep(100);
    window.joyconJS["onRight"](false);
    sleep(100);
  }
  for(var i=0;i<posY;i++){
    window.joyconJS["onDown"](true);
    sleep(100);
    window.joyconJS["onDown"](false);
    sleep(100);
  }
  
  window.joyconJS["onA"](true);
  sleep(100);
  window.joyconJS["onA"](false);
  
  window.joyconJS["onUp"](true);
  sleep(500);
  window.joyconJS["onUp"](false);
  window.joyconJS["onLeft"](true);
  sleep(1500);
  window.joyconJS["onLeft"](false);
  
  log("DONE: "+key);
}