export default class Pez extends Phaser.Physics.Matter.Sprite{
    constructor(scene, x, y, textura, aceleracion, control, freno){
        super(scene, x, y, textura);

        this.masa = aceleracion + control + freno/2;
        this.aceleracion = aceleracion / 600;
        this.control = control * 5;
        this.freno = -freno / 15;
        this.direccion = 0;
        this.aura = 0;

        this.setCircle();
        this.setScale(0.1);
        this.setFriction(0.2, 0.01, 30);
        this.setFixedRotation();
        this.setMass(this.masa);
        this.setBounce(0.4);

        this.keys = {
            a: this.scene.input.keyboard.addKey("A"),
            s: this.scene.input.keyboard.addKey("S"),
            w: this.scene.input.keyboard.addKey("W"),
            d: this.scene.input.keyboard.addKey("D")
        };

        this.scene.add.existing(this);
    }

    getSpeed() {
        const { x, y } = this.getVelocity();
        return Math.hypot(x, y);
    }

    getAura() {
        return this.aura;
    }

    preUpdate(time, delta) {
    super.preUpdate(time, delta);
    }

    actualizarPasoFisico() {
        if (this.keys.a.isDown) {
            this.rotar(-this.control / 6);
        }

        if (this.keys.d.isDown) {
            this.rotar(this.control / 6);
        }

        this.dirToAngle();

        if (this.keys.w.isDown) {
            this.setFrictionAir(this.masa / 1600);
            this.acelerar(1);
        } else {
            this.setFrictionAir(0.025);
        }

        if (this.keys.s.isDown) {
            this.acelerar(this.freno);
            this.setFrictionAir(-this.freno / 10);
        }
    }

    actualizarAura() {
        const velocidad = this.getSpeed();
        const minVelocidad = 6;

        const incrementoAura = (velocidad - minVelocidad);
        this.aura = Math.max(0, this.aura + incrementoAura);
    }

    acelerar(sentido){
        const fuerza = new Phaser.Math.Vector2().setToPolar(this.rotation, this.aceleracion * sentido);

        this.applyForce(fuerza);
    }

    rotar(angulo) {
        this.direccion += angulo;
    }

    dirToAngle() {
        this.direccion %= 360;
        if (this.direccion > 180) {
            this.angle = this.direccion - 360;
        } 
        else {
            this.angle = this.direccion;
        }
    }
}