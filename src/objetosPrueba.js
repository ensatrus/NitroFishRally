export default class objetosPrueba extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, textura){
        super(scene, x, y, textura, 0);

        this.scene.add.existing(this);

        this.play("animacion_ejemplo");

        this.keys;
        this.keys.a = this.scene.input.keyboard.addkey("A");
        this.keys.s = this.scene.input.keyboard.addkey("S");
        this.keys.w = this.scene.input.keyboard.addkey("W");
        this.keys.d = this.scene.input.keyboard.addkey("D");
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);

        // Enrique cambia esto para meter tus físicas aquí o algo
        if(this.keys.a.isDown){
            this.x -= 10 * dt/100;
            this.play("animacion_ejemplo_andar", true);
        }
        else this.play("animacion_ejemplo", true);

        // Repetir para todas las teclas que se usen
    }
}