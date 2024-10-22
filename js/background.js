class Background {
	constructor(x, y, width, height, appearance) {
		this.image = new Image();
		this.image.src = appearance;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.appearance = appearance;
	}		
	draw(ctx) {
		ctx.beginPath();
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		//ctx.rect(this.x, this.y, this.width, this.height);
		/*
		ctx.rect(10, 10, 2000 - 10, 1000 - 10);
		ctx.strokeStyle = "green";
		ctx.lineWidth = "1";
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.rect(1000, 10, 1500 - 10, 1000 - 10);
		ctx.strokeStyle = "blue";
		ctx.lineWidth = "1";
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.rect(1500, 10, 1000 - 10, 1000 - 10)
		ctx.strokeStyle = "red";
		ctx.lineWidth = "1";
		ctx.stroke();
		ctx.closePath();
		*/
	}
	clickImage(biome) {
		//console.log("Mouse clicked at world position X:", worldX, "Y:", worldY);

		// Check if the click is within the bounds of the image
		if (worldX >= this.x && worldX <= this.x + this.width &&
			worldY >= this.y && worldY <= this.y + this.height) {
			//console.log("x: " + (worldX - this.x) + " y: " + (worldY - this.y));
		} else {
			//console.log("Mouse clicked outside the image.");
		}
	}
}