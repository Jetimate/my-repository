class PlayableCharacter extends Mob {
	constructor(x, y, radius, color, health, damage, type, experience, level) {
		super(x, y, radius, color, health, damage, type);
		this.experience = experience;
		this.level = level;
		this.startingPos = {
		x,y
		}
		this.speedX = 0;
	    this.speedY = 0;
		this.speed = 0;		
	}		
}