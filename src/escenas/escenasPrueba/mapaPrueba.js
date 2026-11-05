import Pez from "../../gameObjects/pez.js";

export default class mapaPrueba extends Phaser.Scene{
    constructor(){
        super({key: "mapaPrueba"});
    }

    init(){

    }

    preload(){
        // this.load.image("fondo", " ")
    }

    create(){
        const datos = this.cache.json.get('Circuit_t');
        const miObjeto = this.matter.add.sprite(600, 420, 'Circuit', null, { 
            shape: datos.Circuit,
            isStatic: true,
        });

        miObjeto.setScale(12);        
        this.cameras.main.setZoom(0.5);
        this.pez = new Pez(this.matter.world, 1000, 750, 'pezquesemueve', 6, 6, 6);
        this.pez.setDepth(1);

        this.matter.world.debugConfig.showStaticBody = true;
        this.matter.world.debugConfig.showInternalEdges = true;
        
        this.cameras.main.centerOn(miObjeto.x, miObjeto.y);
        this.cameras.main.startFollow(this.pez, true, 1, 1);

        this.actualizarPez = () => this.pez.actualizarPasoFisico();
        this.matter.world.on("beforeupdate", this.actualizarPez);

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.matter.world.off("beforeupdate", this.actualizarPez);
        });
    }

    update(){

    }
}