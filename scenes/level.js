class Level extends Phaser.Scene
{
    constructor()
    {
        super("Level");
    }

    preload()
    {
        this.load.aseprite({ // Load fallguy sprite.
			key: "fallguy",
			textureURL: "sprites/fallguy.png",
			atlasURL: "sprites/fallguy.json"
		});
    }

    create()
    {
		this.anims.createFromAseprite('fallguy');
		this.add.sprite(40, 40).play({key:"walking", repeat: -1});
		
    }

    update(time, delta)
    {
        //
    }
}