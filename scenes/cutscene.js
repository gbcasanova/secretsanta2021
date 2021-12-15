class Cutscene extends Phaser.Scene
{
    constructor()
    {
        super("Cutscene");
    }

    preload()
    {
        this.load.spritesheet("cutscenes", "sprites/gui/cutscenes.png", {frameWidth: 512, frameHeight: 480});
		
		this.load.audio("cutscene0_0", "sounds/cutscenes/cutscene0_0.mp3")
    }

    create()
    {
		this.sound.stopAll();
		this.cameras.main.fadeIn(1000);
		
		this.cutscene_sprite = this.add.sprite(0,0, "cutscenes", 0)
			.setOrigin(0, 0)
			
		if (level_game == 0)
		{
			this.cutsceneaudio_0 =  this.sound.add("cutscene0_0");
		}
		
		this.cutsceneaudio_0.play();
		this.cutsceneaudio_0.on('complete', function(){
			this.cutscene_sprite.setFrame(1)
		}, this);
    }

    update(time, delta)
    {
        //
    }
}