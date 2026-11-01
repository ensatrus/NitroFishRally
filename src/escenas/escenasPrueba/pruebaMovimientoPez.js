import Pez from "../../gameObjects/pez.js";


export default class PruebaMovimientoPez extends Phaser.Scene{

    constructor(){
        super({key: "pruebaMovimientoPez"})
    }
    preload(){
        
    }

    create(){
        this.add.image(1600,1200,"placeholderBackground").setScale(3);

        this.pez = new Pez(this.matter.world, 300, 300, 'pezquesemueve', 6, 6, 6);

        this.matter.world.setBounds(0, 0, 3200, 2400);

        let boton = this.add.rectangle(100, 50, 150, 50, 0x3287d1);

        this.cameras.main.startFollow(this.pez, false, 1, 1);
        this.cameras.main.setZoom();

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

        this.actualizarPez = () => this.pez.actualizarPasoFisico();
        this.matter.world.on("beforeupdate", this.actualizarPez);

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.matter.world.off("beforeupdate", this.actualizarPez);
        });
    }

    update() {
        const velocidad = this.pez.getVelocity();
        const anticipacion = 6;

        this.cameras.main.setFollowOffset(
            -velocidad.x * anticipacion,
            -velocidad.y * anticipacion
        );
    }
}