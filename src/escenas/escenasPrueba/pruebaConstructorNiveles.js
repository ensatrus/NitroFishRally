export default class PruebaConstructorNiveles extends Phaser.Scene{
    constructor(){
        super({key: "pruebaConstructorNiveles"});
    }

    init(){

    }

    preload(){
        // this.load.image("fondo", " ")
    }

    create(){
        this.game.gameManager.construirNivel(this, "Mapa1", 6);

        this.cameras.main.setZoom(0.5);
        this.pez.setDepth(1);

        this.matter.world.debugConfig.showStaticBody = true;
        this.matter.world.debugConfig.showInternalEdges = true;
        
        this.cameras.main.startFollow(this.pez, true, 0.8, 0.9);

        this.actualizarPez = () => this.pez.actualizarPasoFisico();
        this.matter.world.on("beforeupdate", this.actualizarPez);

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.matter.world.off("beforeupdate", this.actualizarPez);
        });
    }

    update(){
        const velocidad = this.pez.getVelocity();
        const velMax = this.pez.getMaxSpeed();
        const anticipacion = 6;
        const lerp = Phaser.Math.Clamp(this.pez.getSpeed() / velMax, 0.1, 1);

        this.cameras.main.setLerp(lerp, lerp);

        this.cameras.main.setFollowOffset(
            -velocidad.x * anticipacion,
            -velocidad.y * anticipacion
        );

    }
}