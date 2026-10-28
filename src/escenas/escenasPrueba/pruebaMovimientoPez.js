import Pez from "../../gameObjects/pez.js";


export default class PruebaMovimientoPez extends Phaser.Scene{

    constructor(){
        super({key: "pruebaMovimientoPez"})
    }
    preload(){
        this.load.image('pezquesemueve', './assets/sprites/pezquesemueve.png');
    }

    create(){
        let pez = new Pez(this.matter.world, 300, 300, 'pezquesemueve', 1.5, 30);
        
        pez.setCircle();
        pez.setScale(0.2)
        this.add.existing(pez);
        pez.setFriction(0.9, 0.05, 10)
        pez.setFixedRotation();
        pez.setMass(20);
        pez.setBounce(0.5);
        this.matter.world.setBounds(0, 0, 800, 600);

        let boton = this.add.rectangle(100, 50, 150, 50, 0x3287d1);

        boton.setInteractive();

        boton.on("pointerdown", () => {
            this.scene.start("menuPruebas"); 
        });

        this.add.text(100, 50, "Volver",{
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5) 
    }

    update(){

    }
}