export default class Pez extends Phaser.Physics.Matter.Sprite{
    constructor(scene, x, y, textura, aceleracion, control, freno){
        super(scene, x, y, textura);

        this.masa = aceleracion + control + freno;
        this.aceleracion = aceleracion;
        this.control = control;
        this.freno = freno;
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
            d: this.scene.input.keyboard.addKey("D"),
            space: this.scene.input.keyboard.addKey("SPACE")
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
       
        const derrape = this.getDerrape();

        if (this.keys.a.isDown) {
            this.rotar(-this.control  * 5/6);
        }

        if (this.keys.d.isDown) {
            this.rotar(this.control  * 5/6);
        }

        this.dirToAngle();

        if (this.keys.w.isDown) {
            if(this.getSpeed()< 250 * (1.0/this.masa)) this.acelerar(1);
            this.setFrictionAir(derrape * this.masa / 1000);
        } 
        else {
            this.setFrictionAir(derrape* 0.07);
        }

        if (this.keys.s.isDown) {
            this.acelerar(-0.25);
            this.setFrictionAir(derrape* 0.07);
        }
        
        if(this.keys.space.isDown){
            if(this.getSpeed() > 0.1) this.frenar();
            this.setFrictionAir(this.freno/250);
        }
    }

    actualizarAura() {
        const velocidad = this.getSpeed();
        const minVelocidad = this.masa / 3;

        const incrementoAura = (velocidad - minVelocidad);
        this.aura = Math.max(0, this.aura + incrementoAura);
    }

    acelerar(sentido){
        const fuerza = new Phaser.Math.Vector2().setToPolar(this.rotation, this.aceleracion* this.masa * sentido / 8500);

        this.applyForce(fuerza);
    }

    frenar(){
        const fuerza = new Phaser.Math.Vector2(this.getVelocity().x, this.getVelocity().y).setLength(-this.freno/625)

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

    getDerrape() {
        const { x, y } = this.getVelocity();
        const rapidez = Math.hypot(x, y);

        if (rapidez === 0) {
            return 0;
        }

        const seno = (
            Math.cos(this.rotation) * y -
            Math.sin(this.rotation) * x
        ) / rapidez;

        return Phaser.Math.Clamp(Math.abs(seno)+0.2, 0, 1);
    }
}