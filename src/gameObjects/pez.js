export default class Pez extends Phaser.Physics.Matter.Sprite{
    constructor(scene, x, y, textura, aceleracion, control, freno){
        super(scene, x, y, textura);

        // Variables
        this.masa = aceleracion+control+freno;
        this.aceleracion = aceleracion/800;
        this.control = control*5;
        this.freno = -freno/10.0;
        this.direccion = 0.0;

        this.setCircle();
        this.setScale(0.1);
        this.setFriction(0.2, 0.01, 30)
        this.setFixedRotation();
        this.setMass(this.masa);
        this.setBounce(0.4);

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
            this.setFrictionAir(0.01);
            this.acelerar(1);
        }
        else{
            this.setFrictionAir(0.02);
        }
        if (this.keys.s.isDown){
            this.acelerar(this.freno);
            this.setFrictionAir(-this.freno/10);
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
        const fuerza = new Phaser.Math.Vector2().setToPolar(this.rotation, this.aceleracion*sentido* this.masa/10);

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