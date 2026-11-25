export default class MenuNiveles extends Phaser.Scene{
    constructor(){
        super({key: "menuNiveles"});
    }

    create(){

        this.add.rectangle(400, 300, 800, 600, 0x333333);
        
        let boton1 = this.add.rectangle(400, 100, 200, 50, 0x3287d1);

        boton1.setInteractive();
        boton1.setScrollFactor(0);

        boton1.on("pointerdown", () => this.scene.start("nivel1"));

        this.add.text(400, 100, "Nivel 1",{
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5)

        let boton2 = this.add.rectangle(400, 200, 200, 50, 0x3287d1);

        boton2.setInteractive();
        boton2.setScrollFactor(0);

        boton2.on("pointerdown", () => this.scene.start("nivel2"));

        this.add.text(400, 200, "Nivel 2",{
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5)


        let botonVolver = this.add.rectangle(100, 100, 150, 50, 0x3287d1);
        
        botonVolver.setInteractive();
        botonVolver.setScrollFactor(0);

        botonVolver.on("pointerdown", () => this.scene.start("menuPrincipal"));

        this.add.text(100, 100, "Volver",{
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
            
        }).setOrigin(0.5).setAbove(botonVolver).setScrollFactor(0, 0);
        
        this.cameras.main.fadeIn(200, 0, 0, 0); 
    }
};


        