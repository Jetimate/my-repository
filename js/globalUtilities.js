const constantPlayerSpeed = 5;
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
let generatedID = 0;
let isMouseDown = false;
let leftClick = false;
let rightClick = false;
let mouseX = 0;
let mouseY = 0;
let castMouseX = 0;
let castMouseY = 0;
let mouseClickX = 0;
let mouseClickY = 0;
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
let maxExperience = 100;
let mouseHeldItem = [];
let toBeCraftedArray = [];
const lootSize = (screen.width + screen.height) / 32;
const slotSize = (screen.width + screen.height) / 40;
const slotMargin = (screen.width + screen.height) / 128;
const radiiSize = (screen.width + screen.height) / 300;
const miniButtonSize = (screen.width + screen.height) / 64;
const buttonMargin = screen.width / 128;
const lineThickness = (screen.width + screen.height) / 1200;
const fontSize = (screen.width + screen.height) / 160;

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
window.addEventListener('click', function (e) {
	gameplayScreen = true;

	const rect = canvas.getBoundingClientRect();
	mouseClickX = e.clientX - rect.left;
	mouseClickY = e.clientY - rect.top;
	buttonsArray.forEach(button => {
		button.clickButton(mouseClickX, mouseClickY);
	});
	spellBooksArray.forEach(spellBook => {
		spellBook.clickButton(mouseClickX, mouseClickY);
	})
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
	//console.log(event);
	if (event.code in keys) {
		keys[event.code] = true;
	}
});

// Key up event listener
window.addEventListener('keyup', (event) => {
	if (event.code in keys) {
		keys[event.code] = false;
	}
});
function generateID() {
	//console.log(generatedID + 1);
	return generatedID++;
}