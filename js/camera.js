class Camera {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = 0;
        this.zoom = 1;
    }

    follow(target) {
        this.x = target.x - canvas.width / 2;
        this.y = target.y - canvas.height / 2;
    }

    applyTransform(ctx) {
        ctx.translate(-this.x, -this.y);
        ctx.scale(this.zoom, this.zoom);
    }
}