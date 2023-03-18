class Mob {
	constructor(x, y, radius, color, health, damage) {
	this.speedX = 0;
    this.speedY = 0;
	this.speed = 2;
    this.radius = radius;
	this.color = color;  
	this.health = health;
	this.damage = damage;
    this.x = x;
    this.y = y;   
		this.startingPos = {
		x,y
		}	
	}		
    update() {
		var ctx = myGameArea.context;
		ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
		ctx.fill();
//		ctx.lineWidth = 1;
//		ctx.strokeStyle = "#000000";
//      ctx.stroke();
        ctx.closePath();
    }      
}