export default class Palmares extends Phaser.Scene {
    constructor() {
        super({ key: "palmares" });
    }


    create(){
        const gameManager = this.game.gameManager;

        // Tiempos de cada nivel para cada medalla
        const tiempos = [
            [100, 120, 180], // Bronce
            [200, 240, 360], // Plata
            [400, 480, 720], // Oro
        ];

        this.mejoresTiempos = [1, 2, 3];

        for (let i = 0; i < this.mejoresTiempos.length; i++) {
            this.mejoresTiempos[i] = this.mejoresTiempos[i] !== undefined ? gameManager.getTiempo(i) : "No completado";
        }
    }
}