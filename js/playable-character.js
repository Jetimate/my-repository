class PlayableCharacter extends Mob {
	constructor(x, y, radius, color, health, damage) {
    super(x, y, radius, color, health, damage);
		this.startingPos = {
		x,y
		}
	this.speedX = 0;
    this.speedY = 0;
	this.speed = 2;		
	}		
}