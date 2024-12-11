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
		//window.innerWidth / 128

		if (this.classification != "slot") {
			ctx.fillStyle = this.color;
			ctx.fill();
		}

		ctx.strokeStyle = "black";
		ctx.lineWidth = window.innerHeight / 500;
		ctx.stroke();

		ctx.font = window.innerHeight / 40 + "px ubuntu";
		ctx.fillStyle = "black";

		if (this.name == "levelBarButton") {
			this.x = window.innerWidth / 128;
			this.y = (window.innerHeight / 64) + (window.innerHeight / 18) * 0;
			this.width = window.innerWidth / 8;
			this.height = window.innerHeight / 20;
			this.text = "level: " + myGameCharacter.level;
			ctx.fillText(this.text, this.x + 5, this.y + (this.height / 1.5));
		}
		if (this.name == "experienceBarButton") {
			this.x = window.innerWidth / 128;
			this.y = (window.innerHeight / 64) + (window.innerHeight / 18) * 1;
			this.width = window.innerWidth / 8;
			this.height = window.innerHeight / 20;
			this.text = "experience: " + myGameCharacter.experience + "/" + maxExperience;
			ctx.fillText(this.text, this.x + 5, this.y + (this.height / 1.5));
		}
		if (this.name == "healthBarButton") {
			this.x = window.innerWidth / 128;
			this.y = (window.innerHeight / 64) + (window.innerHeight / 18) * 2;
			this.width = window.innerWidth / 8;
			this.height = window.innerHeight / 20;
			let roundedHealth = Math.floor(myGameCharacter.health);
			this.text = "health: " + roundedHealth + "/" + myGameCharacter.maxHealth;
			ctx.fillText(this.text, this.x + 5, this.y + (this.height / 1.5));
		}
		if (this.name == "manaBarButton") {
			this.x = window.innerWidth / 128;
			this.y = (window.innerHeight / 64) + (window.innerHeight / 18) * 3;
			this.width = window.innerWidth / 8;
			this.height = window.innerHeight / 20;
			let roundedMana = Math.floor(myGameCharacter.mana);
			this.text = "mana: " + roundedMana + "/" + myGameCharacter.maxMana;
			ctx.fillText(this.text, this.x + 5, this.y + (this.height / 1.5));
		}
		if (this.name == "inventoryButton") {
			this.x = window.innerWidth / 128;
			this.y = (window.innerHeight / 64) + (window.innerHeight / 18) * 4;
			this.width = window.innerWidth / 12;
			this.height = window.innerHeight / 20;
			this.text = "inventory";
			ctx.fillText(this.text, this.x + 5, this.y + (this.height / 1.5));
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

				if (isMouseDown && mouseHeldItem.length <= 1) {
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
				} else if (!isMouseDown && inventoryArray[i].held && mouseHeldItem.length >= 1) {
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
				ctx.lineWidth = window.innerHeight / 500;
				ctx.stroke();
				ctx.font = window.innerHeight / 75 + "px ubuntu";
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
		if (this.name == "craftButton") {
			this.x = window.innerWidth / 128;
			this.y = (window.innerHeight / 64) + (window.innerHeight / 18) * 5;
			this.width = window.innerWidth / 12;
			this.height = window.innerHeight / 20;
			/*
			this.x = window.innerWidth / 128;
			this.y = (window.innerHeight / 64) + (window.innerHeight / 18) * 4;
			
			*/
			this.text = "craft";
			ctx.fillText(this.text, this.x + 5, this.y + (this.height / 1.5));
		}
		if (this.name == "showCrafting") {
			let slotsPerRow = 5;
			let referenceWidth = (slotsPerRow * lootSize) + ((slotsPerRow + 1) * slotMargin);;
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
				ctx.lineWidth = window.innerHeight / 500;
				ctx.stroke();
				ctx.font = window.innerHeight / 75 + "px ubuntu";
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
//			const xDistance = (referenceX + ((referenceWidth - (slotSize * totalCraftSlotArray)) / 2) + ((slotSize + slotMargin) * (this.index - 1))) - slotMargin;
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

			ctx.font = window.innerHeight / 64 + "px ubuntu";
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
			ctx.font = window.innerHeight / 64 + "px ubuntu";
			ctx.fillStyle = "black";
			ctx.fillText(
				this.text,
				this.x,
				this.y - (slotMargin / 2));
		}
        ctx.closePath();
	}
	update() {

	}
	
	clickButton(xmouse, ymouse) {
		const distance = Math.sqrt(xmouse >= this.x && xmouse < this.width + this.x && ymouse >= this.y && ymouse < this.height + this.y);
		if (distance) {
			//console.log(this.name + " was clicked");
			if (this.name == "inventoryButton" && !this.toggle) {
				this.toggle = true;
				addButton(new Button(0, 0, 0, 0, 0, "#3477eb", "craftButton", null, "clickable", "bug 101", null));
				addButton(new Button(0, 0, 0, 0, 0, "#e3a04d", "showInventory", null, "stable", "bug 101", null));
				//console.log(inventoryArray);
			} else if (this.name == "inventoryButton" && this.toggle) {
				this.toggle = false;
				let showInventoryButtonIndex = buttonsArray.findIndex(element => element.name === "showInventory");
				if (showInventoryButtonIndex !== -1) {
					buttonsArray.splice(showInventoryButtonIndex, 1);
				}
				let craftButtonIndex = buttonsArray.findIndex(element => element.name === "craftButton");
				if (craftButtonIndex !== -1) {
					buttonsArray.splice(craftButtonIndex, 1);
				}
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
				addButton(new Button(0, 0, 0, 0, 0, "#3477eb", "showCrafting", null, "stable", "bug 101", null));

				addButton(new Button(0, 0, 0, 0, 0, "black", "pageSlot", "craftSlot", "slot", "insert 5 pages", 1));
				addButton(new Button(0, 0, 0, 0, 0, "black", "essenceSlot", "craftSlot", "slot", "insert 15 essence", 2));
				addButton(new Button(0, 0, 0, 0, 0, "gray", "activateCraft", "craftSlot", "clickable", "craft", 3));
				addButton(new Button(0, 0, 0, 0, 0, "black", "craftedItemSlot", "craftSlot", "slot", "crafted item:", 4));

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
