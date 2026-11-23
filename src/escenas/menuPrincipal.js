/**
 * Escena principal.
 * @extends Phaser.Scene
 */

export default class MenuPrincipal extends Phaser.Scene{
    constructor(){
        super({key: "menuPrincipal"});
    }

    preload(){
	   
	}

    create(){
        this.add.image(50, 50, "titulo640x480").setOrigin(0, 0).setScale(0.7);

        let botonPruebas = this.add.rectangle(700, 550, 150, 25, 0x3287d1);

        botonPruebas.setInteractive();

        botonPruebas.on("pointerdown", () => {
            this.scene.start("menuPruebas"); 
        });

        this.add.text(700, 550, "Menu pruebas",{
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5)

        let botonJugar = this.add.rectangle(300, 250, 250, 50, 0x000000, 0);
        let botonGaraje = this.add.rectangle(260, 325, 250, 50, 0x000000, 0);
        let botonPalmares = this.add.rectangle(220, 400, 250, 50, 0x000000, 0);
        let botonOpciones = this.add.rectangle(180, 475, 250, 50, 0x000000, 0);

        botonJugar.setInteractive();
        botonGaraje.setInteractive();
        botonPalmares.setInteractive();
        botonOpciones.setInteractive();

        botonGaraje.on("pointerdown", () => {
            this.scene.start("garaje"); 
        });

        const textoJugar = this.add.text(300, 250, "Jugar",{
            fontSize: "40px",
            fill: "#a0a0a0",
            fontFamily: "Velocidad"
        }).setOrigin(0.5)

        const textoGaraje = this.add.text(260, 325, "Garaje",{
            fontSize: "40px",
            fill: "#a0a0a0",
            fontFamily: "Velocidad"
        }).setOrigin(0.5)

        const textoPalmares = this.add.text(220, 400, "Palmarés",{
            fontSize: "40px",
            fill: "#a0a0a0",
            fontFamily: "Velocidad"
        }).setOrigin(0.5)

        const textoOpciones = this.add.text(180, 475, "Opciones",{
            fontSize: "40px",
            fill: "#a0a0a0",
            fontFamily: "Velocidad"
        }).setOrigin(0.5)

        const textos = [textoJugar, textoGaraje, textoPalmares, textoOpciones];

        const seleccionarTexto = (textoActivo) => {
            textos.forEach(texto => {
                texto.setColor('#7a7a7a');
                texto.setScale(1);
            });
            textoActivo.setColor('#ffd700');
            textoActivo.setScale(1.15);
        };

        botonJugar.on("pointerover", () => {
            seleccionarTexto(textoJugar);
        });

        botonGaraje.on("pointerover", () => {
            seleccionarTexto(textoGaraje);
        });

        botonPalmares.on("pointerover", () => {
            seleccionarTexto(textoPalmares);
        });

        botonOpciones.on("pointerover", () => {
            seleccionarTexto(textoOpciones);
        });

        seleccionarTexto(textoJugar);

        //fondo
        const fondoRect = this.add.rectangle(-110, this.scale.height / 2, 700, this.scale.height * 2, 0x000000);
        fondoRect.setDepth(-10);
        fondoRect.setAngle(30);

        const videoEjemplo = this.add.video(this.scale.width / 2, this.scale.height / 2, "videoEjemplo");
        videoEjemplo.setDisplaySize(this.scale.width, this.scale.height);
        videoEjemplo.setDepth(-11);
        videoEjemplo.play(true);

        this.cameras.main.fadeIn(200, 0, 0, 0); 
    }
};