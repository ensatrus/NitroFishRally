export default class tituloInicio extends Phaser.Scene{
    constructor(){
        super({key: "tituloInicio"});
    }

    init(){

    }

    preload(){
       
    }

    create(){
        const centroX = this.cameras.main.width / 2;
        const centroY = this.cameras.main.height / 2;
        
        this.add.image(centroX, centroY - 80, "titulo640x480").setOrigin(0.5).setScale(1.2);

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

        // Eventos al pulsar cualquier tecla
        this.input.keyboard.once("keydown", (event) => {
            textoInicio.setColor("#00ff00");
            parpadeoTexto.destroy();

            parpadeoTexto = this.time.addEvent({
                delay: 100,
                loop : true,
                callback: () => { textoInicio.visible = !textoInicio.visible; }
            })

            // Efecto fadeout
            this.time.delayedCall(900, () => {
                this.cameras.main.fadeOut(900, 0, 0, 0);
            }, [], this)

            // Cambio de escena
            this.time.delayedCall(1800, () => {
                parpadeoTexto.destroy();
                this.scene.start("menuPrincipal");
            }, [], this);

        }, this);

        // this.createAnims();
    }

    update(){

    }
}