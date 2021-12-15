class Cutscene extends Phaser.Scene
{
    constructor()
    {
        super("Cutscene");
    }

    preload()
    {
        this.load.spritesheet("cutscenes", "sprites/gui/cutscenes.png", {frameWidth: 512, frameHeight: 480});
    }

    create()
    {
		this.sound.stopAll();
		
		let cutscenes = this.add.sprite(0,0, "cutscenes", 0)
			.setOrigin(0, 0)
    }

    update(time, delta)
    {
        //
    }
}