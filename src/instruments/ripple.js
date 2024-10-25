import { Instrument } from "./instrument.js";

export class Ripple extends Instrument {
    constructor(state, instrumentColor) {
		super(state, instrumentColor);
		this.noise = new Tone.Noise({
			type: "pink",
			fadeIn: 0.5,
			fadeOut: 0.5,
		}).toDestination();
		this.filter = new Tone.Filter();

		this.lastX = undefined;
		this.lastY = undefined;
	}

	onOpen() {
		this.filter.toDestination(1000, "highpass");
		this.noise.connect(this.filter);
		background(this.bgColor);
	}

	onClose() {
		this.filter.disconnect();
	}

	draw() {
		
	}

	gestureStarted(x, y) {
		if (this.state.ready) {
			this.filter.frequency.setValueAtTime(this.frequencyAt(x, y));
			//this.synth.start();
			this.noise.start();
			this.lastX = x;
			this.lastY = y; 
		}
	}

	gestureMoved(x, y) {
		if (this.state.ready) {
			this.filter.frequency.exponentialRampToValueAtTime(this.frequencyAt(x, y));

			let movement = dist(x, y, this.lastX, this.lastY);
			let vol = map(movement, 0, 60, -12, 0, true);
			this.noise.volume.exponentialRampToValueAtTime(vol);

			this.lastX = x;
			this.lastY = y;
		}
	}

	gestureEnded() {
		if (this.state.ready) {
			this.noise.stop();
		}
	}

	frequencyAt(x, y) {
		return map(y, height, 0, 50, 10000);
	}
}