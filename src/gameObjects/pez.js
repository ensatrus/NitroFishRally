export default class Pez extends Phaser.Physics.Matter.Sprite{
    
    #controlFactor;
    #maxSpeedFactor;
    #drivingFrictionDivider;
    #frictionFactor;
    #marchaAtrasFrictionFactor;
    #marchaAtras;
    #stoppingFrictionDivider;
    #frenoDivider;
    #minSpeedForAuraFactor;
    #aceleracionDivider;
    #derrapeMargen;

    constructor(scene, x, y, textura, aceleracion, control, freno){
        super(scene, x, y, textura);

        this.masa = aceleracion + control + freno;
        this.aceleracion = aceleracion;
        this.control = control;
        this.freno = freno;
        this.direccion = 0;
        this.aura = 0;

        this.setCircle();
        this.setScale(0.1);
        this.setFriction(0.9, 0.01, 30);
        this.setFixedRotation();
        this.setMass(this.masa);
        this.setBounce(0.5);

        this.keys = {
            a: this.scene.input.keyboard.addKey("A"),
            s: this.scene.input.keyboard.addKey("S"),
            w: this.scene.input.keyboard.addKey("W"),
            d: this.scene.input.keyboard.addKey("D"),
            space: this.scene.input.keyboard.addKey("SPACE"),
            left: this.scene.input.keyboard.addKey("LEFT"),
            right: this.scene.input.keyboard.addKey("RIGHT"),
            up: this.scene.input.keyboard.addKey("UP"),
            down: this.scene.input.keyboard.addKey("DOWN")
        };

        this.scene.add.existing(this);

        this.#controlFactor = 5/6; // Sensibilidad de control, ajusta la velocidad de rotación del pez
        this.#maxSpeedFactor = 225; // Se divide este numero entre la masa para obtener la velocidad máxima del pez
        this.#drivingFrictionDivider = 1000; // Se divide la masa entre este numero para obtener la fricción del pez al acelerar
        this.#frictionFactor = 0.035; // El valor máximo de fricción que puede tener el pez al no acelerar
        this.#marchaAtrasFrictionFactor = 0.04; // El valor máximo de fricción que puede tener el pez al ir marcha atrás
        this.#marchaAtras = -0.25; // Factor de aceleración al ir marcha atrás
        this.#stoppingFrictionDivider = 350; // Se divide el freno entre este numero para obtener la fricción del pez al frenar
        this.#frenoDivider = 2000; // Se divide la velocidad del pez entre este numero para obtener la fuerza de frenado
        this.#minSpeedForAuraFactor = Math.PI; // Se multiplica este numero por la aceleración para obtener la velocidad mínima a partir de la cual el pez empieza a generar aura
        this.#aceleracionDivider = 6500; // Se divide la aceleración entre este numero para obtener la fuerza de aceleración del pez
        this.#derrapeMargen = 0.1; // Margen del derrape, el factor minimo por el que se multiplica la fricción del pez

    }

    getSpeed() {
        const { x, y } = this.getVelocity();
        return Math.hypot(x, y);
    }

    getAura() {
        return this.aura;
    }

    preUpdate(time, delta) {
    super.preUpdate(time, delta);
    }

    actualizarPasoFisico() {
       
        const derrape = this.getDerrape();

        if (this.keys.a.isDown || this.keys.left.isDown) {
            this.rotar(-this.control  * this.#controlFactor);
        }

        if (this.keys.d.isDown || this.keys.right.isDown) {
            this.rotar(this.control  * this.#controlFactor);
        }

        this.dirToAngle();

        if (this.keys.w.isDown || this.keys.up.isDown) {
            if(this.getSpeed() < (this.#maxSpeedFactor/(this.masa))) this.acelerar(1);
            this.setFrictionAir(derrape * this.masa / this.#drivingFrictionDivider);
        } 
        else {
            this.setFrictionAir(derrape * this.#frictionFactor);
        }

        if (this.keys.s.isDown || this.keys.down.isDown) {
            this.acelerar(this.#marchaAtras);
            this.setFrictionAir(derrape * this.#marchaAtrasFrictionFactor);
        }
        
        if(this.keys.space.isDown){
            if(this.getSpeed() > 0.1) this.frenar();
            this.setFrictionAir((this.freno+2)/this.#stoppingFrictionDivider);
        }
    }

    actualizarAura() {
        const velocidad = this.getSpeed()*3;
        const minVelocidad = this.#minSpeedForAuraFactor * this.aceleracion;

        const incrementoAura = Phaser.Math.Clamp(velocidad - minVelocidad, -minVelocidad, (this.aceleracion+this.control)*2);

        this.aura = Math.max(0, this.aura + incrementoAura);
    }

    acelerar(sentido){
        const fuerza = new Phaser.Math.Vector2()
                        .setToPolar(this.rotation, this.aceleracion* this.masa * sentido / this.#aceleracionDivider);

        this.applyForce(fuerza);
    }

    frenar(){
        const antiderrape = (1 + this.#derrapeMargen*2) - this.getDerrape()

        const fuerza = new Phaser.Math.Vector2(this.getVelocity().x, this.getVelocity().y)
                                              .setLength(-this.freno* antiderrape * this.getSpeed()/this.#frenoDivider);

        this.applyForce(fuerza);
    }

    rotar(angulo) {
        this.direccion += angulo;
    }

    dirToAngle() {
        this.direccion %= 360;
        if (this.direccion > 180) {
            this.angle = this.direccion - 360;
        } 
        else {
            this.angle = this.direccion;
        }
    }

    getDerrape() {
        const { x, y } = this.getVelocity();
        const rapidez = Math.hypot(x, y);

        if (rapidez === 0) {
            return 0;
        }

        const seno = (
            Math.cos(this.rotation) * y -
            Math.sin(this.rotation) * x
        ) / rapidez;

        return Phaser.Math.Clamp(Math.abs(seno)+this.#derrapeMargen, 0, 1+this.#derrapeMargen);
    }

    setAceleracion(aceleracion) {
        this.aceleracion = aceleracion;
        this.setMasa(this.aceleracion + this.control + this.freno);
    }

    setControl(control) {
        this.control = control;
        this.setMasa(this.aceleracion + this.control + this.freno);
    }

    setFreno(freno) {
        this.freno = freno;
        this.setMasa(this.aceleracion + this.control + this.freno);
    }
    
    setMasa(masa) {
        this.masa = masa;
        this.setMass(this.masa);
    }
}