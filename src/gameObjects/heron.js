export default class Heron extends Phaser.Physics.Matter.Sprite {
    #pezDentro;
    #avisando;
    #fuerzaEmpuje;

    constructor(scene, x, y, textura, pez, fuerzaEmpuje = 0, center, vertices,) {
        super(scene.matter.world, x, y, textura, null)

        this.pez = pez;
        this.#pezDentro = false;
        this.#avisando = false;
        this.#fuerzaEmpuje = fuerzaEmpuje;

        const body = scene.matter.add.fromVertices(center.x, center.y, vertices,{
            isStatic: true,
            isSensor: true
        });
        this.setExistingBody(body);
        this.setStatic(true);
        this.setSensor(true);
        scene.add.existing(this);

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
        if (this.#avisando) return;
        this.#avisando = true;

    
        this.setAlpha(0.5);

        this.scene.time.delayedCall(1000, () => {
            this.setAlpha(1); 
            this.#avisando = false;

            if (this.#pezDentro) {
                const angulo = Phaser.Math.Angle.Between(this.x, this.y, this.pez.x, this.pez.y);
                this.pez.setVelocity(Math.cos(angulo) * this.#fuerzaEmpuje, Math.sin(angulo) * this.#fuerzaEmpuje);
            }
        });
    }

    estaPezDentro() {
        return this.#pezDentro;
    }
}