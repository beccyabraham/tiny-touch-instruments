
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
		let refLength = max(height, width);
		this.width = int(refLength / 20);
		this.height = int(this.width);

		// top left
		this.x = 10;
		this.y = height - this.height - 10;
	}
	draw() {
		this.setParams();
		fill(darkColor);

		triangle(
			this.x + this.width, this.y,
			this.x + this.width, this.y + this.height,
			this.x, this.y + (this.height / 2));

		//circle(this.x, this.y, this.radius * 2);
		noFill();
	}

	isIn(x, y) {
		return x > this.x && y > this.y && x < this.x + this.width && y < this.y + this.height;
	}
}
