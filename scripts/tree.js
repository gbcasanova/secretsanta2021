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
		
		this.setInteractive();
		this.on('pointerout', () => 
        { 
            this.setTint("0xFFFFFF");
        });
		
		this.on('pointerover', () => 
        {
			if (scene.current_tool == 2)
			{
				this.setTint("0xD7D7D7");
			}
        });
		
		this.depth = this.y + this.displayHeight / 2;
	}
	
	preUpdate(time, delta)
	{
		super.preUpdate(time, delta)
		
		if (this.scene.current_tool != 2)
		{
			this.setTint("0xFFFFFF");
		}
	}
}