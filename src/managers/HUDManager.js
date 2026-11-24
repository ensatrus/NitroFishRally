export default class HUDManager {
    preload() {
    }

    constructor(escena, escenaSalida = "menuPruebas") {
        this.escena = escena;
        this.temporizadoresSenal = new Map();
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

        this.textoAura = escena.add.text(this.auraX, this.auraY - this.auraAlto, "AURA", {
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

        this.señalDerecha = escena.add.image(señalX + señalDim, señalY, "señalDch");
        this.señalDerecha.setVisible(false);
        this.señalDerecha.setOrigin(0.5, 1);
        this.señalDerecha.setScrollFactor(0);
        this.señalDerecha.setDepth(10);

        this.señalIzquierda = escena.add.image(señalX - señalDim, señalY, "señalIzq");
        this.señalIzquierda.setVisible(false);
        this.señalIzquierda.setOrigin(0.5, 1);
        this.señalIzquierda.setScrollFactor(0);
        this.señalIzquierda.setDepth(10);

        this.señalObstaculo = escena.add.image(señalX, señalY, "señalObs");
        this.señalObstaculo.setVisible(false);
        this.señalObstaculo.setOrigin(0.5, 1);
        this.señalObstaculo.setScrollFactor(0);
        this.señalObstaculo.setDepth(11);

        this.señalMultiple = escena.add.image(señalX, señalY, "señalMultiple");
        this.señalMultiple.setVisible(false);
        this.señalMultiple.setOrigin(0.5, 1);
        this.señalMultiple.setScrollFactor(0);
        this.señalMultiple.setDepth(10);

        this.señalDerecha.setDisplaySize(señalDim * señalEscala, señalDim * señalEscala);
        this.señalIzquierda.setDisplaySize(señalDim * señalEscala, señalDim * señalEscala);
        this.señalObstaculo.setDisplaySize(señalDim * señalEscala, señalDim * señalEscala);
        this.señalMultiple.setDisplaySize(señalDim * señalEscala, señalDim * señalEscala);

        this.barraAura = escena.add.graphics();
        this.barraAura.setScrollFactor(0, 0); 
        this.barraAura.setDepth(10);

        // Temporal
        this.textoOverdrive = escena.add.text(this.auraX + 10, this.auraY + 2, "OVERDRIVE", {
            fontSize: "10px",
            fill: "#d30000", // Color del texto
            fontStyle: "bold",
            fontFamily: "Velocidad",
            stroke: '#000000', // Color del borde 
            strokeThickness: 1
        });

        this.textoAura.setOrigin(0, 0);
        this.textoAura.setScrollFactor(0, 0); 
        this.textoAura.setDepth(10);
        this.textoAura.scaleX = 1.5;

        this.textoOverdrive.setOrigin(0, 0);
        this.textoOverdrive.setScrollFactor(0, 0); 
        this.textoOverdrive.setDepth(10);
        this.textoOverdrive.scaleX = 1.5;
        this.textoOverdrive.setAlpha(0);

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
            escena.scene.start(escenaSalida);
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

    actualizarSenalHUD(type){
        //Señal de obstáculos múltiples
        if (type === "start") {
            this.escena.tweens.killTweensOf(this.señalMultiple);
            this.señalMultiple.setVisible(true);
            this.señalMultiple.setAlpha(1);
            this.escena.tweens.add({
                targets: this.señalMultiple,
                alpha: 0,
                duration: 90,
                yoyo: true,
                repeat: -1
            });
            return;
        }

        if (type === "end") {
            this.escena.tweens.killTweensOf(this.señalMultiple);
            this.señalMultiple.setVisible(false);
            this.señalMultiple.setAlpha(1);
            return;
        }

        if (type === "multiple") {
            return;
        }

        //Señales que desaparecen con el tiempo
        const señales = {
            left: this.señalIzquierda,
            right: this.señalDerecha,
            obstacle: this.señalObstaculo
        };
        const señal = señales[type];

        if (!señal) {
            console.warn(`Tipo de señal de warning no reconocido: ${type}`);
            return;
        }

        const temporizadorAnterior = this.temporizadoresSenal.get(type);
        if (temporizadorAnterior) {
            this.escena.time.removeEvent(temporizadorAnterior);
        }

        señal.setVisible(true);
        señal.setAlpha(1);

        this.escena.tweens.killTweensOf(señal);
        this.escena.tweens.add({
            targets: señal,
            alpha: 0,
            duration: 90,
            yoyo: true,
            repeat: -1
        });

        const temporizador = this.escena.time.delayedCall(2000, () => {
            this.escena.tweens.killTweensOf(señal);
            señal.setVisible(false);
            señal.setAlpha(1);
            this.temporizadoresSenal.delete(type);
        });
        this.temporizadoresSenal.set(type, temporizador);
    }
    
    // Cuando el aura llegue a overdrive, tendremos un sprite con la barra en 3D y fueguito y tal
    // Mientras tanto he hecho un texto para el overdrive.
    actualizarAuraHUD(auraPez, auraMaxima) {
        this.barraAura.clear();
        this.textoOverdrive.setAlpha(auraPez >= auraMaxima * 2 ? 1 : 0);

        // Fondo de la barra 
        this.barraAura.fillStyle(0x333333, 1);
        this.barraAura.fillRect(this.auraX, this.auraY, this.auraAncho, this.auraAlto);

        // Relleno de la barra
        const porcentaje = auraPez / auraMaxima;
        const anchoRelleno = Math.min(this.auraAncho * porcentaje, this.auraAncho * 2);

        if (anchoRelleno > 0 && anchoRelleno <= this.auraAncho) {
            this.barraAura.fillStyle(0x00ffff, 1); 
            this.barraAura.fillRect(this.auraX + 2, this.auraY + 2, anchoRelleno - 4, this.auraAlto - 4);
        }
        else if (anchoRelleno > this.auraAncho && anchoRelleno < this.auraAncho * 2) {
            this.barraAura.fillStyle(0x00ffff, 1); 
            this.barraAura.fillRect(this.auraX + 2, this.auraY + 2, this.auraAncho - 4, this.auraAlto - 4);

            this.barraAura.fillStyle(0x9d00ff, 1);
            this.barraAura.fillRect(this.auraX + 2, this.auraY + 2, anchoRelleno - 4 - this.auraAncho, this.auraAlto - 4);
        }
        else if (anchoRelleno >= this.auraAncho * 2) {
            this.barraAura.fillStyle(0xefbf04, 1);
            this.barraAura.fillRect(this.auraX + 2, this.auraY + 2, this.auraAncho - 4, this.auraAlto - 4);
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
