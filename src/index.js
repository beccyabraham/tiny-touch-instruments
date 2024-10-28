import { Menu, mainMenuColors, mainMenuTextColors } from "./components.js";

let menu;

const pageNames = ["skating", "skipping"];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    menu = new Menu(pageNames, navigateToPage, {}, mainMenuColors, mainMenuTextColors);
}

function draw() {
    menu.draw();
}

function navigateToPage(i) {
    if (i == 0) {
        window.location.href = "./skating";
    } else if (i == 1) {
        window.location.href = "./skipping";
    }
}

function mouseClicked() {
    menu.mouseClicked();
}

function touchStarted() {
    menu.touchStarted();
}

function touchMoved() {
    menu.touchMoved();
}

function touchEnded() {
    menu.touchEnded();
}

function windowResized() {
    createCanvas(window.innerWidth, window.innerHeight);
}

window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
window.touchStarted = touchStarted;
window.touchMoved = touchMoved;
window.touchEnded = touchEnded;
window.windowResized = windowResized;