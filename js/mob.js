class Mob {
	constructor(
		setMinX,
		setMaxX,
		setMinY,
		setMaxY,
		x, y, appearance,
		ignoreSpellCollision,
		ignoreMobCollision,
		health,
		defense,
		damage,
		radius,
		radiusAdjust,
		FOVRadius,
		setMinHealth,
		setMaxHealth,
		name,
		side,
		maxAmount,
		type,
		ability,
		learnedSpells,
		intelligence,
		experienceDrop,
		lootDrop,
		state,
		frames,
		respawnTime) {
		this.image = new Image();
		this.image.src = appearance;
		this.setMinX = setMinX;
		this.setMaxX = setMaxX;
		this.setMinY = setMinY;
		this.setMaxY = setMaxY;
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.radiusAdjust = radiusAdjust;
		this.appearance = appearance;  
		this.ignoreSpellCollision = ignoreSpellCollision;
		this.ignoreMobCollision = ignoreMobCollision;
		this.setMinHealth = setMinHealth;
		this.setMaxHealth = setMaxHealth;
		this.health = health;
		this.defense = defense;
		this.damage = damage;
		this.name = name;
		this.maxAmount = maxAmount;
		this.type = type;
		this.ability = ability;
		this.learnedSpells = learnedSpells;
		this.intelligence = intelligence;
		this.experienceDrop = experienceDrop;
		this.lootDrop = lootDrop;
		this.state = state;
		this.frames = frames;
		this.respawnTime = respawnTime;
		this.healthRegen = 0;
		this.speed = 0;
		this.angle = 0;
		this.moveAngle = 0;
		this.FOVRadius = FOVRadius;
		this.timeoutId = null;
		this.isDead = false;
		this.attackTimer = 0;
		this.secondsTracker = 0;
		this.side = side;
		this.codeClass = "mob";
	}		
	update() {
		if (this.isDead) {
			return;
		}
		var ctx = myGameArea.context;
		ctx.fillStyle = "green";
		ctx.fillRect(this.x - this.health, this.y - (this.radius + this.radiusAdjust + 15), this.health * 2, 10);
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.strokeStyle = "black";
		ctx.rect(this.x - this.health, this.y - (this.radius + this.radiusAdjust + 15), this.health * 2, 10);
		ctx.stroke();

		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);	
		ctx.drawImage(this.image, -this.radius - this.radiusAdjust, -this.radius - this.radiusAdjust, (this.radius + this.radiusAdjust) * 2, (this.radius + this.radiusAdjust) * 2);
		// health bar
		//ctx.rect(0, 0 - (this.radius / 4), this.health, this.radius / 8);

		//ctx.rect(30, 30, 50, 50);
		//draw FOVRadius or radius 
		/*
		ctx.beginPath();
		ctx.arc(0, 0, this.FOVRadius, 0, 2 * Math.PI); 
		ctx.strokeStyle = "blue";
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
		ctx.strokeStyle = "green";
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.arc(0, 0, this.radius + this.radiusAdjust, 0, 2 * Math.PI);
		ctx.strokeStyle = "red";
		ctx.stroke();
		ctx.closePath();
		*/
		ctx.restore();
	}      
	spawn() {
		let totalSpecificMobCount = mobsArray.filter(element => element.name === this.name).length;
		if ((totalSpecificMobCount - 1) < this.maxAmount) {
			//console.log(totalSpecificMobCount, this.maxAmount, "called");

			// Capture the current context's values
			let randomX = ((biome1.x - camera.x) + (Math.floor((Math.random() * (this.setMaxX - this.setMinX + 1)) + this.setMinX))) + camera.x;
			let randomY = ((biome1.y - camera.y) + (Math.floor((Math.random() * (this.setMaxY - this.setMinY + 1)) + this.setMinY))) + camera.y;
			let randomRadiusXHealth = Math.floor((Math.random() * (this.setMaxHealth - this.setMinHealth + 1)) + this.setMinHealth);

			let mobConfig = {
				setMinX: this.setMinX,
				setMaxX: this.setMaxX,
				setMinY: this.setMinY,
				setMaxY: this.setMaxY,
				randomX: randomX,
				randomY: randomY,
				appearance: this.appearance,
				ignoreSpellCollision: this.ignoreSpellCollision,
				ignoreMobCollision: this.ignoreMobCollision,
				randomRadiusXHealth: randomRadiusXHealth,
				defense: this.defense,
				damage: this.damage,
				radiusAdjust: this.radiusAdjust,
				FOVRadius: this.FOVRadius,
				setMinHealth: this.setMinHealth,
				setMaxHealth: this.setMaxHealth,
				name: this.name,
				side: this.side,
				maxAmount: this.maxAmount,
				type: this.type,
				ability: this.ability,
				learnedSpells: this.learnedSpells,
				intelligence: this.intelligence,
				experienceDrop: this.experienceDrop,
				lootDrop: this.lootDrop,
				respawnTime: this.respawnTime
			};

			let mobRespawnCooldown = this.respawnTime;

			setTimeout(function () {
				let newMob = new Mob(
					mobConfig.setMinX, mobConfig.setMaxX, mobConfig.setMinY, mobConfig.setMaxY,
					mobConfig.randomX,
					mobConfig.randomY,
					mobConfig.appearance,
					mobConfig.ignoreSpellCollision,
					mobConfig.ignoreMobCollision,
					mobConfig.randomRadiusXHealth,
					mobConfig.defense,
					mobConfig.damage,
					mobConfig.randomRadiusXHealth, // because radius = health
					mobConfig.radiusAdjust,
					mobConfig.FOVRadius,
					mobConfig.setMinHealth,
					mobConfig.setMaxHealth,
					mobConfig.name,
					mobConfig.side,
					mobConfig.maxAmount,
					mobConfig.type,
					mobConfig.ability,
					mobConfig.learnedSpells,
					mobConfig.intelligence,
					mobConfig.experienceDrop,
					mobConfig.lootDrop, 0, 0,
					mobConfig.respawnTime
				);

				mobsArray.push(newMob);
				//console.log(totalSpecificMobCount, mobConfig.maxAmount, "update");
			}, mobRespawnCooldown);
		}
	}
	newPos() {
		this.angle += this.moveAngle * Math.PI / 180;
		this.x += this.speed * Math.sin(this.angle);
		this.y -= this.speed * Math.cos(this.angle);
	}
	setTarget(x, y) {
		this.targetX = x;
		this.targetY = y;
	}
	die() {
		// Set the isDead flag to true update
		for (let i = 0; i < this.lootDrop.length; i++) {
			// generate random number from 1 to 100
			const roll = Math.floor(Math.random() * 100) + 1;
			if (roll <= this.lootDrop[i].dropChance) {
				//console.log("wow", "you got:", roll, "for", this.lootDrop[i].name);
				dropLoot(new Loot(
					this.x + i * 20,
					this.y,
					this.lootDrop[i].radius,
					this.lootDrop[i].name,
					this.lootDrop[i].spellBookName,
					this.lootDrop[i].rarity,
					this.lootDrop[i].dropChance,
					this.lootDrop[i].appearance,
					this.lootDrop[i].form,
					this.lootDrop[i].type,
					this.lootDrop[i].essenceName,
					this.lootDrop[i].pagesToCraft,
					this.lootDrop[i].essenceToCraft,
					this.lootDrop[i].ignoreCollision,
					this.lootDrop[i].amount,
					this.lootDrop[i].stackLimit,
					this.lootDrop[i].text))
			} else {
				//console.log("better luck next time", "you got:", roll, "for", this.lootDrop[i].name);
			}
		}		

		this.state = 0;
		this.frames = 0;
		this.moveAngle = 0;
		this.speed = 0;
		this.isDead = true;
	}
	interact() {
		if (this.isDead) {
			return;
		}
		if (this.intelligence == -1) {
			this.state = 0;
			this.frames = 0;
			this.moveAngle = 0;
			this.speed = 0;
			this.die();
		}
		if (this.intelligence == 1) {
			switch (this.state) {
				case 0:
					if (this.frames < 120) {
						this.frames++;
					} else {
						this.moveAngle = 0;
						this.frames = 0;
						this.state = 1;
					}
					break;

				case 1:
					if (this.frames < 120) {
						this.speed = 2;
						// Ensure the entity stays within the canvas boundaries
						if (this.x < this.radius) this.x = this.radius;
						if (this.x > biome1.width - this.radius) this.x = biome1.width - this.radius;
						if (this.y < this.radius) this.y = this.radius;
						if (this.y > biome1.height - this.radius) this.y = biome1.height - this.radius;
						this.frames++;
					} else {
						this.speed = 0;
						this.frames = 0;
						this.moveAngle = (Math.random() < 0.5 ? 1 : -1);
						this.state = 0;
					}
					break;

			}			
		}
		else if (this.intelligence == 2) {
			//this means that the stage 2 mob attacks
			console.log("hi, im smart enough?");
		}
		if (this.ability == "shrinksOnDamage") {
			this.radius = this.health + 15;
		}
		if (this.ability == "chases") {
			let radii = (this.radius + this.FOVRadius) + myGameCharacter.radius;
			let distance = getDistance(this, myGameCharacter);
			let withinRadius = distance < radii;
			if (withinRadius) {
				this.speed = 3;
				this.setTarget(myGameCharacter.x, myGameCharacter.y);
				let dx = myGameCharacter.x - this.x;
				let dy = myGameCharacter.y - this.y;
				this.angle = Math.atan2(dy, dx) - (1.5 * Math.PI);
				// Ensure the entity stays within the canvas boundaries
				if (this.x < this.radius) this.x = this.radius;
				if (this.x > biome1.width - this.radius) this.x = biome1.width - this.radius;
				if (this.y < this.radius) this.y = this.radius;
				if (this.y > biome1.height - this.radius) this.y = biome1.height - this.radius;
			}
		}
		// aimed shooting part
		if (this.ability == "aimedShooting") {
			let radii = (this.radius + this.FOVRadius) + myGameCharacter.radius;
			let distance = getDistance(this, myGameCharacter);
			let withinRadius = distance < radii;
			if (withinRadius) {
				this.setTarget(myGameCharacter.x, myGameCharacter.y);

				// Calculate the target angle
				let dx = myGameCharacter.x - this.x;
				let dy = myGameCharacter.y - this.y;
				let targetAngle = Math.atan2(dy, dx) - (1.5 * Math.PI);

				// Normalize current and target angles to the range -π to π
				let currentAngle = this.angle % (2 * Math.PI);
				if (currentAngle > Math.PI) currentAngle -= 2 * Math.PI;
				if (currentAngle < -Math.PI) currentAngle += 2 * Math.PI;

				let angleDifference = targetAngle - currentAngle;

				// Normalize angleDifference to the range -π to π
				if (angleDifference > Math.PI) angleDifference -= 2 * Math.PI;
				if (angleDifference < -Math.PI) angleDifference += 2 * Math.PI;

				// Turn towards the target angle
				let turnSpeed = 0.01; // Adjust turn speed as needed
				if (angleDifference > 0) {
					this.angle += Math.min(turnSpeed, angleDifference);
				} else if (angleDifference < 0) {
					this.angle += Math.max(-turnSpeed, angleDifference);
				}

				// Log angles for debugging 
				//console.log("Current Angle:", currentAngle, "Target Angle:", targetAngle, "Angle Difference:", angleDifference);
				this.attackTimer++
				if (this.attackTimer >= 60) {
					let spellBookCastAmount = 1;
					let spellCount = 0; // Keep track of how many spells have been cast
					const interval = setInterval(() => {
						if (spellCount < spellBookCastAmount) {
							// Cast a spell

							castSpell(new Spell(
								this.x,
								this.y,
								this.learnedSpells.radius,
								this.learnedSpells.FOVRadius,
								this.learnedSpells.name,
								null,
								this,
								this.side,
								myGameCharacter,
								this.learnedSpells.art,
								this.learnedSpells.shape,
								this.learnedSpells.appearance,
								this.learnedSpells.castAmount,
								this.learnedSpells.maxAmount,
								this.learnedSpells.ignoreSpellCollision,
								this.learnedSpells.ignoreMobCollision,
								this.learnedSpells.index,
								this.learnedSpells.health,
								this.learnedSpells.defense,
								this.learnedSpells.damage,
								this.learnedSpells.speed,
								this.learnedSpells.ability,
								0,
								this.learnedSpells.respawnTime));
							spellCount++;
						} else {
							// Stop the interval once the desired amount of spells is cast
							clearInterval(interval);
						}
					}, 50);
					this.attackTimer = 0;
					this.secondsTracker++;
				}
			}
		}
		if (this.ability == "summoner") {
			let radii = (this.radius + this.FOVRadius) + myGameCharacter.radius;
			let distance = getDistance(this, myGameCharacter);
			let withinRadius = distance < radii;
			if (withinRadius) {
				this.setTarget(myGameCharacter.x, myGameCharacter.y);

				// Calculate the target angle
				let dx = myGameCharacter.x - this.x;
				let dy = myGameCharacter.y - this.y;
				let targetAngle = Math.atan2(dy, dx) - (1.5 * Math.PI);

				// Normalize current and target angles to the range -π to π
				let currentAngle = this.angle % (2 * Math.PI);
				if (currentAngle > Math.PI) currentAngle -= 2 * Math.PI;
				if (currentAngle < -Math.PI) currentAngle += 2 * Math.PI;

				let angleDifference = targetAngle - currentAngle;

				// Normalize angleDifference to the range -π to π
				if (angleDifference > Math.PI) angleDifference -= 2 * Math.PI;
				if (angleDifference < -Math.PI) angleDifference += 2 * Math.PI;

				// Turn towards the target angle
				let turnSpeed = 0.01; // Adjust turn speed as needed
				if (angleDifference > 0) {
					this.angle += Math.min(turnSpeed, angleDifference);
				} else if (angleDifference < 0) {
					this.angle += Math.max(-turnSpeed, angleDifference);
				}

				this.attackTimer++
				if (this.attackTimer >= 180) {
					let spellBookCastAmount = 3;
					let spellCount = 0; // Keep track of how many spells have been cast
					const interval = setInterval(() => {
						if (spellCount < spellBookCastAmount) {
							// Cast a spell

							castSpell(new Spell(
								this.x,
								this.y,
								this.learnedSpells.radius,
								this.FOVRadius,
								this.learnedSpells.name,
								null,
								this,
								this.side,
								myGameCharacter,
								this.learnedSpells.art,
								this.learnedSpells.shape,
								this.learnedSpells.appearance,
								this.learnedSpells.castAmount,
								this.learnedSpells.maxAmount,
								this.learnedSpells.ignoreSpellCollision,
								this.learnedSpells.ignoreMobCollision,
								this.learnedSpells.index,
								this.learnedSpells.health,
								this.learnedSpells.defense,
								this.learnedSpells.damage,
								this.learnedSpells.speed,
								this.learnedSpells.ability,
								0,
								this.learnedSpells.respawnTime));
							spellCount++;
						} else {
							// Stop the interval once the desired amount of spells is cast
							clearInterval(interval);
						}
					}, 50);
					this.attackTimer = 0;
					this.secondsTracker++;
				}
			}
		}
	}
}