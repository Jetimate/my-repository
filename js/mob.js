class Mob {
	constructor(x, y, radius, color, health, damage, type, intelligence) {
	if (type == "image") {
		this.image = new Image();
		this.image.src = color;
	}
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;  
	this.health = health;
	this.damage = damage;
	this.type = type;
	this.intelligence = intelligence;
	this.speed = 0;
	this.angle = 0;
	this.moveAngle = 0;
	this.startingPos = {
		x,y
		}	
	}		
	update() {
		var ctx = myGameArea.context;
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);	
		if (this.type == "image") {
			ctx.drawImage(this.image, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
		} //draw hitbox
		ctx.beginPath();
		ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
		ctx.strokeStyle = "blue";
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}      
	newPos() {
		this.angle += this.moveAngle * Math.PI / 180;
		this.x += this.speed * Math.sin(this.angle);
		this.y -= this.speed * Math.cos(this.angle);
	}
	move() {
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
}
class BasicMob extends Mob {
	constructor(x, y, radius, color, health, damage, type, intelligence, experienceDrop) {
		super(x, y, radius, color, health, damage, type, intelligence);
		this.experienceDrop = experienceDrop;
		this.startingPos = {
			x, y
		}
	}
	spawn() {
		let me = this;
		setTimeout(function () {
			if (basicMobArray.length < maxAmountBasicMob) {
				let basicMobRandomX = Math.floor((Math.random() * (1250 - 100 + 1)) + 100);
				let basicMobRandomY = Math.floor((Math.random() * (750 - 100 + 1)) + 100);
				let basicMobRandomRadiusXHealth = Math.floor((Math.random() * (70 - 15 + 1)) + 15);
				let basicMobRandomExperienceDrop = Math.floor((Math.random() * (15 - 5 + 1)) + 5);
				let newBasicMob = new BasicMob(basicMobRandomX, basicMobRandomY, basicMobRandomRadiusXHealth, "green1.jpg", basicMobRandomRadiusXHealth, 1, "image", 0, basicMobRandomExperienceDrop);
				basicMobArray.push(newBasicMob);
				if (basicMobArray.length < maxAmountBasicMob) {
					me.spawn();
				}
			}
		}, 3000);
	}
}

class Stage2Mob extends Mob {
	constructor(x, y, radius, color, health, damage, type, intelligence, experienceDrop, state, frames) {
		super(x, y, radius, color, health, damage, type, intelligence);
		this.experienceDrop = experienceDrop;
		this.state = state;
		this.frames = frames;
		this.startingPos = {
			x, y
		}
		this.angle = 0;
		this.moveAngle = (Math.random() < 0.5 ? 1 : -1);
		this.speedX = 0;
		this.speedY = 0;
		this.speed = 0;
	}
	spawn() {
	let me = this;
		setTimeout(function () {
			if (stage2MobArray.length < maxAmountStage2Mob) {
				let stage2MobRandomX = Math.floor((Math.random() * (1250 - 100 + 1)) + 100);
				let stage2MobRandomY = Math.floor((Math.random() * (750 - 100 + 1)) + 100);
				let stage2MobRandomRadiusXHealth = Math.floor((Math.random() * (70 - 15 + 1)) + 15);
				let stage2MobRandomExperienceDrop = Math.floor((Math.random() * (20 - 5 + 1)) + 5);
				let newStage2Mob = new Stage2Mob(stage2MobRandomX, stage2MobRandomY, stage2MobRandomRadiusXHealth, "spider.png", stage2MobRandomRadiusXHealth, 1, "image", 1, stage2MobRandomExperienceDrop, 0, 0);
				stage2MobArray.push(newStage2Mob);
				if (stage2MobArray.length < maxAmountStage2Mob) {
					me.spawn();
				}
			}
		}, 4000);
	}
}