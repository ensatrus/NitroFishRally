export default class tituloInicio extends Phaser.scene{
    constructor(){
        super({key: "titulo"});
    }

    init(){

    }

    preload(){
        this.load.image("tituloInicio", "assets/sprites/titulo640x480.jpg");
        // this.load.image("botonInicio", "");
        // this.load.spritesheet("pez", "", {frameWidth, frameHeight});

    }

    create(){
        this.add.image(0, 0, "tituloInicio").setOrigin(0, 0);
        // let button = this.add.image(0, 0, " ");
        // button.setInteractive();
        // button.on("pointerup", ()=>{
        //     this.scene.start("menuPrincipal")
        // })

        // this.createAnims();
    }

    update(){

    }

    createAnims(){
        // this.anims.create({
        //     key: "animacion_ejemplo",
        //     frames: this.anims.generateFrameNumbers("textura", {start: 0, end:6}),
        //     frameRate: 9, 
        //     repeat: -1, // -1 para bucle, 0 para no bucle
        // })
    }
}