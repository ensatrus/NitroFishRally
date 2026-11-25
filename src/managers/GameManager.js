import Rock from "../gameObjects/rocks.js";
import Log from "../gameObjects/logs.js";
import Pez from "../gameObjects/pez.js";
import Warning from "../gameObjects/warning.js";

export default class GameManager {
    preload() {}

    constructor() {
        this.tNivel = [undefined, undefined, undefined];

        // VALORES TEMPORALES
        this.tNivel = [97, 162, undefined];

        this.statsPez = {
            aceleracion: 5,
            control: 5,
            freno: 5
        };
    }

    setStatsPez(aceleracion, control, freno) {
        this.statsPez = { aceleracion, control, freno };
    }

    getStatsPez() {
        return this.statsPez;
    }

    setTiempoNivel(nivel, tiempo) {
        if (this.tNivel[nivel - 1] === undefined || tiempo < this.tNivel[nivel - 1]) {
            this.tNivel[nivel - 1] = tiempo;
        }
    }

    getTiempoNivel(nivel) {
        return this.tNivel[nivel - 1];
    }

    construirNivel(scene, nivel, escala = 1) {
        const map = scene.make.tilemap({ key: nivel });

        if (!Array.isArray(map.objects) || map.objects.length === 0) {
            throw new Error(`El mapa "${nivel}" no contiene capas de objetos.`);
        }

        const objects = [];

        for (const layer of map.objects) {
            for (const object of layer.objects) {
                objects.push(object);
            }
        }

        //Creamos primero el pez porque los obstáculos dependen de que exista
        let puntoPez;
        let direccion = 0;
        for (const object of objects) {
            if (object.point && object.name === "pez") {
                puntoPez = object;
                break;
            }
        }
        const statsPez = this.getStatsPez();

        if (Array.isArray(puntoPez.properties)) {
            for (const property of puntoPez.properties) {
                if (property.name === "direction") {
                    direccion = property.value;
                }
            }
        }
        scene.pez = new Pez(scene.matter.world, puntoPez.x * escala, puntoPez.y * escala, direccion,
                            statsPez.aceleracion, statsPez.control, statsPez.freno);


        for (const object of objects) {
            const name = object.name;

            if (Array.isArray(object.polygon)) {
                if(name === "circuit"){
                    const vertices = [];

                    for (const point of object.polygon) {
                        vertices.push({
                            x: (object.x + point.x) * escala,
                            y: (object.y + point.y) * escala
                        });
                    }

                    const matterVertices = scene.matter.vertices;


                    const center = matterVertices.centre(vertices);
                    const circuitBody = scene.matter.add.fromVertices(center.x, center.y, vertices );

                    scene.matter.body.setStatic(circuitBody, true);
                }
                else if(name === "warning"){

                    const rotation = Phaser.Math.DegToRad(object.rotation);
                    const cos = Math.cos(rotation);
                    const sin = Math.sin(rotation);
                    const vertices = [];

                    for (const point of object.polygon) {
                        vertices.push({
                            x: (object.x + point.x * cos - point.y * sin) * escala,
                            y: (object.y + point.x * sin + point.y * cos) * escala
                        });
                    }

                    const center = scene.matter.vertices.centre(vertices);

                    new Warning(scene, object.x * escala, object.y * escala, null, center, vertices, object.type);
                }
            }
            else if (object.point) {
                if(name === "rock"){
                    new Rock(scene, object.x * escala, object.y * escala, "rock3", scene.pez);
                }
                else if (name === "log") {
                direccion = 0;
                let velocity = 2;

                if (Array.isArray(object.properties)) {
                    for (const property of object.properties) {
                        if (property.name === "direction") {
                            direccion = property.value - 90;
                        }
                    }
                }

                new Log(scene, object.x * escala, object.y * escala, "log3", scene.pez, velocity, direccion, 200);
                }
            }
        }
    }
}