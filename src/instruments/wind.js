import { Instrument } from "./instrument.js";
import { FooterMenu, skippingContrastColor } from "../components.js";

let effectState = {
    startTime: 0,
    active: false
}

let synthNotes;

export class Wind extends Instrument {
    constructor(state, instrumentColor) {
		super(state, instrumentColor);
	}

    createToneObjects() {
        this.synth = new Tone.NoiseSynth(
            {
                noise: {
                    type: "white"
                },
                envelope: {
                    attack: 1,
                    decay: 0,
                    sustain: 1,
                    release: 1.75
                }
            }
        )
        this.synth2 = new Tone.Synth(
            {
                "portamento" : 0.0,
                "oscillator": {
                    "type": "square4"
                },
                "envelope": {
                    "attack": 0.3,
                    "decay": 1,
                    "sustain": 0.2,
                    "release": 2
                }
            }
        )
        this.lpFilter = new Tone.Filter(
            {
                type: "lowpass",
                frequency: 1600,
                rolloff: -12,
                Q: 1,
                gain: 0
            }
        )
        this.filter = new Tone.Filter(
            {
                type: "bandpass",
                frequency: 400,
                rolloff: -12,
                Q: 1000,
                gain: 0
            }
        )
        this.gain = new Tone.Gain(0, "decibels");
        this.gain2 = new Tone.Gain(0.5);
    }

	onOpen() {
        this.createToneObjects();
        this.synth.connect(this.gain);
        this.gain.connect(this.lpFilter);
        this.lpFilter.connect(this.filter);
        this.synth2.connect(this.gain2);
        this.gain2.toDestination();
        this.filter.toDestination();
        // this.lpFilter.connect(this.filter);
        // this.filter.connect(this.gain);
        // this.gain.toDestination();
        this.gain.gain.rampTo(40);
		background(this.bgColor);
	}

	onClose() {
        this.gain.gain.rampTo(0);
        this.gain2.gain.rampTo(0);
		this.synth.disconnect();
        this.synth2.disconnect();
        this.synth2.dispose();
        this.synth.dispose();
        this.gain.dispose();
        this.lpFilter.dispose();
        this.filter.dispose();
	}

	draw() {
        if (this.state.ready) {
            if (effectState.active) {
                let timeElapsed = millis() - effectState.startTime;
                let newVal = map(timeElapsed, 0, 5000, 1000, 100);
                newVal = max(100, newVal);
                this.filter.Q.rampTo(newVal);
                newVal = map(timeElapsed, 0, 5000, 40, 32);
                newVal = max(32, newVal);
                this.gain.gain.rampTo(newVal);

                newVal = map(timeElapsed, 0, 5000, 0.5, 0);
                newVal = max(0, newVal);
                this.gain2.gain.rampTo(newVal);
            }
        }
	}

	gestureStarted(x, y) {
        effectState.startTime = millis();
        effectState.active = true;
        this.populateNotes();
        noStroke();
        fill(skippingContrastColor);
        circle(x, y, width / 20);
		if (this.state.ready) {
            this.gain.gain.rampTo(40);
            this.synth.triggerAttack();
            this.filter.frequency.exponentialRampToValueAtTime(this.frequencyAt(y));
            this.synth2.triggerAttack(this.frequencyAt(y));
		}
	}

	gestureMoved(x, y) {
        noStroke();
        fill(skippingContrastColor);
        circle(x, y, width / 20);
        let clr = color(this.bgColor);
        clr.setAlpha(100);
        background(clr);
		if (this.state.ready) {
            this.filter.frequency.exponentialRampToValueAtTime(this.frequencyAt(y));
            this.synth2.frequency.exponentialRampToValueAtTime(this.frequencyAt(y));
		}
	}

	gestureEnded() {
        effectState.active = false;
		if (this.state.ready) {
            this.synth.triggerRelease();
            this.synth2.triggerRelease();
		}
        background(this.bgColor);
	}

    populateNotes() {
	synthNotes = ["A3", "B3", "C#4", "D4", "E4", "F#4", "G4", "A4"];
        // synthNotes = [];
        // if (random() < 0.75) {
        //     synthNotes.push("A3");
        // }
        // synthNotes.push(random(["B3", "C#4"]));
        // synthNotes.push("D4");
        // synthNotes.push(random(["E4", "F#4", "G4"]));
        // if (random() < 0.75) {
        //     synthNotes.push("A4");
        // }
    }

    frequencyAt(y) {
        let i = int(map(y, FooterMenu.getY(), 0, 0, synthNotes.length));
        i = min(i, synthNotes.length - 1);
        i = max(i, 0);
        return synthNotes[i];
    }
}
