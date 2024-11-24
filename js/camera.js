class Camera {
    constructor() {
        this.x = 0; // Top-left corner of the camera view
        this.y = 0;
        this.zoom = 0.55; // Default zoom level
    }

    follow(target, canvasWidth, canvasHeight) {
        // Center the camera on the target, accounting for canvas dimensions and zoom
        this.x = target.x - (canvasWidth / 2) / this.zoom;
        this.y = target.y - (canvasHeight / 2) / this.zoom;
    }

    applyTransform(ctx) {
        ctx.save(); // Save current transformation state
        ctx.scale(this.zoom, this.zoom); // Apply zoom first
        ctx.translate(-this.x, -this.y); // Translate based on camera position
    }

    resetTransform(ctx) {
        ctx.restore(); // Restore to the saved state
    }
}