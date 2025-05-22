
const buttonLibrary = {
	// stats bars
	levelBar: {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radii: 0,
		color: "#5fa7e5",
		name: "levelBarButton",
		group: null,
		classification: "bar",
		text: "bug 101",
		index: 0
	},
	experienceBar: {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radii: 0,
		color: "#ffd15d",
		name: "experienceBarButton",
		group: null,
		classification: "bar",
		text: "bug 101",
		index: 1
	},
	healthBar: {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radii: 0,
		color: "#ff5d70",
		name: "healthBarButton",
		group: null,
		classification: "bar",
		text: "bug 101",
		index: 2
	},
	manaBar: {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radii: 0,
		color: "#dbcff8",
		name: "manaBarButton",
		group: null,
		classification: "bar",
		text: "bug 101",
		index: 3
	},
	// clickable buttons
	inventoryButton: {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radii: 0,
		color: "#e3a04d",
		name: "inventoryButton",
		group: null,
		classification: "clickable",
		text: "inventory",
		index: null
	},
	craftButton: {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radii: 0,
		color: "#3477eb",
		name: "craftButton",
		group: null,
		classification: "clickable",
		text: "craft",
		index: null
	},
	settingsButton: {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radii: 0,
		color: "#bab6bf",
		name: "settingsButton",
		group: null,
		classification: "clickable",
		text: "settings",
		index: null
	},
	// spell book slot
	spellBookSlot: {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radii: 0,
		color: "black",
		name: null,
		group: "spellBookSlot",
		classification: "slot",
		text: "bug 101",
		index: null
	},
	// show inventory
	showInventory: {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radii: 0,
		color: "#e3a04d",
		name: "showInventory",
		group: null,
		classification: "stable",
		text: "bug 101",
		index: null
	},
	// crafting buttons
	showCrafting: {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radii: 0,
		color: "#3477eb",
		name: "showCrafting",
		group: null,
		classification: "stable",
		text: "bug 101",
		index: null
	},
	pageSlot: {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radii: 0,
		color: "black",
		name: "pageSlot",
		group: "craftSlot",
		classification: "slot",
		text: "insert 5 pages",
		index: 1
	},
	essenceSlot: {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radii: 0,
		color: "black",
		name: "essenceSlot",
		group: "craftSlot",
		classification: "slot",
		text: "insert 15 essence",
		index: 2
	},
	activateCraft: {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radii: 0,
		color: "gray",
		name: "activateCraft",
		group: "craftSlot",
		classification: "clickable",
		text: "craft",
		index: 3
	},
	craftedItemSlot: {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radii: 0,
		color: "black",
		name: "craftedItemSlot",
		group: "craftSlot",
		classification: "slot",
		text: "crafted item:",
		index: 4
	},
	showSettings: {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radii: 0,
		color: "#bab6bf",
		name: "showSettings",
		group: null,
		classification: "stable",
		text: "bug 101",
		index: null
	},
	keyMovementButton: {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radii: 0,
		color: "black",
		name: "keyMovementButton",
		group: "movementButtons",
		classification: "clickable",
		text: "keyMovement",
		index: 0
	},
	mouseMovementButton: {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radii: 0,
		color: "#bab6bf",
		name: "mouseMovementButton",
		group: "movementButtons",
		classification: "clickable",
		text: "mouseMovement",
		index: 1
	},
	followMouseMovementButton: {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radii: 0,
		color: "#bab6bf",
		name: "followMouseMovementButton",
		group: "movementButtons",
		classification: "clickable",
		text: "followMouseMovement",
		index: 2
	}
}
class Button {
	constructor(x, y, width, height, radii, color, name, group, classification, text, index) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
		this.radii = radii;
		this.color = color;
		this.name = name;
		this.group = group;
		this.classification = classification;
		this.text = text;
		this.index = index;
		this.toggle = false;
		this.codeClass = "button";
		this.slotActive = false;
    }

	draw(ctx) {
		ctx.beginPath();
		ctx.roundRect(this.x, this.y, this.width, this.height, window.innerHeight / 300);

		if (this.classification != "slot") {
			ctx.fillStyle = this.color;
			ctx.fill();
		}

		ctx.strokeStyle = "black";
		ctx.lineWidth = lineThickness;
		ctx.stroke();

		ctx.font = fontSize + "px ubuntu";
		ctx.fillStyle = "black";

		if (this.classification == "bar") {
			this.x = statsBarX;
			this.y = (statsBarY * (this.index + 1)) + statsBarHeight * this.index;
			this.width = statsBarWidth;
			this.height = statsBarHeight;
			if (this.name == "levelBarButton") {
				this.text = `level: ${myGameCharacter.level}`;
			}
			if (this.name == "experienceBarButton") {
				this.text = `experience: ${myGameCharacter.experience}/${maxExperience}`;
			}
			if (this.name == "healthBarButton") {
				this.text = `health: ${Math.floor(myGameCharacter.health) }/${myGameCharacter.maxHealth}`;
			}
			if (this.name == "manaBarButton") {
				this.text = `mana: ${Math.floor(myGameCharacter.mana)}/${myGameCharacter.maxMana}`;
			}
			ctx.fillText(this.text, this.x + 5, this.y + (this.height / 1.5));
		}

		// buttons
		if (this.name == "inventoryButton") {
			this.x = statsBarX;
			this.y = (statsBarY * 5) + statsBarHeight * 4;
			this.width = statsBarWidth * 0.5;
			this.height = statsBarHeight;
			this.text = "inventory";
			ctx.fillText(this.text, this.x + 5, this.y + (this.height / 1.5));
		}
		if (this.name == "craftButton") {
			this.x = statsBarX;
			this.y = (statsBarY * 6) + statsBarHeight * 5;
			this.width = statsBarWidth * 0.5;
			this.height = statsBarHeight;
			this.text = "craft";
			ctx.fillText(this.text, this.x + 5, this.y + (this.height / 1.5));
		}
		if (this.name == "settingsButton") {
			this.width = statsBarWidth * 0.5;
			this.height = statsBarHeight;
			this.x = statsBarX;
			this.y = window.innerHeight - this.height - slotMargin;
			this.text = "settings";
			ctx.fillText(this.text, this.x + 5, this.y + (this.height / 1.5));
		}
		if (this.name == "showSettings") {
			let settingsButtonIndex = buttonsArray.findIndex(element => element.name === "settingsButton");
			let totalMovementButtonsArray = buttonsArray.filter(element => element.group == "movementButtons");
			this.width = window.innerWidth / 4;
			this.height = (totalMovementButtonsArray.length * (miniButtonSize + buttonMargin)) + buttonMargin;
			if (buttonsArray[settingsButtonIndex].toggle == false) {
				if (this.x > -this.width * 1.2) {
					// Ensure we don't overshoot the target
					this.x = Math.max(this.x - 5, -this.width * 1.2);
					console.log(this.x, -this.width * 1.2);
				}
			} else {
				if (this.x < buttonMargin) {
					// Ensure we don't overshoot the target
					this.x = Math.min(this.x + 5, buttonMargin);
					console.log(this.x, buttonMargin);
				}
			}	
			this.y = window.innerHeight - this.height - window.innerHeight / 20 - (slotMargin * 2);
		}
		if (this.group == "movementButtons") {
			let showSettingsIndex = buttonsArray.findIndex(element => element.name == "showSettings");
			let referenceX = buttonsArray[showSettingsIndex].x;
			let referenceY = buttonsArray[showSettingsIndex].y;

			const xDistance = referenceX + buttonMargin;
			const yDistance = referenceY + buttonMargin + ((miniButtonSize + buttonMargin) * this.index);
			this.x = xDistance;
			this.y = yDistance;
			this.width = miniButtonSize;
			this.height = miniButtonSize;

			if (leftClick) {
				let distance = Math.sqrt(mouseX >= this.x && mouseX < miniButtonSize + this.x && mouseY >= this.y && mouseY < miniButtonSize + this.y);
				let totalMovementButtonsArray = buttonsArray.filter(element => element.group == "movementButtons");

				if (distance && this.name == "keyMovementButton" && !this.toggle) {

					// shut off the other buttons
					totalMovementButtonsArray.forEach(button => {
						button.toggle = false;
						button.color = "#bab6bf";
						mouseMovement = false;
						followMouseMovement = false;
					});

					// toggles itself
					this.toggle = true;
					this.color = "black";
					keyMovement = true;
				}

				if (distance && this.name == "mouseMovementButton" && !this.toggle) {

					totalMovementButtonsArray.forEach(button => {
						button.toggle = false;
						button.color = "#bab6bf";
						keyMovement = false;
						followMouseMovement = false;
					});
					this.toggle = true;
					this.color = "black";
					mouseMovement = true;
				}

				if (distance && this.name == "followMouseMovementButton" && !this.toggle) {

					totalMovementButtonsArray.forEach(button => {
						button.toggle = false;
						button.color = "#bab6bf";
						keyMovement = false;
						mouseMovement = false;
					});
					this.toggle = true;
					this.color = "black";
					followMouseMovement = true;
				}
			}

			ctx.font = fontSize + "px ubuntu";
			ctx.fillStyle = "black";
			ctx.fillText(
				this.text,
				this.x + miniButtonSize + buttonMargin,
				this.y + miniButtonSize / 2);
		}
		
		if (this.name == "showInventory") {
			this.x = window.innerWidth / 64 + window.innerWidth / 8;
			this.y = (window.innerHeight / 64) + (window.innerHeight / 18) * 0;
			let row = 0;
			let column = 0;
			let slotsPerRow = 5;
			this.width = (slotsPerRow * lootSize) + ((slotsPerRow + 1) * slotMargin); //window.innerWidth / 3;
			this.height = (slotsPerRow * lootSize) + ((slotsPerRow + 1) * slotMargin); //window.innerHeight / 2;

			for (let i = 0; i < inventoryArray.length; i++) {

				if (i >= slotsPerRow && i % slotsPerRow == 0) {
					row++;
					column += slotsPerRow;
				}

				let xDistance = this.x + (lootSize * (i - column)) + (slotMargin * (i - column + 1));
				let yDistance = this.y + slotMargin + ((slotMargin + lootSize) * row);
				inventoryArray[i].x = xDistance;
				inventoryArray[i].y = yDistance;

				if (leftClick && mouseHeldItem.length <= 1) {
					let distance = Math.sqrt(mouseX >= inventoryArray[i].x && mouseX < lootSize + inventoryArray[i].x && mouseY >= inventoryArray[i].y && mouseY < lootSize + inventoryArray[i].y);
					if (distance && mouseHeldItem.length < 1) {
						inventoryArray[i].held = true;
						inventoryArray[i].from = "inventory";
						mouseHeldItem.push(inventoryArray[i]);
						//console.log("youll only see me once");
						//console.log("mousehelditems", mouseHeldItem);
					}
					if (inventoryArray[i].held) {
						inventoryArray[i].x = mouseX - (lootSize / 2);
						inventoryArray[i].y = mouseY - (lootSize / 2);
					}
				} else if (!leftClick && inventoryArray[i].held && mouseHeldItem.length >= 1) {
					inventoryArray[i].held = false;
					mouseHeldItem.splice(0, mouseHeldItem.length);
					//console.log("mousehelditems", mouseHeldItem);
				}

				ctx.beginPath();
				ctx.roundRect(
					inventoryArray[i].x,
					inventoryArray[i].y,
					lootSize,
					lootSize,
					radiiSize);

				ctx.strokeStyle = inventoryArray[i].borderColor;
				ctx.lineWidth = lineThickness;
				ctx.stroke();
				ctx.font = fontSize + "px ubuntu";
				ctx.fillStyle = "black";

				ctx.drawImage(
					inventoryArray[i].image,
					inventoryArray[i].x,
					inventoryArray[i].y,
					lootSize,
					lootSize);

				ctx.fillText(
					inventoryArray[i].amount + "x" + inventoryArray[i].text + " " + inventoryArray[i].level,
					inventoryArray[i].x,
					inventoryArray[i].y - (slotMargin / 4))

				ctx.closePath();
			}
		}
		if (this.name == "showCrafting") {
			let slotsPerRow = 5;
			let referenceWidth = (slotsPerRow * lootSize) + ((slotsPerRow + 1) * slotMargin);
			this.x = (window.innerWidth / 64 + window.innerWidth / 8) + referenceWidth;
			this.y = (window.innerHeight / 64) + (window.innerHeight / 18) * 0;
			this.width = (slotsPerRow * lootSize) + ((slotsPerRow + 1) * slotMargin); //window.innerWidth / 3;
			this.height = (slotsPerRow * lootSize) + ((slotsPerRow + 1) * slotMargin); //window.innerHeight / 2;

			for (let i = 0; i < toBeCraftedArray.length; i++) {

				let showCraftingIndex = buttonsArray.findIndex(element => element.name == "showCrafting");
				let referenceX = buttonsArray[showCraftingIndex].x;
				let referenceY = buttonsArray[showCraftingIndex].y;
				let referenceWidth = buttonsArray[showCraftingIndex].width;
				let referenceHeight = buttonsArray[showCraftingIndex].height;

				let totalCraftSlotArray = buttonsArray.filter(element => element.group == "craftSlot").length;
				const xDistance = referenceX + (referenceWidth - lootSize * totalCraftSlotArray) / 2 + (lootSize + slotMargin) * (toBeCraftedArray[i].index - 1) - slotMargin;
				const yDistance = referenceY + ((referenceHeight - lootSize) / 2);
				toBeCraftedArray[i].x = xDistance;
				toBeCraftedArray[i].y = yDistance;

				ctx.beginPath();
				ctx.roundRect(
					toBeCraftedArray[i].x,
					toBeCraftedArray[i].y,
					lootSize,
					lootSize,
					radiiSize);

				ctx.strokeStyle = toBeCraftedArray[i].borderColor;
				ctx.lineWidth = lineThickness;
				ctx.stroke();
				ctx.font = fontSize + "px ubuntu";
				ctx.fillStyle = "black";

				ctx.drawImage(
					toBeCraftedArray[i].image,
					toBeCraftedArray[i].x,
					toBeCraftedArray[i].y,
					lootSize,
					lootSize);

				ctx.fillText(
					toBeCraftedArray[i].amount + "x" + toBeCraftedArray[i].text + " " + toBeCraftedArray[i].level,
					toBeCraftedArray[i].x,
					toBeCraftedArray[i].y - (slotMargin / 4))

				ctx.closePath();
			}
		
		}
		if (this.group == "craftSlot") {
			let showCraftingIndex = buttonsArray.findIndex(element => element.name == "showCrafting");
			let referenceX = buttonsArray[showCraftingIndex].x;
			let referenceY = buttonsArray[showCraftingIndex].y;
			let referenceWidth = buttonsArray[showCraftingIndex].width;
			let referenceHeight = buttonsArray[showCraftingIndex].height;

			let totalCraftSlotArray = buttonsArray.filter(element => element.group == "craftSlot").length;
			const xDistance = referenceX + (referenceWidth - lootSize * totalCraftSlotArray) / 2 + (lootSize + slotMargin) * (this.index - 1) - slotMargin;
			const yDistance = referenceY + ((referenceHeight - lootSize) / 2);
			this.x = xDistance;
			this.y = yDistance;
			this.width = lootSize;
			this.height = lootSize;
			let textY = this.y - slotMargin;
			let textX = this.x;
			if (this.name == "activateCraft") {
				this.width = lootSize / 1.5;
				this.height = lootSize / 3;
				this.x = xDistance + (lootSize / 2) - (this.width / 2);
				this.y = yDistance + (lootSize / 2) - (this.height / 2);
				textX = xDistance + (lootSize / 2) - (this.width / 4)
				textY = yDistance + (lootSize / 2) + (this.height / 5);
				this.color = "gray";
				let pageIndex = toBeCraftedArray.findIndex(element => element.form == "page");
				let essenceIndex = toBeCraftedArray.findIndex(element => element.form == "essence");
				if (pageIndex != -1 &&
					essenceIndex != -1) {
					if (toBeCraftedArray[pageIndex].amount >= toBeCraftedArray[pageIndex].pagesToCraft &&
						toBeCraftedArray[essenceIndex].name == toBeCraftedArray[pageIndex].essenceName &&
						toBeCraftedArray[essenceIndex].amount >= toBeCraftedArray[pageIndex].essenceToCraft) {
						this.color = "green";
					}
				}
			}

			ctx.font = fontSize + "px ubuntu";
			ctx.fillStyle = "black";
			ctx.fillText(
				this.text,
				textX,
				textY);
		}
		if (this.group == "spellBookSlot") {
			const xDistance = window.innerWidth / 2 - (((slotSize + slotMargin) * myGameCharacter.spellBookSlotsUnlocked) / 2) + (slotSize + slotMargin) * (this.index - 1);
			const yDistance = window.innerHeight - slotMargin - slotSize;
			this.x = xDistance;
			this.y = yDistance;
			this.width = slotSize;
			this.height = slotSize;
			let spellBookIndex = spellBooksArray.findIndex(element => element.index === this.index);
			if (spellBookIndex != -1) {
				this.text = spellBooksArray[spellBookIndex].text + " " + spellBooksArray[spellBookIndex].level;
			} else {
				this.text = "slot " + this.index;
			}
			ctx.font = fontSize + "px ubuntu";
			ctx.fillStyle = "black";
			ctx.fillText(
				this.text,
				this.x,
				this.y - (slotMargin / 2));
		}
        ctx.closePath();
	}
	
	clickButton(xmouse, ymouse) {
		if (
			xmouse >= this.x && xmouse < this.width + this.x &&
			ymouse >= this.y && ymouse < this.height + this.y
		)  {
			// TODO: update the delete function to also work with other buttons
			function deleteButton(...buttonNames) {
				const buttonsToDelete = new Set(buttonNames);
				for (let i = buttonsArray.length - 1; i >= 0; i--) {
					if (buttonsToDelete.has(buttonsArray[i].name)) {
						buttonsArray.splice(i, 1);
					}
				}
			}
			function deleteLoot() {

			}
			// TODO: Add a function that makes you be able to add animation to the buttons with less code used
			if (this.name == "settingsButton" && !this.toggle) {
				this.toggle = true;
				// settings buttons
				addButton(buttonLibrary.showSettings, null);
				addButton(buttonLibrary.keyMovementButton, 0);
				addButton(buttonLibrary.mouseMovementButton, 1);
				addButton(buttonLibrary.followMouseMovementButton, 2);
			} else if (this.name == "settingsButton" && this.toggle) {
				this.toggle = false;
				deleteButton("showSettings", "keyMovementButton", "mouseMovementButton", "followMouseMovementButton");
			}
			if (this.name == "inventoryButton" && !this.toggle) {
				this.toggle = true;
				addButton(buttonLibrary.craftButton, null);
				addButton(buttonLibrary.showInventory, null);
				//console.log(inventoryArray);
			} else if (this.name == "inventoryButton" && this.toggle) {
				this.toggle = false;
				deleteButton("showInventory", "craftButton");

				let showCraftingButtonIndex = buttonsArray.findIndex(element => element.name === "showCrafting");
				if (showCraftingButtonIndex !== -1) {
					// removing the page slot properly
					let pageIndex = toBeCraftedArray.findIndex(element => element.form == "page");
					if (pageIndex != -1) {
						let pageSlotIndex = buttonsArray.findIndex(element => element.name == "pageSlot");

						toBeCraftedArray[pageIndex].index = null;
						toBeCraftedArray[pageIndex].location = null;
						buttonsArray[pageSlotIndex].slotActive = false;

						inventoryArray.push(toBeCraftedArray[pageIndex]);
						toBeCraftedArray.splice(pageIndex, 1);
					}
					// removing the essence slot properly
					let essenceIndex = toBeCraftedArray.findIndex(element => element.form == "essence");
					if (essenceIndex != -1) {
						let essenceSlotIndex = buttonsArray.findIndex(element => element.name == "essenceSlot");

						toBeCraftedArray[essenceIndex].index = null;
						toBeCraftedArray[essenceIndex].location = null;
						buttonsArray[essenceSlotIndex].slotActive = false;

						inventoryArray.push(toBeCraftedArray[essenceIndex]);
						toBeCraftedArray.splice(essenceIndex, 1);
					}
					// removing the craftedItemSlot properly
					let spellBookIndex = toBeCraftedArray.findIndex(element => element.codeClass == "spellBook");
					if (spellBookIndex != -1) {
						let craftedItemSlotIndex = buttonsArray.findIndex(element => element.name == "craftedItemSlot");

						toBeCraftedArray[spellBookIndex].index = null;
						toBeCraftedArray[spellBookIndex].location = null;
						buttonsArray[craftedItemSlotIndex].slotActive = false;

						inventoryArray.push(toBeCraftedArray[spellBookIndex]);
						toBeCraftedArray.splice(spellBookIndex, 1);
					}
					buttonsArray.splice(showCraftingButtonIndex, 1);
				}
				let totalCraftSlotArray = buttonsArray.filter(element => element.group == "craftSlot");
				for (let i = 0; i < totalCraftSlotArray.length; i++) {
					let craftSlotIndex = buttonsArray.findIndex(element => element.group === "craftSlot");
					if (craftSlotIndex !== -1) {
						buttonsArray.splice(craftSlotIndex, 1);
					}
				}
			}
			if (this.name == "craftButton" && !this.toggle) {
				this.toggle = true;
				addButton(buttonLibrary.showCrafting, null);

				addButton(buttonLibrary.pageSlot, 1);
				addButton(buttonLibrary.essenceSlot, 2);
				addButton(buttonLibrary.activateCraft, 3);
				addButton(buttonLibrary.craftedItemSlot, 4);

				let arrayTransfer = [];
				let showInventoryButtonIndex = buttonsArray.findIndex(element => element.name === "showInventory");
				arrayTransfer.push(buttonsArray[showInventoryButtonIndex]);
				buttonsArray.splice(showInventoryButtonIndex, 1);
				buttonsArray.push(arrayTransfer[0]);
				arrayTransfer.splice(0, arrayTransfer.length);

			} else if (this.name == "craftButton" && this.toggle) {
				this.toggle = false;

				let showCraftingButtonIndex = buttonsArray.findIndex(element => element.name === "showCrafting");
				if (showCraftingButtonIndex !== -1) {
					// removing the page slot properly
					let pageIndex = toBeCraftedArray.findIndex(element => element.form == "page");
					if (pageIndex != -1) {
						let pageSlotIndex = buttonsArray.findIndex(element => element.name == "pageSlot");

						toBeCraftedArray[pageIndex].index = null;
						toBeCraftedArray[pageIndex].location = null;
						buttonsArray[pageSlotIndex].slotActive = false;

						inventoryArray.push(toBeCraftedArray[pageIndex]);
						toBeCraftedArray.splice(pageIndex, 1);
					}
					// removing the essence slot properly
					let essenceIndex = toBeCraftedArray.findIndex(element => element.form == "essence");
					if (essenceIndex != -1) {
						let essenceSlotIndex = buttonsArray.findIndex(element => element.name == "essenceSlot");

						toBeCraftedArray[essenceIndex].index = null;
						toBeCraftedArray[essenceIndex].location = null;
						buttonsArray[essenceSlotIndex].slotActive = false;

						inventoryArray.push(toBeCraftedArray[essenceIndex]);
						toBeCraftedArray.splice(essenceIndex, 1);
					}
					// removing the craftedItemSlot properly
					let spellBookIndex = toBeCraftedArray.findIndex(element => element.codeClass == "spellBook");
					if (spellBookIndex != -1) {
						let craftedItemSlotIndex = buttonsArray.findIndex(element => element.name == "craftedItemSlot");

						toBeCraftedArray[spellBookIndex].index = null;
						toBeCraftedArray[spellBookIndex].location = null;
						buttonsArray[craftedItemSlotIndex].slotActive = false;

						inventoryArray.push(toBeCraftedArray[spellBookIndex]);
						toBeCraftedArray.splice(spellBookIndex, 1);
					}
					buttonsArray.splice(showCraftingButtonIndex, 1);
				}
				let totalCraftSlotArray = buttonsArray.filter(element => element.group == "craftSlot");
				for (let i = 0; i < totalCraftSlotArray.length; i++) {
					let craftSlotIndex = buttonsArray.findIndex(element => element.group === "craftSlot");
					if (craftSlotIndex !== -1) {
						buttonsArray.splice(craftSlotIndex, 1);
					}
				}
			}

			if (this.group == "spellBookSlot") {
				if (mouseHeldItem.length > 0 && mouseHeldItem[0].codeClass == "spellBook" && !this.slotActive) {
					if (mouseHeldItem[0].from == "inventory") {
						mouseHeldItem[0].index = this.index;
						spellBooksArray.push(mouseHeldItem[0]);
						mouseHeldItem[0].held = false;
						this.slotActive = true;
						mouseHeldItem[0].onSlot = true;

						let heldItemIndex = inventoryArray.findIndex(element => element.name == mouseHeldItem[0].name && element.uniqueID == mouseHeldItem[0].uniqueID);
						inventoryArray.splice(heldItemIndex, 1);
						mouseHeldItem.splice(0, 1);
					}
					else if (mouseHeldItem[0].from == "spellBookSlot") {
						mouseHeldItem[0].index = this.index;
						spellBooksArray.push(mouseHeldItem[0]);
						mouseHeldItem[0].held = false;
						this.slotActive = true;
						mouseHeldItem[0].onSlot = true;

						let heldItemIndex = spellBooksArray.findIndex(element => element.name == mouseHeldItem[0].name && element.uniqueID == mouseHeldItem[0].uniqueID);
						spellBooksArray.splice(heldItemIndex, 1);
						mouseHeldItem.splice(0, 1);
					}
				}
			}
			if (this.name == "pageSlot") {
				if (mouseHeldItem.length > 0 && mouseHeldItem[0].form == "page" && mouseHeldItem[0].amount >= 1 && !this.slotActive) {
					mouseHeldItem[0].index = this.index;
					mouseHeldItem[0].location = this.name;

					toBeCraftedArray.push(mouseHeldItem[0]);
					mouseHeldItem[0].held = false;
					this.slotActive = true;

					let lootIndex = inventoryArray.findIndex(element => element.index == mouseHeldItem[0].index && element.location == mouseHeldItem[0].location);
					inventoryArray.splice(lootIndex, 1);
					mouseHeldItem.splice(0, 1);
				} else if (mouseHeldItem.length == 0 && this.slotActive) {
					let pageIndex = toBeCraftedArray.findIndex(element => element.form == "page");
					toBeCraftedArray[pageIndex].index = null;
					toBeCraftedArray[pageIndex].location = null;
					this.slotActive = false;

					inventoryArray.push(toBeCraftedArray[pageIndex]);
					toBeCraftedArray.splice(pageIndex, 1);
				}
			}
			if (this.name == "essenceSlot") {
				if (mouseHeldItem.length > 0 && mouseHeldItem[0].form == "essence" && mouseHeldItem[0].amount >= 1 && !this.slotActive) {
					mouseHeldItem[0].index = this.index;
					mouseHeldItem[0].location = this.name;

					toBeCraftedArray.push(mouseHeldItem[0]);
					mouseHeldItem[0].held = false;
					this.slotActive = true;

					let lootIndex = inventoryArray.findIndex(element => element.index == mouseHeldItem[0].index && element.location == mouseHeldItem[0].location);
					inventoryArray.splice(lootIndex, 1);
					mouseHeldItem.splice(0, 1);
				} else if (mouseHeldItem.length == 0 && this.slotActive) {

					let essenceIndex = toBeCraftedArray.findIndex(element => element.form == "essence");
					toBeCraftedArray[essenceIndex].index = null;
					toBeCraftedArray[essenceIndex].location = null;
					this.slotActive = false;
					inventoryArray.push(toBeCraftedArray[essenceIndex]);
					toBeCraftedArray.splice(essenceIndex, 1);
				}
			}
			if (this.name == "activateCraft") {
				let pageIndex = toBeCraftedArray.findIndex(element => element.form == "page");
				let essenceIndex = toBeCraftedArray.findIndex(element => element.form == "essence");
				if (pageIndex != -1 &&
					essenceIndex != -1) {
					if (toBeCraftedArray[pageIndex].amount >= toBeCraftedArray[pageIndex].pagesToCraft &&
						toBeCraftedArray[essenceIndex].name == toBeCraftedArray[pageIndex].essenceName &&
						toBeCraftedArray[essenceIndex].amount >= toBeCraftedArray[pageIndex].essenceToCraft) {

						toBeCraftedArray[pageIndex].amount -= toBeCraftedArray[pageIndex].pagesToCraft;
						toBeCraftedArray[essenceIndex].amount -= toBeCraftedArray[pageIndex].essenceToCraft;

						let craftedItemSlotIndex = buttonsArray.findIndex(element => element.name == "craftedItemSlot");

						// check if there's an item at the craftedItemSlot
						if (buttonsArray[craftedItemSlotIndex].slotActive) {
							let spellBookIndex = toBeCraftedArray.findIndex(element => element.codeClass == "spellBook");

							toBeCraftedArray[spellBookIndex].index = null;
							toBeCraftedArray[spellBookIndex].location = null;

							inventoryArray.push(toBeCraftedArray[spellBookIndex]);
							toBeCraftedArray.splice(spellBookIndex, 1);

							buttonsArray[craftedItemSlotIndex].slotActive = false;
						}

						let spellBook = toBeCraftedArray[pageIndex].spellBookName;
						let craftedSpellBook = new SpellBook(0, 0, null, 0, 0, 0, "black", spellBook.appearance, spellBook.name, generateID(), spellBook.spell, spellBook.mainSpell, spellBook.cooldown, spellBook.text);

						craftedSpellBook.index = buttonsArray[craftedItemSlotIndex].index;
						craftedSpellBook.location = buttonsArray[craftedItemSlotIndex].name;

						toBeCraftedArray.push(craftedSpellBook);

						buttonsArray[craftedItemSlotIndex].slotActive = true;

						if (toBeCraftedArray[pageIndex].amount == 0) {
							toBeCraftedArray.splice(pageIndex, 1);
						}
						if (toBeCraftedArray[essenceIndex].amount == 0) {
							toBeCraftedArray.splice(essenceIndex, 1);
						}

					}
				}
			}
			if (this.name == "craftedItemSlot") {
				if (mouseHeldItem.length == 0 && this.slotActive) {

					let spellBookIndex = toBeCraftedArray.findIndex(element => element.codeClass == "spellBook");

					toBeCraftedArray[spellBookIndex].index = null;
					toBeCraftedArray[spellBookIndex].location = null;
					this.slotActive = false;

					inventoryArray.push(toBeCraftedArray[spellBookIndex]);
					toBeCraftedArray.splice(spellBookIndex, 1);
				}
			}
		}
	}
}
