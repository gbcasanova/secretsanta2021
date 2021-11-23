class Level extends Phaser.Scene
{
    constructor()
    {
        super("Level");
    }

    preload()
    {
        this.load.spritesheet("fallguy_steve", "sprites/fallguy_steve.png", {frameWidth: 64, frameHeight: 80})
		
		this.load.image("block", "sprites/block.png")
    }

    create()
    {
		this.player = new Player(this, 90, 90)
		
		let sprite = this.add.image(300, 300, "block")
		this.physics.world.enable([sprite]);
    }

    update(time, delta)
    {
        //
    }
}