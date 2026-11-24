export default class MenuNiveles extends Phaser.Scene{
    constructor(){
        super({key: "menuNiveles"});
    }

    create(){

        this.add.rectangle(400, 300, 800, 600, 0x333333);
        
        let boton1 = this.add.rectangle(400, 100, 300, 50, 0x3287d1)

        boton1.setInteractive();


        this.add.text(400, 100, "Hola esto es Menu Niveles",{
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5)

        this.cameras.main.fadeIn(200, 0, 0, 0); 
    }
};


        