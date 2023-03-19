class SpellBook {
    constructor(x, y, radius, color, normalOrbitRadius, health, damage, respawnTime) {
		this.radian = 0;
		this.velocity = 0.05;
		this.normalOrbitRadius = normalOrbitRadius;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.orbitRadius = 10;
		this.health = health;
		this.damage = damage;
		this.respawnTime = respawnTime;
		this.startingPos = {
			x,
			y
		}	
    }

    draw() {
	var ctx = myGameArea.context;
        ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);		
		ctx.fillStyle = this.color;
		ctx.fill();
//		ctx.lineWidth = 1;
//		ctx.strokeStyle = "#000000";
//        ctx.stroke();
        ctx.closePath();
    }
	update() {		
		this.draw();
		this.x += this.velocity;
		this.y += this.velocity;
		this.radian += this.velocity; 
		this.x = this.startingPos.x + Math.cos(this.radian) * this.orbitRadius;
		this.y = this.startingPos.y + Math.sin(this.radian) * this.orbitRadius;
	}
}