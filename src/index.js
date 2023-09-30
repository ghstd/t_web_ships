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



const translateTemplate = [
	['A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'],
	['B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'],
	['C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9'],
	['D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9'],
	['E0', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9'],
	['F0', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9'],
	['G0', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9'],
	['H0', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9'],
	['I0', 'I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9'],
	['J0', 'J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8', 'J9']
]

const tg = window.Telegram.WebApp
const game = new Phaser.Game(config)

const sendBtn = document.getElementById('send')
sendBtn.onclick = () => {
	try {
		tg.sendData('hi from webapp')
	} catch (error) {
		console.log('in sendData: ', error)
	}
}

