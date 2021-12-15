class Menu extends Phaser.Scene
{
    constructor()
    {
        super("Menu");
    }

    preload()
    {
        this.load.spritesheet("menui", "sprites/gui/menui.png", {frameWidth: 512, frameHeight: 480});
		this.load.spritesheet("buttons", "sprites/gui/menubuttons.png", {frameWidth: 144, frameHeight: 55});
		this.load.spritesheet("cursors", "sprites/gui/cursors.png", {frameWidth: 34, frameHeight: 34})
		this.load.audio("menusong", "sounds/menusong.mp3");
    }

    create()
    {	
		// FOR THE LOVE OF GOD.
		// THE CODE BELOW IS EXTREMELY CURSED.
		// I DON'T KNOW WHAT I WAS DOING. YOU PROBABLY WON'T EITHER.
		// DON'T TOUCH IT. DON'T EVEN THINK ABOUT IT.
		// PEACE.
		
		this.debug_pressed = false
		this.shift_key = this.input.keyboard.addKey('SHIFT');
		this.debug_key = this.input.keyboard.addKey('D');
		
		this.cameras.main.fadeIn(6000);
		this.sound.play("menusong");
		
		// Cursor.
		this.sys.canvas.style.cursor = 'none';
		this.cursor = new Cursor(this);
		
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
						this.cursor.setFrame(4);
						
						this.menu_image.on('pointerdown', function (pointer) {
							this.scene.cameras.main.fadeOut(2000);
							
							this.scene.cameras.main.once('camerafadeoutcomplete', function (camera) {
								this.scene.menu_image.destroy()
								let menuimage = this.scene.add.sprite(0, 0, "menui", 3).setOrigin(0, 0)
								
									new Button(this.scene, 344, 28, 0, function(button){ // Play Button.
										button.scene.start("Cutscene");
									}, this)
									
									new Button(this.scene, 344, 102, 2, function(){ // Casanova Button.
										var url = 'https://casanovagames.itch.io/'
										
										var s = window.open(url, '_blank');

										if (s && s.focus)
										{
											s.focus();
										}
										else if (!s)
										{
											window.location.href = url;
										}
									})
									
									new Button(this.scene, 344, 176, 4, function(){ // Santa Button.
										var url = "https://itch.io/jam/secret-santa-2021"
										
										var s = window.open(url, '_blank');

										if (s && s.focus)
										{
											s.focus();
										}
										else if (!s)
										{
											window.location.href = url;
										}
									})
								
								camera.fadeIn(2000);
								this.scene.current_frame = 3;
								this.scene.cursor.setFrame(5);
							});
						});
					}
				},
			//args: [],
			callbackScope: this,
			loop: 1
		});
    }

    update(time, delta)
    {
		if (!this.debug_pressed)
		{
			if (this.shift_key.isDown && this.debug_key.isDown)
			{
				this.debug_pressed = false;
				this.scene.start("SceneSelector");
			}
		}
    }
}