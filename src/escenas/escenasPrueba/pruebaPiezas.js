import Pez from "../../gameObjects/pez.js";

export default class PruebaPiezas extends Phaser.Scene{
    constructor(){
        super({key: "pruebaPiezas"});
    }

    init(){

    }

    create(){
        this.add.image(1600,1200,"placeholderBackground").setScale(3);
        
        this.pez = new Pez(this.matter.world, 300, 300, 'pezquesemueve', 5, 5, 5);
        
        this.matter.world.setBounds(0, 0, 3200, 2400);
        
        this.cameras.main.startFollow(this.pez, true, 0.9, 0.9);
        this.cameras.main.setZoom();

        let boton = this.add.rectangle(100, 50, 150, 50, 0x3287d1);
        
        boton.setInteractive();
        boton.setScrollFactor(0);

        boton.on("pointerdown", () => {
            this.scene.start("menuPruebas"); 
        });

        this.add.text(100, 50, "Volver",{
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setAbove(boton).setScrollFactor(0);

        let acMin = this.add.rectangle(200, 450, 200, 50, 0x3287d1);
        
        acMin.setInteractive();
        acMin.setScrollFactor(0);

        acMin.on("pointerdown", () => {
            this.pez.setAceleracion(3);
            acMin.setFillStyle(0x00d0d0);
            acMid.setFillStyle(0x3287d1);
            acMax.setFillStyle(0x3287d1);
        });

        this.add.text(200, 450, "Aceleración Mínima",{
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setAbove(acMin).setScrollFactor(0);

        let acMid = this.add.rectangle(200, 500, 200, 50, 0x00d0d0);
        
        acMid.setInteractive();
        acMid.setScrollFactor(0);

        acMid.on("pointerdown", () => {
            this.pez.setAceleracion(5);
            acMid.setFillStyle(0x00d0d0);
            acMin.setFillStyle(0x3287d1);
            acMax.setFillStyle(0x3287d1);
        });

        this.add.text(200, 500, "Aceleración Media",{
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setAbove(acMid).setScrollFactor(0);

        let acMax = this.add.rectangle(200, 550, 200, 50, 0x3287d1);
        
        acMax.setInteractive();
        acMax.setScrollFactor(0);

        acMax.on("pointerdown", () => {
            this.pez.setAceleracion(7);
            acMax.setFillStyle(0x00d0d0);
            acMid.setFillStyle(0x3287d1);
            acMin.setFillStyle(0x3287d1);
        });

        this.add.text(200, 550, "Aceleración Máxima",{
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setAbove(acMax).setScrollFactor(0);

        let frMin = this.add.rectangle(400, 450, 200, 50, 0x3287d1);
        
        frMin.setInteractive();
        frMin.setScrollFactor(0);

        frMin.on("pointerdown", () => {
            this.pez.setFreno(3);
            frMin.setFillStyle(0x00d0d0);
            frMid.setFillStyle(0x3287d1);
            frMax.setFillStyle(0x3287d1);
        });

        this.add.text(400, 450, "Freno Mínimo",{
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setAbove(frMin).setScrollFactor(0);

        let frMid = this.add.rectangle(400, 500, 200, 50, 0x00d0d0);
        
        frMid.setInteractive();
        frMid.setScrollFactor(0);

        frMid.on("pointerdown", () => {
            this.pez.setFreno(5);
            frMid.setFillStyle(0x00d0d0);
            frMin.setFillStyle(0x3287d1);
            frMax.setFillStyle(0x3287d1);
        });

        this.add.text(400, 500, "Freno Medio",{
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setAbove(frMid).setScrollFactor(0);

        let frMax = this.add.rectangle(400, 550, 200, 50, 0x3287d1);
        
        frMax.setInteractive();
        frMax.setScrollFactor(0);

        frMax.on("pointerdown", () => {
            this.pez.setFreno(7);
            frMax.setFillStyle(0x00d0d0);
            frMid.setFillStyle(0x3287d1);
            frMin.setFillStyle(0x3287d1);
        });

        this.add.text(400, 550, "Freno Máximo",{
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setAbove(frMax).setScrollFactor(0);

        let ctrMin = this.add.rectangle(600, 450, 200, 50, 0x3287d1);
        
        ctrMin.setInteractive();
        ctrMin.setScrollFactor(0);

        ctrMin.on("pointerdown", () => {
            this.pez.setControl(3);
            ctrMin.setFillStyle(0x00d0d0);
            ctrMid.setFillStyle(0x3287d1);
            ctrMax.setFillStyle(0x3287d1);
        });

        this.add.text(600, 450, "Control Mínimo",{
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setAbove(ctrMin).setScrollFactor(0);

        let ctrMid = this.add.rectangle(600, 500, 200, 50, 0x00d0d0);
        
        ctrMid.setInteractive();
        ctrMid.setScrollFactor(0);

        ctrMid.on("pointerdown", () => {
            this.pez.setControl(5);
            ctrMid.setFillStyle(0x00d0d0);
            ctrMin.setFillStyle(0x3287d1);
            ctrMax.setFillStyle(0x3287d1);
        });

        this.add.text(600, 500, "Control Medio",{
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setAbove(ctrMid).setScrollFactor(0);

        let ctrMax = this.add.rectangle(600, 550, 200, 50, 0x3287d1);
        
        ctrMax.setInteractive();
        ctrMax.setScrollFactor(0);

        ctrMax.on("pointerdown", () => {
            this.pez.setControl(7);
            ctrMax.setFillStyle(0x00d0d0);
            ctrMid.setFillStyle(0x3287d1);
            ctrMin.setFillStyle(0x3287d1);
        });

        this.add.text(600, 550, "Control Máximo",{
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setAbove(ctrMax).setScrollFactor(0);

        const mundo = this.matter.world;

        this.actualizarPez = () => this.pez.actualizarPasoFisico();
        mundo.on("beforeupdate", this.actualizarPez);

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            mundo.off("beforeupdate", this.actualizarPez);
        });

        this.masaHUD = this.add.text(600, 50, `Masa: ${this.pez.masa}`, {
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setScrollFactor(0);

        this.maxSpeedHUD = this.add.text(600, 100, `Velocidad Máxima: ${(1350/(this.pez.masa)).toFixed(0)} km/h`, {
            fontSize: "18px",
            fill: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5).setScrollFactor(0);

    }

    update() {
        const velocidad = this.pez.getVelocity();
        const anticipacion = 6;

        this.cameras.main.setFollowOffset(
            -velocidad.x * anticipacion,
            -velocidad.y * anticipacion
        );

        this.masaHUD.setText(`Masa: ${this.pez.masa}`);
        this.maxSpeedHUD.setText(`Velocidad Máxima: ${(1350/(this.pez.masa)).toFixed(0)} km/h`);
    }
}