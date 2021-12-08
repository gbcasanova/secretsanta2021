class Tree extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y, type)
	{
		super(scene, x, y, "trees", type);
		
		// Add to updatelist.
        scene.add.existing(this);
		scene.physics.add.existing(this);
		
		this.setImmovable(true)
		scene.physics.add.collider(this, scene.player)
		
		this.body.setSize(72, 9);
		this.body.setOffset(31, 183);
		this.setOrigin(0.3, 1)
		
		this.depth = this.y + this.displayHeight / 2;
	}
	
	preUpdate(time, delta)
	{
		super.preUpdate(time, delta)
		
	}
}