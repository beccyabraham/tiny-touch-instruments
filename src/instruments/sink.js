import { Instrument } from "./instrument.js";
import { FooterMenu, skippingContrastColor } from "../components.js";

let drawState = {
    active: false,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
}

let rocks = [];

export class Sink extends Instrument {
    constructor(state, instrumentColor) {
		super(state, instrumentColor);
	}

    createToneObjects() {
        this.synth = new Tone.MembraneSynth(
            {
                "pitchDecay"  : 0.2 ,
                "octaves"  : 1.2 ,
                "oscillator"  : {
                    "type"  : "sine"
                }  ,
                "envelope"  : {
                    "attack"  : 0.001 ,
                    "decay"  : 0.8 ,
                    "sustain"  : 0.01 ,
                    "release"  : 1.4 ,
                    "attackCurve"  : "exponential"
                }
            }
        );
        this.effect = new Tone.JCReverb({
            roomSize: 0,
            wet: 0.5
        })
    }

	onOpen() {
        this.createToneObjects();
        this.synth.connect(this.effect);
        this.effect.toDestination();
		background(this.bgColor);
	}

	onClose() {
		this.effect.disconnect();
        this.synth.dispose();
        this.effect.dispose();
        rocks = [];
	}

	draw() {
        background(this.bgColor);
        if (drawState.active) {
            let w = drawState.endX - drawState.startX;
            let h = drawState.endY - drawState.startY;
            noFill();
            stroke(skippingContrastColor);
            rect(drawState.startX, drawState.startY, w, h);
        }
        let toRemove = [];
        for (let i = rocks.length - 1; i >= 0; i -= 1) {
            let rock = rocks[i];
            stroke(skippingContrastColor);
            fill(skippingContrastColor);
            rect(rock.x, rock.y, rock.w, rock.h);

            rock.y += 5;
            if (rock.y > height) {
                toRemove.push(i);
            }
        }
        for (const idx of toRemove) {
            rocks.splice(idx, 1);
        }
	}

	gestureStarted(x, y) {
        drawState.active =  true;
        drawState.startX = x;
        drawState.startY = y;
        drawState.endX = x;
        drawState.endY = y;
		if (this.state.ready) {
            this.synth.octaves = map(drawState.startY, height, 0, 0.2, 2);
        }
	}

	gestureMoved(x, y) {
        drawState.endX = x;
        drawState.endY = y;
		if (this.state.ready) {
            let area = abs(drawState.endX - drawState.startX) * abs(drawState.endY - drawState.startY);
            let areaRatio = area / (width * height);
            this.effect.roomSize.rampTo(min(areaRatio, 0.9));
		}
	}

	gestureEnded() {
        rocks.push({
            x: min(drawState.startX, drawState.endX),
            y: min(drawState.startY, drawState.endY),
            w: abs(drawState.endX - drawState.startX),
            h: abs(drawState.endY - drawState.startY)
        })
        drawState.active = false;
		if (this.state.ready) {
            this.synth.triggerAttackRelease(random(["A2", "D3", "A3", "D4"]));
		}
        background(this.bgColor);
	}

}