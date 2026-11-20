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
          const tiempoOro = [100, 120, 180];
          const multiplicadorMedalla = [1, 1.5, 2]; // Multiplicador para plata y bronce
          const auraTrofeo = [1000, 2000, 3000];

          this.mejoresTiempos = [-1, -1, -1];
          this.textosTiempos = [];

          for (let i = 0; i < this.mejoresTiempos.length; i++) {
               this.mejoresTiempos[i] = gameManager.getTiempoNivel(i);
               this.mejoresTiempos[i] = 200; // Valor temporal

               let textoTiempo = this.add.text(100 + i * 300, 200, "Nivel " + (i + 1) + ": " + (this.mejoresTiempos[i] / 60).toFixed(0) + ":" + (this.mejoresTiempos[i] % 60), {
                    fontSize: "18px",
                    fill: "#ffffff",
                    fontStyle: "bold",
                    fontFamily: "Arial"
               }).setOrigin(0.5).setAlpha(0);

               this.textosTiempos.push(textoTiempo);
          }

          let boton1 = this.add.rectangle(100, 300, 100, 100, 0xffffff);
          let boton2 = this.add.rectangle(400, 300, 100, 100, 0xffffff);
          let boton3 = this.add.rectangle(700, 300, 100, 100, 0xffffff);

          boton1.setInteractive();
          boton2.setInteractive();
          boton3.setInteractive();
        
          const cambiarOpacidad = (i, alpha) => {
               const texto = this.textosTiempos[i];

               this.tweens.killTweensOf(texto);
               this.tweens.add({
                    targets: texto,
                    alpha,
                    duration: 100,
                    ease: "Linear"
               });
          };

          boton1.on("pointerover", () => cambiarOpacidad(0, 1));
          boton1.on("pointerout", () => cambiarOpacidad(0, 0));

          boton2.on("pointerover", () => cambiarOpacidad(1, 1));
          boton2.on("pointerout", () => cambiarOpacidad(1, 0));

          boton3.on("pointerover", () => cambiarOpacidad(2, 1));
          boton3.on("pointerout", () => cambiarOpacidad(2, 0));

          let botonVolver = this.add.rectangle(100, 100, 150, 50, 0x3287d1);
        
          botonVolver.setInteractive();
          botonVolver.setScrollFactor(0);

          botonVolver.on("pointerdown", () => this.scene.start("menuPruebas"));

          this.add.text(100, 100, "Volver",{
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
            
        }).setOrigin(0.5).setAbove(botonVolver).setScrollFactor(0, 0);
     }
}