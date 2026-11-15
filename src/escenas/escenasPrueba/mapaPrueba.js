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


        const datoslog = this.cache.json.get('log3_t');
        const logObjeto = this.matter.add.sprite(2300, 300, 'log3', null, { 
        shape: datoslog.log3,
        isStatic: true,
        friction: 0
        });

        let empujar = false;

        this.matter.world.on('collisionstart', (e) => {
            e.pairs.forEach((p) => {
                if (p.bodyA.parent === logObjeto.body || p.bodyB.parent === logObjeto.body) {
                    empujar = true;
                }
            });
        });

        this.matter.world.on('afterupdate', () => {
            if (empujar) {
                empujar = false;
                const angulo = Phaser.Math.Angle.Between(logObjeto.x, logObjeto.y, this.pez.x, this.pez.y);
                this.pez.setVelocity(Math.cos(angulo) * 10, Math.sin(angulo) * 10);
            }
        });


        const datosrock = this.cache.json.get('rock3_t');
        const rockObjeto = this.matter.add.sprite(2500, 300, 'rock3', null, { 
        shape: datosrock.Rock3,
        isStatic: true,
        friction: 0
        });

        let empujarRock = false;

        this.matter.world.on('collisionstart', (e) => {
            e.pairs.forEach((p) => {
                if (p.bodyA.parent === rockObjeto.body || p.bodyB.parent === rockObjeto.body) {
                    empujarRock = true;
                }
            });
        });

        this.matter.world.on('afterupdate', () => {
            if (empujarRock) {
                empujarRock = false;
                const angulo = Phaser.Math.Angle.Between(rockObjeto.x, rockObjeto.y, this.pez.x, this.pez.y);
                this.pez.setVelocity(Math.cos(angulo) * 10, Math.sin(angulo) * 10);
            }
        });

        rockObjeto.setOnCollide(() => {
        const angulo = Phaser.Math.Angle.Between(rockObjeto.x, rockObjeto.y, this.pez.x, this.pez.y);
        this.pez.setVelocity(Math.cos(angulo) * 35, Math.sin(angulo) * 35);
        });
                
        miObjeto.setScale(9);        
        this.cameras.main.setZoom(0.7);
        this.pez = new Pez(this.matter.world, 2000, 200, 'pezquesemueve', 5, 5, 5);
        this.pez.setDepth(1);

        this.matter.world.debugConfig.showStaticBody = true;
        this.matter.world.debugConfig.showInternalEdges = true;
        
        this.cameras.main.centerOn(miObjeto.x, miObjeto.y);
        this.cameras.main.startFollow(this.pez, true, 0.8, 0.9);

        this.actualizarPez = () => this.pez.actualizarPasoFisico();
        this.matter.world.on("beforeupdate", this.actualizarPez);

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.matter.world.off("beforeupdate", this.actualizarPez);
        });
    }

    update(){
        const velocidad = this.pez.getVelocity();
        const velMax = this.pez.getMaxSpeed();
        const anticipacion = 6;
        const lerp = Phaser.Math.Clamp(this.pez.getSpeed() / velMax, 0.1, 1);

        this.cameras.main.setLerp(lerp, lerp);

        this.cameras.main.setFollowOffset(
            -velocidad.x * anticipacion,
            -velocidad.y * anticipacion
        );

    }
}