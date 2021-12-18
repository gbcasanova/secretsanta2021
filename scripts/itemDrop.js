class ItemDrop extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y, type)
	{
		super(scene, x, y, "itemDrop", type);
		
		// Add to updatelist.
        scene.add.existing(this);
		
		// Physics.
		scene.physics.add.existing(this);
		//scene.physics.add.collider(this, scene.player)
		//this.setImmovable(true)
		
		scene.physics.add.overlap(scene.player, this, function(){
			switch(type)
			{
				case 0:
					scene.numberof.rocks -= 1;
					scene.sound.play("sfx_item_stone");
					
					break;
				case 1:
					scene.numberof.trees -= 1;
					scene.sound.play("sfx_item_wood");
					break;
			}
			
			this.destroy();
		}, null, this);
		
		this.depth = this.y + this.displayHeight*2;
	}
	
	preUpdate(time, delta)
	{
		super.preUpdate(time, delta);
		
	}
}