class Cutscene extends Phaser.Scene
{
    constructor()
    {
        super("Cutscene");
    }

    preload()
    {
		this.cache.audio.remove("cutscene0");
		this.cache.audio.remove("cutscene1");
		
        this.load.spritesheet("cutscenes", "sprites/gui/cutscenes.png", {frameWidth: 512, frameHeight: 480});
		this.load.spritesheet("cursors", "sprites/gui/cursors.png", {frameWidth: 34, frameHeight: 34})
		
		// Load cutscene audio.
		switch(level_game)
		{
			case 0:
				this.load.audio("cutscene0", "sounds/cutscenes/cutscene0_0.mp3")
				this.load.audio("cutscene1", "sounds/cutscenes/cutscene0_1.mp3")
				break;
			case 1:
				this.load.audio("cutscene0", "sounds/cutscenes/cutscene1_0.mp3")
				this.load.audio("cutscene1", "sounds/cutscenes/cutscene1_1.mp3")
				break;
			case 2:
				this.load.audio("cutscene0", "sounds/cutscenes/cutscene2_0.mp3")
				this.load.audio("cutscene1", "sounds/cutscenes/cutscene2_1.mp3")
				break;
			case 3:
				this.load.audio("cutscene0", "sounds/cutscenes/cutscene3_0.mp3")
				this.load.audio("cutscene1", "sounds/cutscenes/cutscene3_1.mp3")
				break;
		}
		
    }

    create()
    {
		let cutscene_number = level_game*2
		
		this.sound.stopAll();
		this.cameras.main.fadeIn(1000);
		this.cutscene_sprite = this.add.sprite(0,0, "cutscenes", cutscene_number)
			.setOrigin(0, 0)
			
		// Cursor.
		this.sys.canvas.style.cursor = 'none';
		
		// Select the specific sound.
		this.cutsceneaudio_0 = this.sound.add("cutscene0");
		this.cutsceneaudio_1 = this.sound.add("cutscene1");
		
		this.cutsceneaudio_0.play(); // Play first audio.
		this.cutsceneaudio_0.on('complete', function(){
			this.cutscene_sprite.setFrame(cutscene_number + 1)
			this.cutsceneaudio_1.play()
		}, this);
		
		this.cutsceneaudio_1.on('complete', function(){ // Play Second audio.
			this.cameras.main.fadeOut(1000);
		}, this);
		
		// Switch scenes.
		this.cameras.main.once('camerafadeoutcomplete', function (camera) {
			this.scene.start("CraftLevel")
		}, this)
		
    }

    update(time, delta)
    {
        //
    }
}