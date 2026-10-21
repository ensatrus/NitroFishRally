
/**
 * Escena Físicas.
 * @extends Phaser.Scene
 */

export default class PruebaFisicas extends Phaser.Scene{
    constructor(){
        super({key: 'PruebaFisicas'});
    }

    preload(){
	    this.load.image('cubo', './assets/sprites/fih.png');
	}
    create(){
        this.fih = this.matter.add.image(200,200,'cubo');
        this.fih.setAngle(2);
        this.fih.setFrictionAir(0);
        this.fih.setMass(0.5);
        this.fih.thrust(0.1);
        this.fih.setBounce(1);

        this.matter.world.setBounds(0, 0, 800, 600);
    }
    update(){
        
    }
};

