import Level from "../level.js";

export default class PruebaHUD extends Level {
    constructor() {
        super({
            key: "pruebaHUD",
            mapa: "Mapa1",
            escalaMapa: 6,
            fondo: "fondoPrueba",
            auraMaxima: 5000,
            escenaSalida: "menuPruebas"
        });
    }
}
