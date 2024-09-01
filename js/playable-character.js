class PlayableCharacter extends Mob {
	constructor(x, y, radius, color, health, mana, damage, type, experience, level, healthRegen, manaRegen) {
		super(x, y, radius, color, health, damage, type);
		this.mana = mana;
		this.manaRegen = manaRegen;
		this.maxMana = 200;
		this.experience = experience;
		this.level = level;
		this.healthRegen = healthRegen;
		this.maxHealth = 100;
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
	regenerateHealth() {
		if (this.health < this.maxHealth) {
//			let playerHealth = myGameCharacter.health;
//			let healthSubstringed = playerHealth.substring(0, 4)
			this.health += this.healthRegen;
			healthBarButton.text = "health: " + myGameCharacter.health;
		}
	}
	regenerateMana() {
		if (this.mana < this.maxMana) {
			this.mana += this.manaRegen;
			manaBarButton.text = "mana: " + myGameCharacter.mana;
		}
	}
}