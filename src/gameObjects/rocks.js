export default class Rock extends Phaser.Physics.Matter.Sprite {
    #fuerzaEmpuje;
    #empujar;
    #scale

    constructor(scene, x, y, textura, pez) {

        super(scene.matter.world, x, y, textura, null, {
            shape: scene.cache.json.get('rock3_t').Rock3,
            friction: 0
        });

        this.#scale = 0.5;
        this.pez = pez;
        this.#empujar = false;
        this.#fuerzaEmpuje = 6; // Fuerza aplicada

        this.setScale(this.#scale);

        this.scene.add.existing(this);

        this.#configurarColisiones();
    }

    #configurarColisiones() {
        this.scene.matter.world.on('collisionstart', (e) => {
            e.pairs.forEach((p) => {
                const isRoca = p.bodyA.parent === this.body || p.bodyB.parent === this.body;
                const isPez = p.bodyA.parent === this.pez.body || p.bodyB.parent === this.pez.body;

                if (isRoca && isPez) {
                    this.#empujar = true;
                }
            });
        });

        this.scene.matter.world.on('afterupdate', () => {
            if (this.#empujar) {
                this.#empujar = false;
                this.#empujarPez(this.#fuerzaEmpuje);
            }
        });
    }

    #empujarPez(fuerza) {
        if (!this.pez) return;
        const angulo = Phaser.Math.Angle.Between(this.x, this.y, this.pez.x, this.pez.y);
        this.pez.setVelocity(Math.cos(angulo) * fuerza, Math.sin(angulo) * fuerza);
    }

    setFuerzaEmpuje(fuerza) {
        this.#fuerzaEmpuje = fuerza;
    }
}
