import { Instrument } from "./instrument.js";
import { skatingContrastColor } from "../components.js";

export class Kit extends Instrument {
	constructor(state, instrumentColor) {
		super(state, instrumentColor);
		this.drums = [];
	}

	onOpen() {
		for (let i = 0; i < 8; i += 1) {
			this.drums.push(new Drum());
		}
	}
	onClose() {
		this.drums = [];
		this.drums.map((drum) => drum.onClose());
	}
	gestureStarted(x, y) {
		let drumsAt = this.getDrumsAt(x, y);
		drumsAt.map((drum) => { drum.play() });
	}
	gestureMoved(x, y) {

	}
	gestureEnded() {

	}
	getDrumsAt(x, y) {
		let drumsAtPosition = [];
		this.drums.map((drum) => {
			if (drum.isIn(x, y)) {
				drumsAtPosition.push(drum);
			}
		});
		return drumsAtPosition;
	}
	draw() {
		background(this.bgColor);
		this.drums.map(drum => drum.draw());
	}
}

class Drum {
	constructor() {
		this.x = random(width);
		this.y = random(height);
		this.radius = random(30, 100);
		this.active = false;
		this.activated = false;
		if (this.y > height / 2) {
			this.synth = new Tone.MembraneSynth().toDestination();
			this.freq = map(this.y, height, 0, 20, 200);
		} else {
			this.synth = new Tone.MetalSynth().toDestination();
			this.freq = map(this.y, height, 0, 100, 800);
		}
	}
	draw() {
		let fillColor = color(skatingContrastColor);
		fillColor.setAlpha(50);
		fill(fillColor);
		circle(this.x, this.y, this.radius * 2);
	}
	isIn(x, y) {
		return dist(x, y, this.x, this.y) < this.radius;
	}
	play() {
		this.synth.triggerAttackRelease(this.freq);
	}
	onClose() {
		this.synth.disconnect();
	}
}