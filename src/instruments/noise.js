import { Instrument } from "./instrument.js";

export class Noise extends Instrument {
	constructor(state) {
		super(state);
		this.noise = new Tone.Noise("pink").connect(Tone.Master);
	}

	draw() {
		background(255);
	}

	gestureStarted(x, y) {
		if (this.state.ready) {
			this.noise.start();
		}
	}

	gestureEnded() {
		if (this.state.ready) {
			this.noise.stop();
		}
	}
}