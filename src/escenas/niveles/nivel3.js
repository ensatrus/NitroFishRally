import Level from "../level.js";

export default class Nivel3 extends Level {
    constructor() {
        super({
            key: "nivel3",
            mapa: "Mapa3",
            escalaMapa: 5,
            fondo: "fondoPrueba3",
            auraMaxima: 5000,
            escenaSalida: "menuNiveles"
        });
    }
}