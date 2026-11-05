export default class Debut extends Phaser.Scene {
    constructor() {
        super({ key: "preloader" });
    }

    preload() {
        this.load.image("tituloImagen", "./assets/sprites/titulo640x480.png");
        this.load.image("pezquesemueve", "./assets/sprites/pezquesemueve.png");
        this.load.image("fih", "./assets/sprites/fih.png");
        this.load.image("placeholderBackground", "./assets/sprites/background-placeholder.png")
        this.load.image("fondoPrueba", "./assets/sprites/fondoPrueba.jpg");
        this.load.image("señalIzq", "./assets/sprites/signalIzq.png");
        this.load.image("señalDch", "./assets/sprites/signalDch.png");
        this.load.font("Reloj Digital", "./assets/fonts/CursedTimerUlil-Aznm.ttf", "truetype");
        this.load.font("Velocidad", "./assets/fonts/AmericanCaptainPatrius02Fre-PvPd.ttf", "truetype");
        this.load.image('Circuit', 'assets/sprites/Circuit.png');
        this.load.json('Circuit_t', 'assets/sprites/Cosa1.json');

        this.load.on("loaderror", (archivo) => {
            console.error(`No se pudo cargar el asset: ${archivo.key}`, archivo.src);
        });
    }

    create() {
        this.scene.start("tituloInicio");
        
    }
}