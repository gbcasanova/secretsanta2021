class SceneSelector extends Phaser.Scene
{
    constructor()
    {
        super("SceneSelector");
    }

    preload()
    {
        //
    }

    create()
    {
		this.sound.stopAll();
		this.add.text(8, 10, "Scene Select - G. Casanova 2021", {fontFamily: "PinkChicken-Regular"})

        let i;
        for (i = 0; i < config.scene.length; i++) 
        {
            let textButton = this.add.text(8, (16 * (i+1)) + 30, config.scene[i].name, {fontFamily: "PinkChicken-Regular"})
            textButton.setInteractive({cursor: 'pointer'})
            textButton.setColor("#93C54B")

            textButton.on('pointerover', () => 
            { 
                textButton.setColor("#3D85C6")
            });
    
            textButton.on('pointerout', () => 
            { 
                textButton.setColor("#93C54B")
            });

            textButton.on('pointerdown', function(event) 
            {
                this.scene.start(textButton.text);
            }, this);
        }
    }

    update(time, delta)
    {
        //
    }
}