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
		this.setSize(41, 10);
		this.setOffset(47, 182);
		
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
		
		this.on('pointerdown', function (event) // Collect tree.
        {
            if (this.collectable_worthy)
			{
				this.setFrame(2);
				this.collected = true;
				this.disableInteractive();
				scene.sound.play("sfx_axe");
				
				let woodItem = new ItemDrop(scene, this.x, this.y, 1)
				
				let tween = scene.tweens.add({
					targets: woodItem,
					alpha: 1,
					y: {from: this.y, to: this.y + 80},
					ease: 'Back.easeInOut',      
					duration: 1000,
					repeat: 0,        
					yoyo: false
				});
			}
        }, this);
		
		this.collected = false;
		this.collectable_worthy = false;
		this.depth = this.y + this.displayHeight / 2;
	}
	
	preUpdate(time, delta)
	{
		super.preUpdate(time, delta);
		
		this.collectable_worthy = false;
		if (!this.collected)
		{
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
		}
	}
}