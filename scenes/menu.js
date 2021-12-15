class Menu extends Phaser.Scene
{
    constructor()
    {
        super("Menu");
    }

    preload()
    {
        this.load.spritesheet("menui", "sprites/gui/menui.png", {frameWidth: 512, frameHeight: 480});
		this.load.audio("menusong", "sounds/menusong.mp3");
    }

    create()
    {
		this.cameras.main.fadeIn(6000);
		this.sound.play("menusong");
		
		this.menu_image = this.add.sprite(0, 0, "menui", 0)
			.setOrigin(0, 0)
			.setInteractive();
		
		// Change menu frame.
		this.current_frame = 0;
		var timer = this.time.addEvent({
			delay: 6000, // ms
			callback: function(){
					// Next frame.
					if(this.current_frame < 2)
					{
						this.current_frame+=1;
						this.menu_image.setFrame(this.current_frame);
					}
					
					// Click on frame.
					if (this.current_frame == 2) 
					{
						this.menu_image.on('pointerdown', function (pointer) {
							this.scene.menu_image.setFrame(3);
						});
					}
				},
			//args: [],
			callbackScope: this,
			loop: true
		});
		
		
    }

    update(time, delta)
    {
		//
    }
}