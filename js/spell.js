class Spell {
	constructor(x, y, radius, name, appearance, castAmount, maxAmount, ignoreSpellCollision, ignoreMobCollision, positionIndex, health, defense, damage, speed, ability, manaCost, respawnTime) {
		this.image = new Image();
		this.image.src = appearance;
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.name = name;
		this.appearance = appearance;
		this.castAmount = castAmount;
		this.maxAmount = maxAmount;
		this.ignoreSpellCollision = ignoreSpellCollision;
		this.ignoreMobCollision = ignoreMobCollision;
		this.positionIndex = positionIndex;
		this.health = health;
		this.defense = defense;
		this.damage = damage;
		this.speed = speed;
		this.ability = ability;
		this.manaCost = manaCost;
		this.respawnTime = respawnTime;
		this.radian = 0;
		this.angle = 0;
		this.moveAngle = 0;
		this.targetX = null;
		this.targetY = null;
		this.hasTarget = false;
		this.lifeTimer = 0;
		this.turn = "clockwise";
		this.orbitRadius = 5;
		this.radiusIncrease = 0;
		this.orbitRadiusIncrease = 0;
		this.damageIncrease = 0;
		this.toggle = false;
		this.state = 0;
	}

	setTarget(x, y) {
		this.targetX = x;
		this.targetY = y;
	}
	destroy() {
		let spellIndex = spellsArray.indexOf(this);
		if (spellIndex > -1) {
			//console.log(this);
			spellsArray.splice(spellIndex, 1);
		}
	}
	handleCollisions() {
		for (let i = 0; i < spellsArray.length; i++) {
			for (let j = i + 1; j < spellsArray.length; j++) {
				const spellA = spellsArray[i];
				const spellB = spellsArray[j];
				const dx = spellB.x - spellA.x;
				const dy = spellB.y - spellA.y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < spellA.radius + spellB.radius) {
					// Calculate knockback direction
					const angle = Math.atan2(dy, dx);
					const knockbackDistance = (spellA.radius + spellB.radius - distance) / 2;

					// Apply knockback
					if (!spellA.ignoreSpellCollision) {
						spellA.x -= Math.cos(angle) * knockbackDistance;
						spellA.y -= Math.sin(angle) * knockbackDistance;
					}
					if (!spellB.ignoreSpellCollision) {
						spellB.x += Math.cos(angle) * knockbackDistance;
						spellB.y += Math.sin(angle) * knockbackDistance;
					}
				}
			}
		}
	}
	draw() {
		var ctx = myGameArea.context;
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);
		ctx.drawImage(this.image, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
		/*
		ctx.beginPath();
		ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);	
		ctx.lineWidth = 1;
		ctx.strokeStyle = "red";
		ctx.moveTo(0, 0);
		ctx.lineTo(0, 0 - this.radius);
		ctx.stroke();
		ctx.closePath();
		*/
		ctx.restore();
	}
	update() {
		if (this.ability === "book") {
			// let totalSpellLootDropCount = inventoryArray.filter(element => element.spellName == this.spell.name).length;
			let totalSpellBookCountArray = spellsArray.filter(element => element.ability == "book");
			// Check if the index is odd or even
			//console.log(totalSpellBookCountArray)
			totalSpellBookCountArray.forEach((spellBook, index) => {
				spellBook.orbitRadius = 2 + index;
				if ((index + 1) % 2 === 0) {
					spellBook.turn = "counterclockwise"; // Even index: counterclockwise
				} else {
					spellBook.turn = "clockwise"; // Odd index: clockwise
				}

			});
			// Calculate target orbit position
			let targetX = myGameCharacter.x + Math.cos(this.positionIndex * (Math.PI * 2 / this.maxAmount)) * (myGameCharacter.radius * this.orbitRadius);
			let targetY = myGameCharacter.y + Math.sin(this.positionIndex * (Math.PI * 2 / this.maxAmount)) * (myGameCharacter.radius * this.orbitRadius);

			// Calculate distance to target orbit position
			const dx = targetX - this.x;
			const dy = targetY - this.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			// Adjust speed based on the distance (e.g., speed scales with distance)
			const minSpeed = this.speed / 10;
			const maxSpeed = this.speed;
			const speedFactor = Math.min(distance / 10, maxSpeed); // Scale speed based on distance
			const adjustedSpeed = Math.max(speedFactor, minSpeed); // Ensure speed is not too slow


			// Calculate the movement angle and update position
			this.angle = Math.atan2(targetY - this.y, targetX - this.x) - (1.5 * Math.PI);

			if (this.turn == "clockwise") {
				// clockwise
				this.positionIndex += 0.005;
				this.x += adjustedSpeed * Math.sin(this.angle);
				this.y -= adjustedSpeed * Math.cos(this.angle);
			} else if (this.turn == "counterclockwise") {
				// counterclockwise
				this.positionIndex -= 0.005;
				this.x += adjustedSpeed * Math.sin(this.angle);
				this.y -= adjustedSpeed * Math.cos(this.angle);
			}
		}
		if (this.ability === "summon1") {
			if (isMouseDown) {
				let summoningSpells = spellsArray.filter(element => element.ability === "summon1");
				summoningSpells.forEach(spell => spell.setTarget(worldX - biome1.x, worldY - biome1.y));
				let dx = (worldX - biome1.x) - this.x;
				let dy = (worldY - biome1.y) - this.y;
				this.angle = Math.atan2(dy, dx) - (1.5 * Math.PI);
				this.x += this.speed * Math.sin(this.angle);
				this.y -= this.speed * Math.cos(this.angle);
			} else if (!isMouseDown) {
				// Calculate target orbit position
				let targetX = myGameCharacter.x + Math.cos(this.positionIndex * (Math.PI * 2 / this.maxAmount)) * (myGameCharacter.radius * this.orbitRadius);
				let targetY = myGameCharacter.y + Math.sin(this.positionIndex * (Math.PI * 2 / this.maxAmount)) * (myGameCharacter.radius * this.orbitRadius);

				// Calculate distance to target orbit position
				const dx = targetX - this.x;
				const dy = targetY - this.y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				// Adjust speed based on the distance (e.g., speed scales with distance)
				const minSpeed = this.speed / 10;
				const maxSpeed = this.speed;
				const speedFactor = Math.min(distance / 10, maxSpeed); // Scale speed based on distance
				const adjustedSpeed = Math.max(speedFactor, minSpeed); // Ensure speed is not too slow

				// Calculate the movement angle and update position
				this.angle = Math.atan2(targetY - this.y, targetX - this.x) - (1.5 * Math.PI);
				this.positionIndex += 0.008;
				this.x += adjustedSpeed * Math.sin(this.angle);
				this.y -= adjustedSpeed * Math.cos(this.angle);
			}
		}
		if (this.ability === "shoot1") {
			// Calculate the angle only once, if it hasn't been calculated yet
			if (!this.hasTarget) {
				let dx = castMouseX - this.x;
				let dy = castMouseY - this.y;
				this.angle = Math.atan2(dy, dx) - (1.5 * Math.PI);
				this.hasTarget = true;  // Mark that the target has been set
			}
			// Continue moving based on the previously calculated angle
			this.x += this.speed * Math.sin(this.angle);
			this.y -= this.speed * Math.cos(this.angle);
			this.lifeTimer++;

			// If lifeTimer exceeds maxLife, this entity will be removed
			if (this.lifeTimer >= 120) {
				// Call the function to remove this entity from the array
				this.destroy();
			}
		}
		if (this.ability === "shoot2") {
			switch (this.state) {
				case 0:
					let targetX = myGameCharacter.x + Math.cos(this.positionIndex * (Math.PI * 2 / this.maxAmount)) * (myGameCharacter.radius * this.orbitRadius);
					let targetY = myGameCharacter.y + Math.sin(this.positionIndex * (Math.PI * 2 / this.maxAmount)) * (myGameCharacter.radius * this.orbitRadius);
					if (!this.toggle) {
						this.radiusIncrease = 0.1;
						this.orbitRadiusIncrease = 0.01;
						this.damageIncrease = 0.03;
						this.toggle = true;
					}

					const dx = targetX - this.x;
					const dy = targetY - this.y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					const minSpeed = this.speed / 10;
					const maxSpeed = this.speed;
					const speedFactor = Math.min(distance / 10, maxSpeed); // Scale speed based on distance
					const adjustedSpeed = Math.max(speedFactor, minSpeed); // Ensure speed is not too slow

					this.angle = Math.atan2(targetY - this.y, targetX - this.x) - (1.5 * Math.PI);
					this.positionIndex += 0.008;
					this.x += adjustedSpeed * Math.sin(this.angle);
					this.y -= adjustedSpeed * Math.cos(this.angle);
					//console.log(this.radius + " " + radiusIncrease);
					this.radius += this.radiusIncrease;
					this.orbitRadius += this.orbitRadiusIncrease;
					this.damage += this.damageIncrease;

					if (this.radius >= 15) {
						console.log(this.radius + " " + this.damage);
						this.radiusIncrease = 0;
						this.orbitRadiusIncrease = 0;
						this.damageIncrease = 0;
						if (isMouseDown && !this.hasTarget) {
							castMouseX = worldX - biome1.x;
							castMouseY = worldY - biome1.y;
							let dx = castMouseX - this.x;
							let dy = castMouseY - this.y;
							this.angle = Math.atan2(dy, dx) - (1.5 * Math.PI);
							this.hasTarget = true;  // Mark that the target has been set
							this.state = 1;
						}
					}
					break;
				case 1:
					this.x += this.speed * Math.sin(this.angle);
					this.y -= this.speed * Math.cos(this.angle);
					this.lifeTimer++;

					// If lifeTimer exceeds maxLife, this entity will be removed
					if (this.lifeTimer >= 600) {
						// Call the function to remove this entity from the array
						this.destroy();
					}
					break;
			}
		}
		if (this.ability === "teleport") {
			// Calculate the angle only once, if it hasn't been calculated yet
			if (!this.hasTarget) {
				castMouseX = worldX - biome1.x;
				castMouseY = worldY - biome1.y;
				let dx = castMouseX - this.x;
				let dy = castMouseY - this.y;
				this.angle = Math.atan2(dy, dx) - (1.5 * Math.PI);
				this.x += this.speed * Math.sin(this.angle);
				this.y -= this.speed * Math.cos(this.angle);
				this.lifeTimer++;
			}
			// If lifeTimer exceeds maxLife, this entity will be removed
			if (this.lifeTimer >= 30) {
				// Call the function to remove this entity from the array
				myGameCharacter.x = this.x;
				myGameCharacter.y = this.y;
				this.destroy();
			}
		}
		if (this.ability === "AoE1") {
			this.lifeTimer++;
			// If lifeTimer exceeds maxLife, this entity will be removed
			if (this.lifeTimer >= 5) {
				// Call the function to remove this entity from the array
				this.destroy();
			}
		}
		this.handleCollisions();
		this.draw();
	}
}