
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
	// display inventory
	displayInventory: {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radii: 0,
		color: "#e3a04d",
		name: "displayInventory",
		group: null,
		classification: "display",
		text: "bug 101",
		index: null
	},
	// crafting buttons
	displayCrafting: {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radii: 0,
		color: "#3477eb",
		name: "displayCrafting",
		group: null,
		classification: "display",
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
	displaySettings: {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		radii: 0,
		color: "#bab6bf",
		name: "displaySettings",
		group: null,
		classification: "display",
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
		this.isShaking = false;
		this.shakeStartTime = null;
		this.shakeDuration = 0;
		this.shakeIntensity = 0;
		this.shakeReason = "";
		this.originalX = this.x;
		this.originalY = this.y;
		this.originalColor = this.color;
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

		ctx.font = fontSize + "px 'Trebuchet MS'";
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
		if (this.name == "displaySettings") {
			let settingsButtonIndex = buttonsArray.findIndex(element => element.name === "settingsButton");
			let totalMovementButtonsArray = buttonsArray.filter(element => element.group == "movementButtons");
			this.width = window.innerWidth / 4;
			this.height = (totalMovementButtonsArray.length * (miniButtonSize + buttonMargin)) + buttonMargin;
			if (buttonsArray[settingsButtonIndex].toggle == false) {
				if (this.x > -this.width * 1.2) {
					// Ensure we don't overshoot the target
					this.x = Math.max(this.x - 5, -this.width * 1.2);
					//console.log(this.x, -this.width * 1.2);
				}
			} else {
				if (this.x < buttonMargin) {
					// Ensure we don't overshoot the target
					this.x = Math.min(this.x + 5, buttonMargin);
					//console.log(this.x, buttonMargin);
				}
			}	
			this.y = window.innerHeight - this.height - window.innerHeight / 20 - (slotMargin * 2);
		}
		if (this.group == "movementButtons") {
			let displaySettingsIndex = buttonsArray.findIndex(element => element.name == "displaySettings");
			let referenceX = buttonsArray[displaySettingsIndex].x;
			let referenceY = buttonsArray[displaySettingsIndex].y;

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

			ctx.font = fontSize + "px 'Trebuchet MS'";
			ctx.fillStyle = "black";
			ctx.fillText(
				this.text,
				this.x + miniButtonSize + buttonMargin,
				this.y + miniButtonSize / 2);
		}
		
		if (this.name == "displayInventory") {
			this.x = window.innerWidth / 64 + window.innerWidth / 8;
			this.y = (window.innerHeight / 64) + (window.innerHeight / 18) * 0;
			let row = 0;
			let column = 0;
			let slotsPerRow = 5;
			this.width = (slotsPerRow * lootSize) + ((slotsPerRow + 1) * slotMargin);
			this.height = (slotsPerRow * lootSize) + ((slotsPerRow + 1) * slotMargin);

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
					let distance = mouseClickX >= inventoryArray[i].x &&
						mouseClickX < lootSize + inventoryArray[i].x &&
						mouseClickY >= inventoryArray[i].y &&
						mouseClickY < lootSize + inventoryArray[i].y;
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
				ctx.font = (fontSize * 0.8) + "px 'Trebuchet MS'";
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
		if (this.name == "displayCrafting") {
			let slotsPerRow = 5;
			let referenceWidth = (slotsPerRow * lootSize) + ((slotsPerRow + 1) * slotMargin);
			this.x = (window.innerWidth / 64 + window.innerWidth / 8) + referenceWidth;
			this.y = (window.innerHeight / 64) + (window.innerHeight / 18) * 0;
			this.width = (slotsPerRow * lootSize) + ((slotsPerRow + 1) * slotMargin); //window.innerWidth / 3; 
			this.height = (slotsPerRow * lootSize) + ((slotsPerRow + 1) * slotMargin); //window.innerHeight / 2;

			const craftedItems = Array.from(toBeCraftedMap.values());

			for (let i = 0; i < craftedItems.length; i++) {
				let item = craftedItems[i];

				let displayCraftingIndex = buttonsArray.findIndex(element => element.name == "displayCrafting");
				let referenceX = buttonsArray[displayCraftingIndex].x;
				let referenceY = buttonsArray[displayCraftingIndex].y;
				let referenceWidth = buttonsArray[displayCraftingIndex].width;
				let referenceHeight = buttonsArray[displayCraftingIndex].height;

				let totalCraftSlotArray = buttonsArray.filter(element => element.group == "craftSlot").length;
				const xDistance = referenceX + (referenceWidth - lootSize * totalCraftSlotArray) / 2 + (lootSize + slotMargin) * (item.index - 1) - slotMargin;
				const yDistance = referenceY + ((referenceHeight - lootSize) / 2);

				item.x = xDistance;
				item.y = yDistance;

				ctx.beginPath();
				ctx.roundRect(
					item.x,
					item.y,
					lootSize,
					lootSize,
					radiiSize);

				ctx.strokeStyle = item.borderColor;
				ctx.lineWidth = lineThickness;
				ctx.stroke();
				ctx.font = (fontSize * 0.8) + "px Trebuchet MS";
				ctx.fillStyle = "black";

				ctx.drawImage(
					item.image,
					item.x,
					item.y,
					lootSize,
					lootSize);

				ctx.fillText(
					item.amount + "x" + item.text + " " + item.level,
					item.x,
					item.y - (slotMargin / 4))

				ctx.closePath();
			}
		
		}
		if (this.group == "craftSlot") {
			let displayCraftingIndex = buttonsArray.findIndex(element => element.name == "displayCrafting");
			let referenceX = buttonsArray[displayCraftingIndex].x;
			let referenceY = buttonsArray[displayCraftingIndex].y;
			let referenceWidth = buttonsArray[displayCraftingIndex].width;
			let referenceHeight = buttonsArray[displayCraftingIndex].height;

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

				const page = toBeCraftedMap.get("page");
				const essence = toBeCraftedMap.get("essence");

				if (page && essence) {
					if (page.amount >= page.pagesToCraft &&
						essence.name === page.essenceName &&
						essence.amount >= page.essenceToCraft) {
						this.color = "green";
					}
				}
			}

			ctx.font = (fontSize * 0.8) + "px Trebuchet MS";
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
			ctx.font = (fontSize * 0.8) + "px Trebuchet MS";
			ctx.fillStyle = "black";
			ctx.fillText(
				this.text,
				this.x,
				this.y - (slotMargin / 2));
		}
        ctx.closePath();
	}
	
	clickButton() {
		//console.log("i work");
		if (leftClick &&
			mouseClickX >= this.x &&
			mouseClickX <= this.x + this.width &&
			mouseClickY >= this.y &&
			mouseClickY <= this.y + this.height
		) {
			//console.log("buttonCheck", mouseClickX, mouseClickY);
			//TODO: update the delete function to also work with other buttons
			function deleteElement(elementArray,...buttonNames) {
				const buttonsToDelete = new Set(buttonNames);
				for (let i = elementArray.length - 1; i >= 0; i--) {
					if (buttonsToDelete.has(elementArray[i].name)) {
						elementArray.splice(i, 1);
					}
				}
			}
			function deleteLoot() {

			}
			// TODO: Add a function that makes you be able to add animation to the buttons with less code used
			if (this.name == "settingsButton" && !this.toggle) {
				this.toggle = true;
				// settings buttons
				addButton(buttonLibrary.displaySettings, null);
				addButton(buttonLibrary.keyMovementButton, 0);
				addButton(buttonLibrary.mouseMovementButton, 1);
				addButton(buttonLibrary.followMouseMovementButton, 2);
			} else if (this.name == "settingsButton" && this.toggle) {
				this.toggle = false;
				deleteElement(buttonsArray, "displaySettings", "keyMovementButton", "mouseMovementButton", "followMouseMovementButton");
			}
			if (this.name == "inventoryButton" && !this.toggle) {
				this.toggle = true;
				addButton(buttonLibrary.craftButton, null);
				addButton(buttonLibrary.displayInventory, null);
				//console.log(inventoryArray); 
			} else if (this.name == "inventoryButton" && this.toggle) {
				this.toggle = false;
				deleteElement(buttonsArray, "displayInventory", "craftButton");

				let displayCraftingButtonIndex = buttonsArray.findIndex(element => element.name === "displayCrafting");
				if (displayCraftingButtonIndex !== -1) {
					// removing the page slot properly
					let page = toBeCraftedMap.get("page");
					if (page) {
						let pageSlotIndex = buttonsArray.findIndex(element => element.name == "pageSlot");

						page.index = null;
						page.location = null;
						buttonsArray[pageSlotIndex].slotActive = false;

						inventoryArray.push(page);
						toBeCraftedMap.delete("page");
					}
					// removing the essence slot properly
					let essence = toBeCraftedMap.get("essence");
					if (essence) {
						let essenceSlotIndex = buttonsArray.findIndex(element => element.name == "essenceSlot");

						essence.index = null;
						essence.location = null;
						buttonsArray[essenceSlotIndex].slotActive = false;

						inventoryArray.push(essence);
						toBeCraftedMap.delete("essence");
					}
					// removing the craftedItemSlot properly
					let spellBook = toBeCraftedMap.get("spellBook");
					if (spellBook) {
						let craftedItemSlotIndex = buttonsArray.findIndex(element => element.name == "craftedItemSlot");

						spellBook.index = null;
						spellBook.location = null;
						buttonsArray[craftedItemSlotIndex].slotActive = false;

						inventoryArray.push(spellBook);
						toBeCraftedMap.delete("spellBook");
					}
					buttonsArray.splice(displayCraftingButtonIndex, 1);
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
				addButton(buttonLibrary.displayCrafting, null);

				addButton(buttonLibrary.pageSlot, 1);
				addButton(buttonLibrary.essenceSlot, 2);
				addButton(buttonLibrary.activateCraft, 3);
				addButton(buttonLibrary.craftedItemSlot, 4);

				let arrayTransfer = [];
				let displayInventoryButtonIndex = buttonsArray.findIndex(element => element.name === "displayInventory");
				arrayTransfer.push(buttonsArray[displayInventoryButtonIndex]);
				buttonsArray.splice(displayInventoryButtonIndex, 1);
				buttonsArray.push(arrayTransfer[0]);
				arrayTransfer.splice(0, arrayTransfer.length);

			} else if (this.name == "craftButton" && this.toggle) {
				this.toggle = false;

				let displayCraftingButtonIndex = buttonsArray.findIndex(element => element.name === "displayCrafting");
				if (displayCraftingButtonIndex !== -1) {
					// removing the page slot properly
					let page = toBeCraftedMap.get("page");
					if (page) {
						let pageSlotIndex = buttonsArray.findIndex(element => element.name == "pageSlot");

						page.index = null;
						page.location = null;
						buttonsArray[pageSlotIndex].slotActive = false;

						inventoryArray.push(page);
						toBeCraftedMap.delete("page");
					}
					// removing the essence slot properly
					let essence = toBeCraftedMap.get("essence");
					if (essence) {
						let essenceSlotIndex = buttonsArray.findIndex(element => element.name == "essenceSlot");

						essence.index = null;
						essence.location = null;
						buttonsArray[essenceSlotIndex].slotActive = false;

						inventoryArray.push(essence);
						toBeCraftedMap.delete("essence");
					}
					// removing the craftedItemSlot properly
					let spellBook = toBeCraftedMap.get("spellBook");
					if (spellBook) {
						let craftedItemSlotIndex = buttonsArray.findIndex(element => element.name == "craftedItemSlot");

						spellBook.index = null;
						spellBook.location = null;
						buttonsArray[craftedItemSlotIndex].slotActive = false;

						inventoryArray.push(spellBook);
						toBeCraftedMap.delete("spellBook");
					}
					buttonsArray.splice(displayCraftingButtonIndex, 1);
				}
				let totalCraftSlotArray = buttonsArray.filter(element => element.group == "craftSlot");
				for (let i = 0; i < totalCraftSlotArray.length; i++) {
					let craftSlotIndex = buttonsArray.findIndex(element => element.group === "craftSlot");
					if (craftSlotIndex !== -1) {
						buttonsArray.splice(craftSlotIndex, 1);
					}
				}
			}
			
		}
		if (!leftClick &&
			mouseX >= this.x &&
			mouseX <= this.x + this.width &&
			mouseY >= this.y &&
			mouseY <= this.y + this.height
		) {
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

					toBeCraftedMap.set("page", mouseHeldItem[0]);
					mouseHeldItem[0].held = false;
					this.slotActive = true;

					let lootIndex = inventoryArray.findIndex(element => element.index == mouseHeldItem[0].index && element.location == mouseHeldItem[0].location);
					inventoryArray.splice(lootIndex, 1);
					mouseHeldItem.splice(0, 1);
				} else if (mouseHeldItem.length == 0 && this.slotActive) {
					let page = toBeCraftedMap.get("page");
					page.index = null;
					page.location = null;
					this.slotActive = false;

					inventoryArray.push(page);
					toBeCraftedMap.delete("page");
				}
			}
			if (this.name == "essenceSlot") {
				if (mouseHeldItem.length > 0 && mouseHeldItem[0].form == "essence" && mouseHeldItem[0].amount >= 1 && !this.slotActive) {
					mouseHeldItem[0].index = this.index;
					mouseHeldItem[0].location = this.name;

					toBeCraftedMap.set("essence", mouseHeldItem[0]);
					mouseHeldItem[0].held = false;
					this.slotActive = true;

					let lootIndex = inventoryArray.findIndex(element => element.index == mouseHeldItem[0].index && element.location == mouseHeldItem[0].location);
					inventoryArray.splice(lootIndex, 1);
					mouseHeldItem.splice(0, 1);
				} else if (mouseHeldItem.length == 0 && this.slotActive) {

					let essence = toBeCraftedMap.get("essence");
					essence.index = null;
					essence.location = null;
					this.slotActive = false;
					inventoryArray.push(essence);
					toBeCraftedMap.delete("essence");
				}
			}
			if (this.name == "activateCraft") {
				let page = toBeCraftedMap.get("page");
				let essence = toBeCraftedMap.get("essence");
				if (page && essence) {
					if (page.amount >= page.pagesToCraft &&
						essence.name == page.essenceName &&
						essence.amount >= page.essenceToCraft) {

						page.amount -= page.pagesToCraft;
						essence.amount -= page.essenceToCraft;

						let craftedItemSlotIndex = buttonsArray.findIndex(element => element.name == "craftedItemSlot");

						// checks if there's an item at the craftedItemSlot
						if (buttonsArray[craftedItemSlotIndex].slotActive) {
							let spellBook = toBeCraftedMap.get("spellBook");

							spellBook.index = null;
							spellBook.location = null;

							inventoryArray.push(spellBook);
							toBeCraftedMap.delete("spellBook");

							buttonsArray[craftedItemSlotIndex].slotActive = false;
						}
						// crafts a spell book
						let spellBook = page.spellBookName;
						let craftedSpellBook = new SpellBook(0, 0, null, 0, 0, 0, "black", spellBook.appearance, spellBook.name, generateID(), spellBook.spell, spellBook.spellCore, spellBook.cooldown, spellBook.text);

						// places the spell book inside the crafted item slot 
						craftedSpellBook.index = buttonsArray[craftedItemSlotIndex].index;
						craftedSpellBook.location = buttonsArray[craftedItemSlotIndex].name;
						toBeCraftedMap.set("spellBook", craftedSpellBook);
						buttonsArray[craftedItemSlotIndex].slotActive = true;

						if (page.amount == 0) {
							toBeCraftedMap.delete("page");
						}
						if (essence.amount == 0) {
							toBeCraftedMap.delete("essence");
						}

					}
				}
			}
			if (this.name == "craftedItemSlot") {
				if (mouseHeldItem.length == 0 && this.slotActive) {

					let spellBook = toBeCraftedMap.get("spellBook");

					spellBook.index = null;
					spellBook.location = null;
					this.slotActive = false;

					inventoryArray.push(spellBook);
					toBeCraftedMap.delete("spellBook");
				}
			}
		}
	}
	// method called inside spellBook.js whenever there is sufficient mana
	startShaking(reason, duration, intensity) {
		this.isShaking = true;
		this.shakeStartTime = performance.now();
		this.shakeDuration = duration;
		this.shakeIntensity = intensity;
		this.shakeReason = reason;
		this.originalX = this.x;
		this.originalY = this.y;
		if (reason == "insufficientMana") {
			this.color = "red";
			this.originalColor = buttonLibrary.manaBar.color;
		}
	}

	updateShake(currentTime) {	
		const elapsed = currentTime - this.shakeStartTime;
		if (elapsed < this.shakeDuration) {
			this.x = this.originalX + (Math.random() - 0.5) * this.shakeIntensity;
			this.y = this.originalY + (Math.random() - 0.5) * this.shakeIntensity;
		} else {
			this.x = this.originalX;
			this.y = this.originalY;
			this.color = this.originalColor;
			this.isShaking = false;
			this.shakeStartTime = null;
		}
	}
}
