class SpellBook {
	constructor(x, y, index, width, height, radii, borderColor, appearance, name, spell, cooldown, ability, text) {
		this.image = new Image();
		this.image.src = appearance;
		this.cooldownTimer = 0;
		this.skillReady = true;
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
		this.cooldown = cooldown;
		this.ability = ability;
		this.text = text;
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
		ctx.fillText(this.text, this.x + 1, (this.y * 5) + this.height);
		ctx.closePath();
	}
	interact() {
		if (this.ability === "cast" && myGameCharacter.mana > this.spell.manaCost) {
			myGameCharacter.mana -= this.spell.manaCost;
			castMouseX = mouseX;
			castMouseY = mouseY;
			for (let i = 0; i < this.spell.castAmount; i++) {
				castSpell(new Spell(myGameCharacter.x, myGameCharacter.y, this.spell.radius, this.spell.name, this.spell.appearance, this.spell.castAmount, this.spell.maxAmount, this.spell.index, this.spell.health, this.spell.damage, this.spell.speed, this.spell.ability, this.spell.manaCost, this.spell.respawnTime), 10)
			}
		}
		if (this.ability === "summon" && myGameCharacter.mana > this.spell.manaCost) {
			myGameCharacter.mana -= this.spell.manaCost;
			for (let i = 0; i < this.spell.castAmount; i++) {
				this.spell.index += 1;
				castSpell(new Spell(myGameCharacter.x, myGameCharacter.y, this.spell.radius, this.spell.name, this.spell.appearance, this.spell.castAmount, this.spell.maxAmount, this.spell.index, this.spell.health, this.spell.damage, this.spell.speed, this.spell.ability, this.spell.manaCost, this.spell.respawnTime), 10);
			}
		}
	}

	update() {
		if (this.index === 1) {
			if (keys.Digit1 && this.skillReady && myGameCharacter.mana > this.spell.manaCost) {
				skill1 = true;
				this.borderColor = "green";
			} else if (isMouseDown && skill1 && !skill1Used) {
				this.borderColor = "black";
				this.interact();
				//castSpell(new Spell(myGameCharacter.x, myGameCharacter.y, this.spell.radius, this.spell.name, this.spell.appearance, this.spell.maxAmount, this.spell.index, this.spell.health, this.spell.damage, this.spell.speed, this.spell.ability, this.spell.respawnTime), 10);
				skill1 = false;
				skill1Used = true;
				this.skillReady = false;
			}
		}
		if (this.index === 2) {
			if (keys.Digit2 && this.skillReady && myGameCharacter.mana > this.spell.manaCost) {
				skill2 = true;
				this.borderColor = "green";
			} else if (isMouseDown && skill2 && !skill2Used) {
				this.borderColor = "black";
				this.interact();
				//castSpell(new Spell(myGameCharacter.x, myGameCharacter.y, this.spell.radius, this.spell.name, this.spell.appearance, this.spell.maxAmount, this.spell.index, this.spell.health, this.spell.damage, this.spell.speed, this.spell.ability, this.spell.respawnTime), 10);
				skill2 = false;
				skill2Used = true;
				this.skillReady = false;
			}
		}
		if (this.index === 3) {
			if (keys.Digit3 && this.skillReady && myGameCharacter.mana > this.spell.manaCost) {
				skill3 = true;
				this.borderColor = "green";
			} else if (isMouseDown && skill3 && !skill3Used) {
				this.borderColor = "black";
				this.interact();
				//castSpell(new Spell(myGameCharacter.x, myGameCharacter.y, this.spell.radius, this.spell.name, this.spell.appearance, this.spell.maxAmount, this.spell.index, this.spell.health, this.spell.damage, this.spell.speed, this.spell.ability, this.spell.respawnTime), 10);
				skill3 = false;
				skill3Used = true;
				this.skillReady = false;
			}
		}
		if (!this.skillReady) {
			this.cooldownTimer++;
			this.borderColor = "red";
			if (this.cooldownTimer >= this.cooldown) {
				this.borderColor = "black";
				this.skillReady = true;  // Skill becomes ready again
				this.cooldownTimer = 0;  // Reset the cooldown timer
			}
		}
		this.draw(ctx)
	}

	clickButton(xmouse, ymouse) {
		//console.log("window x: " + xmouse + " window y: " + ymouse);
		const distance =
			Math.sqrt(xmouse >= this.x && xmouse < this.width + this.x && ymouse >= this.y && ymouse < this.height + this.y);
		if (distance) {
			console.log(this.name + " was clicked");
		}
	}
}