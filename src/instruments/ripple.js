import { Instrument } from "./instrument.js";

let drawState = {
    active: false,
    x: 0,
    y: 0,
    startTime: 0
}

export class Ripple extends Instrument {
    constructor(state, instrumentColor) {
		super(state, instrumentColor);
        // https://www.guitarland.com/MusicTheoryWithToneJS/Presets-gh-pages/
        // Synth : Tree Trunk
        this.synth = new Tone.Synth(
            {
                "oscillator": {
                    "type": "sine"
                },
                "envelope": {
                    "attack": 0.005,
                    "decay": 0.1,
                    "sustain": 0.1,
                    "release": 1.2
                }
            }
        );
        this.delay = new Tone.FeedbackDelay(1, 0.5);
	}

	onOpen() {
        this.synth.toDestination();
        this.synth.connect(this.delay);
        this.delay.toDestination();
		background(this.bgColor);
	}

	onClose() {
		this.delay.disconnect();
	}

	draw() {
		if (drawState.active) {
            stroke("black");
            circle(drawState.x, drawState.y, millis() - drawState.startTime); 
        }
	}

	gestureStarted(x, y) {
        drawState.active = true;
        drawState.x = x;
        drawState.y = y;
        drawState.startTime = millis();
		if (this.state.ready) {
            let pitch = random(["D", "F#", "A", "C#"]);
            let octave = 6 - int(y * 4 / height);
            this.synth.triggerAttackRelease(pitch + octave, "8n");
		}
	}

	gestureMoved(x, y) {
        drawState.x = x;
        drawState.y = y;
		if (this.state.ready) {
		}
	}

	gestureEnded() {
        drawState.active = false;
		if (this.state.ready) {
		}
        background(this.bgColor);
	}
}