
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
        let fih = this.matter.add.image(200,200,'cubo');
        const coliderForm = [(1,2), (100,150), (200, 200), (1, 200)]

        fih.setBody().fromVertices(300, 300, '50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38', {}, true);
        fih.setAngle(2);
        fih.setFrictionAir(0);
        fih.setMass(10);
        fih.thrust(1);
        fih.setBounce(1);

        this.matter.world.setBounds(0, 0, 800, 600);
    }
    update(){
        
    }
};

