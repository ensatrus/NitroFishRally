export default class Pez extends Phaser.Physics.Matter.Sprite{
    constructor(scene, x, y, textura){
        super(scene, x, y, textura, 0);

        // Variables
        this.velocidad = 0;
        this.aceleracion = 0;
        this.INCREMENTO = 0.5;

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
            this.acelerar(this.INCREMENTO, dt);
        }
        else if (this.velocidad > 0){
            this.acelerar(-this.INCREMENTO / 2, dt);
        }
        if(this.keys.a.isDown){
            this.x -= 10 * dt/100;
            // this.play("animacion_ejemplo_andar", true);
        }
        // else this.play("animacion_ejemplo", true);

        // Repetir para todas las teclas que se usen
    }

    update(t, dt) {
        super.update(t, dt);

        this.mover();
    }

    acelerar(incr, dt){
        this.velocidad += incr * dt/100;
    }

    rotar () {

    }

    mover () {
        this.x += this.velocidad;
    }
}