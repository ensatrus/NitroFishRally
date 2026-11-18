export default class GameManager {
    preload() {}

    constructor() {
        this.niveles = [tiempo1, tiempo2, tiempo3];
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