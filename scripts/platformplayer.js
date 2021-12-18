class PlatformPlayer extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y)
	{
		super(scene, x, y, "fallguy", 0);
		
		// Add to updatelist.
        scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setCollideWorldBounds(true);
		
		let playerAnimations = [
            this.anims.create ({
                key: "idle",
                frames: [{key: "fallguy", frame: 18}],
                frameRate: 7,
            }),

            this.anims.create ({
                key: "walking",
                frames: this.anims.generateFrameNumbers("fallguy", {start: 18, end: 25}),
                frameRate: 10,
                repeat: -1
            }),
		]
		this.play("idle");
		
		// Physics.
		this.body.setGravityY(400);
		this.space_key = scene.input.keyboard.addKey('SPACE');
		this.setVelocityX(0);
		this.velocity = 300;
		
		// Camera.
		let camera = scene.cameras.main;
		camera.startFollow(this, false, 1, 1);
	}
	
	preUpdate(time, delta)
	{
		super.preUpdate(time, delta);
		//console.log(this.scene)
		
		// Jump.
		if (this.body.onFloor())
		{
			this.setVelocityX(300)
			this.scene.thornpole.body.setVelocityX(300)
			
			if (this.space_key.isDown)
			{
				this.setVelocityY(-330);
				this.scene.sound.play("sfx_jump");
			}
		}
		
		// Jumping animation.
		if (this.body.velocity.y < 0) {
			this.play("idle", true)
		} else if (this.body.velocity.y > 0) {
			this.play("walking", true)
		}
	}
}