import Rock from "../gameObjects/rocks.js";
import Log from "../gameObjects/logs.js";

function getFixtureCenter(vertexSets) {
    let totalArea = 0;
    let weightedX = 0;
    let weightedY = 0;

    vertexSets.forEach(vertices => {
        let twiceArea = 0;
        let centerX = 0;
        let centerY = 0;

        vertices.forEach((vertex, index) => {
            const next = vertices[(index + 1) % vertices.length];
            const cross = vertex.x * next.y - next.x * vertex.y;
            twiceArea += cross;
            centerX += (vertex.x + next.x) * cross;
            centerY += (vertex.y + next.y) * cross;
        });

        if (twiceArea === 0) {
            return;
        }

        const area = Math.abs(twiceArea / 2);
        totalArea += area;
        weightedX += (centerX / (3 * twiceArea)) * area;
        weightedY += (centerY / (3 * twiceArea)) * area;
    });

    if (totalArea === 0) {
        throw new Error("El fixture del obstáculo no contiene polígonos válidos.");
    }

    return { x: weightedX / totalArea, y: weightedY / totalArea };
}

export default class GameManager {
    preload() {}

    constructor() {
        this.niveles = [1, 2, 3];
    }

    setTiempoNivel(nivel, tiempo) {
        if (this.niveles[nivel - 1] === undefined || tiempo < this.niveles[nivel - 1]) {
            this.niveles[nivel - 1] = tiempo;
        }
    }

    getTiempoNivel(nivel) {
        return this.niveles[nivel - 1];
    }

    construirNivel(scene, nivel, escala = 1) {
        const datosFisicos = scene.cache.json.get(nivel);
        const formaOriginal = datosFisicos.Circuit;
        const fixturesBordes = formaOriginal.fixtures.filter(fixture => fixture.label !== "log" && fixture.label !== "rock");

        const mapaBordes = scene.matter.add.image(0, 0, 'Circuit', null, {
            shape: { ...formaOriginal, fixtures: fixturesBordes },
            isStatic: true
        });

        formaOriginal.fixtures
            .filter(fixture => fixture.label === "log" || fixture.label === "rock")
            .forEach(fixture => {
                const centroFixture = getFixtureCenter(fixture.vertices);
                const x = (mapaBordes.x - mapaBordes.displayOriginX + centroFixture.x) * escala;
                const y = (mapaBordes.y - mapaBordes.displayOriginY + centroFixture.y) * escala;

                if (fixture.label === "log") {
                    const formaTronco = scene.cache.json.get('log1_t').log1;
                    new Log(scene, x, y, 'log1', formaTronco, scene.pez);
                } else if (fixture.label === "rock") {
                    const formaRoca = scene.cache.json.get('rock1_t').Rock1;
                    new Rock(scene, x, y, 'rock1', formaRoca, scene.pez);
                  
                }
            });

        mapaBordes.setScale(escala, escala);
        return mapaBordes;
    }
}