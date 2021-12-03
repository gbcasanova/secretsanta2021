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
		this.load.image("tools_selector_outline", "sprites/tools_selector_outline.png")
    }

    create()
    {
		this.input.setDefaultCursor('url(sprites/cursors/arrow.cur), pointer');
		
		// Tilemap.
		const map = this.make.tilemap({key: "tilemap"});
		const tileset = map.addTilesetImage("tileset", "tileset");
		map.createLayer("ground", tileset)
		map.createLayer("deco", tileset)
		
		this.player = new Player(this, 90, 90);
		
		// GUI.
		this.current_tool = 0; // 0 - Pickaxe | 1 - Shovel | 2 - Axe | 3 - Bucket
		
		this.tools_selector = this.add.sprite(config.width/2, config.height - 64, "tools_selector");
		this.tools_selector.setScrollFactor(0); // Tools image.
		
		this.tools_selector_outline = this.add.sprite(config.width/2 + 64*this.current_tool, config.height-64, "tools_selector_outline");
		this.tools_selector_outline.setScrollFactor(0); // Tools outline.
	
		this.input.on('wheel', function(pointer, currentlyOver, dx, dy, dz, event)
		{
			// Wheel selection.
			this.scene.current_tool += Math.sign(dy);
			
			if (this.scene.current_tool < 0)
				this.scene.current_tool = 0;
			else if (this.scene.current_tool > 3)
				this.scene.current_tool = 3;
		});

    }

    update(time, delta)
    {
        this.tools_selector_outline.x = config.width/2 + 64*this.current_tool
    }
}