import { Instrument } from "./instrument.js";

export class Kit extends Instrument {
	constructor(state, instrumentColor) {
		super(state, instrumentColor);
	}

	draw() {
		background(this.bgColor);
	}
}