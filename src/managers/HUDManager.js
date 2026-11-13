export default class HUDManager {
    preload() {
    }

    constructor(escena) {
        this.inicioTimer = escena.sys.game.loop.time;

        const anchoPantalla = escena.sys.game.config.width;
        const altoPantalla = escena.sys.game.config.height;

        this.auraX = 20;
        this.auraY = 40;

        const tiempoX = anchoPantalla - 20; 
        const tiempoY = 20;

        const velHUDX = anchoPantalla/2;
        const velHUDY = 20;

        const señalX = anchoPantalla / 2;
        const señalY = altoPantalla - 20;
        const señalDim = 64;
        const señalEscala = 1.5;
        this.auraAncho = 300;
        this.auraAlto = 20;

        this.textoTiempo = escena.add.text(tiempoX, tiempoY, "00:00:000", {
            fontSize: "20px",
            fill: "#13e800", // Color del texto
            fontStyle: "bold",
            fontFamily: "Reloj Digital",
            stroke: '#000000', // Color del borde 
            strokeThickness: 5 
        });

        this.textoAura = escena.add.text(25, this.auraY - this.auraAlto, "AURA", {
            fontSize: "12px",
            fill: "#ffc800", // Color del texto
            fontStyle: "bold",
            fontFamily: "Velocidad",
            stroke: '#000000', // Color del borde 
            strokeThickness: 4
        });

        this.textoVelocidad = escena.add.text(velHUDX, velHUDY, this.velPez, {
            fontSize: "60px",
            fill: "#ffffff", // Color del texto
            fontStyle: "bold",
            fontFamily: "Velocidad",
            stroke: '#000000', // Color del borde 
            strokeThickness: 6
        });

        this.textoKMH = escena.add.text(velHUDX + 25, velHUDY, "km/h", {
            fontSize: "10px",
            fill: "#ffffff", // Color del texto
            fontStyle: "bold",
            fontFamily: "Velocidad",
            stroke: '#000000', // Color del borde 
            strokeThickness: 5
        });

        const señalDerecha = escena.add.image(señalX, señalY, "señalDch");
        señalDerecha.setVisible(false);
        señalDerecha.setOrigin(0.5, 1);       
        señalDerecha.setScrollFactor(0);    
        señalDerecha.setDepth(10);

        const señalIzquierda = escena.add.image(señalX, señalY, "señalIzq");
        señalIzquierda.setVisible(false);
        señalIzquierda.setOrigin(0.5, 1);       
        señalIzquierda.setScrollFactor(0);    
        señalIzquierda.setDepth(10);

        señalDerecha.setDisplaySize(señalDim * señalEscala, señalDim * señalEscala); 
        señalIzquierda.setDisplaySize(señalDim * señalEscala, señalDim * señalEscala);

        this.barraAura = escena.add.graphics();
        this.barraAura.setScrollFactor(0, 0); 
        this.barraAura.setDepth(10);

        this.textoAura.setOrigin(0, 0);
        this.textoAura.setScrollFactor(0, 0); 
        this.textoAura.setDepth(10);
        this.textoAura.scaleX = 1.5;

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

        let boton = escena.add.rectangle(600, 50, 150, 50, 0x3287d1);
        
        boton.setInteractive();
        boton.setScrollFactor(0, 0);

        boton.on("pointerdown", () => {
            escena.scene.start("menuPruebas"); 
        });

        escena.add.text(600, 50, "Volver",{
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
            
        }).setOrigin(0.5).setAbove(boton).setScrollFactor(0, 0);
    }

    actualizarHUD(auraActual, auraMaxima, tiempo, velPez) {
        this.actualizarAuraHUD(auraActual, auraMaxima);
        this.actualizarTimerHUD(tiempo);
        this.actualizarVelocidadHUD(velPez);
    }

    actualizarSenalHUD(event){
        let estaParpadeando = false;
        if (event.key === 'ArrowLeft' && !estaParpadeando) {
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

        if (event.key === 'ArrowRight' && !estaParpadeando) {
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
    }
    
    actualizarAuraHUD(auraPez, auraMaxima) {
        this.barraAura.clear();

        // Fondo de la barra 
        this.barraAura.fillStyle(0x333333, 1);
        this.barraAura.fillRect(this.auraX, this.auraY, this.auraAncho, this.auraAlto);

        // Relleno de la barra
        const porcentaje = auraPez / auraMaxima;
        const anchoRelleno = Math.min(this.auraAncho * porcentaje, this.auraAncho);

        if (anchoRelleno > 0) {
            this.barraAura.fillStyle(0x00ffff, 1); 
            this.barraAura.fillRect(this.auraX + 2, this.auraY + 2, anchoRelleno - 4, this.auraAlto - 4);
        }
    }

    actualizarTimerHUD(tiempo) {
        const tiempoMs = Math.floor(tiempo - this.inicioTimer);
        const minutos = Math.floor(tiempoMs / 60000);
        const segundos = Math.floor(tiempoMs / 1000) % 60;
        const milisegundos = tiempoMs % 1000;

        this.textoTiempo.setText(
            `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}:${String(milisegundos).padStart(3, "0")}`
        );
    }

    actualizarVelocidadHUD(velPez){
        const multVel = 6;
        let vel = velPez * multVel;
        this.velPez = vel.toFixed(0);
        this.textoVelocidad.setText(this.velPez);
    }
}
