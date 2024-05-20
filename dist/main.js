/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components.js":
/*!***************************!*\
  !*** ./src/components.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Menu: () => (/* binding */ Menu)\n/* harmony export */ });\n\nclass Menu {\n\tconstructor(names, state) {\n\t\tthis.state = state;\n\n\t\tthis.touchState = -1;\n\t\tthis.names = names;\n\t\tthis.menuButtons = names.map((name, i) => {\n\t\t\treturn new MenuButton(i , names.length, name);\n\t\t});\n\t}\n\n\tdraw() {\n\t\tthis.menuButtons.map((button) => button.draw());\n\t}\n\tmouseClicked() {\n\t\tlet i = this.whichItem(mouseY);\n\t\tthis.selectItem(i);\n\t}\n\ttouchStarted() {\n\t\tthis.touchState = this.whichItem(touches[0].y);\n\t}\n\ttouchMoved() {\n\t\tif (this.touchState !== this.whichItem(touches[0].y)) {\n\t\t\tthis.touchState = -1;\n\t\t}\n\t}\n\ttouchEnded() {\n\t\tif (this.touchState !== -1) {\n\t\t\tthis.selectItem(this.touchState);\n\t\t}\n\t\tthis.touchState = -1;\n\t}\n\tselectItem(i) {\n\t\tthis.state.page = this.names[i];\n\t}\n\twhichItem(y) {\n\t\tfor (let i = 0; i < this.names.length; i++) {\n\t\t\tif (y < (i + 1) * (height / this.names.length)) {\n\t\t\t\treturn i;\n\t\t\t}\n\t\t}\n\t\treturn -1;\n\t}\n}\n\nclass MenuButton {\n\tconstructor(num, total, name) {\n\t\tthis.num = num;\n\t\tthis.total = total;\n\t\tthis.name = name;\n\t}\n\n\tdraw() {\n\t\tstroke('black');\n\t\tlet y = this.num * height / this.total;\n\t\trect(0, y, width, height / this.total);\n\t\ttextAlign(CENTER);\n\n\t\ttext(this.name, width / 2, y + (height / (this.total * 2)));\n\t}\n}\n\n//# sourceURL=webpack://tinytouchinstruments/./src/components.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components.js */ \"./src/components.js\");\n/* harmony import */ var _instruments_theremin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instruments/theremin.js */ \"./src/instruments/theremin.js\");\n/* harmony import */ var _instruments_noise_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./instruments/noise.js */ \"./src/instruments/noise.js\");\n/* harmony import */ var _instruments_kit_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./instruments/kit.js */ \"./src/instruments/kit.js\");\n\n\n\n\n\nconst state = {\n  page: \"menu\",\n  ready: false\n};\n\nlet menu;\nlet instruments;\n\nfunction setup() {\n  createCanvas(windowWidth, windowHeight);\n\n  instruments = {\n    theremin: new _instruments_theremin_js__WEBPACK_IMPORTED_MODULE_1__.Theremin(state),\n    noise: new _instruments_noise_js__WEBPACK_IMPORTED_MODULE_2__.Noise(state),\n    kit: new _instruments_kit_js__WEBPACK_IMPORTED_MODULE_3__.Kit(state)\n  };\n\n  menu = new _components_js__WEBPACK_IMPORTED_MODULE_0__.Menu(Object.keys(instruments), state);\n}\n\nfunction draw() {\n  if (state.page === \"menu\") {\n    menu.draw();\n  } else {\n    instruments[state.page].draw();\n  }\n}\n\nfunction windowResized() {\n  resizeCanvas(windowWidth, windowHeight);\n}\n\nfunction mouseClicked() {\n  if (state.page === \"menu\") {\n    menu.mouseClicked();\n  } else {\n    instruments[state.page].mouseClicked();\n  }\n  return false;\n}\n\nfunction mousePressed() {\n  Tone.start().then(() => {\n    state.ready = true;\n  });\n}\n\nfunction mouseDragged() {\n  Tone.start().then(() => {\n    state.ready = true;\n  });\n  if (state.page === \"menu\") {\n    menu.mouseDragged();\n  } else {\n    instruments[state.page].mouseDragged();\n  }\n  return false;\n}\n\nfunction mouseReleased() {\n  Tone.start().then(() => {\n    state.ready = true;\n  });\n  if (state.page === \"menu\") {\n    menu.mouseReleased();\n  } else {\n    instruments[state.page].mouseReleased();\n  }\n  return false;\n}\n\nfunction touchStarted() {\n  Tone.start().then(() => {\n    state.ready = true;\n  });\n  if (state.page === \"menu\") {\n    menu.touchStarted();\n  } else {\n    instruments[state.page].touchStarted();\n  }\n  return false;\n}\n\nfunction touchEnded() {\n  if (state.page === \"menu\") {\n    menu.touchEnded();\n  } else {\n    instruments[state.page].touchEnded();\n  }\n  return false;\n}\n\nfunction touchMoved() {\n  if (state.page === \"menu\") {\n    menu.touchMoved();\n  } else {\n    instruments[state.page].touchMoved();\n  }\n  return false;\n}\n\nwindow.setup = setup;\nwindow.draw = draw;\nwindow.windowResized = windowResized;\nwindow.mouseClicked = mouseClicked;\nwindow.mousePressed = mousePressed;\nwindow.mouseDragged = mouseDragged;\nwindow.mouseReleased = mouseReleased;\nwindow.touchStarted = touchStarted;\nwindow.touchMoved = touchMoved;\nwindow.touchEnded = touchEnded;\n\n//# sourceURL=webpack://tinytouchinstruments/./src/index.js?");

