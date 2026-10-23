/**
 * Escena principal.
 * @extends Phaser.Scene
 */

export default class MenuPrincipal extends Phaser.Scene{
    constructor(){
        super({key: "menuPrincipal"});
    }

    preload(){
	    this.load.image("titulo", "./assets/sprites/titulo640x480.png");
        // this.load.image("botonInicio", "");
	}
    create(){
        this.add.image(0, 0, "titulo").setOrigin(0, 0);

        // let button = this.add.image(0, 0, " ");
        // button.setInteractive();
        // button.on("pointerup", ()=>{
        //     this.scene.start("escenaEjemplo")
        // })
    }
};