export default class Heron extends Phaser.Physics.Matter.Sprite {
    #pezDentro;

    constructor(scene, x, y, textura, pez) {

        super(scene.matter.world, x, y, textura, null, {
            shape: forma,
        });

        this.pez = pez;
        this.#pezDentro = false;

        this.scene.add.existing(this);

        this.#configurarDeteccion();
    }

    #configurarDeteccion() {
        this.scene.matter.world.on('collisionstart', (e) => {
            e.pairs.forEach((p) => {
                const isHeron = p.bodyA.parent === this.body || p.bodyB.parent === this.body;
                const isPez = p.bodyA.parent === this.pez.body || p.bodyB.parent === this.pez.body;

                if (isHeron && isPez) {
                    this.#pezDentro = true;
                    this.#alEntrar();
                }
            });
        });

        this.scene.matter.world.on('collisionend', (e) => {
            e.pairs.forEach((p) => {
                const isHeron = p.bodyA.parent === this.body || p.bodyB.parent === this.body;
                const isPez = p.bodyA.parent === this.pez.body || p.bodyB.parent === this.pez.body;

                if (isHeron && isPez) {
                    this.#pezDentro = false;
                }
            });
        });
    }

    #alEntrar() {
        // Por ahora no hace nada
    }

    estaPezDentro() {
        return this.#pezDentro;
    }
}
