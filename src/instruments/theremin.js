import { Instrument } from "./instrument.js";
import { darkColor } from "../components.js";

export class Theremin extends Instrument {
	constructor(state, instrumentColor) {
		super(state, instrumentColor);
		this.synth = new Tone.Synth({
	    	envelope: { attack: 0.5, sustain: 1, release: 0.5 }
	  	}).toDestination();
	}

	draw() {
		//background(255);
	}

	onOpen() {
		background(this.bgColor);
	}

	gestureStarted(x, y) {
		stroke(darkColor);
		circle(x, y, 100);
		if (this.state.ready) {
		    this.synth.volume.setValueAtTime(this.volumeAt(x, y), this.synth.now());
		    this.synth.triggerAttack(this.frequencyAt(x, y));
		}
	}

	gestureMoved(x, y) {
		stroke(darkColor);
		circle(x, y, 100);
		if (this.state.ready) {
		    this.synth.frequency.exponentialRampToValueAtTime(this.frequencyAt(x, y), this.synth.now());
		    this.synth.volume.exponentialRampToValueAtTime(this.volumeAt(x, y), this.synth.now());
		}
	}

	gestureEnded() {
		if (this.state.ready) {
			this.synth.triggerRelease(this.synth.now());
		}
		background(this.bgColor);
	}

	volumeAt(x, y) {
		return map(x, 0, width, -12, 0);
	}

	frequencyAt(x, y) {
		return map(y, height, 0, 100, 1000);
	}
}