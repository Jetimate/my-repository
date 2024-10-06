class Loot {
	constructor(x, y, radius, name, spellName, appearance, ignoreCollision, text) {
		this.image = new Image();
		this.image.src = appearance;
		//this.radian = 0;
		this.angle = 0;
		//this.moveAngle = 0;
		this.lifeTimer = 0;
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.name = name;
		this.spellName = spellName;
		this.appearance = appearance;
		this.ignoreCollision = ignoreCollision;
		this.text = text;
	}
	handleCollisions() {
		for (let i = 0; i < lootsArray.length; i++) {
			for (let j = i + 1; j < lootsArray.length; j++) {
				const lootA = lootsArray[i];
				const lootB = lootsArray[j];

				const dx = lootB.x - lootA.x;
				const dy = lootB.y - lootA.y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (!this.ignoreCollision) {
					if (distance < lootA.radius + lootB.radius) {
						// Calculate knockback direction 
						const angle = Math.atan2(dy, dx);
						const knockbackDistance = (lootA.radius + lootB.radius - distance) / 2;

						// Apply knockback
						lootA.x -= Math.cos(angle) * knockbackDistance;
						lootA.y -= Math.sin(angle) * knockbackDistance;
						lootB.x += Math.cos(angle) * knockbackDistance;
						lootB.y += Math.sin(angle) * knockbackDistance;
					}
				}
			}
		}
	}
	destroy() {
		let lootIndex = lootsArray.indexOf(this);
		if (lootIndex > -1) {
			lootsArray.splice(lootIndex, 1);
		}
	}
	draw() {
		var ctx = myGameArea.context;
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);
		ctx.drawImage(this.image, -this.radius, -this.radius, this.radius * 2, this.radius * 2);

		ctx.beginPath();
		ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
		ctx.font = "15px Ubuntu";
		ctx.fillStyle = "black";
		ctx.fillText(this.text, 0 + 4 - this.radius , 0 - 20);
		ctx.lineWidth = 1;
		ctx.strokeStyle = "black";
		//ctx.moveTo(0, 0);
		//ctx.lineTo(0, 0 - this.radius);
		//ctx.stroke();
		ctx.closePath();

		ctx.restore();
	}
}
