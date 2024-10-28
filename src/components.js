
export const skatingInstrumentColors = ["#FFEBFF", "#9BFAFD", "#E4FFC2"];
//export const skippingInstrumentColors = ["#315C5E", "#115569", "#0D3144"];
export const skippingInstrumentColors = ["#242038", "#003D1E", "#03394F"];
export const mainMenuColors = ["#FFEBFF", "#315C5E"];
export const skatingContrastColor = "#150949";
// export const skippingContrastColor = "#8FD694";
export const skippingContrastColor = "#D5F2E3";
export const mainMenuTextColors = [skatingContrastColor, skippingContrastColor];


export class Menu {
	constructor(names, onSelect, state, colors, contrastColor) {
		this.state = state;
		this.touchState = -1;
		this.names = names;
		this.onSelect = onSelect;
		this.menuButtons = names.map((name, i) => {
			if (Array.isArray(contrastColor)) {
				return new MenuButton(i, names.length, name, colors[i], contrastColor[i]);
			} else {
				return new MenuButton(i, names.length, name, colors[i], contrastColor);
			}
		});
	}

	draw() {
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
	constructor(num, total, name, clr, contrastColor) {
		this.num = num;
		this.total = total;
		this.name = name;
		this.color = clr;
		this.contrastColor = contrastColor;
	}

	draw() {
		noStroke();
		fill(this.color);
		let y = this.num * height / this.total;
		rect(0, y, width, height / this.total);
		
		fill(this.contrastColor);
		textSize(int(height / (this.total * 4)));
		textStyle(ITALIC);
		textAlign(CENTER, CENTER);
		text(this.name, width / 2, y + (height / (this.total * 2)));
	}
}

export class FooterMenu {
	constructor(state, onSelect, colors, contrastColor) {
		this.state = state;
		this.onSelect = onSelect;
		this.contrastColor = contrastColor;
		this.colors = colors;
		this.slots = []		// for instrument menu buttons
	}
	static getY() {
		let refLength = max(height, width);
		let iconSize = int(refLength / 20);
		return height - iconSize - 10;
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
		fill(this.contrastColor);

		triangle(
			this.x + this.iconSize, this.y,
			this.x + this.iconSize, this.y + this.iconSize,
			this.x, this.y + (this.iconSize / 2));		 

		let xPos = this.x + (this.iconSize * 2.5);
		const yPos  = this.y + this.iconSize / 2;
		this.slots = [];
		for (let i = 0; i < this.colors.length; i += 1) {
			if (i !== this.state.page) {
				stroke(this.contrastColor);
				fill(this.colors[i]);
				circle(xPos, yPos, this.iconSize);
				this.slots.push({
					x: xPos,
					y: yPos,
					i: i
				});
				xPos += this.iconSize * 2;
			}
		}
		noStroke();
		noFill();
	}
	onClick(x, y) {
		// nav
		if (x >= this.x && x <= this.x + this.iconSize 
			&& y >= this.y && y < this.y + this.iconSize) {
			this.onSelect("menu");
		} else {
			const radius = this.iconSize / 2;
			this.slots.map((slot) => {
				if (dist(slot.x, slot.y, x, y) < radius) {
					this.onSelect(slot.i);
					return;
				}
			});
		}
		// figure out what was selected, call onSelect with the appropriate param
	}
	isIn(x, y) {
		return y >= this.y && x <= this.slots[this.slots.length - 1].x + (this.iconSize / 2);
	}
}

