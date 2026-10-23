
/**
 * Escena Físicas.
 * @extends Phaser.Scene
 */

import Pez from './pez.js';

export default class PruebaFisicas extends Phaser.Scene{
    constructor(){
        super({key: 'PruebaFisicas'});
    }

    preload(){
	    this.load.image('cubo', './assets/sprites/fih.png');
        this.load.image('pezquesemueve', './assets/sprites/pezquesemueve.png');
	}
    create(){
        // Objetos
        // let fih = this.matter.add.image(0,0,'cubo');
        let pez = new Pez(this.matter.world, 300, 300, 'pezquesemueve');
        this.add.existing(pez);

        
        const coliderForm = [(1,2), (100,150), (200, 200), (1, 200)];
        
        // fih.setFixedRotation();
        // fih.setFrictionAir(0);
        // fih.setMass(1);
        // fih.setVelocity(5.2,5.1);
        // fih.setFriction(0);
        // fih.setBounce(1);

        pez.setFriction(0);

        this.matter.world.setBounds(0, 0, 800, 600);

        let boton = this.add.rectangle(100, 50, 150, 50, 0x3287d1);

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
    }
    update(){
        
    }
};

