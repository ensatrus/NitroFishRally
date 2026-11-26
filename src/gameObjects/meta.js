export default class Meta extends Phaser.Physics.Matter.Sprite{
    constructor(scene, x, y, textura, center, vertices, nivel) {

        super(scene.matter.world, x, y, textura, null, {
            isSensor: true
        });

        const body = scene.matter.add.fromVertices(center.x, center.y, vertices);
        this.setExistingBody(body);
        this.setStatic(true);
        this.setSensor(true);
        this.setVisible(false);
        this.nivel = nivel;
        scene.add.existing(this);
    }
}