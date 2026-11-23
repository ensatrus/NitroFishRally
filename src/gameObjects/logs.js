export default class Log extends Phaser.Physics.Matter.Sprite {
    #fuerzaEmpuje;
    #empujar;
    #velocidad;
    #direccion;

    constructor(scene, x, y, textura, pez, velocidad = 0, direccion = 0) {

        super(scene.matter.world, x, y, textura, null, {
            shape: scene.cache.json.get('log3_t').log3,
            friction: 0,
            ignoreGravity: true,
            frictionAir: 0
        });

        this.pez = pez;
        this.#empujar = false;
        this.#fuerzaEmpuje = 10; // Fuerza aplicada

        this.#velocidad = velocidad;
        this.#direccion = direccion;
        this.setFixedRotation();
        this.setMass(100000);

        this.scene.add.existing(this);

        this.#configurarColisiones();

        this.angle = this.#direccion;

        const rad = Phaser.Math.DegToRad(this.#direccion);
        this.setVelocity(Math.cos(rad) * this.#velocidad, Math.sin(rad) * this.#velocidad);
    }

    

    #configurarColisiones() {
        this.scene.matter.world.on('collisionstart', (e) => {
            e.pairs.forEach((p) => {
                const isLog = p.bodyA.parent === this.body || p.bodyB.parent === this.body;
                const isPez = p.bodyA.parent === this.pez.body || p.bodyB.parent === this.pez.body;

                if (isLog && isPez) {
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
