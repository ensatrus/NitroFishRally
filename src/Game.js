import MenuPrincipal from './escenas/menuPrincipal.js';
import TituloInicio from './escenas/tituloInicio.js';
import MenuNiveles from './escenas/menuNiveles.js';
import MenuPruebas from './escenas/menuPruebas.js';
import Palmares from './escenas/palmares.js';
import Debut from './escenas/debut.js';
import PruebaHUD from "./escenas/escenasPrueba/pruebaHUD.js";
import PruebaPiezas from './escenas/escenasPrueba/pruebaPiezas.js';
import GameManager from './managers/GameManager.js';
import PruebaConstructorNiveles from './escenas/escenasPrueba/pruebaConstructorNiveles.js';
import Garaje from './escenas/garaje.js';
import Nivel1 from './escenas/niveles/nivel1.js';
import Nivel2 from './escenas/niveles/nivel2.js';

const gameManager = new GameManager();

const game = new Phaser.Game({
  type: Phaser.CANVAS,
  canvas: document.getElementById('juego'),
  width: 800,
  height: 600,
  scale: {
    parent: 'juego-seccion',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
scene: [Debut, TituloInicio, MenuPrincipal, MenuNiveles, MenuPruebas, Palmares, PruebaHUD, PruebaPiezas, PruebaConstructorNiveles, Garaje, Nivel1, Nivel2],  physics: {
    default: 'matter',
    matter:{
      debug: true,
      gravity: { y: 0, x:0}
    }
  },
  roundPixels: true
});

game.gameManager = gameManager;