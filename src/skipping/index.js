import { Menu, FooterMenu, skippingInstrumentColors, skippingContrastColor } from "../components.js";
import { Ripple } from "../instruments/ripple.js";
import { Wind } from "../instruments/wind.js";
import { Sink } from "../instruments/sink.js";

const state = {
    page: "menu",
    ready: false
  };
  
  let touchState = {
    active: false,
    lastX: 0,
    lastY: 0
  }
  
  let menu;
  let footerMenu;
  let instruments;
  const instrumentNames = ["ripple", "wind", "sink"];

  function setup() {
    // https://openprocessing.org/sketch/790331/
    // createCanvas(windowWidth, windowHeight);
    createCanvas(window.innerWidth, window.innerHeight);
  
    instruments = [
      new Ripple(state, skippingInstrumentColors[0]),
      new Wind(state, skippingInstrumentColors[1]),
      new Sink(state, skippingInstrumentColors[2])
    ];

  
    menu = new Menu(
      instrumentNames, 
      (i) => { navigateToInstrument(i) }, 
      state,
      skippingInstrumentColors,
      skippingContrastColor);
      footerMenu = new FooterMenu(state, (page) => {
        if (page === "menu") {
          navigateToMenu()
        } else {
          navigateToInstrument(page);
        }
      }, skippingInstrumentColors, skippingContrastColor);
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
    createCanvas(window.innerWidth, window.innerHeight);
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
      touchState.active = footerMenu.isIn(touches[0].x, touches[0].y);
      touchState.lastX = touches[0].x;
      touchState.lastY = touches[0].y;
    }
    return false;
  }
  
  function touchMoved() {
    if (state.page === "menu") {
      menu.touchMoved();
    } else {
      instruments[state.page].touchMoved();
      touchState.active = footerMenu.isIn(touches[0].x, touches[0].y);
      touchState.lastX = touches[0].x;
      touchState.lastY = touches[0].y;
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
      if (touchState.active) {
        footerMenu.onClick(touchState.lastX, touchState.lastY);
        touchState.active = false;
      }
    }
    return false;
  }
  
  function navigateToMenu() {
    instruments[state.page].onClose();
    state.page = "menu";
  }
  
  function navigateToInstrument(i) {
    if (state.page !== "menu") {
        instruments[state.page].onClose();
    }
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