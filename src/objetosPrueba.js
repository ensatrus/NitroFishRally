export default class objetosPrueba extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, textura){
        super(scene, x, y, textura, 0);

        this.scene.add.existing(this);

        this.play("animacion_ejemplo");
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }
}