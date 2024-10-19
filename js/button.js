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
		if (this.name == "levelBarButton") {
			this.text = "level: " + myGameCharacter.level;
			ctx.fillText(this.text, this.x + 5, this.y + (this.height / 1.5));
		}
		if (this.name == "experienceBarButton") {
			this.text = "experience: " + myGameCharacter.experience + "/" + maxExperience;
			ctx.fillText(this.text, this.x + 5, this.y + (this.height / 1.5));
		}
		if (this.name == "healthBarButton") {
			this.text = "health: " + myGameCharacter.health + "/" + myGameCharacter.maxHealth;
			ctx.fillText(this.text, this.x + 5, this.y + (this.height / 1.5));
		}
		if (this.name == "manaBarButton") {
			this.text = "mana: " + myGameCharacter.mana;
			ctx.fillText(this.text, this.x + 5, this.y + (this.height / 1.5));
		}
		if (this.name == "inventoryButton") {
			this.text = "inventory";
			ctx.fillText(this.text, this.x + 5, this.y + (this.height / 1.5));
		}
		if (this.name == "showInventory") {
			let totalCastSpikeLootDropCount = inventoryArray.filter(element => element.name === "castSpikeLootDrop").length;
			this.text1 = "spike pages: " + totalCastSpikeLootDropCount;
			ctx.fillText(this.text1, this.x + 5, this.y + 30);

			let totalCastLuminousEnergyLootDropCount = inventoryArray.filter(element => element.name === "castLuminousEnergyLootDrop").length;
			this.text2 = "luminousEnergy pages: " + totalCastLuminousEnergyLootDropCount;
			ctx.fillText(this.text2, this.x + 5, this.y + 60);

			let totalSummonSpiritLootDropCount = inventoryArray.filter(element => element.name === "summonSpiritLootDrop").length;
			this.text3 = "spirit pages: " + totalSummonSpiritLootDropCount;
			ctx.fillText(this.text3, this.x + 5, this.y + 90);

			let totalSummonSpecterLootDropCount = inventoryArray.filter(element => element.name === "summonSpecterLootDrop").length;
			this.text4 = "specter pages: " + totalSummonSpecterLootDropCount;
			ctx.fillText(this.text4, this.x + 5, this.y + 120);

			let totalTeleportLootDropCount = inventoryArray.filter(element => element.name === "teleportLootDrop").length;
			this.text5 = "teleport pages: " + totalTeleportLootDropCount;
			ctx.fillText(this.text5, this.x + 5, this.y + 150);

			let totalSmashLootDropCount = inventoryArray.filter(element => element.name === "smashLootDrop").length;
			this.text6 = "smash pages: " + totalSmashLootDropCount;
			ctx.fillText(this.text6, this.x + 5, this.y + 180);
		}
        ctx.closePath();
	}
	update() {

	}
	
	clickButton(xmouse, ymouse) {
		const distance = Math.sqrt(xmouse >= this.x && xmouse < this.width + this.x && ymouse >= this.y && ymouse < this.height + this.y);
		if (distance) {
			//console.log(this.name + " was clicked");
			if (this.name == "inventoryButton" && !this.toggle) {
				this.toggle = true;
				let totalCastSpikeLootDropCount = inventoryArray.filter(element => element.name === "castSpikeLootDrop").length;
				addButton(new Button(5, 280, 250, 600, [5], "#e3a04d", "showInventory", "spike: " + totalCastSpikeLootDropCount));
				//console.log(inventoryArray);
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
