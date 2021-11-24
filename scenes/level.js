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
    }

    create()
    {
		this.input.setDefaultCursor('url(sprites/cursors/arrow.cur), pointer');
		
		// Tilemap.
		const map = this.make.tilemap({key: "tilemap"});
		const tileset = map.addTilesetImage("tileset", "tileset");
		map.createLayer("ground", tileset)
		
		this.player = new Player(this, 90, 90);
    }

    update(time, delta)
    {
        //
    }
}