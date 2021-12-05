class Tree extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y, type)
	{
		super(scene, x, y, "trees", type);
		
		// Add to updatelist.
        scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setImmovable(true)
		
		this.depth = this.y + this.height / 2;
		
		scene.physics.add.collider(this, scene.player)
	}
	
	preUpdate(time, delta)
	{
		super.preUpdate(time, delta)
		
	}
}