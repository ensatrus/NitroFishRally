import MenuPrincipal from './MenuPrincipal.js';

new Phaser.Game({
  type: Phaser.CANVAS,
  canvas: document.getElementById('juego'),
  width: auto,
  height: auto,
  scene: [MenuPrincipal],
  physics: {
    default: 'matter',
  }
})
