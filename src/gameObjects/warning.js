

export default class Warning extends Phaser.Physics.Matter.Sprite{

    constructor(scene, x, y, textura, center, vertices, type) {

        super(scene.matter.world, x, y, textura, null, {
            friction: 0,
            ignoreGravity: true,
            frictionAir: 0,
            isSensor: true
        });

        const body = scene.matter.add.fromVertices(center.x, center.y, vertices);
        this.setExistingBody(body);
        this.setStatic(true);
        this.setSensor(true);
        this.setVisible(false);
        scene.add.existing(this);
        this.warningType = type;
    }

    actualizarWarning() {
        this.scene.HUDManager.actualizarSenalHUD(this.warningType);
    }   
}