import Phaser from 'phaser'
import GameScene from './GameScene'

const config = {
	type: Phaser.AUTO,
	width: 400,
	height: 400,
	scene: [GameScene],
	parent: 'game',
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	physics: {
		default: 'matter',
		matter: {
			debug: false,
			gravity: { x: 0, y: 0 }
		}
	}
}

const game = new Phaser.Game(config)