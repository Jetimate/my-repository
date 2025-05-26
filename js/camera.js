class Camera {
    constructor() {
        this.x = 0; // Top-left corner of the camera view
        this.y = 0;
        this.zoom = 0.6; // Default zoom level // 0.8
        this.codeClass = "camera";
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
class ScreenShake {
    constructor() {
        this.magnitude = 0;
        this.duration = 0;
        this.timeLeft = 0;
        this.lastUpdateTime = 0;
    }

    start(magnitude = 2.5, duration = 300) {
        this.magnitude = magnitude;
        this.duration = duration;
        this.timeLeft = duration;
        this.lastUpdateTime = performance.now();
    }

    apply(ctx) {
        if (this.timeLeft > 0) {
            const now = performance.now();
            const deltaTime = now - this.lastUpdateTime;
            this.lastUpdateTime = now;

            this.timeLeft -= deltaTime;

            const shakeX = (Math.random() - 0.5) * 2 * this.magnitude;
            const shakeY = (Math.random() - 0.5) * 2 * this.magnitude;
            ctx.translate(shakeX, shakeY);
        }
    }

    reset(ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    // unused right now
    isShaking() {
        return this.timeLeft > 0;
    }
}