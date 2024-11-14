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
	WIPspawn() {
		setTimeout(function () {
			let totalSpecificMobCount = mobsArray.filter(element => element.mobName === this.mobName).length;
			if (totalSpecificMobCount < this.maxAmount) {
				let randomX = (((biome1.x - camera.x) + (Math.floor((Math.random() * (this.setMaxX - this.setMinX + 1)) + this.setMinX))) / camera.zoom) + camera.x;
				let randomY = (((biome1.y - camera.y) + (Math.floor((Math.random() * (this.setMaxY - this.setMinY + 1)) + this.setMinY))) / camera.zoom) + camera.y;
				let randomRadiusXHealth = Math.floor((Math.random() * (this.setMaxHealth - this.setMinHealth + 1)) + this.setMinHealth);
				let newMob = new Mob(
					this.setMinX, this.setMaxX, this.setMinY, this.setMaxY,
					randomX,
					randomY,
					this.appearance,
					this.ignoreSpellCollision,
					this.ignoreMobCollision,
					randomRadiusXHealth,
					this.defense,
					this.damage,
					randomRadiusXHealth, // because radius is = health
					this.radiusAdjust,
					this.setMinHealth,
					this.setMaxHealth,
					this.mobName,
					this.type,
					this.ability,
					this.intelligence,
					this.experienceDrop,
					this.lootDrop, 0, 0,
					this.respawnTime);
				mobsArray.push(newMob);
				//console.log(mobsArray);
			}
		}, this.respawnTime);
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
			let radii = this.FOVRadius + myGameCharacter.radius;
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
class LuminousRock extends Mob {
	constructor(setMinX, setMaxX, setMinY, setMaxY, x, y, appearance, ignoreSpellCollision, ignoreMobCollision, health, defense, damage, radius, radiusAdjust, setMinHealth, setMaxHealth, mobName, type, ability, intelligence, experienceDrop, lootDrop, state, frames, respawnTime) {
		super(setMinX, setMaxX, setMinY, setMaxY, x, y, appearance, ignoreSpellCollision, ignoreMobCollision, health, defense, damage, radius, radiusAdjust, setMinHealth, setMaxHealth, mobName, type, ability, intelligence, experienceDrop, lootDrop, state, frames, respawnTime);
	}
	spawn() {
		setTimeout(function () {
			let totalLuminousRockCount = mobsArray.filter(element => element.mobName === "luminousRock").length;
			if (totalLuminousRockCount < luminousRock.maxAmount) {
				let luminousRockRandomX = (((biome1.x - camera.x) + (Math.floor((Math.random() * (luminousRock.setMaxX - luminousRock.setMinX + 1)) + luminousRock.setMinX))) / camera.zoom) + camera.x;
				let luminousRockRandomY = (((biome1.y - camera.y) + (Math.floor((Math.random() * (luminousRock.setMaxY - luminousRock.setMinY + 1)) + luminousRock.setMinY))) / camera.zoom) + camera.y;
				let luminousRockRandomRadiusXHealth = Math.floor((Math.random() * (luminousRock.setMaxHealth - luminousRock.setMinHealth + 1)) + luminousRock.setMinHealth);
				let newLuminousRock = new LuminousRock(
					luminousRock.setMinX, luminousRock.setMaxX, luminousRock.setMinY, luminousRock.setMaxY,
					luminousRockRandomX,
					luminousRockRandomY,
					luminousRock.appearance,
					luminousRock.ignoreSpellCollision,
					luminousRock.ignoreMobCollision,
					luminousRockRandomRadiusXHealth,
					luminousRock.defense,
					luminousRock.damage,
					luminousRockRandomRadiusXHealth,
					luminousRock.radiusAdjust,
					luminousRock.setMinHealth,
					luminousRock.setMaxHealth,
					luminousRock.mobName,
					luminousRock.type,
					luminousRock.ability,
					luminousRock.intelligence,
					luminousRock.experienceDrop,
					luminousRock.lootDrop, 0, 0,
					luminousRock.respawnTime);
				mobsArray.push(newLuminousRock);
				//console.log(mobsArray);
			}
		}, luminousRock.respawnTime);
	}
}

class LuminousSpirit extends Mob {
	constructor(setMinX, setMaxX, setMinY, setMaxY, x, y, appearance, ignoreSpellCollision, ignoreMobCollision, health, defense, damage, radius, radiusAdjust, setMinHealth, setMaxHealth, mobName, type, ability, intelligence, experienceDrop, lootDrop, state, frames, respawnTime) {
		super(setMinX, setMaxX, setMinY, setMaxY, x, y, appearance, ignoreSpellCollision, ignoreMobCollision, health, defense, damage, radius, radiusAdjust, setMinHealth, setMaxHealth, mobName, type, ability, intelligence, experienceDrop, lootDrop, state, frames, respawnTime);
		this.moveAngle = (Math.random() < 0.5 ? 1 : -1);
	}
	spawn() {
		setTimeout(function () {
			let totalLuminousSpiritCount = mobsArray.filter(element => element.mobName === "luminousSpirit").length;
			if (totalLuminousSpiritCount < luminousSpirit.maxAmount) {
				let luminousSpiritRandomX = (((biome1.x - camera.x) + (Math.floor((Math.random() * (luminousSpirit.setMaxX - luminousSpirit.setMinX + 1)) + luminousSpirit.setMinX))) / camera.zoom) + camera.x;
				let luminousSpiritRandomY = (((biome1.y - camera.y) + (Math.floor((Math.random() * (luminousSpirit.setMaxY - luminousSpirit.setMinY + 1)) + luminousSpirit.setMinY))) / camera.zoom) + camera.y;
				let luminousSpiritRandomRadiusXHealth = Math.floor((Math.random() * (luminousSpirit.setMaxHealth - luminousSpirit.setMinHealth + 1)) + luminousSpirit.setMinHealth);
				let newLuminousSpirit = new LuminousSpirit(
					luminousSpirit.setMinX, luminousSpirit.setMaxX, luminousSpirit.setMinY, luminousSpirit.setMaxY,
					luminousSpiritRandomX,
					luminousSpiritRandomY,
					luminousSpirit.appearance,
					luminousSpirit.ignoreSpellCollision,
					luminousSpirit.ignoreMobCollision,
					luminousSpiritRandomRadiusXHealth,
					luminousSpirit.defense,
					luminousSpirit.damage,
					luminousSpiritRandomRadiusXHealth,
					luminousSpirit.radiusAdjust,
					luminousSpirit.setMinHealth,
					luminousSpirit.setMaxHealth,
					luminousSpirit.mobName,
					luminousSpirit.type,
					luminousSpirit.ability,
					luminousSpirit.intelligence,
					luminousSpirit.experienceDrop,
					luminousSpirit.lootDrop, 0, 0,
					luminousSpirit.respawnTime);
				mobsArray.push(newLuminousSpirit);
				//console.log(mobsArray);
			}
		}, luminousSpirit.respawnTime);
	}
}
class Specter extends Mob {
	constructor(setMinX, setMaxX, setMinY, setMaxY, x, y, appearance, ignoreSpellCollision, ignoreMobCollision, health, defense, damage, radius, radiusAdjust, setMinHealth, setMaxHealth, mobName, type, ability, intelligence, experienceDrop, lootDrop, state, frames, respawnTime) {
		super(setMinX, setMaxX, setMinY, setMaxY, x, y, appearance, ignoreSpellCollision, ignoreMobCollision, health, defense, damage, radius, radiusAdjust, setMinHealth, setMaxHealth, mobName, type, ability, intelligence, experienceDrop, lootDrop, state, frames, respawnTime);
			this.FOVRadius = 250;
		this.moveAngle = (Math.random() < 0.5 ? 1 : -1);
	}
	spawn() {
		setTimeout(function () {
			let totalSpecterCount = mobsArray.filter(element => element.mobName === "specter").length;
			if (totalSpecterCount < specter.maxAmount) {
				let specterRandomX = (((biome1.x - camera.x) + (Math.floor((Math.random() * (specter.setMaxX - specter.setMinX + 1)) + specter.setMinX))) / camera.zoom) + camera.x;
				let specterRandomY = (((biome1.y - camera.y) + (Math.floor((Math.random() * (specter.setMaxY - specter.setMinY + 1)) + specter.setMinY))) / camera.zoom) + camera.y;
				let specterRandomRadiusXHealth = Math.floor((Math.random() * (specter.setMaxHealth - specter.setMinHealth + 1)) + specter.setMinHealth);
				let newSpecter = new Specter(
				specter.setMinX, specter.setMaxX, specter.setMinY, specter.setMaxY,
				specterRandomX,
				specterRandomY,
				specter.appearance,
				specter.ignoreSpellCollision,
				specter.ignoreMobCollision,
				specterRandomRadiusXHealth,
				specter.defense,
				specter.damage,
				specterRandomRadiusXHealth,
				specter.radiusAdjust,
				specter.setMinHealth,
				specter.setMaxHealth,
				specter.mobName,
				specter.type,
				specter.ability,
				specter.intelligence,
				specter.experienceDrop,
				specter.lootDrop, 0, 0,
				specter.respawnTime);
			mobsArray.push(newSpecter);
			}
		}, specter.respawnTime);
	}
}

class DarkForestTree extends Mob {
	constructor(setMinX, setMaxX, setMinY, setMaxY, x, y, appearance, ignoreSpellCollision, ignoreMobCollision, health, defense, damage, radius, radiusAdjust, setMinHealth, setMaxHealth, mobName, type, ability, intelligence, experienceDrop, lootDrop, state, frames, respawnTime) {
		super(setMinX, setMaxX, setMinY, setMaxY, x, y, appearance, ignoreSpellCollision, ignoreMobCollision, health, defense, damage, radius, radiusAdjust, setMinHealth, setMaxHealth, mobName, type, ability, intelligence, experienceDrop, lootDrop, state, frames, respawnTime);
	}
	spawn() {
		setTimeout(function () {
			let totalDarkForestTreeCount = mobsArray.filter(element => element.mobName === "darkForestTree").length;
			if (totalDarkForestTreeCount < darkForestTree.maxAmount) {
				let darkForestTreeRandomX = (((biome1.x - camera.x) + (Math.floor((Math.random() * (darkForestTree.setMaxX - darkForestTree.setMinX + 1)) + darkForestTree.setMinX))) / camera.zoom) + camera.x;
				let darkForestTreeRandomY = (((biome1.y - camera.y) + (Math.floor((Math.random() * (darkForestTree.setMaxY - darkForestTree.setMinY + 1)) + darkForestTree.setMinY))) / camera.zoom) + camera.y;
				let darkForestTreeRandomRadiusXHealth = Math.floor((Math.random() * (darkForestTree.setMaxHealth - darkForestTree.setMinHealth + 1)) + darkForestTree.setMinHealth);
				let newDarkForestTree = new DarkForestTree(
					darkForestTree.setMinX, darkForestTree.setMaxX, darkForestTree.setMinY, darkForestTree.setMaxY,
					darkForestTreeRandomX,
					darkForestTreeRandomY,
					darkForestTree.appearance,
					darkForestTree.ignoreSpellCollision,
					darkForestTree.ignoreMobCollision,
					darkForestTreeRandomRadiusXHealth,
					darkForestTree.defense,
					darkForestTree.damage,
					darkForestTreeRandomRadiusXHealth,
					darkForestTree.radiusAdjust,
					darkForestTree.setMinHealth,
					darkForestTree.setMaxHealth,
					darkForestTree.mobName,
					darkForestTree.type,
					darkForestTree.ability,
					darkForestTree.intelligence,
					darkForestTree.experienceDrop,
					darkForestTree.lootDrop, 0, 0,
					darkForestTree.respawnTime);
				mobsArray.push(newDarkForestTree);
				//console.log(mobsArray);
			}
		}, darkForestTree.respawnTime);
	}
}
class DarkForestTreant extends Mob {
	constructor(setMinX, setMaxX, setMinY, setMaxY, x, y, appearance, ignoreSpellCollision, ignoreMobCollision, health, defense, damage, radius, radiusAdjust, setMinHealth, setMaxHealth, mobName, type, ability, intelligence, experienceDrop, lootDrop, state, frames, respawnTime) {
		super(setMinX, setMaxX, setMinY, setMaxY, x, y, appearance, ignoreSpellCollision, ignoreMobCollision, health, defense, damage, radius, radiusAdjust, setMinHealth, setMaxHealth, mobName, type, ability, intelligence, experienceDrop, lootDrop, state, frames, respawnTime);
	}
	spawn() {
		setTimeout(function () {
			let totalDarkForestTreantCount = mobsArray.filter(element => element.mobName === "darkForestTreant").length;
			if (totalDarkForestTreantCount < darkForestTreant.maxAmount) {
				let darkForestTreantRandomX = (((biome1.x - camera.x) + (Math.floor((Math.random() * (darkForestTreant.setMaxX - darkForestTreant.setMinX + 1)) + darkForestTreant.setMinX))) / camera.zoom) + camera.x;
				let darkForestTreantRandomY = (((biome1.y - camera.y) + (Math.floor((Math.random() * (darkForestTreant.setMaxY - darkForestTreant.setMinY + 1)) + darkForestTreant.setMinY))) / camera.zoom) + camera.y;
				let darkForestTreantRandomRadiusXHealth = Math.floor((Math.random() * (darkForestTreant.setMaxHealth - darkForestTreant.setMinHealth + 1)) + darkForestTreant.setMinHealth);
				let newDarkForestTreant = new DarkForestTreant(
					darkForestTreant.setMinX, darkForestTreant.setMaxX, darkForestTreant.setMinY, darkForestTreant.setMaxY,
                    darkForestTreantRandomX,
                    darkForestTreantRandomY,
                    darkForestTreant.appearance,
                    darkForestTreant.ignoreSpellCollision,
					darkForestTreant.ignoreMobCollision,
                    darkForestTreantRandomRadiusXHealth,
                    darkForestTreant.defense,
					darkForestTreant.damage,
                    darkForestTreantRandomRadiusXHealth,
					darkForestTreant.radiusAdjust,
                    darkForestTreant.setMinHealth,
                    darkForestTreant.setMaxHealth,
                    darkForestTreant.mobName,
                    darkForestTreant.type,
                    darkForestTreant.ability,
                    darkForestTreant.intelligence,
                    darkForestTreant.experienceDrop,
					darkForestTreant.lootDrop, 0, 0,
					darkForestTreant.respawnTime);
                mobsArray.push(newDarkForestTreant);
				//console.log(mobsArray);
			}
		}, darkForestTreant.respawnTime);
	}
}
