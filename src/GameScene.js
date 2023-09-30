import Phaser from 'phaser'
import { transformWithEsbuild } from 'vite'

const URL = 'http://localhost:5173'

export default class GameScene extends Phaser.Scene {
	constructor() {
		super('Game')
	}

	init() { }

	preload() {
		// this.load.image('sheet', `${URL}/assets/sheet.png`)
		// this.load.tilemapTiledJSON('map', `${URL}/assets/map.json`)
		this.load.image('sheet', '/sheet.png')
		this.load.tilemapTiledJSON('map', '/map.json')
	}

	create() {
		const map = this.make.tilemap({ key: 'map' })
		const tileset = map.addTilesetImage('sheet')
		const background = map.createLayer('background', tileset)
		const ships = map.createBlankLayer('ships', tileset)
		const result = ships.putTilesAt([
			[1, 6, 6, 6, 6, 6, 6, 6, 6, 6],
			[6, 2, 6, 6, 6, 6, 6, 6, 6, 6],
			[6, 6, 3, 6, 6, 6, 6, 6, 6, 6],
			[6, 6, 6, 4, 6, 6, 6, 6, 6, 6],
			[6, 6, 6, 6, 7, 6, 6, 6, 6, 6],
			[6, 6, 6, 6, 6, 8, 6, 6, 6, 6],
			[6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
			[6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
			[6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
			[6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
		], 1, 1)

		this.input.on('pointerdown', function (pointer) {
			const tile = map.getTileAtWorldXY(pointer.worldX, pointer.worldY)
			const result = translateTemplate[tile.y - 1][tile.x - 1]
			console.log(result)
			tg.sendData(result)
		}, this)
	}

	update(time, dt) {

	}

}