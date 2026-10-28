export default class Pez extends Phaser.Physics.Matter.Sprite{
    constructor(scene, x, y, textura, aceleracion, control){
        super(scene, x, y, textura);

        // Variables
        this.aceleracion = aceleracion/100;
        this.control = control;
        this.INCREMENTO = 0.5; 
        this.direccion = 0.0;

        this.scene.add.existing(this);

        // this.play("animacion_idle");

        this.keys = {};
        this.keys.a = this.scene.input.keyboard.addKey("A");
        this.keys.s = this.scene.input.keyboard.addKey("S");
        this.keys.w = this.scene.input.keyboard.addKey("W");
        this.keys.d = this.scene.input.keyboard.addKey("D");
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);

        if (this.keys.w.isDown) {
            this.acelerar(1);
        }
        if (this.keys.s.isDown){
            this.acelerar(-0.5)
        }
        if(this.keys.a.isDown){
            this.rotar(-this.control*dt/100);
        }
        if (this.keys.d.isDown){
            this.rotar(this.control*dt/100)
        }
        this.dirToAngle();

        super.update(t, dt);
    }


    acelerar(sentido) {
        const fuerza = new Phaser.Math.Vector2(
            Math.cos(this.rotation),
            Math.sin(this.rotation)
        ).normalize().scale(this.aceleracion * sentido);

        this.applyForce(fuerza);
    }

    rotar (angulo) {
        this.direccion += angulo;
    }
    
    dirToAngle(){
        this.direccion %= 360;
        if (this.direccion > 180) this.angle = this.direccion - 360;
        else this.angle = this.direccion;
    }

    
}