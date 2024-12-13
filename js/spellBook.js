class SpellBook {
	constructor(x, y, index, width, height, radii, borderColor, appearance, name, uniqueID, spell, mainSpell, cooldown, text) {
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
		this.mainSpell = mainSpell;
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
			let distance = Math.sqrt(mouseX >= this.x && mouseX < slotSize + this.x && mouseY >= this.y && mouseY < slotSize + this.y);
			if (distance && mouseHeldItem.length < 1) {
				this.held = true;
				this.from = "spellBookSlot";
				mouseHeldItem.push(this);

				let slotIndex = buttonsArray.findIndex(element => element.group === "spellBookSlot" && element.index == this.index);
				buttonsArray[slotIndex].slotActive = false;
			}
			if (this.held) {
				this.x = mouseX - (slotSize / 2);
				this.y = mouseY - (slotSize / 2);
			}
		} else if (!leftClick && this.held && mouseHeldItem.length >= 1) {
			this.held = false;
			this.index = null;
			this.onSlot = false;
			this.spawned = false;
			inventoryArray.push(this);
			mouseHeldItem.splice(0, mouseHeldItem.length);

			let mainSpellIndex = spellsArray.findIndex(element => element.name == this.mainSpell.name && element.spellBookID == this.uniqueID);
			spellsArray.splice(mainSpellIndex, 1);

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
		ctx.lineWidth = window.innerHeight / 100;
		ctx.stroke();

		ctx.font = window.innerHeight / 64 + "px ubuntu";
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
			this.mainSpell.radius,
			this.mainSpell.name,
			this.uniqueID,
			myGameCharacter.name,
			myGameCharacter.side,
			this.mainSpell.art,
			this.mainSpell.shape,
			this.mainSpell.appearance,
			this.mainSpell.castAmount,
			this.mainSpell.maxAmount,
			this.mainSpell.ignoreSpellCollision,
			this.mainSpell.ignoreMobCollision,
			this.mainSpell.index,
			this.mainSpell.health,
			this.mainSpell.defense,
			this.mainSpell.damage,
			this.mainSpell.speed,
			this.mainSpell.ability,
			this.mainSpell.manaCost,
			this.mainSpell.summonCost,
			this.mainSpell.respawnTime));
		this.spawned = true;	
	}
	interact() {
		let mainSpellIndex = spellsArray.findIndex(element => element.name == this.mainSpell.name);

		if (this.spell.ability === "shoot1" && myGameCharacter.mana > this.spell.manaCost) {
			myGameCharacter.mana -= this.spell.manaCost;
			let spellBookCastAmount = this.spell.castAmount + (this.level - 1);
			let spellCount = 0; // Keep track of how many spells have been cast
			const interval = setInterval(() => {
				if (spellCount < spellBookCastAmount) {
					// Cast a spell
					
					castSpell(new Spell(
						spellsArray[mainSpellIndex].x,
						spellsArray[mainSpellIndex].y,
						this.spell.radius,
						this.spell.name,
						this.uniqueID,
						myGameCharacter.name,
						myGameCharacter.side,
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
		if (this.spell.ability === "shoot2" && myGameCharacter.mana > this.spell.manaCost) {
			myGameCharacter.mana -= this.spell.manaCost;
			console.log(this.spell.maxAmount);
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
						this.spell.name,
						this.uniqueID,
						myGameCharacter.name,
						myGameCharacter.side,
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
			(myGameCharacter.mana > this.spell.manaCost) &&
			(myGameCharacter.summonLimit >= myGameCharacter.summonSpace + this.spell.castAmount * this.spell.summonCost)) {
			myGameCharacter.mana -= this.spell.manaCost;
			//let spellBookCastAmount = this.spell.castAmount + (this.level - 1);
			let spellBookCastAmount = this.spell.castAmount;
			let spellCount = 0; // Keep track of how many spells have been cast
			const interval = setInterval(() => {
				if (spellCount < spellBookCastAmount) {
					// Cast a spell
					this.spell.index += 1;
					castSpell(new Spell(
						spellsArray[mainSpellIndex].x,
						spellsArray[mainSpellIndex].y,
						this.spell.radius + (this.level - 1),
						this.spell.name,
						this.uniqueID,
						myGameCharacter.name,
						myGameCharacter.side,
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
		if (this.spell.ability === "teleport" && myGameCharacter.mana > this.spell.manaCost) {
			myGameCharacter.mana -= this.spell.manaCost;
			//castMouseX = worldX - biome1.x;
			//castMouseY = worldY - biome1.y;
			let spellCount = 0; // Keep track of how many spells have been cast
			const interval = setInterval(() => {
				if (spellCount < this.spell.castAmount) {
					// Cast a spell
					castSpell(new Spell(
						spellsArray[mainSpellIndex].x,
						spellsArray[mainSpellIndex].y,
						this.spell.radius,
						this.spell.name,
						this.uniqueID,
						myGameCharacter.name,
						myGameCharacter.side,
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
		if (this.spell.ability === "AoE1" && myGameCharacter.mana > this.spell.manaCost) {
			myGameCharacter.mana -= this.spell.manaCost;

			let spellCount = 0; // Keep track of how many spells have been cast
			const interval = setInterval(() => {
				if (spellCount < this.spell.castAmount) {
					// Cast a spell
					castSpell(new Spell(
						myGameCharacter.x,
						myGameCharacter.y,
						this.spell.radius + (spellCount * 15),
						this.spell.name,
						this.uniqueID,
						myGameCharacter.name,
						myGameCharacter.side,
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
		if (this.spell.ability === "beam1" && myGameCharacter.mana > this.spell.manaCost) {
			myGameCharacter.mana -= this.spell.manaCost;

			let spellCount = 0; // Keep track of how many spells have been cast
			const interval = setInterval(() => {
				if (spellCount < this.spell.castAmount) {
					// Cast a spell
					castSpell(new Spell(
						spellsArray[mainSpellIndex].x,
						spellsArray[mainSpellIndex].y,
						this.spell.radius,
						this.spell.name,
						this.uniqueID,
						myGameCharacter.name,
						myGameCharacter.side,
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
		if (this.spell.ability === "beam2" && myGameCharacter.mana > this.spell.manaCost) {
			myGameCharacter.mana -= this.spell.manaCost;

			castMouseX = worldX - biome1.x;
			castMouseY = worldY - biome1.y;

			let spellCount = 0; // Keep track of how many spells have been cast
			const interval = setInterval(() => {
				if (spellCount < this.spell.castAmount) {
					// Cast a spell
					castSpell(new Spell(
						spellsArray[mainSpellIndex].x,
						spellsArray[mainSpellIndex].y,
						this.spell.radius,
						this.spell.name,
						this.uniqueID,
						myGameCharacter.name,
						myGameCharacter.side,
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
		if (this.index === 1) {
			if (keys.Digit1 && this.spellReady && myGameCharacter.mana > this.spell.manaCost) {
				this.spellActive = true;
				this.borderColor = "green";
			} else if (leftClick && this.spellActive) {
				this.borderColor = "black";
				this.interact();
				this.spellActive = false;
				this.spellReady = false;
			}
		}
		if (this.index === 2) {
			if (keys.Digit2 && this.spellReady && myGameCharacter.mana > this.spell.manaCost) {
				this.spellActive = true;
				this.borderColor = "green";
			} else if (leftClick && this.spellActive) {
				this.borderColor = "black";
				this.interact();
				this.spellActive = false;
				this.spellReady = false;
			}
		}
		if (this.index === 3) {
			if (keys.Digit3 && this.spellReady && myGameCharacter.mana > this.spell.manaCost) {
				this.spellActive = true;
				this.borderColor = "green";
			} else if (leftClick && this.spellActive) {
				this.borderColor = "black";
				this.interact();
				this.spellActive = false;
				this.spellReady = false;
			}
		}
		if (this.index === 4) {
			if (keys.Digit4 && this.spellReady && myGameCharacter.mana > this.spell.manaCost) {
				this.spellActive = true;
				this.borderColor = "green";
			} else if (leftClick && this.spellActive) {
				this.borderColor = "black";
				this.interact();
				this.spellActive = false;				
				this.spellReady = false;
			}
		}
		if (this.index === 5) {
			if (keys.Digit5 && this.spellReady && myGameCharacter.mana > this.spell.manaCost) {
				this.spellActive = true;
				this.borderColor = "green";
			} else if (leftClick && this.spellActive) {
				this.borderColor = "black";
				this.interact();
				this.spellActive = false;
				this.spellReady = false;
			}
		}
		if (this.index === 6) {
			if (keys.Digit6 && this.spellReady && myGameCharacter.mana > this.spell.manaCost) {
				this.spellActive = true;
				this.borderColor = "green";
			} else if (leftClick && this.spellActive) {
				this.borderColor = "black";
				this.interact();
				this.spellActive = false;
				this.spellReady = false;
			}
		}
		if (this.index === 7) {
			if (keys.Digit7 && this.spellReady && myGameCharacter.mana > this.spell.manaCost) {
				this.spellActive = true;
				this.borderColor = "green";
			} else if (leftClick && this.spellActive) {
				this.borderColor = "black";
				this.interact();
				this.spellActive = false;
				this.spellReady = false;
			}
		}
		if (this.index === 8) {
			if (keys.Digit8 && this.spellReady && myGameCharacter.mana > this.spell.manaCost) {
				this.spellActive = true;
				this.borderColor = "green";
			} else if (leftClick && this.spellActive) {
				this.borderColor = "black";
				this.interact();
				this.spellActive = false;
				this.spellReady = false;
			}
		}
		if (this.index === 9) {
			if (keys.Digit9 && this.spellReady && myGameCharacter.mana > this.spell.manaCost) {
				this.spellActive = true;
				this.borderColor = "green";
			} else if (leftClick && this.spellActive) {
				this.borderColor = "black";
				this.interact();
				this.spellActive = false;
				this.spellReady = false;
			}
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
	}

	clickButton(xmouse, ymouse) {
		//console.log("window x: " + xmouse + " window y: " + ymouse);
		const distance =
			Math.sqrt(xmouse >= this.x && xmouse < this.width + this.x && ymouse >= this.y && ymouse < this.height + this.y);
		if (distance) {
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
}