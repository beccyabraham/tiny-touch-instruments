
let synth;
let startTime;

const state = {
  ready: false
}

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
  synth.triggerRelease(synth.now());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}