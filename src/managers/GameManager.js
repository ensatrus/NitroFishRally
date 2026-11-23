import Rock from "../gameObjects/rocks.js";
import Log from "../gameObjects/logs.js";
import Pez from "../gameObjects/pez.js";

export default class GameManager {
    preload() {}

    constructor() {
        this.tNivel = [undefined, undefined, undefined];

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
        for (const object of objects) {
            if (object.point && object.name === "pez") {
                puntoPez = object;
                break;
            }
        }
        const statsPez = this.getStatsPez();
        scene.pez = new Pez(scene.matter.world, puntoPez.x * escala, puntoPez.y * escala, "pezquesemueve", 
                            statsPez.aceleracion, statsPez.control, statsPez.freno);


        for (const object of objects) {
            const name = object.name;

            if (Array.isArray(object.polygon)) {
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

            } else if (object.point && name === "rock") {
                new Rock(scene, object.x * escala, object.y * escala, "rock3", scene.pez);
            
            } else if (object.point && name === "log") {
                let direccion = 0;
                let velocity = 0;

                if (Array.isArray(object.properties)) {
                    for (const property of object.properties) {
                        if (property.name === "direction") {
                            direccion = property.value;
                        }
                    }
                }

                new Log(scene, object.x * escala, object.y * escala, "log3", scene.pez, velocity, direccion);
            }
        }
    }
}