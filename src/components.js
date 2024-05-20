
export const instrumentColors = ["#FFEBFF", "#9BFAFD", "#E4FFC2"];
export const darkColor = "#150949";


export class Menu {
	constructor(names, onSelect, state) {
		this.state = state;
		this.touchState = -1;
		this.names = names;
		this.onSelect = onSelect;
		this.menuButtons = names.map((name, i) => {
			return new MenuButton(i , names.length, name);
		});
	}

	draw() {
		background(255);
		this.menuButtons.map((button) => button.draw());
	}
	mouseClicked() {
		let i = this.whichItem(mouseY);
		this.onSelect(this.names[i]);
	}
	touchStarted() {
		this.touchState = this.whichItem(touches[0].y);
	}
	touchMoved() {
		if (this.touchState !== this.whichItem(touches[0].y)) {
			this.touchState = -1;
		}
	}
	touchEnded() {
		if (this.touchState !== -1) {
			this.onSelect(this.names[this.touchState]);
		}
		this.touchState = -1;
	}
	whichItem(y) {
		for (let i = 0; i < this.names.length; i++) {
			if (y < (i + 1) * (height / this.names.length)) {
				return i;
			}
		}
		return -1;
	}
}

class MenuButton {
	constructor(num, total, name) {
		this.num = num;
		this.total = total;
		this.name = name;
	}

	draw() {
		noStroke();
		fill(instrumentColors[this.num]);
		let y = this.num * height / this.total;
		rect(0, y, width, height / this.total);
		
		fill(darkColor);
		textSize(int(height / (this.total * 4)));
		textStyle(ITALIC);
		textAlign(CENTER, CENTER);
		text(this.name, width / 2, y + (height / (this.total * 2)));
	}
}

export class NavButton {
	constructor() { 
		this.setParams();
	}
	setParams() {
		this.radius = 10;
		this.x = 20;
		this.y = height - 20;
	}
	draw() {
		this.setParams();
		fill("black");
		circle(this.x, this.y, this.radius * 2);
		noFill();
	}

	isIn(x, y) {
		return dist(x, y, this.x, this.y) < this.radius;
	}
}
