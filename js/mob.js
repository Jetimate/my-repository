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
		mobName,
		maxAmount,
		type,
		ability,
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
		this.mobName = mobName;
		this.maxAmount = maxAmount;
		this.type = type;
		this.ability = ability;
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
	}		
	update() {
		if (this.isDead) {
			return;
		}
		var ctx = myGameArea.context;
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);	
		ctx.drawImage(this.image, -this.radius - this.radiusAdjust, -this.radius - this.radiusAdjust, (this.radius + this.radiusAdjust) * 2, (this.radius + this.radiusAdjust) * 2);
	    //draw FOVRadius or radius
		///*
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
		ctx.arc(0, 0, this.radius + this.FOVRadius, 0, 2 * Math.PI);
		ctx.strokeStyle = "red";
		ctx.stroke();
		ctx.closePath();
		//*/
		ctx.restore();
	}      
	spawn() {
		let totalSpecificMobCount = mobsArray.filter(element => element.mobName === this.mobName).length;
		if ((totalSpecificMobCount - 1) < this.maxAmount) {
			console.log(totalSpecificMobCount, this.maxAmount, "called");

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
				mobName: this.mobName,
				maxAmount: this.maxAmount,
				type: this.type,
				ability: this.ability,
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
					mobConfig.mobName,
					mobConfig.maxAmount,
					mobConfig.type,
					mobConfig.ability,
					mobConfig.intelligence,
					mobConfig.experienceDrop,
					mobConfig.lootDrop, 0, 0,
					mobConfig.respawnTime
				);

				mobsArray.push(newMob);
				console.log(totalSpecificMobCount, mobConfig.maxAmount, "update");
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
		dropLoot(new Loot(this.x, this.y, this.lootDrop.radius, this.lootDrop.name, this.lootDrop.spellName, this.lootDrop.appearance, this.lootDrop.ignoreCollision, this.lootDrop.text))
		// (x, y, radius, name, appearance, ignoreCollision, text)
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
								castSpike.radius,
								castSpike.name,
								this.mobName,
								castSpike.art,
								castSpike.shape,
								castSpike.appearance,
								castSpike.castAmount,
								castSpike.maxAmount,
								castSpike.ignoreSpellCollision,
								castSpike.ignoreMobCollision,
								castSpike.index,
								castSpike.health,
								castSpike.defense,
								castSpike.damage,
								castSpike.speed,
								castSpike.ability,
								castSpike.manaCost,
								castSpike.respawnTime));
							spellCount++;
						} else {
							// Stop the interval once the desired amount of spells is cast
							clearInterval(interval);
						}
					}, 50);
					this.attackTimer = 0;
					this.secondsTracker++;
				}
				console.log(this.attackTimer, this.secondsTracker)
			}
		}
	}
}