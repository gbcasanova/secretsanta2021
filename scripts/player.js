class Player extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y)
	{
		super(scene, x, y, "fallguy_steve");
		
		// Add to updatelist.
        scene.add.existing(this);
        scene.physics.add.existing(this);
		
		// Animations.
		let fr = 11;
		let animations = [
			this.anims.create ({
                key: "idle_front",
                frames: this.anims.generateFrameNumbers(this.texture.key, {start: 0, end: 2}),
                frameRate: fr,
                repeat: -1
            }),
			
			this.anims.create ({
                key: "run_front",
                frames: this.anims.generateFrameNumbers(this.texture.key, {start: 3, end: 8}),
                frameRate: fr,
                repeat: -1
            }),
			
			this.anims.create ({
                key: "idle_back",
                frames: this.anims.generateFrameNumbers(this.texture.key, {start: 9, end: 11}),
                frameRate: fr,
                repeat: -1
            }),
		];
		this.play("idle_back");
		
		// Keyboard.
		this.keys = {
			up:    scene.input.keyboard.addKey('W'),
			left:  scene.input.keyboard.addKey('A'),
			down:  scene.input.keyboard.addKey('S'),
			right: scene.input.keyboard.addKey('D'),
		};
		
		// Movement.
		this.accel  = 400;
		this.drag   = 150;
		this.maxSpd = 150;
		
	}
	
	movement()
	{
		this.setDrag(this.drag, this.drag);
		this.body.setMaxSpeed(this.maxSpd)
		
		// Horizontal movement
		if (this.keys.right.isDown) 
		{
			this.setAccelerationX(this.accel);
		}
		else if (this.keys.left.isDown)
		{
			this.setAccelerationX(-this.accel);
		}
		else
		{
			this.setAccelerationX(0);
		}
		
		// Vertical movement.
		if (this.keys.up.isDown) 
		{
			this.setAccelerationY(-this.accel);
		}
		else if (this.keys.down.isDown)
		{
			this.setAccelerationY(this.accel);
		}
		else
		{
			this.setAccelerationY(0);
		}
	}
	
	preUpdate(time, delta)
	{
		super.preUpdate(time, delta)
		
		this.movement();
		
	}
}