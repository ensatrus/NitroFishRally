export default class Medalla extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y);
        
        this.setScale(0.5);
        this.scene.add.existing(this);
    }
}