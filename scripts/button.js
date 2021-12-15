class Button extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, frame, execute)
    {
        super(scene, x, y, "buttons", frame)
		this.setOrigin(0, 0)

        this.setInteractive();

        this.on('pointerover', () => 
        { 
            this.setFrame(frame + 1)
			this.scene.cursor.setFrame(4);
        });

        this.on('pointerout', () => 
        { 
            this.setFrame(frame)
			this.scene.cursor.setFrame(5);
        });

        this.on('pointerdown', function (event) 
        {
            if (typeof execute !== 'undefined')
            {
                execute(scene)
            }
        }, this);

        scene.add.existing(this)
    }
}