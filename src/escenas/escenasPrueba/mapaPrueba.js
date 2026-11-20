import Pez from "../../gameObjects/pez.js";
import Rock from "../../gameObjects/rocks.js";
import Log from "../../gameObjects/logs.js";
import CameraManager from "../../managers/CameraManager.js";

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


       

       
                
        miObjeto.setScale(9);

        this.pez = new Pez(this.matter.world, 2000, 200, 'pezquesemueve', 5, 5, 5);
        this.pez.setDepth(1);

        const formaRoca = this.cache.json.get('rock3_t').Rock3;
        this.rock = new Rock(this, 2500, 300, 'rock3', formaRoca, this.pez);

        const formaTronco = this.cache.json.get('log3_t').log3;
        this.log = new Log(this, 2300, 300, 'log3', formaTronco, this.pez);

        this.matter.world.debugConfig.showStaticBody = true;
        this.matter.world.debugConfig.showInternalEdges = true;

        this.actualizarPez = () => this.pez.actualizarPasoFisico();
        this.matter.world.on("beforeupdate", this.actualizarPez);

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.matter.world.off("beforeupdate", this.actualizarPez);
        });

        this.cameraManager = new CameraManager(this);
    }

    update(time, delta) {
        this.cameraManager.update(time, delta);
    }
}