
export class Instrument {
	constructor(state, instrumentColor) {
		this.state = state;
		this.bgColor = instrumentColor;
	}
	onOpen() { }
	onClose() { }

	draw() { }

	gestureStarted(x, y) { }
	gestureMoved(x, y) { }
	gestureEnded() { }

	touchStarted() {
		this.gestureStarted(touches[0].x, touches[0].y);
	}
	touchMoved() {
		this.gestureMoved(touches[0].x, touches[0].y);	
	}
	touchEnded() {
		this.gestureEnded();
	}

	mouseClicked() { }
	mousePressed() {
		this.gestureStarted(mouseX, mouseY);
	}
	mouseDragged() {
		this.gestureMoved(mouseX, mouseY);
	}
	mouseReleased() {
		this.gestureEnded();
	}
}