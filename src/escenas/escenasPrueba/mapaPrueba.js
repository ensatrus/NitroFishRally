// import objetosPrueba from "src/objetosPrueba.js";

export default class mapaPrueba extends Phaser.Scene{
    constructor(){
        super({key: "mapaPrueba"});
    }

    init(){

    }

    preload(){
        // this.load.image("fondo", " ")
        this.load.image('Circuit', 'assets/sprites/Circuit.png');
        this.load.json('Circuit_t', 'assets/Circuit.json');
    }

    create(){
        const datos = this.cache.json.get('Circuit_t');
        const miObjeto = this.matter.add.sprite(600, 420, 'Circuit', null, { 
            shape: datos.Circuit 
        });

        miObjeto.setStatic(true);
        miObjeto.setOrigin(0.5, 0.5);
        
        // Ajustamos la cámara para ver la pantalla estándar
        this.cameras.main.centerOn(400, 300);
        this.cameras.main.setZoom(0.4); 

        
    }

    update(){

    }
}