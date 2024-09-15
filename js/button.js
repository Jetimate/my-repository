class Button {
    constructor(x, y, width, height, radii, color, name, text) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
		this.radii = radii;
		this.color = color;
		this.name = name;
		this.text = text;
    }

	draw(ctx) {
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, this.radii);
		ctx.strokeStyle = "black";
		ctx.lineWidth = "2";
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.stroke();
		ctx.font = "25px Ubuntu";
		ctx.fillStyle = "black";
		ctx.fillText(this.text, this.x + 5, this.y + (this.height / 1.5));
        ctx.closePath();
	}
	update() {
		if (this.name == "levelBarButton") {
			this.text = "level: " + myGameCharacter.level;
		}
		if (this.name == "experienceBarButton") {
			this.text = "experience: " + myGameCharacter.experience;
		}
		if (this.name == "healthBarButton") {
			this.text = "health: " + myGameCharacter.health + "/" + myGameCharacter.maxHealth;
		}
		if (this.name == "manaBarButton") {
			this.text = "mana: " + myGameCharacter.mana;
		}
	}
	
	clickButton(xmouse, ymouse) {
		//console.log("window x: " + xmouse + " window y: " + ymouse);
		const distance = 
		Math.sqrt(xmouse >= this.x && xmouse < this.width + this.x && ymouse >= this.y && ymouse < this.height + this.y);
		if (distance) {
			console.log("a canvas button was clicked");
		}
	}
}
