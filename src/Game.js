import MenuPrincipal from './menuPrincipal.js';
import PruebaFisicas from './pruebaFisicas.js';
import tituloInicio from './tituloInicio.js';
import menuPruebas from './menuPruebas.js';


new Phaser.Game({
  type: Phaser.CANVAS,
  canvas: document.getElementById('juego'),
  width: 800,
  height: 600,
  mode: Phaser.Scale.FIT,
  scene: [tituloInicio, menuPruebas, PruebaFisicas, /*MenuPrincipal*/],
  physics: {
    default: 'matter',
    matter:{
      debug: true,
      gravity: { y: 0, x:0}
    }
  }
})
