var config = {
    type: Phaser.AUTO,
	
	// Graphix.
    width: 512,
    height: 480,
	pixelArt: true,
	roundPixels: true,
	disableContextMenu: true,
	
	scale:
    {
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
	
	// Physix.
	physics: 
    {
        default: 'arcade',
		arcade:
        {
            debug: true,
            debugShowBody: true,
            debugShowStaticBody: true,
            fps: 60
        }
	},
	
    scene: [SceneSelector, Menu, Level, Cutscene]
};

var level_game = 0;

var game = new Phaser.Game(config);
