export default class menuPruebas extends Phaser.Scene{
    constructor(){
        super({key: "menuPruebas"});
    }

    create(){
        this.add.rectangle(400, 300, 800, 600, 0x333333);
        
        let boton1 = this.add.rectangle(400, 220, 300, 50, 0x3287d1)

        boton1.setInteractive();

        boton1.on("pointerdown", () => {
            this.scene.start("mapaPrueba"); 
        });

        this.add.text(400, 220, "Escena prueba 1",{
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5)

        let boton2 = this.add.rectangle(400, 300, 300, 50, 0x3287d1);

        boton2.setInteractive(); 
        
        boton2.on("pointerdown", () => {
            this.scene.start("PruebaFisicas"); 
        });

        this.add.text(400, 300, "Escena prueba 2", {
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5);

        let boton3 = this.add.rectangle(400, 380, 300, 50, 0x3287d1);

        boton3.setInteractive(); 
        
        boton3.on("pointerdown", () => {
            this.scene.start("objetosPrueba"); 
        });

        this.add.text(400, 380, "Escena prueba 3", {
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5);
    }
};


        