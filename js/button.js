class Button {
    constructor(x, y, width, height, radii, color, name, text, index) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
		this.radii = radii;
		this.color = color;
		this.name = name;
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

		if (this.name != "spellBookSlots") {
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
			let roundedHealth = Math.round(myGameCharacter.health);
			this.text = "health: " + roundedHealth + "/" + myGameCharacter.maxHealth;
			ctx.fillText(this.text, this.x + 5, this.y + (this.height / 1.5));
		}
		if (this.name == "manaBarButton") {
			this.x = window.innerWidth / 128;
			this.y = (window.innerHeight / 64) + (window.innerHeight / 18) * 3;
			this.width = window.innerWidth / 8;
			this.height = window.innerHeight / 20;
			let roundedMana = Math.round(myGameCharacter.mana);
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
		if (this.name == "spellBookSlots") {
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
				addButton(new Button(0, 0, 0, 0, 0, "#e3a04d", "showInventory", "bug 101"));
				//console.log(inventoryArray);
			} else if (this.name == "inventoryButton" && this.toggle) {
				this.toggle = false;
				let showInventoryButtonIndex = buttonsArray.findIndex(element => element.name === "showInventory");
				if (showInventoryButtonIndex !== -1) {
					buttonsArray.splice(showInventoryButtonIndex, 1);
				}
			}
			if (this.name == "spellBookSlots") {
				if (mouseHeldItem.length > 0 && mouseHeldItem[0].codeClass == "spellBook" && !this.slotActive) {
					if (mouseHeldItem[0].from == "inventory") {
						mouseHeldItem[0].index = this.index;
						spellBooksArray.push(mouseHeldItem[0]);
						mouseHeldItem[0].held = false;
						this.slotActive = true;

						let heldItemIndex = inventoryArray.findIndex(element => element.name == mouseHeldItem[0].name && element.uniqueID == mouseHeldItem[0].uniqueID);
						inventoryArray.splice(heldItemIndex, 1);
						mouseHeldItem.splice(0, 1);
					}
					else if (mouseHeldItem[0].from == "spellBookSlot") {
						mouseHeldItem[0].index = this.index;
						spellBooksArray.push(mouseHeldItem[0]);
						mouseHeldItem[0].held = false;
						this.slotActive = true;

						let heldItemIndex = spellBooksArray.findIndex(element => element.name == mouseHeldItem[0].name && element.uniqueID == mouseHeldItem[0].uniqueID);
						spellBooksArray.splice(heldItemIndex, 1);
						mouseHeldItem.splice(0, 1);
					}
				}
			}
		}
	}
}
