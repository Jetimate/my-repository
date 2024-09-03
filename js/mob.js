class Mob {
	constructor(x, y, radius, appearance, health, damage, mobName, type, ability, intelligence, experienceDrop, state, frames) {
	this.image = new Image();
	this.image.src = appearance;
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.appearance = appearance;  
	this.health = health;
	this.damage = damage;
	this.mobName = mobName;
	this.type = type;
	this.ability = ability;
	this.intelligence = intelligence;
	this.experienceDrop = experienceDrop;
	this.state = state;
	this.frames = frames;
	this.healthRegen = 0;
	this.speed = 0;
	this.angle = 0;
	this.moveAngle = 0;
	this.FOVRadius = radius;
	this.startingPos = {
		x,y
		}	
	}		
	update() {
		var ctx = myGameArea.context;
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);	
		ctx.drawImage(this.image, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
	    //draw FOVRadius
		/*
		ctx.beginPath();
		ctx.arc(0, 0, this.FOVRadius, 0, 2 * Math.PI);
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
	interact() {
		if (this.intelligence == 1) {
			switch (this.state) {
				case 0:
					if (this.frames < 120) {
						this.frames++;
					} else {
						this.moveAngle = 0;
						this.frames = 0;
						setTimeout(() => this.update(), 2000);
						this.state = 1;
						return;
					}
					break;

				case 1:
					if (this.frames < 120) {
						this.speed = 2;
						// Ensure the entity stays within the canvas boundaries
						if (this.x < this.radius) this.x = this.radius;
						if (this.x > canvas.width - this.radius) this.x = canvas.width - this.radius;
						if (this.y < this.radius) this.y = this.radius;
						if (this.y > canvas.height - this.radius) this.y = canvas.height - this.radius;
						this.frames++;
					} else {
						this.speed = 0;
						this.frames = 0;
						setTimeout(() => this.update(), 2000); // Stop for 2 seconds
						this.moveAngle = (Math.random() < 0.5 ? 1 : -1);
						this.state = 0;
						return;
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
			}
		}
	}
}
class LuminousRock extends Mob {
	constructor(x, y, radius, appearance, health, damage, mobName, type, ability, intelligence, experienceDrop, state, frames) {
		super(x, y, radius, appearance, health, damage, mobName, type, ability, intelligence, experienceDrop, state, frames);
		this.startingPos = {
			x, y
		}
	}
	spawn() {
		let me = this;
		setTimeout(function () {
			let totalLuminousRockCount = mobsArray.filter(element => element.mobName === "luminousRock").length;
			if (totalLuminousRockCount < maxAmountLuminousRock) {
				let luminousRockRandomX = Math.floor((Math.random() * (1250 - 100 + 1)) + 100);
				let luminousRockRandomY = Math.floor((Math.random() * (750 - 100 + 1)) + 100);
				let luminousRockRandomRadiusXHealth = Math.floor((Math.random() * (70 - 15 + 1)) + 15);
				let luminousRockRandomExperienceDrop = Math.floor((Math.random() * (15 - 5 + 1)) + 5);
				let luminousRock = new LuminousRock(luminousRockRandomX, luminousRockRandomY, luminousRockRandomRadiusXHealth, "luminousRock.png", luminousRockRandomRadiusXHealth, 1, "luminousRock", "passive", "nothing", 0, luminousRockRandomExperienceDrop, 0, 0);
				mobsArray.push(luminousRock);
				if (totalLuminousRockCount < maxAmountLuminousRock) {
					me.spawn();
				}
			}
		}, 3000);
	}
}

class LuminousSpirit extends Mob {
	constructor(x, y, radius, appearance, health, damage, mobName, type, ability, intelligence, experienceDrop, state, frames) {
		super(x, y, radius, appearance, health, damage, mobName, type, ability, intelligence, experienceDrop, state, frames);
		this.startingPos = {
			x, y
		}
		this.moveAngle = (Math.random() < 0.5 ? 1 : -1);
	}
	spawn() {
		let me = this;
		setTimeout(function () {
			let totalLuminousSpiritCount = mobsArray.filter(element => element.mobName === "luminousSpirit").length;
			if (totalLuminousSpiritCount < maxAmountLuminousSpirit) {
				let luminousSpiritRandomX = Math.floor((Math.random() * (1250 - 100 + 1)) + 100);
				let luminousSpiritRandomY = Math.floor((Math.random() * (750 - 100 + 1)) + 100);
				let luminousSpiritRandomRadiusXHealth = Math.floor((Math.random() * (70 - 15 + 1)) + 15);
				let luminousSpiritRandomExperienceDrop = Math.floor((Math.random() * (20 - 5 + 1)) + 5);
				let luminousSpirit = new LuminousSpirit(luminousSpiritRandomX, luminousSpiritRandomY, luminousSpiritRandomRadiusXHealth, "luminousSpirit.png", luminousSpiritRandomRadiusXHealth, 5, "luminousSpirit", "passive", "nothing", 1, luminousSpiritRandomExperienceDrop, 0, 0);
				mobsArray.push(luminousSpirit);
				if (totalLuminousSpiritCount < maxAmountLuminousSpirit) {
					me.spawn();
				}
			}
		}, 4000);
	}
}
class Specter extends Mob {
	constructor(x, y, radius, appearance, health, damage, mobName, type, ability, intelligence, experienceDrop, state, frames) {
		super(x, y, radius, appearance, health, damage, mobName, type, ability, intelligence, experienceDrop, state, frames);
		this.startingPos = {
			x, y
		}
		this.FOVRadius = 250;
		this.moveAngle = (Math.random() < 0.5 ? 1 : -1);
	}
	spawn() {
		let me = this;
		setTimeout(function () {
			let totalSpecterCount = mobsArray.filter(element => element.mobName === "specter").length;
			if (totalSpecterCount < maxAmountSpecter) {
				let specterRandomX = Math.floor((Math.random() * (1250 - 100 + 1)) + 100);
				let specterRandomY = Math.floor((Math.random() * (750 - 100 + 1)) + 100);
				let specterRandomRadiusXHealth = Math.floor((Math.random() * (70 - 15 + 1)) + 15);
				let specterRandomExperienceDrop = Math.floor((Math.random() * (20 - 5 + 1)) + 5);
				let specter = new Specter(specterRandomX, specterRandomY, specterRandomRadiusXHealth, "specter.png", specterRandomRadiusXHealth, 5, "specter", "hostile", "nothing", 1, specterRandomExperienceDrop, 0, 0);
				mobsArray.push(specter);
				if (totalSpecterCount < maxAmountSpecter) {
					me.spawn();
				}
			}
		}, 8000);
	}
}