/***/ }),

/***/ "./src/instruments/instrument.js":
/*!***************************************!*\
  !*** ./src/instruments/instrument.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Instrument: () => (/* binding */ Instrument)\n/* harmony export */ });\n\nclass Instrument {\n\tconstructor(state) {\n\t\tthis.state = state;\n\t}\n\n\tdraw() { }\n\n\tgestureStarted(x, y) { }\n\tgestureMoved(x, y) { }\n\tgestureEnded() { }\n\n\ttouchStarted() {\n\t\tthis.gestureStarted(touches[0].x, touches[0].y);\n\t}\n\ttouchMoved() {\n\t\tthis.gestureMoved(touches[0].x, touches[0].y);\t\n\t}\n\ttouchEnded() {\n\t\tthis.gestureEnded();\n\t}\n\n\tmouseClicked() { }\n\tmousePressed() {\n\t\tthis.gestureStarted(mouseX, mouseY);\n\t}\n\tmouseDragged() {\n\t\tthis.gestureMoved(mouseX, mouseY);\n\t}\n\tmouseReleased() {\n\t\tthis.gestureEnded();\n\t}\n}\n\n//# sourceURL=webpack://tinytouchinstruments/./src/instruments/instrument.js?");

/***/ }),

/***/ "./src/instruments/kit.js":
/*!********************************!*\
  !*** ./src/instruments/kit.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Kit: () => (/* binding */ Kit)\n/* harmony export */ });\n\nclass Kit {\n\tconstructor() {\n\n\t}\n\n\tdraw() {\n\t\t\n\t}\n}\n\n//# sourceURL=webpack://tinytouchinstruments/./src/instruments/kit.js?");

/***/ }),

/***/ "./src/instruments/noise.js":
/*!**********************************!*\
  !*** ./src/instruments/noise.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Noise: () => (/* binding */ Noise)\n/* harmony export */ });\n/* harmony import */ var _instrument_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instrument.js */ \"./src/instruments/instrument.js\");\n\n\nclass Noise extends _instrument_js__WEBPACK_IMPORTED_MODULE_0__.Instrument {\n\tconstructor(state) {\n\t\tsuper(state);\n\t\tthis.noise = new Tone.Noise(\"pink\").connect(Tone.Master);\n\t}\n\n\tdraw() {\n\t\tbackground(255);\n\t}\n\n\tgestureStarted(x, y) {\n\t\tif (this.state.ready) {\n\t\t\tthis.noise.start();\n\t\t}\n\t}\n\n\tgestureStopped() {\n\t\tif (this.state.ready) {\n\t\t\tthis.noise.stop();\n\t\t}\n\t}\n}\n\n//# sourceURL=webpack://tinytouchinstruments/./src/instruments/noise.js?");

/***/ }),

/***/ "./src/instruments/theremin.js":
/*!*************************************!*\
  !*** ./src/instruments/theremin.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Theremin: () => (/* binding */ Theremin)\n/* harmony export */ });\n/* harmony import */ var _instrument_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instrument.js */ \"./src/instruments/instrument.js\");\n\n\nclass Theremin extends _instrument_js__WEBPACK_IMPORTED_MODULE_0__.Instrument {\n\tconstructor(state) {\n\t\tsuper(state);\n\t\tthis.synth = new Tone.Synth({\n\t    \tenvelope: { attack: 0.5, release: 0.5 }\n\t  \t}).toDestination();\n\t}\n\n\tdraw() {\n\t\tbackground(255);\n\t}\n\n\tgestureStarted(x, y) {\n\t\tif (this.state.ready) {\n\t\t    this.synth.volume.setValueAtTime(map(y, 0, height, -6, 0));\n\t\t    this.synth.triggerAttack(x + 200);\n\t\t}\n\t}\n\n\tgestureMoved(x, y) {\n\t\tif (this.state.ready) {\n\t\t    this.synth.frequency.exponentialRampToValueAtTime(x + 200, this.synth.now());\n\t\t    this.synth.volume.exponentialRampToValueAtTime(map(y, 0, height, -6, 0), this.synth.now());\n\t\t}\n\t}\n\n\tgestureEnded() {\n\t\tif (this.state.ready) {\n\t\t\tthis.synth.triggerRelease(this.synth.now());\n\t\t}\n\t}\n}\n\n//# sourceURL=webpack://tinytouchinstruments/./src/instruments/theremin.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;