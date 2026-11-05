export default class menuPruebas extends Phaser.Scene{
    constructor(){
        super({key: "menuPruebas"});
    }

    create(){

        this.add.rectangle(400, 300, 800, 600, 0x333333);
        
        let boton1 = this.add.rectangle(400, 100, 300, 50, 0x3287d1)

        boton1.setInteractive();

        boton1.on("pointerdown", () => {
            this.scene.start("mapaPrueba"); 
        });

        this.add.text(400, 100, "Prueba Mapa",{
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5)

        let boton2 = this.add.rectangle(400, 180, 300, 50, 0x3287d1);

        boton2.setInteractive(); 
        
        boton2.on("pointerdown", () => {
            this.scene.start("pruebaFisicas"); 
        });

        this.add.text(400, 180, "Prueba Físicas", {
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5);

        let boton3 = this.add.rectangle(400, 260, 300, 50, 0x3287d1);

        boton3.setInteractive(); 
        
        boton3.on("pointerdown", () => {
            this.scene.start("pruebaMovimientoPez"); 
        });

        this.add.text(400, 260, "Prueba Movimiento Pez", {
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5);

        let boton4 = this.add.rectangle(400, 340, 300, 50, 0x3287d1);

        boton4.setInteractive(); 
        
        boton4.on("pointerdown", () => {
            this.scene.start("pruebaHUD"); 
        });

        this.add.text(400, 340, "Prueba HUD", {
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5);

        let boton5 = this.add.rectangle(400, 420, 300, 50, 0x3287d1);

        boton5.setInteractive();

        boton5.on("pointerdown", () => {
            this.scene.start("pruebaPiezas"); 
        });

        this.add.text(400, 420, "Prueba Piezas", {
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5);

        this.cameras.main.fadeIn(200, 0, 0, 0); 
    }
};


        