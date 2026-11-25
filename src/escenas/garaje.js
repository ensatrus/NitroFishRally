
export default class Garaje extends Phaser.Scene{
    constructor(){
        super({key: "garaje"});
    }

    init(){

    }

    create(){
        const bg = this.add.image(0, 0, 'pezgaraje');
        bg.setDisplaySize(800, 600);
        bg.setOrigin(0, 0);
        bg.setDepth(-1);
        
        const stats = this.game.gameManager.getStatsPez();
        this.aceleracion = stats.aceleracion;
        this.control = stats.control;
        this.freno = stats.freno;

        let boton = this.add.rectangle(130, 100, 150, 50, 0x3287d1);
        
        boton.setInteractive();
        boton.setScrollFactor(0);

        boton.on("pointerdown", () => {
            this.game.gameManager.setStatsPez(this.aceleracion, this.control, this.freno);
            this.scene.start("menuPrincipal"); 
        });

        this.add.text(130, 100, "Volver",{
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setAbove(boton).setScrollFactor(0);

        let acMin = this.add.rectangle(130, 420, 150, 50, this.aceleracion === 3 ? 0x00d0d0 : 0x3287d1);
        
        acMin.setInteractive();
        acMin.setScrollFactor(0);

        acMin.on("pointerdown", () => {
            this.aceleracion = 3;
            acMin.setFillStyle(0x00d0d0);
            acMid.setFillStyle(0x3287d1);
            acMax.setFillStyle(0x3287d1);
        });

        this.add.text(130, 420, "Aceleración Mínima",{
            fontSize: "14px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setAbove(acMin).setScrollFactor(0);

        let acMid = this.add.rectangle(130, 470, 150, 50, this.aceleracion === 5 ? 0x00d0d0 : 0x3287d1);
        
        acMid.setInteractive();
        acMid.setScrollFactor(0);

        acMid.on("pointerdown", () => {
            this.aceleracion = 5;
            acMid.setFillStyle(0x00d0d0);
            acMin.setFillStyle(0x3287d1);
            acMax.setFillStyle(0x3287d1);
        });

        this.add.text(130, 470, "Aceleración Media",{
            fontSize: "14px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setAbove(acMid).setScrollFactor(0);

        let acMax = this.add.rectangle(130, 520, 150, 50, this.aceleracion === 7 ? 0x00d0d0 : 0x3287d1);
        
        acMax.setInteractive();
        acMax.setScrollFactor(0);

        acMax.on("pointerdown", () => {
            this.aceleracion = 7;
            acMax.setFillStyle(0x00d0d0);
            acMid.setFillStyle(0x3287d1);
            acMin.setFillStyle(0x3287d1);
        });

        this.add.text(130, 520, "Aceleración Máxima",{
            fontSize: "14px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setAbove(acMax).setScrollFactor(0);

        let frMin = this.add.rectangle(260, 420, 130, 50, this.freno === 3 ? 0x00d0d0 : 0x3287d1);
        
        frMin.setInteractive();
        frMin.setScrollFactor(0);

        frMin.on("pointerdown", () => {
            this.freno = 3;
            frMin.setFillStyle(0x00d0d0);
            frMid.setFillStyle(0x3287d1);
            frMax.setFillStyle(0x3287d1);
        });

        this.add.text(260, 420, "Freno Mínimo",{
            fontSize: "14px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setAbove(frMin).setScrollFactor(0);

        let frMid = this.add.rectangle(260, 470, 130, 50, this.freno === 5 ? 0x00d0d0 : 0x3287d1);
        
        frMid.setInteractive();
        frMid.setScrollFactor(0);

        frMid.on("pointerdown", () => {
            this.freno = 5;
            frMid.setFillStyle(0x00d0d0);
            frMin.setFillStyle(0x3287d1);
            frMax.setFillStyle(0x3287d1);
        });

        this.add.text(260, 470, "Freno Medio",{
            fontSize: "14px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setAbove(frMid).setScrollFactor(0);

        let frMax = this.add.rectangle(250, 520, 130, 50, this.freno === 7 ? 0x00d0d0 : 0x3287d1);
        
        frMax.setInteractive();
        frMax.setScrollFactor(0);

        frMax.on("pointerdown", () => {
            this.freno = 7;
            frMax.setFillStyle(0x00d0d0);
            frMid.setFillStyle(0x3287d1);
            frMin.setFillStyle(0x3287d1);
        });

        this.add.text(250, 520, "Freno Máximo",{
            fontSize: "14px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setAbove(frMax).setScrollFactor(0);

        let ctrMin = this.add.rectangle(370, 420, 120, 50, this.control === 3 ? 0x00d0d0 : 0x3287d1);
        
        ctrMin.setInteractive();
        ctrMin.setScrollFactor(0);

        ctrMin.on("pointerdown", () => {
            this.control = 3;
            ctrMin.setFillStyle(0x00d0d0);
            ctrMid.setFillStyle(0x3287d1);
            ctrMax.setFillStyle(0x3287d1);
        });

        this.add.text(370, 420, "Control Mínimo",{
            fontSize: "14px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setAbove(ctrMin).setScrollFactor(0);

        let ctrMid = this.add.rectangle(370, 470, 120, 50, this.control === 5 ? 0x00d0d0 : 0x3287d1);
        
        ctrMid.setInteractive();
        ctrMid.setScrollFactor(0);

        ctrMid.on("pointerdown", () => {
            this.control = 5;
            ctrMid.setFillStyle(0x00d0d0);
            ctrMin.setFillStyle(0x3287d1);
            ctrMax.setFillStyle(0x3287d1);
        });

        this.add.text(370, 470, "Control Medio",{
            fontSize: "14px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setAbove(ctrMid).setScrollFactor(0);

        let ctrMax = this.add.rectangle(370, 520, 120, 50, this.control === 7 ? 0x00d0d0 : 0x3287d1);
        
        ctrMax.setInteractive();
        ctrMax.setScrollFactor(0);

        ctrMax.on("pointerdown", () => {
            this.control = 7;
            ctrMax.setFillStyle(0x00d0d0);
            ctrMid.setFillStyle(0x3287d1);
            ctrMin.setFillStyle(0x3287d1);
        });

        this.add.text(370, 520, "Control Máximo",{
            fontSize: "14px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setAbove(ctrMax).setScrollFactor(0);

        this.masaHUD = this.add.text(600, 450, `Masa: ${this.aceleracion + this.control + this.freno}`, {
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setScrollFactor(0);

        this.maxSpeedHUD = this.add.text(600, 500, `Velocidad Máxima: ${(1350/(this.aceleracion + this.control + this.freno)).toFixed(0)} km/h`, {
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setScrollFactor(0);



        this.cameras.main.fadeIn(400, 0, 0, 0); 
    }

    update() {
        const masaActual = this.aceleracion + this.control + this.freno;

        this.masaHUD.setText(`Masa: ${masaActual}`);
        this.maxSpeedHUD.setText(`Velocidad Máxima: ${(1350/(masaActual)).toFixed(0)} km/h`);


    }
}