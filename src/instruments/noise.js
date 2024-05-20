import { Instrument } from "./instrument.js";

export class Noise extends Instrument {
	constructor(state, instrumentColor) {
		super(state, instrumentColor);
		this.noise = new Tone.Noise("pink").connect(Tone.Master);
	}

	draw() {
		background(this.bgColor);
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