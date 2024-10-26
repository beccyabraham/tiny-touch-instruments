import { Menu, FooterMenu, instrumentColors } from "../components.js";
import { Ripple } from "../instruments/ripple.js";

const state = {
    page: "menu",
    ready: false
  };
  
  let touchState = false;
  
  let menu;
  let footerMenu;
  let instruments;
  const instrumentNames = ["ripple"];

  function setup() {
    createCanvas(windowWidth, windowHeight);
  
    instruments = [
      new Ripple(state, instrumentColors[0]),
    ];

  
    menu = new Menu(
      instrumentNames, 
      (i) => { navigateToInstrument(i) }, 
      state);
    footerMenu = new FooterMenu(state, (page) => navigateToMenu());
  }
  
  function draw() {
    if (state.page === "menu") {
      menu.draw();
    } else {
      instruments[state.page].draw();
      footerMenu.draw();
    }
  }
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
  
  function mouseClicked() {
    if (state.page === "menu") {
      menu.mouseClicked();
    } else {
      instruments[state.page].mouseClicked();
      footerMenu.onClick(mouseX, mouseY);
    }
    return false;
  }
  
  function mousePressed() {
    Tone.start().then(() => {
      state.ready = true;
    });
    if (state.page === "menu") {
  
    } else {
      instruments[state.page].mousePressed();
    }
  }
  
  function mouseDragged() {
    Tone.start().then(() => {
      state.ready = true;
    });
    if (state.page === "menu") {
  
    } else {
      instruments[state.page].mouseDragged();
    }
    return false;
  }
  
  function mouseReleased() {
    Tone.start().then(() => {
      state.ready = true;
    });
    if (state.page === "menu") {
  
    } else {
      instruments[state.page].mouseReleased();
    }
    return false;
  }
  
  function touchStarted() {
    if (state.page === "menu") {
      menu.touchStarted();
    } else {
      instruments[state.page].touchStarted();
      //touchState = navButton.isIn(touches[0].x, touches[0].y);
    }
    return false;
  }
  
  function touchMoved() {
    if (state.page === "menu") {
      menu.touchMoved();
    } else {
      instruments[state.page].touchMoved();
      //touchState = navButton.isIn(touches[0].x, touches[0].y);
    }
    return false;
  }
  
  function touchEnded() {
    Tone.start().then(() => {
      state.ready = true;
    });
    if (state.page === "menu") {
      menu.touchEnded();
    } else {
      instruments[state.page].touchEnded();
      if (touchState) {
        footerMenu.onClick(touches[0].x, touches[0].y);
        touchState = false;
      }
    }
    return false;
  }
  
  function navigateToMenu() {
    instruments[state.page].onClose();
    state.page = "menu";
  }
  
  function navigateToInstrument(i) {
    instruments[i].onOpen();
    state.page = i;
  }
  
  window.setup = setup;
  window.draw = draw;
  window.windowResized = windowResized;
  window.mouseClicked = mouseClicked;
  window.mousePressed = mousePressed;
  window.mouseDragged = mouseDragged;
  window.mouseReleased = mouseReleased;
  window.touchStarted = touchStarted;
  window.touchMoved = touchMoved;
  window.touchEnded = touchEnded;