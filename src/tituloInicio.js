export default class tituloInicio extends Phaser.Scene{
    constructor(){
        super({key: "titulo"});
    }

    init(){

    }

    preload(){
        this.load.image("tituloImagen", "./assets/sprites/titulo640x480.png");
        // this.load.image("botonInicio", "");
        // this.load.spritesheet("pez", "", {frameWidth, frameHeight});

    }

    create(){
        const centroX = this.cameras.main.width / 2;
        const centroY = this.cameras.main.height / 2;
        
        this.add.image(centroX, centroY - 80, "tituloImagen").setOrigin(0.5).setScale(1.2);

        let textoInicio = this.add.text(centroX, centroY + 150, "PULSA CUALQUIER TECLA", {
            fontFamily: '"Courier New", monospace',
            fontSize: '30px',
            //color: #ffffff,
            //align: center,
        }).setOrigin(0.5);

        // Parpadeo de texto
        let parpadeoTexto = this.time.addEvent({
            delay: 700,
            loop: true,
            callback: () => { textoInicio.visible = !textoInicio.visible; }
        })

        this.input.keyboard.once("keydown", (event) => {
            textoInicio.setColor("#00ff00");
            parpadeoTexto.destroy();

            parpadeoTexto = this.time.addEvent({
                delay: 100,
                loop : true,
                callback: () => { textoInicio.visible = !textoInicio.visible; }
            })

            this.time.delayedCall(900, () => {
                this.cameras.main.fadeOut(900, 0, 0, 0);
            }, [], this)

            this.time.delayedCall(1800, () => {
                parpadeoTexto.destroy();
                this.scene.start("PruebaFisicas");
            }, [], this);

        }, this);

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

        // this.anims.create({
        //     key: "animacion_andar_ejemplo",
        //     frames: this.anims.generateFrameNumbers("textura", {start: 0, end:6}),
        //     frameRate: 9, 
        //     repeat: -1, // -1 para bucle, 0 para no bucle

        // })
    }
}