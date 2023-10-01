import Phaser from 'phaser'
import GameScene from './GameScene'

const config = {
	type: Phaser.AUTO,
	width: 352,
	height: 736,
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




const game = new Phaser.Game(config)

// const sendBtn = document.getElementById('send')
// sendBtn.onclick = () => {
// 	try {
// 		tg.sendData('hi from webapp')
// 	} catch (error) {
// 		console.log('in sendData: ', error)
// 	}
// }

