import Medalla from "../gameObjects/medalla.js";

export default class Palmares extends Phaser.Scene {
     constructor() {
        super({ key: "palmares" });
     }

     create(){
          const bg = this.add.image(0, 0, 'fondoPalmares');
          bg.setDisplaySize(800, 600);
          bg.setOrigin(0, 0);
          bg.setDepth(-1);

          const gameManager = this.game.gameManager;

          // Tiempos a superar (o igualar) para obtener la medalla de oro
          this.tiempoOro = [100, 120, 180];
          this.multMedalla = [1, 1.5, 2]; // Multiplicador para plata y bronce
          this.auraTrofeo = [1000, 2000, 3000];

          this.mejoresTiempos = [-1, -1, -1];
          this.textosTiempos = [];

          this.medallas = [];
          this.medallas.push(new Medalla (this, 100, 300));
          this.medallas.push(new Medalla (this, 400, 300));
          this.medallas.push(new Medalla (this, 700, 300));

          for (let i = 0; i < this.mejoresTiempos.length; i++) {
               this.mejoresTiempos[i] = gameManager.getTiempoNivel(i + 1);
               let textoTiempo;
               if (this.mejoresTiempos[i] !== undefined) {
                    textoTiempo = this.add.text(150 + i * 250, 200, "Nivel " + (i + 1) + ": " + (this.mejoresTiempos[i] / 60).toFixed(0) + ":" + (this.mejoresTiempos[i] % 60), {
                         fontSize: "18px",
                         fill: "#ffffff",
                         fontStyle: "bold",
                         fontFamily: "Arial"
                    }).setOrigin(0.5).setAlpha(0);
               }
               this.textosTiempos.push(textoTiempo);
               
               this.ponerMedalla(this.mejoresTiempos[i], i + 1);
          }

          let boton1 = this.add.rectangle(150, 300, 100, 100, 0xffffff, 0);
          let boton2 = this.add.rectangle(400, 300, 100, 100, 0xffffff, 0);
          let boton3 = this.add.rectangle(650, 300, 100, 100, 0xffffff, 0);

          boton1.setInteractive();
          boton2.setInteractive();
          boton3.setInteractive();

          boton1.on("pointerover", () => {
               this.cambiarOpacidad(0, 1);
          });
          boton1.on("pointerout", () => this.cambiarOpacidad(0, 0));

          boton2.on("pointerover", () => this.cambiarOpacidad(1, 1));
          boton2.on("pointerout", () => this.cambiarOpacidad(1, 0));

          boton3.on("pointerover", () => this.cambiarOpacidad(2, 1));
          boton3.on("pointerout", () => this.cambiarOpacidad(2, 0));

          let botonVolver = this.add.rectangle(100, 100, 150, 50, 0x3287d1);
        
          botonVolver.setInteractive();
          botonVolver.setScrollFactor(0);

          botonVolver.on("pointerdown", () => this.scene.start("menuPrincipal"));

          this.add.text(100, 100, "Volver",{
               fontSize: "18px",
               fill: "#ffffff",
               fontStyle: "bold",
               fontFamily: "Arial"
          }).setOrigin(0.5).setAbove(botonVolver).setScrollFactor(0, 0);

        this.cameras.main.fadeIn(400, 0, 0, 0);
     }

     cambiarOpacidad = (i, alpha) => {
          const texto = this.textosTiempos[i];
          if (!texto) return;

          this.tweens.killTweensOf(texto);
          this.tweens.add({
               targets: texto,
               alpha,
               duration: 100,
               ease: "Linear"
          });
     }

     ponerMedalla (tiempo, nivel) {
          let medalla;
          for (let i = this.multMedalla.length - 1; i >= 0; i--) {
               if (tiempo <= this.tiempoOro[nivel - 1] * this.multMedalla[i]) medalla = i;
          }

          if      (medalla == 2) this.medallas[nivel - 1].play("medallaBronce_idle", true);
          else if (medalla == 1) this.medallas[nivel - 1].play("medallaPlata_idle", true);
          else if (medalla == 0) this.medallas[nivel - 1].play("medallaOro_idle", true);
     }
}