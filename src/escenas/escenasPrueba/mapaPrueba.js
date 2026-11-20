import Pez from "../../gameObjects/pez.js";
import Rock from "../../gameObjects/rocks.js";
import Log from "../../gameObjects/logs.js";

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
        this.cameras.main.setZoom(0.7);
        this.cameraPos = new Phaser.Math.Vector2(0, 0);
        this.pez = new Pez(this.matter.world, 2000, 200, 'pezquesemueve', 5, 5, 5);
        this.pez.setDepth(1);

        const formaRoca = this.cache.json.get('rock3_t').Rock3;
        this.rock = new Rock(this, 2500, 300, 'rock3', formaRoca, this.pez);

        const formaTronco = this.cache.json.get('log3_t').log3;
        this.log = new Log(this, 2300, 300, 'log3', formaTronco, this.pez);

        this.matter.world.debugConfig.showStaticBody = true;
        this.matter.world.debugConfig.showInternalEdges = true;
        
        this.cameras.main.centerOn(miObjeto.x, miObjeto.y);
        this.cameras.main.startFollow(this.pez, true);

        this.actualizarPez = () => this.pez.actualizarPasoFisico();
        this.matter.world.on("beforeupdate", this.actualizarPez);

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.matter.world.off("beforeupdate", this.actualizarPez);
        });
    }

    update(t, dt){
        const velocidad = this.pez.getVelocity();
        const cameraSpeedPerSecond = 100;
        const anticipacion = 6;
        const targetOffset = new Phaser.Math.Vector2(
            -velocidad.x * anticipacion,
            -velocidad.y * anticipacion
        );
        const difference = targetOffset.clone().subtract(this.cameraPos);
        const distance = difference.length();
        const maxStep = cameraSpeedPerSecond * dt / 1000;

        if (distance <= maxStep) {
            this.cameraPos.copy(targetOffset);
        } else if (distance > 0) {
            this.cameraPos.add(difference.scale(maxStep / distance));
        }

        this.cameras.main.setFollowOffset(
            this.cameraPos.x,
            this.cameraPos.y
        );

    }
}