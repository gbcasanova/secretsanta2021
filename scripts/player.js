class Player extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y)
	{
		super(scene, x, y)
		
		// Add to updatelist.
        scene.add.existing(this)
        scene.physics.add.existing(this)
		
		scene.anims.createFromAseprite('fallguy_steve');
		this.play({key:"fgs_idle", repeat: -1});
	}
	
	preUpdate(time, delta)
	{
		super.preUpdate(time, delta)
		
		//
	}
}