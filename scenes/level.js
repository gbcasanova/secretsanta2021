class Level extends Phaser.Scene
{
    constructor()
    {
        super("Level");
    }

    preload()
    {
        this.load.aseprite({ // Load player sprite.
			key: "fallguy_steve",
			textureURL: "sprites/fallguy_steve.png",
			atlasURL: "sprites/fallguy_steve.json"
		});
    }

    create()
    {
		new Player(this, 90, 90)
    }

    update(time, delta)
    {
        //
    }
}