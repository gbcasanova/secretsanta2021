class TravelAnim extends Phaser.Scene
{
    constructor()
    {
        super("TravelAnim");
    }

    preload()
    {
		this.load.image("rocket", "sprites/rocket.png");
		this.load.image("galaxybackground", "sprites/galaxybackground.png");
		
        this.load.audio("sfx_travelling", "sounds/sfx_travelling.mp3");
    }

    create()
    {
		this.sys.canvas.style.cursor = 'none';
		this.cameras.main.fadeIn(1000);
		
		// LEVEL NAMES.
		this.level_names = [];
		this.level_names[0] = "MUSTAFAR, The Fire Planet";
		this.level_names[1] = "  MARS, The Red Desert";
		
		// Create text.
		this.add.text(70, 380, "Arriving at:\n" + this.level_names[level_game], {
			fontFamily: "PinkChicken-Regular",
			stroke: "0x000000",
			strokeThickness: 7,
			align: "center"
		})
			.setDepth(2000)
			.setFontSize(35)
			.setScrollFactor(0);
		
		// Music.
		let music = this.sound.add("sfx_travelling");
		music.play()
		
		// Background.
		this.bg = this.add.tileSprite(0, 0, config.width, config.height, "galaxybackground")
			.setOrigin(0,0)
			.setScrollFactor(0);
		
		// Rocket sprite.
		this.rocket_sprite = this.add.sprite(config.width/2, config.height+206, "rocket");
		
		let tween = this.tweens.add({
			targets: this.rocket_sprite,
			alpha: 1,
			y: {from: this.y, to: config.height/2},
			ease: 'Cubic.easeOut',  
			duration: 2000,
			repeat: 0,         
			yoyo: false
		});
		
		music.once("complete", function(){
			let tween = this.tweens.add({
				targets: this.rocket_sprite,
				alpha: 1,
				y: {from: this.y, to: -206/2},
				ease: 'Cubic.easeOut',  
				duration: 2000,
				repeat: 0,         
				yoyo: false
			});
			
			this.cameras.main.fadeOut(2000, "255", "255", "255");
		}, this)
		
		// Fade out. 
		this.cameras.main.once('camerafadeoutcomplete', function (camera) {
            this.scene.start("PlatformLevel");
        }, this);		
    }

    update(time, delta)
    {
        this.bg.tilePositionY -= 5;
    }
}