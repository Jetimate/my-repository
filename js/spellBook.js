class SpellBook {
	constructor(x, y, index, width, height, radii, borderColor, appearance, name, spell, mainSpellBook, cooldown, text) {
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
		this.mainSpellBook = mainSpellBook;
		this.cooldown = cooldown;
		this.text = text;
		this.cooldownTimer = 0;
		this.level = 1;
		this.maxPages = 3;
		this.spawned = false;
		this.spellReady = true;
		this.spellActive = false;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.roundRect(this.x, this.y, this.width, this.height, this.radii);
		ctx.strokeStyle = this.borderColor;
		ctx.lineWidth = "3";
		ctx.stroke();
		ctx.font = "15px Ubuntu";
		ctx.fillStyle = "black";
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		ctx.fillText(this.text + this.level, this.x + 1, (this.y * 5) + this.height);
		ctx.closePath();
	}
	activate() {
		castSpell(new Spell(
			myGameCharacter.x,
			myGameCharacter.y,
			this.mainSpellBook.radius,
			this.mainSpellBook.name,
			this.mainSpellBook.appearance,
			this.mainSpellBook.castAmount,
			this.mainSpellBook.maxAmount,
			this.mainSpellBook.ignoreSpellCollision,
			this.mainSpellBook.ignoreMobCollision,
			this.mainSpellBook.index,
			this.mainSpellBook.health,
			this.mainSpellBook.defense,
			this.mainSpellBook.damage,
			this.mainSpellBook.speed,
			this.mainSpellBook.ability,
			this.mainSpellBook.manaCost,
			this.mainSpellBook.respawnTime));
		this.spawned = true;	
	}
	interact() {
		let mainSpellBookIndex = spellsArray.findIndex(element => element.name == this.mainSpellBook.name);
		//console.log(spellsArray[mainSpellBookIndex].health);

		if (this.spell.ability === "shoot1" && myGameCharacter.mana > this.spell.manaCost) {
			myGameCharacter.mana -= this.spell.manaCost;
			castMouseX = worldX - biome1.x;
			castMouseY = worldY - biome1.y;
			let spellBookCastAmount = this.spell.castAmount + 10 + (this.level - 1);
			let spellCount = 0; // Keep track of how many spells have been cast
			const interval = setInterval(() => {
				if (spellCount < spellBookCastAmount) {
					// Cast a spell
					
					castSpell(new Spell(
						spellsArray[mainSpellBookIndex].x,
						spellsArray[mainSpellBookIndex].y,
						this.spell.radius,
						this.spell.name,
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
			let spellBookCastAmount = this.spell.castAmount + (this.level - 1);
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
						this.spell.respawnTime));
					spellCount++;
				} else {
					// Stop the interval once the desired amount of spells is cast
					clearInterval(interval);
				}
			}, 50);
		}
		if (this.spell.ability === "summon1" && myGameCharacter.mana > this.spell.manaCost) {
			myGameCharacter.mana -= this.spell.manaCost;
			let spellBookCastAmount = this.spell.castAmount + (this.level - 1);
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
						this.spell.respawnTime));
					spellCount++;
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
						spellsArray[mainSpellBookIndex].x,
						spellsArray[mainSpellBookIndex].y,
						this.spell.radius,
						this.spell.name,
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
						this.spell.respawnTime));
					spellCount++;
				} else {
					// Stop the interval once the desired amount of spells is cast
					clearInterval(interval);
				}
			}, 15);
		}
	}

	update() {
		// level up spell Book
		let totalSpellPageCount = inventoryArray.filter(element => element.spellName == this.spell.name).length;
		if (totalSpellPageCount >= this.maxPages) {
			let spellPageIndex = inventoryArray.findIndex(element => element.spellName == this.spell.name);
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
			} else if (isMouseDown && this.spellActive) {
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
			} else if (isMouseDown && this.spellActive) {
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
			} else if (isMouseDown && this.spellActive) {
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
			} else if (isMouseDown && this.spellActive) {
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
			} else if (isMouseDown && this.spellActive) {
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
			} else if (isMouseDown && this.spellActive) {
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
			} else if (isMouseDown && this.spellActive) {
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
			} else if (isMouseDown && this.spellActive) {
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
			} else if (isMouseDown && this.spellActive) {
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
		if (this.spawned == false) {
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
			*/
			//console.log(this.name + " was clicked");
		}
	}
}