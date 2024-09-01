class SpellBook {
	constructor(x, y, radius, type, color, positionIndex, normalOrbitRadius, defendOrbitRadius, attackOrbitRadius, health, damage, respawnTime) {
		if (type == "image") {
			this.image = new Image();
			this.image.src = color;
		}
		this.type = type;
		this.radian = 0;
		this.speed = 3;
		this.angle = 0;
		this.moveAngle = 0;
		this.targetX = null;
		this.targetY = null;
        this.x = x;
        this.y = y;
        this.radius = radius;
		this.color = color;
		this.positionIndex = positionIndex;
		this.normalOrbitRadius = normalOrbitRadius;
		this.defendOrbitRadius = defendOrbitRadius;
		this.attackOrbitRadius = attackOrbitRadius;
        this.orbitRadius = 10;
		this.health = health;
		this.damage = damage;
		this.respawnTime = respawnTime;
		this.startingPos = {
			x,
			y
		};	
    }

	setTarget(x, y) {
		this.targetX = x;
		this.targetY = y;
	}
	handleCollisions() {
		for (let i = 0; i < spellBooks.length; i++) {
			for (let j = i + 1; j < spellBooks.length; j++) {
				const spellBookA = spellBooks[i];
				const spellBookB = spellBooks[j];

				const dx = spellBookB.x - spellBookA.x;
				const dy = spellBookB.y - spellBookA.y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < spellBookA.radius + spellBookB.radius) {
					// Calculate knockback direction
					const angle = Math.atan2(dy, dx);
					const knockbackDistance = (spellBookA.radius + spellBookB.radius - distance) / 2;

					// Apply knockback
					spellBookA.x -= Math.cos(angle) * knockbackDistance;
					spellBookA.y -= Math.sin(angle) * knockbackDistance;
					spellBookB.x += Math.cos(angle) * knockbackDistance;
					spellBookB.y += Math.sin(angle) * knockbackDistance;
				}
			}
		}
	}
    draw() {
		var ctx = myGameArea.context;
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);
		if (this.type == "image") {
			ctx.drawImage(this.image, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
		} 
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
			spellBooks.forEach(spellBook => spellBook.setTarget(mouseX, mouseY));
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
			const targetX = myGameCharacter.x + Math.cos(this.positionIndex * (Math.PI * 2 / maxSpellBooks)) * this.orbitRadius;
			const targetY = myGameCharacter.y + Math.sin(this.positionIndex * (Math.PI * 2 / maxSpellBooks)) * this.orbitRadius;
			this.angle = Math.atan2(targetY - this.y, targetX - this.x) - (1.5 * Math.PI);
			this.positionIndex += 0.09;
			this.x += this.speed * Math.sin(this.angle);
			this.y -= this.speed * Math.cos(this.angle);
		}

		this.handleCollisions();
		this.draw();
	}	
}