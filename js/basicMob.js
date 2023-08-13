class BasicMob extends Mob {
	constructor(x, y, radius, color, damage) {
		super(x, y, radius, color, radius, damage);
//		this.health = radius;
		this.startingPos = {
			x, y
		}
	}
}