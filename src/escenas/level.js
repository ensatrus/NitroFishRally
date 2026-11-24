import CameraManager from "../managers/CameraManager.js";
import HUDManager from "../managers/HUDManager.js";
import Warning from "../gameObjects/warning.js";

export default class Level extends Phaser.Scene {
    constructor(config) {
        const escalaMapa = config.escalaMapa === undefined ? 1 : config.escalaMapa;
        const auraMaxima = config.auraMaxima === undefined ? 5000 : config.auraMaxima;

        super({ key: config.key });

        this.configNivel = {
            key: config.key,
            mapa: config.mapa,
            fondo: config.fondo,
            escalaMapa: escalaMapa,
            auraMaxima: auraMaxima,
            escenaSalida: config.escenaSalida || "menuNiveles"
        };
    }

    create() {
        const {fondo, escalaMapa, mapa, auraMaxima, escenaSalida } = this.configNivel;

        if (fondo) {
            this.add.image(0, 0, fondo)
                .setScale(escalaMapa)
                .setOrigin(0, 0)
                .setDepth(-1);
        }

        this.auraMaxima = auraMaxima;
        this.game.gameManager.construirNivel(this, mapa, escalaMapa);
        this.pez.setDepth(1);

        this.HUDManager = new HUDManager(this, escenaSalida);
        this.CameraManager = new CameraManager(this);
        this.matter.world.debugConfig.showStaticBody = true;
        this.HUDManager.actualizarAuraHUD(0, this.auraMaxima);

        const mundo = this.matter.world;
        this.actualizarPez = () => this.pez.actualizarPasoFisico();
        mundo.on("beforeupdate", this.actualizarPez);
        mundo.on("collisionstart", this.warningTrigger);

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            mundo.off("beforeupdate", this.actualizarPez);
            mundo.off("collisionstart", this.warningTrigger);
        });
    }

    update(t, dt) {
        this.pez.actualizarAura(this.auraMaxima);
        this.HUDManager.actualizarHUD( this.pez.getAura(), this.auraMaxima, this.time.now, this.pez.getSpeed());
        this.CameraManager.update(t, dt);
    }

    warningTrigger = ({ pairs }) => {
        for (const pair of pairs) {
            const objetoA = pair.bodyA.parent.gameObject;
            const objetoB = pair.bodyB.parent.gameObject;

            const warning = objetoA instanceof Warning? objetoA: 
                            objetoB instanceof Warning? objetoB
                            : null;

            const otroObjeto = warning === objetoA ? objetoB : objetoA;

            if (warning && otroObjeto === this.pez) {
                warning.actualizarWarning();
            }
        }
    }
}