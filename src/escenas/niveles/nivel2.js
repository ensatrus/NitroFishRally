import Level from "../level.js";

export default class Nivel2 extends Level {
    constructor() {
        super({
            key: "nivel2",
            mapa: "Mapa2",
            escalaMapa: 5,
            fondo: "fondoPrueba2",
            auraMaxima: 50000,
            escenaSalida: "menuNiveles"
        });
    }
}