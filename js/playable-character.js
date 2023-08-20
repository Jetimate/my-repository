class PlayableCharacter extends Mob {
	constructor(x, y, radius, color, health, damage, experience) {
		super(x, y, radius, color, health, damage);
		this.experience = experience;
		this.startingPos = {
		x,y
		}
		this.speedX = 0;
	    this.speedY = 0;
		this.speed = 4;		
	}		
}