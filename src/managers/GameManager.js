export default class GameManager {
    preload() {}

    constructor() {
        this.niveles = [1, 2, 3];
    }

    setTiempoNivel(nivel, tiempo) {
        if (this.niveles[nivel - 1] === undefined || tiempo < this.niveles[nivel - 1]) {
            this.niveles[nivel - 1] = tiempo;
        }
    }

    getTiempoNivel(nivel) {
        return this.niveles[nivel - 1];
    }
}