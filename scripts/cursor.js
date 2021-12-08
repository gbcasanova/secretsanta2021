class Cursor extends Phaser.GameObjects.Sprite
{
	constructor(scene)
	{
		super(scene, 0, 0, "cursors", 5);
		
		// Add to updatelist.
        scene.add.existing(this);
		
		scene.input.on('pointermove', function (pointer) {
			if (scene.input.mouse.locked)
			{
				// Move pointer.
				this.x += pointer.movementX;
				this.y += pointer.movementY;
				
				// Force the cursor to stay on screen
				this.x = Phaser.Math.Clamp(this.x, 0, config.width);
				this.y = Phaser.Math.Clamp(this.y, 0, config.height);
			}
		}, this);
		
		this.depth = 9000;
		this.setScrollFactor(0);
		this.setOrigin(0, 0);
	}
	
	preUpdate(time, delta)
	{
		super.preUpdate(time, delta);
	}
}