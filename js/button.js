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
		this.toggle = false;
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
			this.text = "experience: " + myGameCharacter.experience + "/" + maxExperience;
		}
		if (this.name == "healthBarButton") {
			this.text = "health: " + myGameCharacter.health + "/" + myGameCharacter.maxHealth;
		}
		if (this.name == "manaBarButton") {
			this.text = "mana: " + myGameCharacter.mana;
		}
		if (this.name == "showInventory") {
			let totalCastSpikeLootDropCount = inventoryArray.filter(element => element.name === "castSpikeLootDrop").length;
			this.text = "spike: " + totalCastSpikeLootDropCount;
		}
	}
	
	clickButton(xmouse, ymouse) {
		const distance = Math.sqrt(xmouse >= this.x && xmouse < this.width + this.x && ymouse >= this.y && ymouse < this.height + this.y);
		if (distance) {
			console.log(this.name + " was clicked");
			if (this.name == "inventoryButton" && !this.toggle) {
				this.toggle = true;
				let totalCastSpikeLootDropCount = inventoryArray.filter(element => element.name === "castSpikeLootDrop").length;
				addButton(new Button(5, 280, 250, 600, [5], "#e3a04d", "showInventory", "spike: " + totalCastSpikeLootDropCount));
				console.log(inventoryArray);
			} else if (this.name == "inventoryButton" && this.toggle) {
				this.toggle = false;
				let showInventoryButtonIndex = buttonsArray.findIndex(element => element.name === "showInventory");
				if (showInventoryButtonIndex !== -1) {
					buttonsArray.splice(showInventoryButtonIndex, 1);
				}
			}
		}
	}
}
