class PlayableCharacter extends Mob {
	constructor(x, y, radius, color, health, damage, type, experience, level) {
		super(x, y, radius, color, health, damage, type);
		this.experience = experience;
		this.level = level;
		this.startingPos = {
		x,y
		}
		this.movementX = 0;
		this.movementY = 0;
		this.speed = 0;		
	}		
	playerNewPos() {
		this.angle += this.moveAngle * Math.PI / 180;
		this.x += this.speed * Math.sin(this.angle);
		this.y -= this.speed * Math.cos(this.angle);
		myGameCharacter.x += myGameCharacter.movementX;
		myGameCharacter.y += myGameCharacter.movementY;
	}
}