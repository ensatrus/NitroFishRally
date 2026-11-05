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
        this.load.image('Circuit', './assets/sprites/Circuit.png');
        this.load.json('Circuit_t', './assets/json/circuit.json');
        this.load.image('log1', './assets/sprites/log1.png');
        this.load.json("log1_t", "./assets/json/log1.json");
        this.load.image('log2', './assets/sprites/log2.png');
        this.load.json("log2_t", "./assets/json/log2.json");
        this.load.image('log3', './assets/sprites/log3.png');
        this.load.json("log3_t", "./assets/json/log3.json");
        this.load.image('log4', './assets/sprites/log4.png');
        this.load.json("log4_t", "./assets/json/log4.json");
        this.load.image('rock1', './assets/sprites/rock1.png');
        this.load.json("rock1_t", "./assets/json/rock1.json");
        this.load.image('rock2', './assets/sprites/rock2.png');
        this.load.json("rock2_t", "./assets/json/rock2.json");
        this.load.image('rock3', './assets/sprites/rock3.png');
        this.load.json("rock3_t", "./assets/json/rock3.json");
        this.load.image('rock4', './assets/sprites/rock4.png');
        this.load.json("rock4_t", "./assets/json/rock4.json");
        this.load.image('rock5', './assets/sprites/rock5.png');
        this.load.json("rock5_t", "./assets/json/rock5.json");

        this.load.on("loaderror", (archivo) => {
            console.error(`No se pudo cargar el asset: ${archivo.key}`, archivo.src);
        });
    }

    create() {
        this.scene.start("tituloInicio");
        
    }
}