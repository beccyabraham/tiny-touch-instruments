
export const instrumentColors = ["#FFEBFF", "#9BFAFD", "#E4FFC2"];
export const darkColor = "#150949";


export class Menu {
	constructor(names, onSelect, state) {
		this.state = state;
		this.touchState = -1;
		this.names = names;
		this.onSelect = onSelect;
		this.menuButtons = names.map((name, i) => {
			return new MenuButton(i, names.length, name);
		});
	}

	draw() {
		background(255);
		this.menuButtons.map((button) => button.draw());
	}
	mouseClicked() {
		let i = this.whichItem(mouseY);
		this.onSelect(i);
	}
	touchStarted() {
		if (touches.length > 0) {
			this.touchState = this.whichItem(touches[0].y);
		}
	}
	touchMoved() {
		if (touches.length > 0) {
			if (this.touchState !== this.whichItem(touches[0].y)) {
				this.touchState = -1;
			}
		}
	}
	touchEnded() {
		if (this.touchState !== -1) {
			this.onSelect(this.touchState);
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

export class FooterMenu {
	constructor(state, onSelect) {
		this.state = state;
		this.onSelect = onSelect;
		this.slots = []		// for instrument menu buttons
	}
	setParams() {
		let refLength = max(height, width);
		this.iconSize = int(refLength / 20);

		// top left
		this.x = 10;
		this.y = height - this.iconSize - 10;
	}
	draw() {
		this.setParams();
		noStroke();
		fill(darkColor);

		triangle(
			this.x + this.iconSize, this.y,
			this.x + this.iconSize, this.y + this.iconSize,
			this.x, this.y + (this.iconSize / 2));		 

		let xPos = this.x + (this.iconSize * 2.5);
		const yPos = this.y + this.iconSize / 2;
		this.slots = [];
		for (let i = 0; i < instrumentColors.length; i += 1) {
			if (i !== this.state.page) {
				stroke(darkColor);
				fill(instrumentColors[i]);
				circle(xPos, yPos, this.iconSize);
				xPos += this.iconSize * 2;
				this.slots.push({
					x: xPos,
					y: yPos,
					i: i
				});
			}
		}
		noStroke();
		noFill();
	}
	onClick(x, y) {
		// nav
		if (x >= this.x && this.x <= this.x + this.iconSize 
			&& y >= this.y && y < this.y + this.iconSize) {
			this.onSelect("menu");
		} else {
			const radius = this.iconSize / 2;
			this.slots.map((slot) => {
				if (dist(slot.x, slot.y, x, y) < radius) {
					this.onSelect(i);
					return;
				}
			});
		}
		// figure out what was selected, call onSelect with the appropriate param
	}
}

