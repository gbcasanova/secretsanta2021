class Rocket extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y)
	{
		super(scene, x, y, "rocket");
		
		// Add to updatelist.
        scene.add.existing(this);
		
		// Physics.
		scene.physics.add.existing(this);
		
		scene.physics.add.overlap(scene.player, this, function(){
			let nof = scene.numberof;
			
			//if (nof.rocks + nof.trees + nof.diamonds + nof.water + nof.lava == 0)
			//{
				scene.player.destroy();
			
				let tween = scene.tweens.add({
					targets: this,
					alpha: 1,
					y: {from: this.y, to: this.y - 500},
					ease: 'Back.easeInOut',  
					duration: 2000,
					repeat: 0,         
					yoyo: false,
					onComplete: function(){
						scene.cameras.main.fadeOut(1000)
					}
				});
				
				scene.sound.play("sfx_rocket")
			//}
		}, null, this);
		
		this.depth = this.y + this.displayHeight*2;
	}
	
	preUpdate(time, delta)
	{
		super.preUpdate(time, delta);
		
	}
}