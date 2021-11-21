var config = {
    type: Phaser.AUTO,
    width: 512,
    height: 480,
	pixelArt: true,
	
	scale:
    {
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
	
    scene: [SceneSelector, Menu, Level]
};

var game = new Phaser.Game(config);
