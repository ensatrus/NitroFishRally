export default class Debut extends Phaser.Scene {
    constructor() {
        super({ key: "preloader" });
    }

    preload() {
        this.load.image("titulo640x480", "./assets/sprites/titulo640x480.png");
        this.load.image("pezquesemueve", "./assets/sprites/pezquesemueve.png"); // esto borrar cuando esté la animacion del pez
        this.load.image("señalIzq", "./assets/sprites/signalIzq.png");
        this.load.image("señalDch", "./assets/sprites/signalDch.png");
        this.load.spritesheet("pez", "./assets/sprites/pez_spritesheet.png", {
            frameWidth: 512,  
            frameHeight: 512  
        });
        this.load.spritesheet("medallaBronce", "./assets/sprites/medallaBronce_spritesheet.png", {
            frameWidth: 512,  
            frameHeight: 512  
        });
        this.load.spritesheet("medallaPlata", "./assets/sprites/medallaPlata_spritesheet.png", {
            frameWidth: 512,  
            frameHeight: 512  
        });
        this.load.spritesheet("medallaOro", "./assets/sprites/medallaOro_spritesheet.png", {
            frameWidth: 512,  
            frameHeight: 512  
        });
        this.load.video("videoEjemplo", "./assets/videos/bad apple.mp4", true); //true para que esté muteado
        this.load.image("fih", "./assets/sprites/fih.png");
        this.load.image("placeholderBackground", "./assets/sprites/background-placeholder.png")
        this.load.image("fondoPrueba", "./assets/sprites/Esquema-Circuito1.png");
        this.load.font("Reloj Digital", "./assets/fonts/CursedTimerUlil-Aznm.ttf", "truetype");
        this.load.font("Velocidad", "./assets/fonts/AmericanCaptainPatrius02Fre-PvPd.ttf", "truetype");
        this.load.image('Circuit', './assets/sprites/Circuit.png');
        this.load.json('Circuit_t', './assets/json/circuit.json');
        this.load.tilemapTiledJSON('Mapa1', './assets/json/Mapa1.tmj');
        this.load.image('fondoPalmares', './assets/sprites/fondoPalmares.jpg');
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
        this.load.image('waterflow', './assets/sprites/waterflow.png');
        this.load.json("waterflow_t", "./assets/json/waterflow.json");
        this.load.image('heron', './assets/sprites/heron.png');
        this.load.json("heron_t", "./assets/json/heron.json");
        this.load.image('pezgaraje', './assets/sprites/pezgaraje(buena).png');


        this.load.on("loaderror", (archivo) => {
            console.error(`No se pudo cargar el asset: ${archivo.key}`, archivo.src);
        });
    }

    create() {
        this.createAnims();
        this.scene.start("tituloInicio");
        
    }

    createAnims(){
        // Animaciones Pez
        this.anims.create({
            key: "pez_idle",
            frames: this.anims.generateFrameNumbers("pez", {start: 0, end:0}),
            frameRate: 9
        })

        this.anims.create({
            key: "pez_movimiento",
            frames: this.anims.generateFrameNumbers("pez", {start: 0, end:11}),
            frameRate: 9, 
            repeat: -1 // -1 para bucle, 0 para no bucle
        })

        this.anims.create({
            key: "pez_giroIzq",
            frames: this.anims.generateFrameNumbers("pez", {start: 0, end:5}),
            frameRate: 15, 
            repeat: -1 // -1 para bucle, 0 para no bucle
        })

        this.anims.create({
            key: "pez_giroDch",
            frames: this.anims.generateFrameNumbers("pez", {start: 6, end:11}),
            frameRate: 15, 
            repeat: -1 // -1 para bucle, 0 para no bucle
        })

        // Animaciones medallas
        this.anims.create({
            key: "medallaBronce_idle",
            frames: this.anims.generateFrameNumbers("medallaBronce", {start: 0, end:0}),
            frameRate: 9
        })

        this.anims.create({
            key: "medallaBronce_animacion",
            frames: this.anims.generateFrameNumbers("medallaBronce", {start: 0, end:29}),
            frameRate: 9, 
            repeat: 0 // -1 para bucle, 0 para no bucle
        })

        this.anims.create({
            key: "medallaPlata_idle",
            frames: this.anims.generateFrameNumbers("medallaPlata", {start: 0, end:0}),
            frameRate: 9
        })

        this.anims.create({
            key: "medallaPlata_animacion",
            frames: this.anims.generateFrameNumbers("medallaPlata", {start: 0, end:29}),
            frameRate: 9, 
            repeat: 0 // -1 para bucle, 0 para no bucle
        })

        this.anims.create({
            key: "medallaOro_idle",
            frames: this.anims.generateFrameNumbers("medallaOro", {start: 0, end:0}),
            frameRate: 9
        })

        this.anims.create({
            key: "medallaOro_animacion",
            frames: this.anims.generateFrameNumbers("medallaOro", {start: 0, end:29}),
            frameRate: 9, 
            repeat: 0 // -1 para bucle, 0 para no bucle
        })
    }
}