import MenuPrincipal from './escenas/menuPrincipal.js';
import PruebaFisicas from './escenas/escenasPrueba/pruebaFisicas.js';
import TituloInicio from './escenas/tituloInicio.js';
import MenuPruebas from './escenas/menuPruebas.js';
import PruebaMovimientoPez from './escenas/escenasPrueba/pruebaMovimientoPez.js';
import Debut from './escenas/debut.js';


new Phaser.Game({
  type: Phaser.CANVAS,
  canvas: document.getElementById('juego'),
  width: 800,
  height: 600,
  mode: Phaser.Scale.FIT,
  scene: [Debut, TituloInicio, MenuPruebas, PruebaFisicas, PruebaMovimientoPez],
  physics: {
    default: 'matter',
    matter:{
      debug: true,
      gravity: { y: 0, x:0}
    }
  },
  roundPixels: true
})
