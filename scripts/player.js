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
			
			this.anims.create ({
                key: "run_back",
                frames: this.anims.generateFrameNumbers(this.texture.key, {start: 12, end: 17}),
                frameRate: fr,
                repeat: -1
            }),
		];
		
		// Keyboard.
		this.keys = {
			up:    scene.input.keyboard.addKey('W'),
			left:  scene.input.keyboard.addKey('A'),
			down:  scene.input.keyboard.addKey('S'),
			right: scene.input.keyboard.addKey('D'),
		};
		
		// Movement.
		this.moving = false;
		this.accel  = 400;
		this.drag   = 150;
		this.maxSpd = 150;
		
		this.front = true;
		
		// Camera.
		let camera = scene.cameras.main;
		camera.startFollow(this, false, 0.1, 0.1);
		
	}
	
	movement()
	{
		// Limit movement.
		this.setDrag(this.drag, this.drag);
		this.body.setMaxSpeed(this.maxSpd);
		
		// Horizontal movement.
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
	
	animation()
	{
		// Change the direction of the sprite
		// and take the camera into consideration.
		let mousePointer = this.scene.input.mousePointer;
		let camera = this.scene.cameras.main.worldView;
		
		if (mousePointer.y + camera.y > this.y)
		{
			this.front = true;
		}
		else if  (mousePointer.y + camera.y < this.y)
		{
			this.front = false;
		}
		
		// Play running animation.
		let accelX = this.body.acceleration.x;
		let accelY = this.body.acceleration.y;
		
		if (accelX != 0 || accelY != 0)
		{
			if (this.front)
			{
				this.play("run_front", true);
			}
			else
			{
				this.play("run_back", true);
			}
		}
		else // Play Idle Animation.
		{
			if (this.front)
			{
				this.play("idle_front", true);
			}
			else
			{
				this.play("idle_back", true);
			}
		}

	}
	
	preUpdate(time, delta)
	{
		super.preUpdate(time, delta)
		
		this.movement();
		this.animation();
		
	}
}