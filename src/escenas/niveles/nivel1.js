import Level from "../level.js";

export default class Nivel1 extends Level {
    constructor() {
        super({
            key: "nivel1",
            mapa: "Mapa1",
            escalaMapa: 5,
            fondo: "fondoNivel1",
            auraMaxima: 50000,
            escenaSalida: "menuNiveles"
        });
    }
}