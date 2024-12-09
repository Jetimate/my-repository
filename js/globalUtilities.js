const constantPlayerSpeed = 5;
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
let mouseX = 0;
let mouseY = 0;
let castMouseX = 0;
let castMouseY = 0;
let mouseClickX = 0;
let mouseClickY = 0;
let worldX = null;
let worldY = null;
let slot3Active = false;
let slot4Active = false;
let slot5Active = false;
let slot6Active = false;
let slot7Active = false;
let slot8Active = false;
let slot9Active = false;
let mobsArray = [];
let lootsArray = [];
let inventoryArray = [];
let buttonsArray = [];
let spellBooksArray = [];
let spellsArray = [];
let maxExperience = 20;
let mouseHeldItem = [];
let toBeCraftedArray = [];
const lootSize = (window.innerWidth + window.innerHeight) / 32;
const slotSize = (window.innerWidth + window.innerHeight) / 24;
const slotMargin = (window.innerWidth + window.innerHeight) / 128;
const radiiSize = (window.innerWidth + window.innerHeight) / 300;
const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");

var myGameArea = {
	canvas: document.getElementById("mycanvas"), // splice
	start: function () {
		this.context = this.canvas.getContext("2d");
		this.interval = setInterval(updateGameArea, 16.67);
	},
	clear: function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	stop: function () {
		clearInterval(this.interval);
	}
}
window.addEventListener('click', function (e) {
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
	//console.log(event);
	isMouseDown = true;
	const rect = canvas.getBoundingClientRect();
	mouseX = event.clientX - rect.left;
	mouseY = event.clientY - rect.top;
	biome1.clickImage(biome1);
});

window.addEventListener('mouseup', () => {
	isMouseDown = false;
});

window.addEventListener('mousemove', (event) => {
	if (isMouseDown) {
		const rect = canvas.getBoundingClientRect();
		mouseX = event.clientX - rect.left;
		mouseY = event.clientY - rect.top;
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
	console.log(generatedID + 1);
	return generatedID++;
}