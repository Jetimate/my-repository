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
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.strokeStyle = "black";
		ctx.lineWidth = "3";
		ctx.stroke();
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		ctx.closePath();
	}
}