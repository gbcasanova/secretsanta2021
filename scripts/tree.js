class Tree extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y, type)
	{
		super(scene, x, y, "trees", type);
		
		// Add to updatelist.
        scene.add.existing(this);
		
		// Physics.
		scene.physics.add.existing(this);
		scene.physics.add.collider(this, scene.player)
		this.setImmovable(true)
		this.body.setSize(72, 9);
		this.body.setOffset(31, 183);
		
		// Pointer.
		this.setInteractive();
		this.pointer_in = false;
		this.on('pointerout', () => 
        { 
            this.pointer_in = false;
        });
		
		this.on('pointerover', () => 
        {
			this.pointer_in = true;
        });
		
		this.depth = this.y + this.displayHeight / 2;
		this.collectable_worthy = false;
	}
	
	preUpdate(time, delta)
	{
		super.preUpdate(time, delta);
		
		this.collectable_worthy = false;
		if (this.pointer_in)
		{
			if (this.scene.current_tool == 2)
			{
				this.setTint("0xD7D7D7");
				this.collectable_worthy = true;
			}
			else
			{
				this.setTint("0xFFFFFF");
			}
		}
		else
		{
			this.setTint("0xFFFFFF");
		}
		
		console.log(this.collectable_worthy)
	}
}