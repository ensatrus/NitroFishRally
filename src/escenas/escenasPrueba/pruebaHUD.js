import Pez from "../../gameObjects/pez.js";
import HUDManager from "../../managers/HUDManager.js";

export default class PruebaHUD extends Phaser.Scene {
    constructor() {
        super({ key: "pruebaHUD" });
    }

    preload() {
    }

    create() {
        const bg = this.add.image(0, 0, 'fondoPrueba');
        bg.setScale(6);

        this.auraActual = 0; 
        this.auraMaxima = 30000;
        this.velPez = 0;

        const stats = this.game.gameManager.getStatsPez();
        this.pez = new Pez(this.matter.world, 300, 300, 'pezquesemueve', stats.aceleracion, stats.control, stats.freno);
        this.HUDManager = new HUDManager(this);

        this.cameras.main.startFollow(this.pez, false, 0.9, 0.9);
        this.cameras.main.setZoom(0.5);

        bg.setOrigin(0, 0);
        bg.setDepth(-1);

        // Dibujar la barra inicialmente
        this.HUDManager.actualizarAuraHUD(this.auraActual, this.auraMaxima);

        const mundo = this.matter.world;

        this.actualizarPez = () => this.pez.actualizarPasoFisico();
        mundo.on("beforeupdate", this.actualizarPez);

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            mundo.off("beforeupdate", this.actualizarPez);
        });

    }

    update() {
        this.pez.actualizarAura();
        this.HUDManager.actualizarHUD(this.pez.getAura(), this.auraMaxima,
                                      this.time.now, this.pez.getSpeed());
    }

    actualizarCamara(){
        const velocidad = this.pez.getVelocity();
        const anticipacion = 6;

        this.cameras.main.setFollowOffset(
            -velocidad.x * anticipacion,
            -velocidad.y * anticipacion
        );
    }
}
