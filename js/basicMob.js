class BasicMob extends Mob {
	constructor(x, y, radius, color, health, damage, experienceDrop) {
		super(x, y, radius, color, health, damage);
		this.experienceDrop = experienceDrop;
//		this.health = radius + 5;
		this.startingPos = {
			x, y
		}
	}
}

class StageTwoMob extends Mob {
	constructor(x, y, radius, color, health, damage) {
		super(x, y, radius, color, health, damage);
		this.startingPos = {
			x, y
		}
		this.speedX = 0;
		this.speedY = 0;
		this.speed = 4;	
	}
}