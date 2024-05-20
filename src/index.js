import { Menu, NavButton } from "./components.js";
import { Theremin } from "./instruments/theremin.js";
import { Noise } from "./instruments/noise.js";
import { Kit } from "./instruments/kit.js";

const state = {
  page: "menu",
  ready: false
};

let touchState = false;

let menu;
let navButton;
let instruments;

function setup() {
  createCanvas(windowWidth, windowHeight);

  instruments = {
    theremin: new Theremin(state),
    noise: new Noise(state),
    kit: new Kit(state)
  };

  menu = new Menu(Object.keys(instruments), state);
  navButton = new NavButton();
}

function draw() {
  if (state.page === "menu") {
    menu.draw();
  } else {
    instruments[state.page].draw();
    navButton.draw();
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
    if (navButton.isIn(mouseX, mouseY)) {
      state.page = "menu";
    }
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
    touchState = navButton.isIn(touches[0].x, touches[0].y);
  }
  return false;
}

function touchMoved() {
  if (state.page === "menu") {
    menu.touchMoved();
  } else {
    instruments[state.page].touchMoved();
    touchState = navButton.isIn(touches[0].x, touches[0].y);
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
      state.page = "menu";
      touchState = false;
    }
  }
  return false;
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