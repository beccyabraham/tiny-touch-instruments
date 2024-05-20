import { Instrument } from "./instrument.js";
import { darkColor } from "../components.js";

export class Theremin extends Instrument {
	constructor(state, instrumentColor) {
		super(state, instrumentColor);
		this.synth = new Tone.Synth({
	    	envelope: { attack: 0.5, release: 0.5 }
	  	}).toDestination();
	}

	draw() {
		//background(255);
	}

	onOpen() {
		console.log(this.bgColor);
		background(this.bgColor);
	}

	gestureStarted(x, y) {
		stroke(darkColor);
		circle(x, y, 100);
		if (this.state.ready) {
		    this.synth.volume.setValueAtTime(map(y, 0, height, -6, 0));
		    this.synth.triggerAttack(x + 200);
		}
	}

	gestureMoved(x, y) {
		stroke(darkColor);
		circle(x, y, 100);
		if (this.state.ready) {
		    this.synth.frequency.exponentialRampToValueAtTime(x + 200, this.synth.now());
		    this.synth.volume.exponentialRampToValueAtTime(map(y, 0, height, -6, 0), this.synth.now());
		}
	}

	gestureEnded() {
		if (this.state.ready) {
			this.synth.triggerRelease(this.synth.now());
		}
		background(this.bgColor);
	}
}