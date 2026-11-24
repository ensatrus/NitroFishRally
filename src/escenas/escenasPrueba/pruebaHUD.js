import HUDManager from "../../managers/HUDManager.js";
import CameraManager from "../../managers/CameraManager.js";

export default class PruebaHUD extends Phaser.Scene {
    constructor() {
        super({ key: "pruebaHUD" });
    }

    preload() {
    }

    create() {
        const bg = this.add.image(0, 0, 'fondoPrueba');
        const escalaMapa = 6;
        bg.setScale(escalaMapa);
        bg.setOrigin(0, 0);
        bg.setDepth(-1);
        this.auraMaxima = 5000;
        this.velPez = 0;

        this.game.gameManager.construirNivel(this, 'Mapa1', escalaMapa);
        this.pez.setDepth(1);
        this.HUDManager = new HUDManager(this);

        this.CameraManager = new CameraManager(this);

        this.matter.world.debugConfig.showStaticBody = true;

        // Dibujar la barra inicialmente
        this.HUDManager.actualizarAuraHUD(0, this.auraMaxima);

        const mundo = this.matter.world;

        this.actualizarPez = () => this.pez.actualizarPasoFisico();
        mundo.on("beforeupdate", this.actualizarPez);

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            mundo.off("beforeupdate", this.actualizarPez);
        });

    }

    update(t, dt) {
        this.pez.actualizarAura(this.auraMaxima);
        this.HUDManager.actualizarHUD(this.pez.getAura(), this.auraMaxima,
                                      this.time.now, this.pez.getSpeed());
        this.CameraManager.update(t, dt);
    }
}
