import Phaser from 'phaser'

const URL = 'http://localhost:5173'

const translateTemplate = [
	['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'],
	['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10'],
	['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10'],
	['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10'],
	['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10'],
	['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10'],
	['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10'],
	['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10'],
	['I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9', 'I10'],
	['J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8', 'J9', 'J10']
]

const tg = window.Telegram.WebApp
console.log(tg)

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
			fetch('https://tebot.netlify.app/.netlify/functions/bot', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					myMark: 'webapp',
					id: tg.initDataUnsafe.query_id,
					result
				})
			})
		}, this)
	}

	update(time, dt) {

	}

}