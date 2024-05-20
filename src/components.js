
export class Menu {
	constructor(names, state) {
		this.state = state;

		this.touchState = -1;
		this.names = names;
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
		this.selectItem(i);
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
			this.selectItem(this.touchState);
		}
		this.touchState = -1;
	}
	selectItem(i) {
		this.state.page = this.names[i];
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
		stroke('black');
		let y = this.num * height / this.total;
		rect(0, y, width, height / this.total);
		textAlign(CENTER);

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
