import Level from "../level.js";

export default class Nivel1 extends Level {
    constructor() {
        super({
            key: "nivel1",
            mapa: "Mapa1",
            escalaMapa: 6,
            fondo: "fondoPrueba1",
            auraMaxima: 2000,
            escenaSalida: "menuNiveles"
        });
    }
}