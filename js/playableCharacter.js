class PlayableCharacter extends Mob {
	constructor(setMinX, setMaxX, setMinY, setMaxY, x, y, appearance, ignoreSpellCollision, ignoreMobCollision, health, defense, damage, radius, radiusAdjust, name, mana, experience, level, healthRegen, manaRegen) {
		super(setMinX, setMaxX, setMinY, setMaxY, x, y, appearance, ignoreSpellCollision, ignoreMobCollision, health, defense, damage, radius, radiusAdjust,);
		this.name = name;
		this.mana = mana;
		this.manaRegen = manaRegen;
		this.experience = experience;
		this.level = level;
		this.healthRegen = healthRegen;
		this.maxHealth = 100;
		this.maxMana = 10; //10
		this.movementX = 0;
		this.movementY = 0;
		this.speed = constantPlayerSpeed;	
		this.newSpeed = 0;
		this.side = "player1";
		this.summonSpace = 0;
		this.summonLimit = 20; //20
		this.pickUpRange = 20; //20
		this.spellBookSlotsUnlocked = 4;
		this.codeClass = "playableCharacter";
		this.hasTarget = false;
	}		
	playerNewPos() {
		if (keyMovement) {
			this.angle += this.moveAngle * Math.PI / 180;
			this.x += this.newSpeed * Math.sin(this.angle);
			this.y -= this.newSpeed * Math.cos(this.angle);
			myGameCharacter.x += myGameCharacter.movementX;
			myGameCharacter.y += myGameCharacter.movementY;
			// Ensure the entity stays within the canvas boundaries
			if (this.x < this.radius) this.x = this.radius;
			if (this.x > biome1.width - this.radius) this.x = biome1.width - this.radius;
			if (this.y < this.radius) this.y = this.radius;
			if (this.y > biome1.height - this.radius) this.y = biome1.height - this.radius;
		}
	}
	regenerateHealth() {
		if (this.maxHealth > this.health) {
			this.health += this.healthRegen;
		}
	}
	regenerateMana() {
		if (this.maxMana > this.mana) {
			this.mana += this.manaRegen;
		}
	}
}