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
}
class BasicMob extends Mob {
	constructor(x, y, radius, color, health, damage, type, intelligence, experienceDrop) {
		super(x, y, radius, color, health, damage, type, intelligence);
		this.experienceDrop = experienceDrop;
		//		this.health = radius + 5;
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
				let newBasicMob = new BasicMob(basicMobRandomX, basicMobRandomY, basicMobRandomRadiusXHealth, "green1.jpg", basicMobRandomRadiusXHealth, 1, "image", basicMobRandomExperienceDrop);
				basicMobArray.push(newBasicMob);
				if (basicMobArray.length < maxAmountBasicMob) {
					me.spawn();
				}
			}
		}, 3000);
	}
}

class Stage2Mob extends Mob {
	constructor(x, y, radius, color, health, damage, type, intelligence, experienceDrop) {
		super(x, y, radius, color, health, damage, type, intelligence);
		this.experienceDrop = experienceDrop;
		this.startingPos = {
			x, y
		}
		this.speedX = 0;
		this.speedY = 0;
		this.speed = 4;
	}
	spawn() {
	let me = this;
		setTimeout(function () {
			if (stage2MobArray.length < maxAmountStage2Mob) {
				let stage2MobRandomX = Math.floor((Math.random() * (1250 - 100 + 1)) + 100);
				let stage2MobRandomY = Math.floor((Math.random() * (750 - 100 + 1)) + 100);
				let stage2MobRandomRadiusXHealth = Math.floor((Math.random() * (70 - 15 + 1)) + 15);
				let stage2MobRandomExperienceDrop = Math.floor((Math.random() * (20 - 5 + 1)) + 5);
				let newStage2Mob = new Stage2Mob(stage2MobRandomX, stage2MobRandomY, stage2MobRandomRadiusXHealth, "green2.webp", stage2MobRandomRadiusXHealth, 1, "image", stage2MobRandomExperienceDrop);
				stage2MobArray.push(newStage2Mob);
				if (stage2MobArray.length < maxAmountStage2Mob) {
					me.spawn();
				}
			}
		}, 4000);
	}
	move() {
		let me = this;
		setTimeout(function () {
			
		}, 4000);
	}
}