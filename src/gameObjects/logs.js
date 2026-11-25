export default class Log extends Phaser.Physics.Matter.Sprite {
    #fuerzaEmpuje;
    #empujar;
    #velocidad;
    #direccion;
    #distancia;
    #mX;
    #mY;
    #moviendoIda = true;

    constructor(scene, x, y, textura, pez, velocidad = 1, direccion = 0, distancia = 0) {

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
        this.setScale(1.4)

        this.scene.add.existing(this);

        this.#configurarColisiones();

        this.angle = this.#direccion;

        const rad = Phaser.Math.DegToRad(this.#direccion);
        this.setVelocity(Math.cos(rad) * this.#velocidad, Math.sin(rad) * this.#velocidad);
        

        this.#distancia = distancia;
        this.#mX = x;
        this.#mY = y;
        this.#movimiento();
    }

    #movimiento() {
        const mundo = this.scene.matter.world;
        const rad = Phaser.Math.DegToRad(this.#direccion);
        const direccionX = Math.cos(rad);
        const direccionY = Math.sin(rad);
        const velocidadX = direccionX * this.#velocidad;
        const velocidadY = direccionY * this.#velocidad;

        const actualizarMovimiento = () => {
            const desplazamiento = (this.x - this.#mX) * direccionX
                + (this.y - this.#mY) * direccionY;

            if (this.#moviendoIda && desplazamiento >= this.#distancia) {
                this.setVelocity(-velocidadX, -velocidadY);
                this.#moviendoIda = false;
            } else if (!this.#moviendoIda && desplazamiento <= 0) {
                this.setVelocity(velocidadX, velocidadY);
                this.#moviendoIda = true;
            }
        };

        mundo.on('beforeupdate', actualizarMovimiento);
        this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            mundo.off('beforeupdate', actualizarMovimiento);
        });
    }

    #configurarColisiones() {
        const mundo = this.scene.matter.world;
        const colisionPez = (e) => {
            for (const p of e.pairs) {
                const isLog = p.bodyA.parent === this.body || p.bodyB.parent === this.body;
                const isPez = p.bodyA.parent === this.pez.body || p.bodyB.parent === this.pez.body;

                if (isLog && isPez) {
                    this.#empujar = true;
                }
            }
        };

        const empuje = () => {
            if (this.#empujar) {
                this.#empujar = false;
                this.#empujarPez(this.#fuerzaEmpuje);
            }
        };

        mundo.on('collisionstart', colisionPez);
        mundo.on('afterupdate', empuje);

        this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            mundo.off('collisionstart', colisionPez);
            mundo.off('afterupdate', empuje);
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
