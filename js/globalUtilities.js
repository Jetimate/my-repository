const constantPlayerSpeed = 15; //5
let keyMovement = true;
let mouseMovement = false;
let followMouseMovement = false;
let gameplayScreen = false;
let gameStarted = false;
let resizePending = false;
const keys = {
	KeyW: false,
	KeyA: false,
	KeyS: false,
	KeyD: false,
	ArrowUp: false,
	ArrowDown: false,
	ArrowLeft: false,
	ArrowRight: false,
	Digit1: false,
	Digit2: false,
	Digit3: false,
	Digit4: false,
	Digit5: false,
	Digit6: false,
	Digit7: false,
	Digit8: false,
	Digit9: false,
	ShiftLeft: false,
	ShiftRight: false,
	Space: false,
	KeyB: false
};

// Track if the key has already fired a "pressed once" event
const keyPressedOnce = {};

// Initialize keyPressedOnce for all keys in keys
for (const key in keys) {
	keyPressedOnce[key] = false;
}

let generatedID = 0;
let gameTime = 0;

let isMouseDown = false;
let leftClick = false;
let rightClick = false;

let mouseX = 0;
let mouseY = 0;
let castMouseX = 0;
let castMouseY = 0;
let mouseClickX = 0;
let mouseClickY = 0;
let mouseReleaseX = 0;
let mouseReleaseY = 0;
let worldX = null;
let worldY = null;
let playerTargetX = null;
let playerTargetY = null;

let mobsArray = [];
let lootsArray = [];
let inventoryArray = [];
let buttonsArray = [];
let spellBooksArray = [];
let spellsArray = [];
let mouseHeldItem = [];
let toBeCraftedArray = [];

let maxExperience = 100;
let manaBuildUp = 0;

let lootSize = (((screen.width + screen.height) * 0.6) + ((window.innerWidth + window.innerHeight) * 0.4)) * 0.025;
let slotSize = (((screen.width + screen.height) * 0.6) + ((window.innerWidth + window.innerHeight) * 0.4)) * 0.03;
let slotMargin = (((screen.width + screen.height) * 0.6) + ((window.innerWidth + window.innerHeight) * 0.4)) * 0.005;
let radiiSize = (((screen.width + screen.height) * 0.6) + ((window.innerWidth + window.innerHeight) * 0.4)) * 0.002;
let miniButtonSize = (((screen.width + screen.height) * 0.6) + ((window.innerWidth + window.innerHeight) * 0.4)) * 0.015;
let buttonMargin = (((screen.width + screen.height) * 0.6) + ((window.innerWidth + window.innerHeight) * 0.4)) * 0.005;
let lineThickness = (((screen.width + screen.height) * 0.6) + ((window.innerWidth + window.innerHeight) * 0.4)) * 0.0008;
let fontSize = (((screen.width + screen.height) * 0.6) + ((window.innerWidth + window.innerHeight) * 0.4)) * 0.00575;

let statsBarX = window.innerWidth * 0.004;
let statsBarY = window.innerHeight * 0.008;
let statsBarWidth = ((screen.width * 0.6) + (window.innerWidth * 0.4)) / 8;
let statsBarHeight = ((screen.height * 0.6) + (window.innerHeight * 0.4)) / 24;

const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");

window.addEventListener('contextmenu', event => {
	event.preventDefault();
});
var myGame = {
	canvas: document.getElementById("mycanvas"), // splice
	start: function () {
		this.context = this.canvas.getContext("2d");
		resizeCanvas(); // Set initial size
		requestAnimationFrame(updateCanvas);
	},
	clear: function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
}
window.addEventListener("resize", () => {
	resizePending = true;
});
window.addEventListener('click', function (event) {
	gameplayScreen = true;
	
	const rect = canvas.getBoundingClientRect();
	mouseReleaseX = event.clientX - rect.left;
	mouseReleaseY = event.clientY - rect.top;
	//console.log("mouseRelease", mouseReleaseX, mouseReleaseY);
});
window.addEventListener('mousedown', (event) => {
	//console.log("mousedown");
	isMouseDown = true;
	if (event.button == 0) {
		leftClick = true;

	}
	if (event.button == 2) {
		rightClick = true;

		playerTargetX = worldX - biome1.x;
		playerTargetY = worldY - biome1.y;

		myGameCharacter.hasTarget = true;
	}
	const rect = canvas.getBoundingClientRect();
	mouseClickX = event.clientX - rect.left;
	mouseClickY = event.clientY - rect.top;
	buttonsArray.forEach(button => {
		button.clickButton();
	});
	spellBooksArray.forEach(spellBook => {
		spellBook.clickButton();
	})
	biome1.clickImage(biome1);
});

window.addEventListener('mouseup', (event) => {
	//console.log("mouseup");
	isMouseDown = false;
	if (event.button == 0) {
		leftClick = false;
	}
	if (event.button == 2) {
		rightClick = false;
	}
	// TODO: make it so that only spellSlots are called instead of the entire buttons existance
	buttonsArray.forEach(button => {
		button.clickButton();
	});
});

window.addEventListener('mousemove', (event) => {
	//console.log("mousemove");
	const rect = canvas.getBoundingClientRect();
	mouseX = event.clientX - rect.left;
	mouseY = event.clientY - rect.top;
	if (followMouseMovement) {
		playerTargetX = worldX - biome1.x;
		playerTargetY = worldY - biome1.y;
	}
});
// Key down event listener
window.addEventListener('keydown', (event) => {
	if (keys.hasOwnProperty(event.code)) {
		if (!keys[event.code]) {
			// Key was not previously pressed, so register a "pressed once"
			keyPressedOnce[event.code] = true;
		}
		keys[event.code] = true; // mark key as pressed
	}
	//console.log(event);
	if (event.code in keys) {
		keys[event.code] = true;
	}
});

// Key up event listener
window.addEventListener('keyup', (event) => {
	if (keys.hasOwnProperty(event.code)) {
		keys[event.code] = false;          // mark key as released
		keyPressedOnce[event.code] = false; // reset pressed once flag on release
	}
	if (event.code in keys) {
		keys[event.code] = false;
	}
});
function generateID() {
	//console.log(generatedID + 1);
	return generatedID++;
}