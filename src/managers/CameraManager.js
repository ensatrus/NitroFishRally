export default class CameraManager {
    constructor(scene) {
        this.scene=scene;

        scene.cameras.main.setZoom(0.6);
        scene.cameras.main.startFollow(scene.pez, true);
        this.cameraPos = new Phaser.Math.Vector2(0, 0)
        
    }
    
    update(t, dt){
        const velocidad = this.scene.pez.getVelocity();
        const rotation = this.scene.pez.getPolarRot();
        const cameraSpeedPerSecond = 120;
        const anticipacion = 8;
        const rotationMult = 10;
        const targetOffset = new Phaser.Math.Vector2(
            -(velocidad.x + rotation.x * rotationMult)* anticipacion,
            -(velocidad.y + rotation.y * rotationMult)* anticipacion
        );
        const difference = targetOffset.clone().subtract(this.cameraPos);
        const distance = difference.length();
        const maxStep = cameraSpeedPerSecond * dt / 1000;

        if (distance <= maxStep) {
            this.cameraPos.copy(targetOffset);
        } else if (distance > 0) {
            this.cameraPos.add(difference.scale(maxStep / distance));
        }

        this.scene.cameras.main.setFollowOffset(
            this.cameraPos.x,
            this.cameraPos.y
        );

    }

    
}