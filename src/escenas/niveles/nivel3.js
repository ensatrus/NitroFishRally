import Level from "../level.js";

export default class Nivel3 extends Level {
    constructor() {
        super({
            key: "nivel3",
            mapa: "Mapa3",
            escalaMapa: 5,
            fondo: "fondoPrueba3",
            auraMaxima: 50000,
            escenaSalida: "menuNiveles",
            offset: {x: 1, y: 2}
        });
    }
}