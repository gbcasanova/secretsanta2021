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
		this.anims.createFromAseprite('fallguy_steve');
		this.add.sprite(40, 40).play({key:"fgs_idle", repeat: -1});
		
    }

    update(time, delta)
    {
        //
    }
}