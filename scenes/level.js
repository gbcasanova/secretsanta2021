class CraftLevel extends Phaser.Scene
{
    constructor()
    {
        super("CraftLevel");
    }

    preload()
    {
		// Level sprites.
        this.load.spritesheet("fallguy",   "sprites/fallguy.png",   {frameWidth: 64, frameHeight: 80});
		this.load.spritesheet("trees",     "sprites/trees.png",     {frameWidth: 128,frameHeight: 192});
		this.load.spritesheet("itemDrop",  "sprites/itemDrop.png",  {frameWidth: 64, frameHeight: 64});
		this.load.spritesheet("breakTiles","sprites/breakTiles.png",{frameWidth: 64, frameHeight: 64});
		
		this.load.image("rocket", "sprites/rocket.png");
		this.load.image("tileset", "sprites/tileset.png");
		this.load.tilemapTiledJSON("tilemap", "tilemaps/test.json");
		
		// Gui sprites.
		this.load.spritesheet("cursors", "sprites/gui/cursors.png", {frameWidth: 34, frameHeight: 34});
		this.load.image("tools_selector","sprites/gui/tools_selector.png");
		this.load.image("outline",       "sprites/gui/outline.png");
		this.load.image("items_showcase","sprites/gui/items_showcase.png");
		
		// Load music & sound effects.
		this.load.audio("sfx_axe",    "sounds/sfx_axe.ogg");
		this.load.audio("sfx_bucket", "sounds/sfx_bucket.ogg");
		this.load.audio("sfx_pickaxe","sounds/sfx_pickaxe.ogg");
		this.load.audio("sfx_shovel", "sounds/sfx_shovel.ogg");
		this.load.audio("sfx_walk",   "sounds/sfx_walk.ogg");
		
		this.load.audio("sfx_item_diamond","sounds/sfx_item_diamond.ogg");
		this.load.audio("sfx_item_lava",   "sounds/sfx_item_lava.ogg");
		this.load.audio("sfx_item_stone",  "sounds/sfx_item_stone.ogg");
		this.load.audio("sfx_item_water",  "sounds/sfx_item_water.ogg");
		this.load.audio("sfx_item_wood",   "sounds/sfx_item_wood.ogg");
		
		this.load.audio("sfx_rocket", "sounds/sfx_rocket.mp3");
		this.load.audio("craftsong", "sounds/craftsong.mp3")
    }
	
	create_gui()
	{	
		// Tools sprite.
		this.tools_selector = this.add.sprite(config.width/2, config.height - 64, "tools_selector")
			.setScrollFactor(0) // Tools image.
			.setDepth(2000);
		
		// Outline sprite.
		this.outline = this.add.sprite(128 + 64*this.current_tool, 384, "outline")
			.setScrollFactor(0)
			.setOrigin(0, 0)
			.setDepth(2000);
		
		this.current_tool = 0; // 0 - Pickaxe | 1 - Shovel | 2 - Axe | 3 - Bucket
		
		this.sys.canvas.style.cursor = 'none';
		this.cursor = new Cursor(this);
		this.cursor.setFrame(this.current_tool)
		
		// Wheel selection.
		this.input.on('wheel', function(pointer, currentlyOver, dx, dy, dz, event)
		{
			this.current_tool += Math.sign(dy);
			
			if (this.current_tool >= 4)
				this.current_tool = 0;
			
			if (this.current_tool <= -1)
				this.current_tool = 3;
			
			this.cursor.setFrame(this.current_tool)
		}, this);
		
		// Items showcase sprite.
		this.items_showcase = this.add.sprite(10, 43, "items_showcase")
			.setScrollFactor(0)
			.setOrigin(0, 0)
			.setDepth(2000);
			
		// Create text.
		this.add.text(4, 4, "Collect all the resources and get in the ROCKET!!", {
			fontFamily: "PinkChicken-Regular",
			stroke: "0x000000",
			strokeThickness: 7
		})
			.setDepth(2000)
			.setFontSize(25)
			.setScrollFactor(0);
			
		// Create side text.
		this.item_text = this.add.text(45, 37, " ", {
				fontFamily: "PinkChicken-Regular",
				stroke: "0x000000",
				strokeThickness: 7
			}
		)
			.setDepth(2000)
			.setFontSize(25)
			.setScrollFactor(0);
	}
	
	update_gui()
	{
		// Change outline position based on tool.
        this.outline.setX(128 + 64*this.current_tool)
		
		// Update item text.
		this.item_text.setText(
			this.numberof.rocks + "\n" + 
			this.numberof.trees + "\n" +
			this.numberof.diamonds + "\n" + 
			this.numberof.water + "\n" + 
			this.numberof.lava + "\n"
		);
	}
	
    create()
    {
		this.cameras.main.fadeIn(1000);
		this.player = new Player(this, 120, 120);
		
		this.music = this.sound.add("craftsong", {loop: true});
		this.music.play()
		
		// Tilemap.
		let map = this.make.tilemap({key: "tilemap"});
		let tileset = map.addTilesetImage("tileset", "tileset");
		map.createLayer("ground", tileset);
		map.createLayer("ground2", tileset);
		this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		
		// Generate objects.
		let random = Phaser.Math.Between;
		this.numberof = {}
		
		this.numberof.rocks = random(2, 10); // ROCKS.
		for (let i = 0; i < this.numberof.rocks; i++) {
			let rock = new Rock(this, random(821, 1259), random(-2, 651));
					                  // X least-most.   //Y least-most. 
		}
		
		this.numberof.trees = random(5, 30); // TREES.
		for (let i = 0; i < this.numberof.trees; i++) {
			let tree = new Tree(this, random(60, 795), random(100, 728), random(0, 1));
		}
		
		this.numberof.diamonds = random(8, 15); // DIAMONDS.
		for (let i = 0; i < this.numberof.diamonds; i++) {
			let sand = new Sand(this, random(35, 1199), random(772, 1100));
		}
		
		this.numberof.water = random(5, 10); // WATER.
		for (let i = 0; i < this.numberof.water; i++) {
			let water = new Water(this, random(66, 1199), random(55, 1100));
		}
		
		this.numberof.lava = random(5, 10); // LAVA.
		for (let i = 0; i < this.numberof.lava; i++) {
			let lava = new Lava(this, random(66, 1199), random(55, 1100));
		}
		
		this.create_gui(); // Create GUI interface.
		let rocket = new Rocket(this, 661, 1539)
		
		// Fade out. 
		this.cameras.main.once('camerafadeoutcomplete', function (camera) {
            this.scene.start("TravelAnim");
        }, this);
    }

    update(time, delta)
    {
		this.update_gui();
    }
}