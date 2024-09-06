class Spell {
	constructor(x, y, radius, appearance, positionIndex, health, damage, respawnTime) {
		this.image = new Image();
		this.image.src = appearance;
		this.radian = 0;
		this.speed = 3;
		this.angle = 0;
		this.moveAngle = 0;
		this.targetX = null;
		this.targetY = null;
        this.x = x;
        this.y = y;
        this.radius = radius;
		this.appearance = appearance;
		this.positionIndex = positionIndex;
		this.health = health;
		this.damage = damage;
		this.respawnTime = respawnTime;
		this.startingPos = {
			x: myGameCharacter.x,
			y: myGameCharacter.y
		}
    }

	setTarget(x, y) {
		this.targetX = x;
		this.targetY = y;
	}
	handleCollisions() {
		for (let i = 0; i < spellsArray.length; i++) {
			for (let j = i + 1; j < spellsArray.length; j++) {
				const spellA = spellsArray[i];
				const spellB = spellsArray[j];

				const dx = spellB.x - spellA.x;
				const dy = spellB.y - spellA.y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < spellA.radius + spellB.radius) {
					// Calculate knockback direction
					const angle = Math.atan2(dy, dx);
					const knockbackDistance = (spellA.radius + spellB.radius - distance) / 2;

					// Apply knockback
					spellA.x -= Math.cos(angle) * knockbackDistance;
					spellA.y -= Math.sin(angle) * knockbackDistance;
					spellB.x += Math.cos(angle) * knockbackDistance;
					spellB.y += Math.sin(angle) * knockbackDistance;
				}
			}
		}
	}
    draw() {
		var ctx = myGameArea.context;
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);
		ctx.drawImage(this.image, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
		
		/*
		ctx.beginPath();
		ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);	
		ctx.lineWidth = 1;
		ctx.strokeStyle = "blue";
		ctx.moveTo(0, 0);
		ctx.lineTo(0, 0 - this.radius);
        ctx.stroke();
		ctx.closePath();
		*/
		ctx.restore();
    }
	update() {
		if (isMouseDown) {
			spellsArray.forEach(spell => spell.setTarget(mouseX, mouseY));
			let mouseXStabilizer = mouseX % this.speed;
			mouseX -= mouseXStabilizer;
			let mouseYStabilizer = mouseY % this.speed;
			mouseY -= mouseYStabilizer;
			let dx = mouseX - this.x;
			let dy = mouseY - this.y;
			this.angle = Math.atan2(dy, dx) - (1.5 * Math.PI);
			this.x += this.speed * Math.sin(this.angle);
			this.y -= this.speed * Math.cos(this.angle);
		} else {
			// Calculate target orbit position
			let targetX = myGameCharacter.x + Math.cos(this.positionIndex * (Math.PI * 2 / summonSpecter.maxAmount)) * (myGameCharacter.radius * 5);
			let targetY = myGameCharacter.y + Math.sin(this.positionIndex * (Math.PI * 2 / summonSpecter.maxAmount)) * (myGameCharacter.radius * 5);

			// Calculate distance to target orbit position
			const dx = targetX - this.x;
			const dy = targetY - this.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			// Adjust speed based on the distance (e.g., speed scales with distance)
			const minSpeed = this.speed / 4;
			const maxSpeed = this.speed;
			const speedFactor = Math.min(distance / 10, maxSpeed); // Scale speed based on distance
			const adjustedSpeed = Math.max(speedFactor, minSpeed); // Ensure speed is not too slow

			// Calculate the movement angle and update position
			this.angle = Math.atan2(targetY - this.y, targetX - this.x) - (1.5 * Math.PI);
			this.positionIndex += 0.01;
			this.x += adjustedSpeed * Math.sin(this.angle);
			this.y -= adjustedSpeed * Math.cos(this.angle);
		}

		this.handleCollisions();
		this.draw();
	}	
}