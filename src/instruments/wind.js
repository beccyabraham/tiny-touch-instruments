import { Instrument } from "./instrument.js";
import { FooterMenu } from "../components.js";

let effectState = {
    startTime: 0,
    active: false
}

let synthNotes;

export class Wind extends Instrument {
    constructor(state, instrumentColor) {
		super(state, instrumentColor);

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
        this.gain = new Tone.Gain(0, "decibels")
	}

	onOpen() {
        this.synth.connect(this.gain);
        this.gain.connect(this.lpFilter);
        this.lpFilter.connect(this.filter);
        this.filter.toDestination();
        // this.lpFilter.connect(this.filter);
        // this.filter.connect(this.gain);
        // this.gain.toDestination();
        this.gain.gain.rampTo(40);
		background(this.bgColor);
	}

	onClose() {
        this.gain.gain.rampTo(0);
		this.synth.disconnect();
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
            }
        }
	}

	gestureStarted(x, y) {
        effectState.startTime = millis();
        effectState.active = true;
        this.populateNotes();
		if (this.state.ready) {
            this.gain.gain.rampTo(40);
            this.synth.triggerAttack();
		}
	}

	gestureMoved(x, y) {
		if (this.state.ready) {
            this.filter.frequency.exponentialRampToValueAtTime(this.frequencyAt(y));
		}
	}

	gestureEnded() {
        effectState.active = false;
		if (this.state.ready) {
            this.synth.triggerRelease();
		}
        background(this.bgColor);
	}

    populateNotes() {
        synthNotes = [];
        if (random() < 0.75) {
            synthNotes.push("A3");
        }
        synthNotes.push(random(["B3", "C#4"]));
        synthNotes.push("D4");
        synthNotes.push(random(["E4", "F#4", "G4"]));
        if (random() < 0.75) {
            synthNotes.push("A4");
        }
    }

    frequencyAt(y) {
        let i = int(map(y, FooterMenu.getY(), 0, 0, synthNotes.length));
        i = min(i, synthNotes.length - 1);
        i = max(i, 0);
        return synthNotes[i];
    }
}