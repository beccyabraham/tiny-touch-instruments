import { Instrument } from "./instrument.js";
import { FooterMenu } from "../components.js";

let drawState = {
    active: false,
    moving: false,
    sliderStart: 0,
    startY: 0,
    x: 0,
    y: 0,
    startTime: 0
}

export class Ripple extends Instrument {
    constructor(state, instrumentColor) {
		super(state, instrumentColor);
        // https://www.guitarland.com/MusicTheoryWithToneJS/Presets-gh-pages/
        // Synth : Tree Trunk
        // this.synth = new Tone.Synth(
        //     {
        //         "oscillator": {
        //             "type": "sine"
        //         },
        //         "envelope": {
        //             "attack": 0.01,
        //             "decay": 0.1,
        //             "sustain": 0.1,
        //             "release": 1.2
        //         }
        //     }
        // );

        this.synth = new Tone.FMSynth(
            {
                "harmonicity":8,
                "modulationIndex": 2,
                "oscillator" : {
                    "type": "sine"
                },
                "envelope": {
                    "attack": 0.001,
                    "decay": 2,
                    "sustain": 0.1,
                    "release": 2
                },
                "modulation" : {
                    "type" : "square"
                },
                "modulationEnvelope" : {
                    "attack": 0.002,
                    "decay": 0.2,
                    "sustain": 0,
                    "release": 0.2
                }
            }
        );
        this.delay = new Tone.FeedbackDelay(1, 0.5);
        this.sliderY = map(0.5, 0, 1, FooterMenu.getY(), 0);
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

        if (drawState.moving) {
            stroke("black");
            line(0, this.sliderY, width, this.sliderY);
        }
	}

	gestureStarted(x, y) {
        drawState.active = true;
        drawState.x = x;
        drawState.y = y;
        drawState.startY = y;
        drawState.startTime = millis();
        drawState.sliderStart = this.sliderY;
		if (this.state.ready) {
            let pitch = random(["D", "F#", "A", "C#"]);
            let octave = 6 - int(y * 4 / height);
            this.synth.triggerAttackRelease(pitch + octave, "8n");
		}
	}

	gestureMoved(x, y) {
        drawState.x = x;
        drawState.y = y;
        drawState.moving = true;
        let newPos = drawState.sliderStart + (drawState.y - drawState.startY);
        newPos = min(FooterMenu.getY(), newPos);
        newPos = max(0, newPos);
        this.sliderY = newPos;
		if (this.state.ready) {
            this.delay.delayTime.rampTo(this.delayTimeAt());
		}
	}

	gestureEnded() {
        drawState.active = false;
        drawState.moving = false;
		if (this.state.ready) {
            this.delay.delayTime.rampTo(this.delayTimeAt());
		}
        background(this.bgColor);
	}

    delayTimeAt() {
        return map(this.sliderY, FooterMenu.getY(), 0, 0.1, 1);
    }
}