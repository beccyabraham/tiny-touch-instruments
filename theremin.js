
let synth;
let startTime;

const state = {
  ready: false
}

document.ontouchmove = function(event) {
    event.preventDefault();
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  synth = new Tone.Synth({
    envelope: { attack: 0.5, release: 0.5 }
  }).toDestination();
  startTime = synth.now();

}

function draw() {
  background(255);
}

function touchStarted() {
  let fs = fullscreen();
  if (! fs) {
    fullscreen(true);
  }

  Tone.start().then(() => {
    state.ready = true;
  });

  if (state.ready) {
    synth.volume.setValueAtTime(map(mouseY, 0, height, -6, 0));
    synth.triggerAttack(mouseX + 200);
  }
}

function touchStopped() {
  if (state.ready) {
    synth.triggerRelease(synth.now());
  }
}

function touchMoved() {
  if (state.ready) {
    touch = touches[0];
    synth.frequency.exponentialRampToValueAtTime(touch.x + 200, synth.now());
    synth.volume.exponentialRampToValueAtTime(map(touch.y, 0, height, -6, 0), synth.now());
  }
}

function mousePressed() {
  Tone.start().then(() => {
    state.ready = true;
  });

  if (state.ready) {
    synth.volume.setValueAtTime(map(mouseY, 0, height, -6, 0));
    synth.triggerAttack(mouseX + 200);
  }
}

function mouseDragged() {
  if (state.ready) {
    synth.frequency.exponentialRampToValueAtTime(mouseX + 200, synth.now());
    synth.volume.exponentialRampToValueAtTime(map(mouseY, 0, height, -6, 0), synth.now());
  }
}

function mouseReleased() {
  if (state.ready) {
    synth.triggerRelease(synth.now());
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}