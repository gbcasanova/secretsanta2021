class PlatformLevel extends Phaser.Scene
{
    constructor()
    {
        super("PlatformLevel");
    }

    preload()
    {
        switch(level_game)
		{	
			case 0: // Mustafar.
				this.load.image("background0", "sprites/backgrounds/bg_mustafar0");
				this.load.image("background1", "sprites/backgrounds/bg_mustafar1");
				this.load.image("background2", "sprites/backgrounds/bg_mustafar2");
				break;
		}
    }

    create()
    {
		this.cameras.main.fadeIn(2000, "255", "255", "255");
		this.sound.stopAll();
		
		// Background.
		this.bgs = [];
		this.bgs[0] = this.add.tileSprite(0, 0, config.width, config.height, "background0")
			.setOrigin(0,0)
			.setScrollFactor(0);
			
		this.bgs[1] = this.add.tileSprite(0, 0, config.width, config.height, "background1")
			.setOrigin(0,0)
			.setScrollFactor(0);
		
		this.bgs[2] = this.add.tileSprite(0, 0, config.width, config.height, "background2")
			.setOrigin(0,0)
			.setScrollFactor(0);
		
		// Create text.
		this.add.text(4, 4, "Jump around with the SPACE key and deliver the\npackage at the end!", {
			fontFamily: "PinkChicken-Regular",
			stroke: "0x000000",
			strokeThickness: 7,
			align: "center"
		})
			.setDepth(2000)
			.setFontSize(25)
			.setScrollFactor(0);
    }

    update(time, delta)
    {
        //
    }
}