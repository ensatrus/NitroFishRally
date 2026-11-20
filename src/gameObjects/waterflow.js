export default class Waterflow extends Phaser.Physics.Matter.Sprite {
    #pezDentro;
    #fuerza;
    #direccion;

    constructor(scene, x, y, textura, pez, fuerza = 0.05, direccion = 0) {

        super(scene.matter.world, x, y, textura, null, {
            shape: scene.cache.json.get('waterflow_t').waterflow,
        });

        this.pez = pez;
        this.#pezDentro = false;

        this.scene.add.existing(this);

        this.#configurarDeteccion();

        this.#fuerza = fuerza;
        this.#direccion = direccion;
        this.setAngle(this.#direccion);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.#pezDentro && this.pez) {
            this.pez.setAwake(true);

            const rad = Phaser.Math.DegToRad(this.#direccion);
            const vectorFuerza = new Phaser.Math.Vector2()
                .setToPolar(rad, this.#fuerza * this.pez.masa);

            this.pez.applyForce(vectorFuerza);
        }
    }
   
    #configurarDeteccion() {
        this.scene.matter.world.on('collisionstart', (e) => {
            e.pairs.forEach((p) => {
                const isWaterflow = p.bodyA.parent === this.body || p.bodyB.parent === this.body;
                const isPez = p.bodyA.parent === this.pez.body || p.bodyB.parent === this.pez.body;

                if (isWaterflow && isPez) {
                    this.#pezDentro = true;
                }
            });
        });

        this.scene.matter.world.on('collisionend', (e) => {
            e.pairs.forEach((p) => {
                const isWaterflow = p.bodyA.parent === this.body || p.bodyB.parent === this.body;
                const isPez = p.bodyA.parent === this.pez.body || p.bodyB.parent === this.pez.body;

                if (isWaterflow && isPez) {
                    this.#pezDentro = false;
                }
            });
        });
    }

    estaPezDentro() {
        return this.#pezDentro;
    }
}
