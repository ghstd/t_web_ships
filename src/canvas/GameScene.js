import Phaser from 'phaser'
import image from './image.png'

export default class GameScene extends Phaser.Scene {
	constructor() {
		super('Game')
	}

	init() {
		this.cursors = this.input.keyboard.createCursorKeys()
	}

	preload() {
		this.load.image('image', image)
	}

	create() {
		this.add.image(0, 0, 'image').setOrigin(0)
	}

	update(time, dt) {

	}

}