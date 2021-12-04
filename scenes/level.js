class Level extends Phaser.Scene
{
    constructor()
    {
        super("Level");
    }

    preload()
    {
        this.load.spritesheet("fallguy_steve", "sprites/fallguy_steve.png", {frameWidth: 64, frameHeight: 80});
		
		this.load.image("tileset", "sprites/tileset.png");
		this.load.tilemapTiledJSON("tilemap", "tilemaps/test.json");
		
		this.load.image("tools_selector", "sprites/tools_selector.png")
		this.load.image("outline", "sprites/outline.png")
		this.load.image("items_showcase", "sprites/items_showcase.png")
    }
	
	create_gui()
	{
		this.current_tool = 0; // 0 - Pickaxe | 1 - Shovel | 2 - Axe | 3 - Bucket
		
		// Tools sprite.
		this.tools_selector = this.add.sprite(config.width/2, config.height - 64, "tools_selector");
		this.tools_selector.setScrollFactor(0); // Tools image.
		
		// Outline sprite.
		this.outline = this.add.sprite(128 + 64*this.current_tool, 384, "outline")
			.setScrollFactor(0)
			.setOrigin(0, 0);
		
		// Wheel selection.
		this.input.on('wheel', function(pointer, currentlyOver, dx, dy, dz, event)
		{
			this.scene.current_tool += Math.sign(dy);
			
			if (this.scene.current_tool < 0)
				this.scene.current_tool = 0;
			else if (this.scene.current_tool > 3)
				this.scene.current_tool = 3;
		});
		
		// Items showcase sprite.
		this.items_showcase = this.add.sprite(10, 10, "items_showcase")
			.setScrollFactor(0)
			.setOrigin(0, 0);		
	}
	
	update_gui()
	{
		// Change outline position based on tool.
        this.outline.x = 128 + 64*this.current_tool
		
		if (this.current_tool == 0)
			this.input.setDefaultCursor('url(sprites/cursors/pickaxe.cur), pointer');
		else if (this.current_tool == 1)
			this.input.setDefaultCursor('url(sprites/cursors/shovel.cur), pointer');
		else if (this.current_tool == 2)
			this.input.setDefaultCursor('url(sprites/cursors/axe.cur), pointer');
		else if (this.current_tool == 3)
			this.input.setDefaultCursor('url(sprites/cursors/bucket.cur), pointer');
	}

    create()
    {
		
		// Tilemap.
		const map = this.make.tilemap({key: "tilemap"});
		const tileset = map.addTilesetImage("tileset", "tileset");
		map.createLayer("ground", tileset);
		map.createLayer("deco", tileset);
		
		this.player = new Player(this, 90, 90);;
		
		this.create_gui();
    }

    update(time, delta)
    {
		this.update_gui();
    }
}