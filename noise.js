
let synth;
let noise;
let startTime;

const state = {
  ready: false
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noise = new Tone.Noise("pink").connect(Tone.Master);;
}

function draw() {
  background(255);
}

function mousePressed() {
  Tone.start().then(() => {
    state.ready = true;
  });

  if (state.ready) {
    //initialize the noise and start
    noise.start();

    // //make an autofilter to shape the noise
    // var autoFilter = new Tone.AutoFilter({
    //   "frequency" : "8m",
    //   "min" : 800,
    //   "max" : 15000
    // }).connect(Tone.Master);

    // //connect the noise
    // noise.connect(autoFilter);
    // //start the autofilter LFO
    // autoFilter.start()
  }
}

function mouseDragged() {
  // if (state.ready) {
  //   //synth.frequency.exponentialRampToValueAtTime(mouseX + 200, synth.now());
  //   synth.volume.exponentialRampToValueAtTime(map(mouseY, 0, height, -6, 0), synth.now());
  // }
}

function mouseReleased() {
  noise.stop()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}