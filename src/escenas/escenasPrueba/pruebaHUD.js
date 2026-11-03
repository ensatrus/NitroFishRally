import Pez from "../../gameObjects/pez.js";

export default class PruebaHUD extends Phaser.Scene {
    constructor() {
        super({ key: "pruebaHUD" });
    }

    preload() {
        this.load.image("fondoPrueba", "./assets/sprites/fondoPrueba.jpg");
        this.load.image("señalIzq", "./assets/sprites/signalIzq.png");
        this.load.image("señalDch", "./assets/sprites/signalDch.png");
        this.load.font("Reloj Digital", "./assets/fonts/CursedTimerUlil-Aznm.ttf", "truetype");
        this.load.font("Velocidad", "./assets/fonts/AmericanCaptainPatrius02Fre-PvPd.ttf", "truetype");
    }

    create() {
        this.inicioTimer = this.time.now;

        const anchoPantalla = this.sys.game.config.width;
        const altoPantalla = this.sys.game.config.height;
        const bg = this.add.image(0, 0, 'fondoPrueba');
        bg.setScale(5);

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
            fill: "#13e800", // Color del texto
            fontStyle: "bold",
            fontFamily: "Reloj Digital",
            stroke: '#000000', // Color del borde 
            strokeThickness: 5 
        });

        this.textoVelocidad = this.add.text(velHUDX, velHUDY, this.velPez, {
            fontSize: "60px",
            fill: "#ffffff", // Color del texto
            fontStyle: "bold",
            fontFamily: "Velocidad",
            stroke: '#000000', // Color del borde 
            strokeThickness: 6
        });

        this.textoKMH = this.add.text(velHUDX + 25, velHUDY, "km/h", {
            fontSize: "10px",
            fill: "#ffffff", // Color del texto
            fontStyle: "bold",
            fontFamily: "Velocidad",
            stroke: '#000000', // Color del borde 
            strokeThickness: 5
        });

        const señalDerecha = this.add.image(señalX, señalY, "señalDch");
        señalDerecha.setVisible(false);
        señalDerecha.setOrigin(0.5, 1);       
        señalDerecha.setScrollFactor(0);    
        señalDerecha.setDepth(10);

        const señalIzquierda = this.add.image(señalX, señalY, "señalIzq");
        señalIzquierda.setVisible(false);
        señalIzquierda.setOrigin(0.5, 1);       
        señalIzquierda.setScrollFactor(0);    
        señalIzquierda.setDepth(10);

        señalDerecha.setDisplaySize(señalDim, señalDim); 
        señalIzquierda.setDisplaySize(señalDim, señalDim); 

        this.cameras.main.startFollow(this.pez);

        bg.setOrigin(0, 0);
        bg.setDepth(-1);

        this.barraAura = this.add.graphics();
        this.barraAura.setScrollFactor(0, 0); 
        this.barraAura.setDepth(10);

        this.textoTiempo.setOrigin(1, 0);
        this.textoTiempo.setScrollFactor(0, 0); 
        this.textoTiempo.setDepth(10);
        this.textoTiempo.scaleX = 0.7;

        this.textoVelocidad.setOrigin(0.5, 0);
        this.textoVelocidad.setScrollFactor(0, 0); 
        this.textoVelocidad.setDepth(10);
        this.textoVelocidad.scaleX = 1.2;

        this.textoKMH.setScrollFactor(0, 0);
        this.textoKMH.setDepth(10);
        this.textoKMH.scaleX = 1.2;

        // Dibujar la barra inicialmente
        this.actualizarAuraHUD();

        this.actualizarPez = () => this.pez.actualizarPasoFisico();
        this.matter.world.on("beforeupdate", this.actualizarPez);

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.matter.world.off("beforeupdate", this.actualizarPez);
        });

        // Prueba de sistema de señal de curva (provisionalmente con las flechas)
        const flechaIzq = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        const flechaDch = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        let estaParpadeando = false;

        this.input.keyboard.on('keydown', (event) => {
            if (event.key === 'ArrowLeft' && !this.estaParpadeando) {
                estaParpadeando = true;

                señalIzquierda.setVisible(true);
                señalIzquierda.setAlpha(1);

                const parpadeo = this.tweens.add({
                    targets: señalIzquierda,
                    alpha: 0,           
                    duration: 90,      
                    yoyo: true,        
                    repeat: -1         
                });

                this.time.delayedCall(2000, () => {
                    parpadeo.remove();   
                    señalIzquierda.setVisible(false); 
                    estaParpadeando = false;    
                });
            }

            if (event.key === 'ArrowRight' && !this.estaParpadeando) {
                estaParpadeando = true;

                señalDerecha.setVisible(true);
                señalDerecha.setAlpha(1);

                const parpadeo = this.tweens.add({
                    targets: señalDerecha,
                    alpha: 0,           
                    duration: 90,      
                    yoyo: true,        
                    repeat: -1         
                });

                this.time.delayedCall(2000, () => {
                    parpadeo.remove();   
                    señalDerecha.setVisible(false); 
                    estaParpadeando = false;    
                });
            }
        })

        this.cameras.main.startFollow(this.pez, false, 1, 1);
    }

    update() {
        this.actualizarVelocidadHUD();
        this.actualizarTimerHUD();
        this.actualizarAuraHUD();        
        this.actualizarCamara();
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

    actualizarCamara(){
        const velocidad = this.pez.getVelocity();
        const anticipacion = 6;

        this.cameras.main.setFollowOffset(
            -velocidad.x * anticipacion,
            -velocidad.y * anticipacion
        );
    }
}
