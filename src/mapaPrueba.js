// import objetosPrueba from "src/objetosPrueba.js";

export default class mapaPrueba extends Phaser.scene{
    constructor(){
        super({key: "mapaPrueba"});
    }

    init(){

    }

    preload(){
        // this.load.image("fondo", " ")
    }

    create(){
        // let imagenFondo = this.add.image(0, 0, "fondo");
        // imagenFondo.setScale(0.5, 0.5);

        // let textoPuntos = this.add.text(0, 0, "Puntos: 0", {font: ""});
        //textoPuntos.setScrollFactor(0,0); // Para que sea parte de la interfaz

        // let juan = new objetosPrueba(this, 0, 0, "textura");

        // this.cameras.main.startFollow(juan); // Para que la camara siga a juan

        let boton = this.add.rectangle(10, 10, 150, 50, 0x3287d1).setOrigin(0,0);

        boton.setInteractive();

        boton.on("pointerdown", () => {
            this.scene.start("menuPruebas"); 
        });

        this.add.text(50, 25, "Volver",{
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.0)

    }

    update(){

    }
}