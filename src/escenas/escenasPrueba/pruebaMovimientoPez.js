import Pez from "../../gameObjects/pez.js";


export default class PruebaMovimientoPez extends Phaser.Scene{

    constructor(){
        super({key: "pruebaMovimientoPez"})
    }
    preload(){
        
    }

    create(){
        this.add.image(1600,1200,"placeholderBackground").setScale(3);

        let pez = new Pez(this.matter.world, 300, 300, 'pezquesemueve', 6, 6, 6);

        this.matter.world.setBounds(0, 0, 3200, 2400);

        let boton = this.add.rectangle(100, 50, 150, 50, 0x3287d1);

        this.cameras.main.startFollow(pez, true, 0.1, 0.1);
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

        this.actualizarPez = () => pez.actualizarPasoFisico();
        this.matter.world.on("beforeupdate", this.actualizarPez);

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.matter.world.off("beforeupdate", this.actualizarPez);
        });
    }

    update(){
        const velocidad = this.pez.getVelocity();
        const distancia = Math.min(120, Math.hypot(velocidad.x, velocidad.y) * 8);

        const offsetX = -Math.cos(this.pez.rotation) * distancia;
        const offsetY = -Math.sin(this.pez.rotation) * distancia;

        this.cameras.main.setFollowOffset(offsetX, offsetY);

    }
}