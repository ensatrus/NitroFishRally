import MenuPrincipal from './escenas/menuPrincipal.js';
import TituloInicio from './escenas/tituloInicio.js';
import MenuNiveles from './escenas/menuNiveles.js';
import MenuPruebas from './escenas/menuPruebas.js';
import Palmares from './escenas/palmares.js';
import Debut from './escenas/debut.js';
import PruebaHUD from "./escenas/escenasPrueba/pruebaHUD.js";
import mapaPrueba from './escenas/escenasPrueba/mapaPrueba.js'; 
import PruebaPiezas from './escenas/escenasPrueba/pruebaPiezas.js';
import GameManager from './managers/GameManager.js';
import PruebaConstructorNiveles from './escenas/escenasPrueba/pruebaConstructorNiveles.js';
import Garaje from './escenas/garaje.js';

const gameManager = new GameManager();

const game = new Phaser.Game({
  type: Phaser.CANVAS,
  canvas: document.getElementById('juego'),
  width: 800,
  height: 600,
  mode: Phaser.Scale.FIT,
scene: [Debut, TituloInicio, MenuPrincipal, MenuNiveles, MenuPruebas, mapaPrueba, Palmares, PruebaHUD, PruebaPiezas, PruebaConstructorNiveles, Garaje],  physics: {
    default: 'matter',
    matter:{
      debug: true,
      gravity: { y: 0, x:0}
    }
  },
  roundPixels: true
});

game.gameManager = gameManager;