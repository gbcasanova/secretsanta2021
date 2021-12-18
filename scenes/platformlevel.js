class PlatformLevel extends Phaser.Scene
{
    constructor()
    {
        super("PlatformLevel");
    }

    preload()
    {
		this.cache.tilemap.remove("tilemap")
		
		this.load.spritesheet("fallguy", "sprites/fallguy.png", {frameWidth: 66, frameHeight: 82})
		this.load.spritesheet("objectsprites", "sprites/objectsprites.png", {frameWidth: 66, frameHeight: 66})
		this.load.image("tileset",  "sprites/tileset.png");
		this.load.image("thornpole","sprites/thornpole.png")
		
		// Load backgrounds.
        switch(level_game)
		{	
			case 0: // Mustafar.
				this.load.audio("music", "sounds/lavasong.mp3");
				this.load.image("background0", "sprites/backgrounds/bg_mustafar0.png");
				this.load.image("background1", "sprites/backgrounds/bg_mustafar1.png");
				this.load.image("background2", "sprites/backgrounds/bg_mustafar2.png");
				this.load.tilemapTiledJSON("tilemap", "tilemaps/mustafar.json");
				break;
		}
		
		this.load.audio("sfx_dead", "sounds/sfx_dead.mp3")
		this.load.audio("sfx_jump", "sounds/sfx_jump.mp3")
    }

    create()
    {
		this.levelover = false;
		
		this.sound.stopAll();
		this.sound.play("music");
		this.cameras.main.fadeIn(2000, "255", "255", "255");
		this.sys.canvas.style.cursor = 'none';
		
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
		
		// Level.
		this.player = new PlatformPlayer(this, 200, 100);
		
		let map = this.make.tilemap({key: "tilemap"}); // Tilemap.
		let tileset = map.addTilesetImage("tileset", "tileset");
		let solid_layer  = map.createLayer("solid", tileset);
		let object_layer = map.getObjectLayer("objects")["objects"] // Objects.
		solid_layer.setCollisionByExclusion([-1])
		this.importObjects(object_layer)
		
		this.physics.add.collider(this.player, solid_layer); // Physics.
		this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		
		// Thornpole.
		this.thornpole = this.add.image(-100, 0, "thornpole").setOrigin(0,0).setDepth(2000)
		this.physics.world.enable(this.thornpole);
		this.physics.add.overlap(this.player, this.thornpole, function(){
			this.resetLevel();
		}, null, this)
			
		
		// Create text.
		this.add.text(10, 4, "Jump around with the SPACE key and deliver the\npackage at the end of the level!", {
			fontFamily: "PinkChicken-Regular",
			stroke: "0x000000",
			strokeThickness: 7,
			align: "center"
		})
			.setDepth(2000)
			.setFontSize(25)
			.setScrollFactor(0);
    }
	
	resetLevel()
	{
		if (!this.levelover)
		{
			this.levelover = true
			this.sound.stopAll();
			this.cameras.main.fadeOut(2000, "255", "0", "0");
			this.sound.play("sfx_dead");
			
			// Fade out. 
			this.cameras.main.once('camerafadeoutcomplete', function (camera) {
				this.scene.restart();
			}, this);	
			this.player.inactive = true;
		}
	}
	
	nextLevel()
	{
		if (!this.levelover)
		{
			this.levelover = true
			this.sound.stopAll();
			this.cameras.main.fadeOut(1000);
			
			// Fade out. 
			this.cameras.main.once('camerafadeoutcomplete', function (camera) {
				level_game += 1;
				this.scene.start("Cutscene");
			}, this);	
			this.player.inactive = true;
			this.thornpole.body.setVelocityX(0)
		}
	}
	
	importObjects(layer)
	{
		// Import objects from layer.
        layer.forEach(object => 
        {
            switch(object.type)
            {
                case "spike":
                    let spike = this.add.sprite(object.x, object.y, "objectsprites", 0).setOrigin(0, 1)
					this.physics.world.enable(spike);
					this.physics.add.overlap(this.player, spike, function(){
						this.resetLevel();
					}, null, this)
                    break;
					
				case "end":
                    let end = this.add.sprite(object.x, object.y, "objectsprites", 0)
						.setOrigin(0, 1).setVisible(false)
					this.physics.world.enable(end);
					this.physics.add.overlap(this.player, end, function(){
						this.nextLevel();
					}, null, this)
                    break;
            }
        })
	}

    update(time, delta)
    {
        // Update backgrounds.
		this.bgs[1].tilePositionX = this.cameras.main.scrollX * .1
		this.bgs[2].tilePositionX = this.cameras.main.scrollX * .3
    }
}