class Player extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y)
	{
		super(scene, x, y, "fallguy_steve");
		
		// Add to updatelist.
        scene.add.existing(this);
        scene.physics.add.existing(this);
		
		// Animations.
		let animations = [
			this.anims.create ({
                key: "idle",
                frames: this.anims.generateFrameNumbers(this.texture.key, {start: 0, end: 2}),
                frameRate: 12,
                repeat: -1
            }),
			
			this.anims.create ({
                key: "run",
                frames: this.anims.generateFrameNumbers(this.texture.key, {start: 3, end: 8}),
                frameRate: 12,
                repeat: -1
            }),
		]
		this.play("run");
		
		// Keyboard.
		this.keys = {
			up:    scene.input.keyboard.addKey('W'),
			left:  scene.input.keyboard.addKey('A'),
			down:  scene.input.keyboard.addKey('S'),
			right: scene.input.keyboard.addKey('D'),
		};
		
		// Movement;
		this.drag   = 100
		this.accel  = 100
		this.drag   = 100
		this.maxSpd = 100
		
	}
	
	preUpdate(time, delta)
	{
		super.preUpdate(time, delta)
		
		this.setDragX(this.drag);
		this.body.setMaxSpeed(this.maxSpd)
		
		if (this.keys.right.isDown) {
			this.setAccelerationX(this.accel)
		}
		else
		{
			this.setAccelerationX(0)
		}
		
	}
}