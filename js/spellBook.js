class SpellBook {
	constructor(x, y, index, width, height, radii, borderColor, appearance, name, uniqueID, spell, spellCore, cooldown, text) {
		this.image = new Image();
		this.image.src = appearance;
		this.x = x;
		this.y = y;
		this.index = index;
		this.width = width;
		this.height = height;
		this.radii = radii;
		this.borderColor = borderColor;
		this.appearance = appearance;
		this.name = name;
		this.spell = spell;
		this.spellCore = spellCore;
		this.cooldown = cooldown;
		this.text = text;
		this.cooldownTimer = 0;
		this.level = 1;
		this.maxPages = 3;
		this.spawned = false;
		this.spellReady = true;
		this.spellActive = false;
		this.onSlot = false;
		this.amount = 1;
		this.stackLimit = 1;
		this.held = false;
		this.codeClass = "spellBook";
		this.from = "nowhere";
		this.location = null;
		this.uniqueID = uniqueID;
	}

	draw(ctx) {
		const xDistance = window.innerWidth / 2 - (((slotSize + slotMargin) * myGameCharacter.spellBookSlotsUnlocked) / 2) + (slotSize + slotMargin) * (this.index - 1);
		const yDistance = window.innerHeight - slotMargin - slotSize;
		this.x = xDistance;
		this.y = yDistance;
		ctx.beginPath();

		if (leftClick && mouseHeldItem.length <= 1) {
			let distance = mouseClickX >= this.x &&
				mouseClickX < slotSize + this.x &&
				mouseClickY >= this.y &&
				mouseClickY < slotSize + this.y
			if (distance && mouseHeldItem.length < 1) {
				this.held = true;
				mouseHeldItem.push(this);
				let slotIndex = buttonsArray.findIndex(element => element.group === "spellBookSlot" && element.index == this.index);
				buttonsArray[slotIndex].slotActive = false;
			}
			if (this.held) {
				console.log(this.from);
				// centers the spell book into the cursor
				this.from = "spellBookSlot";
				this.x = mouseX - (slotSize / 2);
				this.y = mouseY - (slotSize / 2);
			}
			// if not held
		} else if (!leftClick && this.held && mouseHeldItem.length >= 1) {
			this.held = false;
			this.index = null;
			this.onSlot = false;
			this.spawned = false;
			inventoryArray.push(this);
			mouseHeldItem.splice(0, mouseHeldItem.length);
			console.log("i was called");

			let spellCoreIndex = spellsArray.findIndex(element => element.name == this.spellCore.name && element.spellBookID == this.uniqueID);
			spellsArray.splice(spellCoreIndex, 1);

			let spellBookIndex = spellBooksArray.findIndex(element => element.name == this.name && element.uniqueID == this.uniqueID);
			spellBooksArray.splice(spellBookIndex, 1);
		}
		ctx.roundRect(
			this.x,
			this.y,
			slotSize,
			slotSize,
			radiiSize);

		ctx.strokeStyle = this.borderColor;
		ctx.lineWidth = lineThickness;
		ctx.stroke();

		ctx.font = fontSize + "px ubuntu";
		ctx.fillStyle = "black";

		ctx.drawImage(
			this.image,
			this.x,
			this.y,
			slotSize,
			slotSize);
		/*
		ctx.fillText(
			this.text + " " + this.level,
			this.x,
			this.y - slotMargin)
		*/
		ctx.closePath();
	}
	activate() {
		castSpell(new Spell(
			myGameCharacter.x,
			myGameCharacter.y,
			this.spellCore.radius,
			this.spellCore.FOVRadius,
			this.spellCore.name,
			this.uniqueID,
			myGameCharacter,
			myGameCharacter.side,
			null,
			this.spellCore.art,
			this.spellCore.shape,
			this.spellCore.appearance,
			this.spellCore.castAmount,
			this.spellCore.maxAmount,
			this.spellCore.ignoreSpellCollision,
			this.spellCore.ignoreMobCollision,
			this.spellCore.index,
			this.spellCore.health,
			this.spellCore.defense,
			this.spellCore.damage,
			this.spellCore.speed,
			this.spellCore.ability,
			this.spellCore.manaCost,
			this.spellCore.summonCost,
			this.spellCore.respawnTime));
		this.spawned = true;	
	}
	interact() {
		let spellCoreIndex = spellsArray.findIndex(element => element.name == this.spellCore.name);

		if (this.spell.ability === "shoot1") {
			let spellBookCastAmount = this.spell.castAmount + (this.level - 1);
			let spellCount = 0; // Keep track of how many spells have been cast
			const interval = setInterval(() => {
				if (spellCount < spellBookCastAmount) {
					// Cast a spell
					
					castSpell(new Spell(
						spellsArray[spellCoreIndex].x,
						spellsArray[spellCoreIndex].y,
						this.spell.radius,
						this.spell.FOVRadius,
						this.spell.name,
						this.uniqueID,
						myGameCharacter,
						myGameCharacter.side,
						null,
						this.spell.art,
						this.spell.shape,
						this.spell.appearance,
						this.spell.castAmount,
						this.spell.maxAmount,
						this.spell.ignoreSpellCollision,
						this.spell.ignoreMobCollision,
						this.spell.index,
						this.spell.health,
						this.spell.defense,
						this.spell.damage,
						this.spell.speed,
						this.spell.ability,
						this.spell.manaCost,
						this.spell.summonCost,
						this.spell.respawnTime));
					spellCount++;
				} else {
					// Stop the interval once the desired amount of spells is cast
					clearInterval(interval);
				}
			}, 50);
		}
		if (this.spell.ability === "shoot2") {
			let spellBookCastAmount = this.spell.castAmount + (this.level - 1);
			this.spell.maxAmount = spellBookCastAmount;
			let spellCount = 0; // Keep track of how many spells have been cast
			const interval = setInterval(() => {
				if (spellCount < spellBookCastAmount) {
					// Cast a spell
					this.spell.index += 1;
					castSpell(new Spell(
						myGameCharacter.x,
						myGameCharacter.y,
						this.spell.radius,
						this.spell.FOVRadius,
						this.spell.name,
						this.uniqueID,
						myGameCharacter,
						myGameCharacter.side,
						null,
						this.spell.art,
						this.spell.shape,
						this.spell.appearance,
						this.spell.castAmount,
						this.spell.maxAmount,
						this.spell.ignoreSpellCollision,
						this.spell.ignoreMobCollision,
						this.spell.index,
						this.spell.health,
						this.spell.defense,
						this.spell.damage,
						this.spell.speed,
						this.spell.ability,
						this.spell.manaCost,
						this.spell.summonCost,
						this.spell.respawnTime));
					spellCount++;
				} else {
					// Stop the interval once the desired amount of spells is cast
					clearInterval(interval);
				}
			}, 50);
		}
		if (this.spell.ability === "shoot3") {
			let spellBookCastAmount = this.spell.castAmount + (this.level - 1);
			this.spell.maxAmount = spellBookCastAmount;
			let spellCount = 0; // Keep track of how many spells have been cast
			const interval = setInterval(() => {
				if (spellCount < spellBookCastAmount) {
					// Cast a spell
					this.spell.index += 1;
					castSpell(new Spell(
						myGameCharacter.x,
						myGameCharacter.y,
						this.spell.radius,
						this.spell.FOVRadius,
						this.spell.name,
						this.uniqueID,
						myGameCharacter,
						myGameCharacter.side,
						null,
						this.spell.art,
						this.spell.shape,
						this.spell.appearance,
						this.spell.castAmount,
						this.spell.maxAmount,
						this.spell.ignoreSpellCollision,
						this.spell.ignoreMobCollision,
						this.spell.index,
						this.spell.health,
						this.spell.defense,
						this.spell.damage,
						this.spell.speed,
						this.spell.ability,
						this.spell.manaCost,
						this.spell.summonCost,
						this.spell.respawnTime));
					spellCount++;
				} else {
					// Stop the interval once the desired amount of spells is cast
					clearInterval(interval);
				}
			}, 50);
		}
		if ((this.spell.art === "summoning") &&
			(myGameCharacter.summonLimit >= myGameCharacter.summonSpace + this.spell.castAmount * this.spell.summonCost)) {
			//let spellBookCastAmount = this.spell.castAmount + (this.level - 1);
			let spellBookCastAmount = this.spell.castAmount;
			let spellCount = 0; // Keep track of how many spells have been cast
			const interval = setInterval(() => {
				if (spellCount < spellBookCastAmount) {
					// Cast a spell
					this.spell.index += 1;
					let setX = null;
					let setY = null;
					if (this.spell.ability != "summon2") {
						setX = spellsArray[spellCoreIndex].x;
						setY = spellsArray[spellCoreIndex].y;
					} else if (this.spell.ability == "summon2") {
						setX = myGameCharacter.x;
						setY = myGameCharacter.y;
					}
					castSpell(new Spell(
						setX,
						setY,
						this.spell.radius + (this.level - 1),
						this.spell.FOVRadius,
						this.spell.name,
						this.uniqueID,
						myGameCharacter,
						myGameCharacter.side,
						null,
						this.spell.art,
						this.spell.shape,
						this.spell.appearance,
						this.spell.castAmount,
						this.spell.maxAmount,
						this.spell.ignoreSpellCollision,
						this.spell.ignoreMobCollision,
						this.spell.index,
						this.spell.health + (this.level - 1),
						this.spell.defense,
						this.spell.damage + (this.level - 1),
						this.spell.speed + ((this.level - 1) * 0.25),
						this.spell.ability,
						this.spell.manaCost,
						this.spell.summonCost,
						this.spell.respawnTime));
					spellCount++;
					myGameCharacter.summonSpace += 1 * this.spell.summonCost;
				} else {
					// Stop the interval once the desired amount of spells is cast
					clearInterval(interval);
				}
			}, 50);
		}
		if (this.spell.ability === "teleport") {
			//castMouseX = worldX - biome1.x;
			//castMouseY = worldY - biome1.y;
			let spellCount = 0; // Keep track of how many spells have been cast
			const interval = setInterval(() => {
				if (spellCount < this.spell.castAmount) {
					// Cast a spell
					castSpell(new Spell(
						spellsArray[spellCoreIndex].x,
						spellsArray[spellCoreIndex].y,
						this.spell.radius,
						this.spell.FOVRadius,
						this.spell.name,
						this.uniqueID,
						myGameCharacter,
						myGameCharacter.side,
						null,
						this.spell.art,
						this.spell.shape,
						this.spell.appearance,
						this.spell.castAmount,
						this.spell.maxAmount,
						this.spell.ignoreSpellCollision,
						this.spell.ignoreMobCollision,
						this.spell.index,
						this.spell.health,
						this.spell.defense,
						this.spell.damage,
						this.spell.speed,
						this.spell.ability,
						this.spell.manaCost,
						this.spell.summonCost,
						this.spell.respawnTime));
					spellCount++;
				} else {
					// Stop the interval once the desired amount of spells is cast
					clearInterval(interval);
				}
			}, 50);
		}
		if (this.spell.ability === "AoE1") {
			let spellCount = 0; // Keep track of how many spells have been cast
			const interval = setInterval(() => {
				if (spellCount < this.spell.castAmount) {
					// Cast a spell
					castSpell(new Spell(
						myGameCharacter.x,
						myGameCharacter.y,
						this.spell.radius + (spellCount * 15),
						this.spell.FOVRadius,
						this.spell.name,
						this.uniqueID,
						myGameCharacter,
						myGameCharacter.side,
						null,
						this.spell.art,
						this.spell.shape,
						this.spell.appearance,
						this.spell.castAmount,
						this.spell.maxAmount,
						this.spell.ignoreSpellCollision,
						this.spell.ignoreMobCollision,
						this.spell.index,
						this.spell.health,
						this.spell.defense,
						this.spell.damage,
						this.spell.speed,
						this.spell.ability,
						this.spell.manaCost,
						this.spell.summonCost,
						this.spell.respawnTime));
					spellCount++;
				} else {
					// Stop the interval once the desired amount of spells is cast
					clearInterval(interval);
				}
			}, 15);
		}
		if (this.spell.ability === "beam1") {
			let spellCount = 0; // Keep track of how many spells have been cast
			const interval = setInterval(() => {
				if (spellCount < this.spell.castAmount) {
					// Cast a spell
					castSpell(new Spell(
						spellsArray[spellCoreIndex].x,
						spellsArray[spellCoreIndex].y,
						this.spell.radius,
						this.spell.FOVRadius,
						this.spell.name,
						this.uniqueID,
						myGameCharacter,
						myGameCharacter.side,
						null,
						this.spell.art,
						this.spell.shape,
						this.spell.appearance,
						this.spell.castAmount,
						this.spell.maxAmount,
						this.spell.ignoreSpellCollision,
						this.spell.ignoreMobCollision,
						this.spell.index,
						this.spell.health,
						this.spell.defense,
						this.spell.damage,
						this.spell.speed,
						this.spell.ability,
						this.spell.manaCost,
						this.spell.summonCost,
						this.spell.respawnTime));
					spellCount++;
				} else {
					// Stop the interval once the desired amount of spells is cast
					clearInterval(interval);
				}
			}, 15);
		}
		if (this.spell.ability === "beam2") {
			castMouseX = worldX - biome1.x;
			castMouseY = worldY - biome1.y;

			let spellCount = 0; // Keep track of how many spells have been cast
			const interval = setInterval(() => {
				if (spellCount < this.spell.castAmount) {
					// Cast a spell
					castSpell(new Spell(
						spellsArray[spellCoreIndex].x,
						spellsArray[spellCoreIndex].y,
						this.spell.radius,
						this.spell.FOVRadius,
						this.spell.name,
						this.uniqueID,
						myGameCharacter,
						myGameCharacter.side,
						null,
						this.spell.art,
						this.spell.shape,
						this.spell.appearance,
						this.spell.castAmount,
						this.spell.maxAmount,
						this.spell.ignoreSpellCollision,
						this.spell.ignoreMobCollision,
						this.spell.index,
						this.spell.health,
						this.spell.defense,
						this.spell.damage,
						this.spell.speed,
						this.spell.ability,
						this.spell.manaCost,
						this.spell.summonCost,
						this.spell.respawnTime));
					spellCount++;
				} else {
					// Stop the interval once the desired amount of spells is cast
					clearInterval(interval);
				}
			}, 300);
		}
	}

	update() {
		// level up spell Book
		let totalSpellPageCount = inventoryArray.filter(element => element.name == this.spell.name).length;
		if (totalSpellPageCount >= this.maxPages) {
			let spellPageIndex = inventoryArray.findIndex(element => element.name == this.spell.name);
			if (spellPageIndex !== -1) {
				inventoryArray.splice(spellPageIndex, this.maxPages);
			}
			this.maxPages += 3;
			this.level++;
		}
		// Handle spell input (1–9)
		const digitKey = `Digit${this.index}`;
		const keyPressed = keys[digitKey];

		 if (
			this.index >= 1 && this.index <= 9 &&
			this.spellReady &&
			 keyPressed &&
			 keyPressedOnce[digitKey] &&
			myGameCharacter.mana - manaBuildUp >= this.spell.manaCost
		 ) {
			keyPressedOnce[digitKey] = false;
			if (!this.spellActive) {
				manaBuildUp += this.spell.manaCost;
			}
			this.spellActive = true;
			this.borderColor = "green";
		} else if (leftClick && this.spellActive) {
			manaBuildUp -= this.spell.manaCost;
			myGameCharacter.mana -= this.spell.manaCost;
			this.borderColor = "black";
			this.interact();
			this.spellActive = false;
			this.spellReady = false;
		} else if (
			this.index >= 1 && this.index <= 9 &&
			this.spellReady &&
			keyPressed &&
			keyPressedOnce[digitKey] &&
			!(myGameCharacter.mana - manaBuildUp >= this.spell.manaCost)) {

			keyPressedOnce[digitKey] = false;
			let manaBarIndex = buttonsArray.findIndex(button => button.name == "manaBarButton");
			 buttonsArray[manaBarIndex].startShaking("insufficientMana", 300, 5);
		}

		if (!this.spellReady) {
			this.cooldownTimer++;
			this.borderColor = "red";
			if (this.cooldownTimer >= this.cooldown) {
				this.borderColor = "black";
				this.spellReady = true;  // Skill becomes ready again
				this.cooldownTimer = 0;  // Reset the cooldown timer
			}
		}
		this.draw(ctx);
		if (this.spawned == false && this.onSlot == true) {
			// activate only if the spell is on a slot.
			this.activate();
		}

		else {
		}

	}

	clickButton() {
			/*
			if (this.index === 1) {
				keys.Digit1 = true;
			}
			if (this.index === 2) {
				keys.Digit2 = true;
			}
			if (this.index === 3) {
				keys.Digit3 = true;
			}
			if (this.index === 4) {
				keys.Digit4 = true;
			}
			if (this.index === 5) {
				keys.Digit5 = true;
			}
			if (this.index === 6) {
				keys.Digit1 = true;
			}
			if (this.index === 7) {
				keys.Digit2 = true;
			}
			if (this.index === 8) {
				keys.Digit3 = true;
			}
			if (this.index === 9) {
				keys.Digit4 = true;
			}
			*/
			//console.log(this.name + " was clicked");
	}
}