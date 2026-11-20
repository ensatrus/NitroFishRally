import Pez from "../../gameObjects/pez.js";
import Rock from "../../gameObjects/rocks.js";
import Log from "../../gameObjects/logs.js";
import Waterflow from "../../gameObjects/waterflow.js";
import Heron from "../../gameObjects/heron.js";
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

        const stats = this.game.gameManager.getStatsPez();
        this.pez = new Pez(this.matter.world, 2000, 200, 'pezquesemueve', stats.aceleracion, stats.control, stats.freno);
        this.pez.setDepth(1);

        //Roca (rebota al chocar)
        //this.rock = new Rock(this, 2300, 300, 'rock3', this.pez);

        const formaRoca = this.cache.json.get('rock3_t').Rock3;
        this.rock = new Rock(this, 2500, 300, 'rock3', formaRoca, this.pez);

        //Tronco (rebota al chocar y se mueve con velocidad y dirección en grados)
        //this.log = new Log(this, 2300, 300, 'log3', this.pez, 2, 180);
        const formaTronco = this.cache.json.get('log3_t').log3;
        this.log = new Log(this, 2300, 300, 'log3', formaTronco, this.pez);

        //Corriente de agua (arrastra al pez mientras esté dentro con fuerza y dirección en grados)
        //this.waterflow = new Waterflow(this, 2300, 300, 'waterflow', this.pez, 0.0002, 0);

        //Garza (avisa durante 1 segundo al entrar y te expulsa si sigues dentro)
        //this.heron = new Heron(this, 2300, 300, 'heron', this.pez, 20);

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