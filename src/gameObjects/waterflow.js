export default class Waterflow extends Phaser.Physics.Matter.Sprite {
    #pezDentro;
    #fuerza;
    #direccion;
    #actualizarCorriente;

    constructor(scene, x, y, textura, pez, fuerza = 0.05, direccion = 0, center, vertices,) {

        super(scene.matter.world, x, y, textura, null);

        this.pez = pez;
        this.#pezDentro = false;

        const body = scene.matter.add.fromVertices(center.x, center.y, vertices);
        this.setExistingBody(body);
        this.setStatic(true);
        this.setSensor(true);
        scene.add.existing(this);

        this.#fuerza = fuerza;
        this.#direccion = direccion;
        this.#configurarDeteccion();
    }

    #aplicarCorriente() {
        if (this.#pezDentro && this.pez) {
            this.pez.setAwake(true);

            const rad = Phaser.Math.DegToRad(this.#direccion);
            const vectorFuerza = new Phaser.Math.Vector2()
                .setToPolar(rad, this.#fuerza * this.pez.masa);

            this.pez.applyForce(vectorFuerza);
        }
    }
   
    #configurarDeteccion() {
        const mundo = this.scene.matter.world;
        const alEmpezarColision = (e) => {
            for (const p of e.pairs) {
                const isWaterflow = p.bodyA.parent === this.body || p.bodyB.parent === this.body;
                const isPez = p.bodyA.parent === this.pez.body || p.bodyB.parent === this.pez.body;

                if (isWaterflow && isPez) {
                    this.#pezDentro = true;
                }
            }
        };

        const alTerminarColision = (e) => {
            for (const p of e.pairs) {
                const isWaterflow = p.bodyA.parent === this.body || p.bodyB.parent === this.body;
                const isPez = p.bodyA.parent === this.pez.body || p.bodyB.parent === this.pez.body;

                if (isWaterflow && isPez) {
                    this.#pezDentro = false;
                }
            }
        };

        this.#actualizarCorriente = () => this.#aplicarCorriente();

        mundo.on('collisionstart', alEmpezarColision);
        mundo.on('collisionend', alTerminarColision);
        mundo.on('beforeupdate', this.#actualizarCorriente);

        this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            mundo.off('collisionstart', alEmpezarColision);
            mundo.off('collisionend', alTerminarColision);
            mundo.off('beforeupdate', this.#actualizarCorriente);
        });
    }

    estaPezDentro() {
        return this.#pezDentro;
    }
}
