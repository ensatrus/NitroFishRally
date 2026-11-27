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

          this.botones = [];
          this.textosTiempos = [];

          this.medallas = [];

          for (let i = 0; i < this.mejoresTiempos.length; i++) {
               this.mejoresTiempos[i] = gameManager.getTiempoNivel(i + 1);
               const minutos = Math.floor(this.mejoresTiempos[i] / 60000);
               const segundos = Math.floor(this.mejoresTiempos[i] / 1000) % 60;
               const milisegundos = Math.floor(this.mejoresTiempos[i] % 1000);
               let textoTiempo;

               if (this.mejoresTiempos[i] !== undefined) {
                    textoTiempo = this.add.text(150 + i * 250, 200, `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}:${String(milisegundos).padStart(3, "0")}`, {
                         fontSize: "18px",
                         fill: "#ffffff",
                         fontStyle: "bold",
                         fontFamily: "Arial"
                    }).setOrigin(0.5).setAlpha(0);
               }
               this.textosTiempos.push(textoTiempo);

               this.medallas.push(new Medalla (this, 150 + i * 250, 300));
               this.botones.push(undefined);
               this.botones[i] = this.add.rectangle(150 + i * 250, 300, 150, 150, 0xffffff, 0);
               this.botones[i].setInteractive();
               
               this.ponerMedalla(this.mejoresTiempos[i], i + 1);
          }

          let botonVolver = this.add.rectangle(100, 100, 150, 50, 0x3287d1);

          botonVolver.setInteractive();

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
          const t = Math.floor(tiempo / 1000);
          let medalla;
          for (let i = this.multMedalla.length - 1; i >= 0; i--) {
               if (t <= this.tiempoOro[nivel - 1] * this.multMedalla[i]) medalla = i;
          }

          if      (medalla == 2) this.medallas[nivel - 1].play("medallaBronce_idle", true);
          else if (medalla == 1) this.medallas[nivel - 1].play("medallaPlata_idle", true);
          else if (medalla == 0) this.medallas[nivel - 1].play("medallaOro_idle", true);

          this.botones[nivel-1].on("pointerover", () => {
               this.cambiarOpacidad(nivel - 1, 1);
               this.medallas[nivel-1].setScale(0.7);

               if      (medalla == 2) this.medallas[nivel - 1].play("medallaBronce_animacion", true);
               else if (medalla == 1) this.medallas[nivel - 1].play("medallaPlata_animacion", true);
               else if (medalla == 0) this.medallas[nivel - 1].play("medallaOro_animacion", true);
          });
          
          this.botones[nivel-1].on("pointerout", () => {
               this.cambiarOpacidad(nivel - 1, 0);
               this.medallas[nivel-1].setScale(0.5);

               if      (medalla == 2) this.medallas[nivel - 1].play("medallaBronce_idle", true);
               else if (medalla == 1) this.medallas[nivel - 1].play("medallaPlata_idle", true);
               else if (medalla == 0) this.medallas[nivel - 1].play("medallaOro_idle", true);
          });
     }
}