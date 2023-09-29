import Phaser from 'phaser'
import GameScene from './GameScene'

const config = {
	type: Phaser.AUTO,
	width: 352,
	height: 352,
	scene: [GameScene],
	parent: 'game',
	scale: {
		// mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
		// mode: Phaser.Scale.ScaleModes.RESIZE,
		// width: window.innerWidth,
		// height: window.innerHeight,
	},
	physics: {
		default: 'matter',
		matter: {
			debug: false,
			gravity: { x: 0, y: 0 }
		}
		// default: 'arcade',
		// arcade: {
		// 	gravity: { y: 0 },
		// 	debug: false,
		// }
	}
}
const tg = window.Telegram.WebApp
const game = new Phaser.Game(config)

console.log('initData:', tg.initData)
console.log('initDataUnsafe:', tg.initDataUnsafe)