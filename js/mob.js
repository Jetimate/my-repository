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
		this.FOVRadius = radius;
		this.timeoutId = null;
		this.isDead = false;
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
		/*
		ctx.beginPath();
		ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
		ctx.strokeStyle = "red";
		ctx.stroke();
		ctx.closePath();
		*/
		ctx.restore();
	}      
	test() {
		console.log("i know my class");
		// update: it doesn't know lolz.
	}
	WIPFirstSpawn() {
		// i don't think that this is gonna be possible
		for (let i = 0; i < luminousRock.maxAmount; i++) {
			luminousRock.spawn();
		}
	}
	spawn() {
		let totalSpecificMobCount = mobsArray.filter(element => element.mobName === this.mobName).length;
		if ((totalSpecificMobCount - 1) < this.maxAmount) {
			console.log(totalSpecificMobCount, this.maxAmount, "called");

			// Capture the current context's values
			let randomX = (((biome1.x - camera.x) + (Math.floor((Math.random() * (this.setMaxX - this.setMinX + 1)) + this.setMinX))) / camera.zoom) + camera.x;
			let randomY = (((biome1.y - camera.y) + (Math.floor((Math.random() * (this.setMaxY - this.setMinY + 1)) + this.setMinY))) / camera.zoom) + camera.y;
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
			console.log("called");
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
			console.log("hi");
		}
		if (this.type == "hostile") {
			let radii = (this.FOVRadius * 5) + myGameCharacter.radius;
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
	}
}