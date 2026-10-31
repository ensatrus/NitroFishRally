import Pez from "../../gameObjects/pez.js";

export default class PruebaHUD extends Phaser.Scene {
    constructor() {
        super({ key: "pruebaHUD" });
    }

    preload() {
        this.load.image("fondoPrueba", "./assets/sprites/fondoPrueba.jpg");
        this.load.image("señalIzq", "./assets/sprites/signalIzq.png");
        this.load.image("señalDch", "./assets/sprites/signalDch.png");
    }

    create() {
        this.inicioTimer = this.time.now;

        const anchoPantalla = this.sys.game.config.width;
        const altoPantalla = this.sys.game.config.height;
        const bg = this.add.image(0, 0, 'fondoPrueba');

        this.auraX = 20;
        this.auraY = 20;

        const tiempoX = anchoPantalla - 20; 
        const tiempoY = 20;

        const velHUDX = anchoPantalla/2;
        const velHUDY = 20;

        const señalX = anchoPantalla / 2;
        const señalY = altoPantalla - 20;
        const señalDim = 64;

        this.auraActual = 0; 
        this.auraMaxima = 1000;
        this.auraAncho = 150;
        this.auraAlto = 20;
        this.velPez = 0;

        this.pez = new Pez(this.matter.world, 300, 300, 'pezquesemueve', 6, 6, 6);

        this.textoTiempo = this.add.text(tiempoX, tiempoY, "00:00:00", {
            fontSize: "20px",
            fill: "#eca33d",
            fontStyle: "bold",
            fontFamily: "Arial" 
        });

        this.textoVelocidad = this.add.text(velHUDX, velHUDY, this.velPez, {
            fontSize: "60px",
            fill: "#221274",
            fontStyle: "bold",
            fontFamily: "Arial" 
        });

        const señal = this.add.image(señalX, señalY, "señalDch");
        señal.setOrigin(0.5, 1);       
        señal.setScrollFactor(0);    
        señal.setDepth(10);

        señal.setDisplaySize(señalDim, señalDim); 

        this.cameras.main.startFollow(this.pez);

        bg.setOrigin(0, 0);
        bg.setDepth(-1);

        this.barraAura = this.add.graphics();
        this.barraAura.setScrollFactor(0, 0); 
        this.barraAura.setDepth(10);

        this.textoTiempo.setOrigin(1, 0);
        this.textoTiempo.setScrollFactor(0, 0); 
        this.textoTiempo.setDepth(10);

        this.textoVelocidad.setOrigin(0.5, 0);
        this.textoVelocidad.setScrollFactor(0, 0); 
        this.textoVelocidad.setDepth(10);

        // Dibujar la barra inicialmente
        this.actualizarAuraHUD();

        this.actualizarPez = () => this.pez.actualizarPasoFisico();
        this.matter.world.on("beforeupdate", this.actualizarPez);

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.matter.world.off("beforeupdate", this.actualizarPez);
        });
    }

    update() {
        this.actualizarVelocidadHUD();
        this.actualizarTimerHUD();
        this.actualizarAuraHUD();
    }

    // Seria conveniente meter los métodos que siguen en un HUDmanager o algo del estilo
    // (no deberia de hacer falta cambiar nada de dentro de los métodos)
    actualizarAuraHUD() {
        this.pez.actualizarAura();
        this.auraActual = this.pez.getAura();
        
        this.barraAura.clear();

        // Fondo de la barra 
        this.barraAura.fillStyle(0x333333, 1);
        this.barraAura.fillRect(this.auraX, this.auraY, this.auraAncho, this.auraAlto);

        // Relleno de la barra
        const porcentaje = this.auraActual / this.auraMaxima;
        const anchoRelleno = Math.min(this.auraAncho * porcentaje, this.auraAncho);

        if (anchoRelleno > 0) {
            this.barraAura.fillStyle(0x00ffff, 1); 
            this.barraAura.fillRect(this.auraX + 2, this.auraY + 2, anchoRelleno - 4, this.auraAlto - 4);
        }
    }

    actualizarTimerHUD(){
        const tiempoMs = Math.floor(this.time.now - this.inicioTimer);
        const minutos = Math.floor(tiempoMs / 60000);
        const segundos = Math.floor(tiempoMs / 1000) % 60;
        const milisegundos = tiempoMs % 1000;

        this.textoTiempo.setText(
            `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}:${String(milisegundos).padStart(3, "0")}`
        );
    }

    actualizarVelocidadHUD(){
        const multVel = 6;
        let vel = this.pez.getSpeed() * multVel;
        this.velPez = vel.toFixed(0);
        this.textoVelocidad.setText(this.velPez);
    }

    actualizarSeñalHUD(){

    }
}
