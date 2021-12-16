class Level extends Phaser.Scene
{
    constructor()
    {
        super("Level");
    }

    preload()
    {
        this.load.spritesheet("fallguy_steve", "sprites/fallguy_steve.png", {frameWidth: 64, frameHeight: 80});
		this.load.spritesheet("trees", "sprites/trees.png", {frameWidth: 128, frameHeight: 192});
		
		this.load.image("tileset", "sprites/tileset.png");
		this.load.tilemapTiledJSON("tilemap", "tilemaps/test.json");
		
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
		this.add.text(45, 37, 
			this.numberof.rocks + "\n" + 
			this.numberof.trees + "\n" +
			this.numberof.diamonds + "\n" + 
			this.numberof.water + "\n" + 
			this.numberof.lava + "\n",
			{
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
		
		//this.input.on('pointerdown', function (pointer) {
			//this.input.mouse.requestPointerLock();
		//}, this);
		
		// Tilemap.
		let map = this.make.tilemap({key: "tilemap"});
		let tileset = map.addTilesetImage("tileset", "tileset");
		map.createLayer("ground", tileset);
		//map.createLayer("deco", tileset);
		//let objectlayer = map.getObjectLayer("objects")["objects"];
		//this.import_objects(objectlayer);
		
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		
		// Generate objects.
		this.numberof = {}
		
		this.numberof.rocks = 0;
		
		this.numberof.trees = Phaser.Math.Between(5, 30);
		for (let i = 0; i < this.numberof.trees; i++) {
			new Tree(this, Phaser.Math.Between(60, 1180), Phaser.Math.Between(100, 1180), Phaser.Math.Between(0, 1));
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