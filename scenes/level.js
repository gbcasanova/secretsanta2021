class Level extends Phaser.Scene
{
    constructor()
    {
        super("Level");
    }

    preload()
    {
		// Level sprites.
        this.load.spritesheet("fallguy", "sprites/fallguy.png", {frameWidth: 64, frameHeight: 80});
		this.load.spritesheet("trees",   "sprites/trees.png",   {frameWidth: 128,frameHeight: 192});
		this.load.spritesheet("itemDrop","sprites/itemDrop.png",{frameWidth: 64, frameHeight: 64});
		
		this.load.image("tileset", "sprites/tileset.png");
		this.load.tilemapTiledJSON("tilemap", "tilemaps/test.json");
		
		// Gui sprites.
		this.load.spritesheet("cursors", "sprites/gui/cursors.png", {frameWidth: 34, frameHeight: 34})
		this.load.image("tools_selector", "sprites/gui/tools_selector.png")
		this.load.image("outline", "sprites/gui/outline.png")
		this.load.image("items_showcase", "sprites/gui/items_showcase.png")
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
		this.add.text(4, 4, "Collect all the resources before the timer runs out!", {
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
		
		this.item_text.setText(
			this.numberof.rocks + "\n" + 
			this.numberof.trees + "\n" +
			this.numberof.diamonds + "\n" + 
			this.numberof.water + "\n" + 
			this.numberof.lava + "\n"
		);
	}

	import_objects(layer)
	{
		/* Import objects from layer.
        layer.forEach(object => 
		{
			switch(object.type)
			{
				case "tree":
					new Tree(this, object.x, object.y, 0);
					break;
			}
		})*/
	}
	
    create()
    {
		this.cameras.main.fadeIn(1000);
		this.player = new Player(this, 120, 120);
		
		// Tilemap.
		let map = this.make.tilemap({key: "tilemap"});
		let tileset = map.addTilesetImage("tileset", "tileset");
		map.createLayer("ground", tileset);
		map.createLayer("ground2", tileset);
		//let objectlayer = map.getObjectLayer("objects")["objects"];
		//this.import_objects(objectlayer);
		this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		
		// Generate objects.
		let random = Phaser.Math.Between;
		
		this.numberof = {}
		this.numberof.rocks = 0;
		
		this.numberof.trees = random(5, 30);
		for (let i = 0; i < this.numberof.trees; i++) {
					       // X least-most.  //Y least-most.    // Tree type.
			new Tree(this, random(60, 795), random(100, 728), random(0, 1));
		}
		
		this.numberof.diamonds = 0;
		this.numberof.water = 0;
		this.numberof.lava = 0;
		
		this.create_gui(); // Create GUI interface.
    }

    update(time, delta)
    {
		this.update_gui();
    }
}