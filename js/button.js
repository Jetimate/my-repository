class Button {
    constructor(xPoint, yPoint, width, height, radii, color, name, text) {
        this.xPoint = xPoint;
        this.yPoint = yPoint;
        this.width = width;
        this.height = height;
		this.radii = radii;
		this.color = color;
		this.name = name;
		this.text = text;
    }

	draw(ctx) {
        ctx.beginPath();
        ctx.roundRect(this.xPoint, this.yPoint, this.width, this.height, this.radii);
		ctx.strokeStyle = "black";
		ctx.strokeWidth = "2";
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.stroke();
		ctx.font = "25px Ubuntu";
		ctx.fillStyle = "black";
		ctx.fillText(this.text, this.xPoint + 5, this.yPoint + (this.height / 1.5));
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
			this.text = "health: " + myGameCharacter.health;
		}
		if (this.name == "manaBarButton") {
			this.text = "mana: " + myGameCharacter.mana;
		}
	}
	
	clickButton(xmouse, ymouse) {
		console.log("window x: " + xmouse + " window y: " + ymouse);
		const distance = 
		Math.sqrt(xmouse >= this.xPoint && xmouse < this.width + this.xPoint && ymouse >= this.yPoint && ymouse < this.height + this.yPoint);
		if (distance) {
			console.log("a canvas button was clicked");
		}
	}
}
