import Rock from "../gameObjects/rocks.js";
import Log from "../gameObjects/logs.js";
import Pez from "../gameObjects/pez.js";
import Warning from "../gameObjects/warning.js";
import Waterflow from "../gameObjects/waterflow.js";
import Meta from "../gameObjects/meta.js";
import Heron from "../gameObjects/heron.js";

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

    setTiempoNivel(nivel, tiempo, aura, auraMin) {
        if ((this.tNivel[nivel - 1] === undefined || tiempo < this.tNivel[nivel - 1]) && aura > auraMin) {
            this.tNivel[nivel - 1] = tiempo;
        }
    }

    getTiempoNivel(nivel) {
        return this.tNivel[nivel - 1];
    }

    terminarNivel(tiempo, nivel, aura, auraMin){

        this.setTiempoNivel(nivel , tiempo, aura, auraMin);

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
        let direction = 0;
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
                    direction = property.value-90;
                }
            }
        }
        scene.pez = new Pez(scene.matter.world, puntoPez.x * escala, puntoPez.y * escala, direction,
                            statsPez.aceleracion, statsPez.control, statsPez.freno);


        for (const object of objects) {
            const name = object.name;

            if (Array.isArray(object.polygon)) {
                switch(name){
                    case "circuit":{
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
                        break;
                    }
                    case"warning":{

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
                        break;
                    }
                    case "waterflow":{
                        const rotation = Phaser.Math.DegToRad(object.rotation);
                        const cos = Math.cos(rotation);
                        const sin = Math.sin(rotation);
                        const vertices = [];
                        let force;

                        for (const point of object.polygon) {
                            vertices.push({
                                x: (object.x + point.x * cos - point.y * sin) * escala,
                                y: (object.y + point.x * sin + point.y * cos) * escala
                            });
                        }

                        if (Array.isArray(object.properties)) {
                            for (const property of object.properties) {
                                if (property.name === "direction") {
                                    direction = property.value-90;
                                }
                                if (property.name === "force"){
                                    force = property.value/20000;
                                }
                            }
                        }

                        const center = scene.matter.vertices.centre(vertices);

                        new Waterflow(scene, object.x * escala, object.y * escala, "waterflow", scene.pez, force, direction, center, vertices);
                        break;
                    }
                    case "heron":{
                        const rotation = Phaser.Math.DegToRad(object.rotation);
                        const cos = Math.cos(rotation);
                        const sin = Math.sin(rotation);
                        const vertices = [];
                        let force;

                        for (const point of object.polygon) {
                            vertices.push({
                                x: (object.x + point.x * cos - point.y * sin) * escala,
                                y: (object.y + point.x * sin + point.y * cos) * escala
                            });
                        }

                        if (Array.isArray(object.properties)) {
                            for (const property of object.properties) {
                                if (property.name === "force"){
                                    force = property.value/200;
                                }
                            }
                        }

                        const center = scene.matter.vertices.centre(vertices);

                        new Heron(scene, object.x * escala, object.y * escala, "heron", scene.pez, force, center, vertices);
                        break;
                    }
                    case "meta":{
                        const rotation = Phaser.Math.DegToRad(object.rotation);
                        const cos = Math.cos(rotation);
                        const sin = Math.sin(rotation);
                        const vertices = [];
                        let nivel;

                        for (const point of object.polygon) {
                            vertices.push({
                                x: (object.x + point.x * cos - point.y * sin) * escala,
                                y: (object.y + point.x * sin + point.y * cos) * escala
                            });
                        }

                        if (Array.isArray(object.properties)) {
                            for (const property of object.properties) {
                                if (property.name === "nivel") {
                                    nivel = property.value;
                                }
                            }
                        }

                        const center = scene.matter.vertices.centre(vertices);

                        new Meta(scene, object.x * escala, object.y * escala, null, center, vertices, nivel);
                        break;
                    }
                }
            }
            else if (object.point) {
                switch(name){
                    case "rock":{
                        new Rock(scene, object.x * escala, object.y * escala, "rock3", scene.pez);
                        break;
                    }
                    case "log": {
                    direction = 0;
                    let velocity;
                    let distance;
                    if (Array.isArray(object.properties)) {
                        for (const property of object.properties) {
                            if (property.name === "direction") {
                                direction = property.value - 90;
                            }
                            if (property.name === "velocity"){
                                velocity = property.value;
                            }
                            if (property.name === "distance"){
                                distance = property.value*escala;
                            }
                        }
                    }
                    new Log(scene, object.x * escala, object.y * escala, "tronco", scene.pez, velocity, direction, distance);
                    break;
                    }
                }
            }
        }
    }
}