import MenuPrincipal from './MenuPricipal.js';

new Phaser.Game({
  type: Phaser.CANVAS,
  canvas: document.getElementById('juego'),
  width: 800,
  height: 600,
  mode: Phaser.Scale.FIT,
  scene: [MenuPrincipal],
  physics: {
    default: 'matter',
  }
})
