export default class Debut extends Phaser.Scene {
    constructor() {
        super({ key: "preloader" });
    }

    preload() {
        this.load.image("tituloImagen", "./assets/sprites/titulo640x480.png");
        this.load.image("pezquesemueve", "./assets/sprites/pezquesemueve.png");
        this.load.image("fih", "./assets/sprites/fih.png");
        this.load.image("placeholderBackground", "./assets/sprites/background-placeholder.png")

        this.load.on("loaderror", (archivo) => {
            console.error(`No se pudo cargar el asset: ${archivo.key}`, archivo.src);
        });
    }

    create() {
        this.scene.start("tituloInicio");
        
    }
}