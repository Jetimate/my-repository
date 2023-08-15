class BasicMob extends Mob {
	constructor(x, y, radius, color, health, damage) {
		super(x, y, radius, color, health, damage);
//		this.health = radius + 5;
		this.startingPos = {
			x, y
		}
	}
}