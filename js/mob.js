class Mob {
	constructor(x, y, radius, radiusAdjust, appearance, ignoreSpellCollision, ignoreMobCollision, health, defense, damage, mobName, type, ability, intelligence, experienceDrop, lootDrop, state, frames) {
	this.image = new Image();
	this.image.src = appearance;
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.radiusAdjust = radiusAdjust;
	this.appearance = appearance;  
	this.ignoreSpellCollision = ignoreSpellCollision;
	this.ignoreMobCollision = ignoreMobCollision;
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
	constructor(x, y, radius, radiusAdjust, appearance, ignoreSpellCollision, ignoreMobCollision, health, defense, damage, mobName, type, ability, intelligence, experienceDrop, lootDrop, state, frames) {
		super(x, y, radius, radiusAdjust, appearance, ignoreSpellCollision, ignoreMobCollision, health, defense, damage, mobName, type, ability, intelligence, experienceDrop, lootDrop, state, frames);
	}
	spawn() {
		setTimeout(function () {
			let totalLuminousRockCount = mobsArray.filter(element => element.mobName === "luminousRock").length;
			if (totalLuminousRockCount < luminousRock.maxAmount) {
				let luminousRockRandomX = (((biome1.x - camera.x) + (Math.floor((Math.random() * (1700 - 10 + 1)) + 10))) / camera.zoom) + camera.x;
				let luminousRockRandomY = (((biome1.y - camera.y) + (Math.floor((Math.random() * (1000 - 10 + 1)) + 10))) / camera.zoom) + camera.y;
				let luminousRockRandomRadiusXHealth = Math.floor((Math.random() * (70 - 20 + 1)) + 20);
				let luminousRockRandomExperienceDrop = Math.floor((Math.random() * (15 - 10 + 1)) + 10);
				let newLuminousRock = new LuminousRock(
					luminousRockRandomX,
					luminousRockRandomY,
					luminousRockRandomRadiusXHealth,
					luminousRock.radiusAdjust,
					luminousRock.appearance,
					luminousRock.ignoreSpellCollision,
					luminousRock.ignoreMobCollision,
					luminousRockRandomRadiusXHealth,
					luminousRock.defense,
					luminousRock.damage,
					luminousRock.mobName,
					luminousRock.type,
					luminousRock.ability,
					luminousRock.intelligence,
					luminousRockRandomExperienceDrop,
					luminousRock.lootDrop, 0, 0);
				mobsArray.push(newLuminousRock);
				//console.log(mobsArray);
			}
		}, luminousRock.respawnTime);
	}
}

class LuminousSpirit extends Mob {
	constructor(x, y, radius, radiusAdjust, appearance, ignoreSpellCollision, ignoreMobCollision, health, defense, damage, mobName, type, ability, intelligence, experienceDrop, lootDrop, state, frames) {
		super(x, y, radius, radiusAdjust, appearance, ignoreSpellCollision, ignoreMobCollision, health, defense, damage, mobName, type, ability, intelligence, experienceDrop, lootDrop, state, frames);
		this.moveAngle = (Math.random() < 0.5 ? 1 : -1);
	}
	spawn() {
		setTimeout(function () {
			let totalLuminousSpiritCount = mobsArray.filter(element => element.mobName === "luminousSpirit").length;
			if (totalLuminousSpiritCount < luminousSpirit.maxAmount) {
				let luminousSpiritRandomX = (((biome1.x - camera.x) + (Math.floor((Math.random() * (2000 - 1000 + 1)) + 1000))) / camera.zoom) + camera.x;
				let luminousSpiritRandomY = (((biome1.y - camera.y) + (Math.floor((Math.random() * (1000 - 10 + 1)) + 10))) / camera.zoom) + camera.y;
				let luminousSpiritRandomRadiusXHealth = Math.floor((Math.random() * (70 - 25 + 1)) + 25);
				let luminousSpiritRandomExperienceDrop = Math.floor((Math.random() * (20 - 15 + 1)) + 15);
				let newLuminousSpirit = new LuminousSpirit(
					luminousSpiritRandomX,
					luminousSpiritRandomY,
					luminousSpiritRandomRadiusXHealth,
					luminousSpirit.radiusAdjust,
					luminousSpirit.appearance,
					luminousSpirit.ignoreSpellCollision,
					luminousSpirit.ignoreMobCollision,
					luminousSpiritRandomRadiusXHealth,
					luminousSpirit.defense,
					luminousSpirit.damage,
					luminousSpirit.mobName,
					luminousSpirit.type,
					luminousSpirit.ability,
					luminousSpirit.intelligence,
					luminousSpiritRandomExperienceDrop,
					luminousSpirit.lootDrop, 0, 0);
				mobsArray.push(newLuminousSpirit);
				//console.log(mobsArray);
			}
		}, luminousSpirit.respawnTime);
	}
}
class Specter extends Mob {
	constructor(x, y, radius, radiusAdjust, appearance, ignoreSpellCollision, ignoreMobCollision, health, defense, damage, mobName, type, ability, intelligence, experienceDrop, lootDrop, state, frames) {
		super(x, y, radius, radiusAdjust, appearance, ignoreSpellCollision, ignoreMobCollision, health, defense, damage, mobName, type, ability, intelligence, experienceDrop, lootDrop, state, frames);
		this.FOVRadius = 250;
		this.moveAngle = (Math.random() < 0.5 ? 1 : -1);
	}
	spawn() {
		setTimeout(function () {
			let totalSpecterCount = mobsArray.filter(element => element.mobName === "specter").length;
			if (totalSpecterCount < specter.maxAmount) {
				let specterRandomX = (((biome1.x - camera.x) + (Math.floor((Math.random() * (2000 - 1500 + 1)) + 1500))) / camera.zoom) + camera.x;
				let specterRandomY = (((biome1.y - camera.y) + (Math.floor((Math.random() * (1000 - 10 + 1)) + 10))) / camera.zoom) + camera.y;
				let specterRandomRadiusXHealth = Math.floor((Math.random() * (80 - 25 + 1)) + 25);
				let specterRandomExperienceDrop = Math.floor((Math.random() * (30 - 20 + 1)) + 20);
				let newSpecter = new Specter(
					specterRandomX,
					specterRandomY,
					specterRandomRadiusXHealth,
					specter.radiusAdjust,
					specter.appearance,
					specter.ignoreSpellCollision,
					specter.ignoreMobCollision,
					specterRandomRadiusXHealth,
					specter.defense,
					specter.damage,
					specter.mobName,
					specter.type,
					specter.ability,
					specter.intelligence,
					specterRandomExperienceDrop,
					specter.lootDrop, 0, 0);
				mobsArray.push(newSpecter);
			}
		}, specter.respawnTime);
	}
}

class DarkForestTree extends Mob {
	constructor(x, y, radius, radiusAdjust, appearance, ignoreSpellCollision, ignoreMobCollision, health, defense, damage, mobName, type, ability, intelligence, experienceDrop, lootDrop, state, frames) {
		super(x, y, radius, radiusAdjust, appearance, ignoreSpellCollision, ignoreMobCollision, health, defense, damage, mobName, type, ability, intelligence, experienceDrop, lootDrop, state, frames);
	}
	spawn() {
		setTimeout(function () {
			let totalDarkForestTreeCount = mobsArray.filter(element => element.mobName === "darkForestTree").length;
			if (totalDarkForestTreeCount < darkForestTree.maxAmount) {
				let darkForestTreeRandomX = (((biome1.x - camera.x) + (Math.floor((Math.random() * (1700 - 10 + 1)) + 10))) / camera.zoom) + camera.x;
				let darkForestTreeRandomY = (((biome1.y - camera.y) + (Math.floor((Math.random() * (1000 - 10 + 1)) + 10))) / camera.zoom) + camera.y;
				let darkForestTreeRandomRadiusXHealth = Math.floor((Math.random() * (70 - 20 + 1)) + 20);
				let darkForestTreeRandomExperienceDrop = Math.floor((Math.random() * (15 - 10 + 1)) + 10);
				let newDarkForestTree = new DarkForestTree(
					darkForestTreeRandomX,
					darkForestTreeRandomY,
					darkForestTreeRandomRadiusXHealth,
					darkForestTree.radiusAdjust,
					darkForestTree.appearance,
					darkForestTree.ignoreSpellCollision,
					darkForestTree.ignoreMobCollision,
					darkForestTreeRandomRadiusXHealth,
					darkForestTree.defense,
					darkForestTree.damage,
					darkForestTree.mobName,
					darkForestTree.type,
					darkForestTree.ability,
					darkForestTree.intelligence,
					darkForestTreeRandomExperienceDrop,
					darkForestTree.lootDrop, 0, 0);
				mobsArray.push(newDarkForestTree);
				//console.log(mobsArray);
			}
		}, darkForestTree.respawnTime);
	}
}
class DarkForestTreant extends Mob {
	constructor(x, y, radius, radiusAdjust, appearance, ignoreSpellCollision, ignoreMobCollision, health, defense, damage, mobName, type, ability, intelligence, experienceDrop, lootDrop, state, frames) {
		super(x, y, radius, radiusAdjust, appearance, ignoreSpellCollision, ignoreMobCollision, health, defense, damage, mobName, type, ability, intelligence, experienceDrop, lootDrop, state, frames);
	}
	spawn() {
		setTimeout(function () {
			let totalDarkForestTreantCount = mobsArray.filter(element => element.mobName === "darkForestTreant").length;
			if (totalDarkForestTreantCount < darkForestTreant.maxAmount) {
				let darkForestTreantRandomX = (((biome1.x - camera.x) + (Math.floor((Math.random() * (1700 - 10 + 1)) + 10))) / camera.zoom) + camera.x;
				let darkForestTreantRandomY = (((biome1.y - camera.y) + (Math.floor((Math.random() * (1000 - 10 + 1)) + 10))) / camera.zoom) + camera.y;
				let darkForestTreantRandomRadiusXHealth = Math.floor((Math.random() * (70 - 20 + 1)) + 20);
				let darkForestTreantRandomExperienceDrop = Math.floor((Math.random() * (15 - 10 + 1)) + 10);
				let newDarkForestTreant = new DarkForestTreant(
					darkForestTreantRandomX,
					darkForestTreantRandomY,
					darkForestTreantRandomRadiusXHealth,
					darkForestTreant.radiusAdjust,
					darkForestTreant.appearance,
					darkForestTreant.ignoreSpellCollision,
					darkForestTreant.ignoreMobCollision,
					darkForestTreantRandomRadiusXHealth,
					darkForestTreant.defense,
					darkForestTreant.damage,
					darkForestTreant.mobName,
					darkForestTreant.type,
					darkForestTreant.ability,
					darkForestTreant.intelligence,
					darkForestTreantRandomExperienceDrop,
					darkForestTreant.lootDrop, 0, 0);
				mobsArray.push(newDarkForestTreant);
				//console.log(mobsArray);
			}
		}, darkForestTreant.respawnTime);
	}
}
