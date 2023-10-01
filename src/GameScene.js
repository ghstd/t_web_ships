import Phaser from 'phaser'
import { checkField } from './helpers/checkField'

const URL = 'https://tel-server-firebase.onrender.com'

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



export default class GameScene extends Phaser.Scene {
	constructor() {
		super('Game')
	}

	init() { }

	preload() {
		this.load.image('scales', '/scales.png')
		this.load.image('objects', '/objects.png')
		this.load.tilemapTiledJSON('map_1', '/map_1.json')
		this.load.tilemapTiledJSON('map_2', '/map_2.json')
	}

	async create() {
		this.player = await this.getPlayer()
		if (!this.player) {
			console.log('no player')
			return
		}

		if (this.player.ready) {

			this.renderSecondMap()
			this.input.on('pointerup', function (pointer) {
				const tile = this.map.getTileAtWorldXY(pointer.worldX, pointer.worldY, undefined, undefined, 'targets')
				if (!tile) {
					return
				}
				const result = translateTemplate[tile.y - 1][tile.x - 1]
				console.log('result', result)
				// this.sendCoord(result)
			}, this)

		} else {

			this.scale.resize(352, 352)
			tg.MainButton.onClick(async () => {
				tg.MainButton.setText('...saving')
				await this.updatePlayerField(this.player.id, JSON.stringify(this.player.playerField))
				tg.close()
			})

			this.renderFirstMap()
			this.input.on('pointerup', function (pointer) {
				const tile = this.map.getTileAtWorldXY(pointer.worldX, pointer.worldY, undefined, undefined, 'ships')
				if (!tile) {
					return
				}

				if (this.player.playerField[tile.y - 1][tile.x - 1] === 0) {
					this.player.playerField[tile.y - 1][tile.x - 1] = 1
					this.map.putTileAtWorldXY(122, pointer.worldX, pointer.worldY)
				} else {
					this.player.playerField[tile.y - 1][tile.x - 1] = 0
					this.map.putTileAtWorldXY(121, pointer.worldX, pointer.worldY)
				}

				if (checkField(this.player.playerField).correct) {
					console.log('correct')
					tg.MainButton.setText('сохранить?')
					tg.MainButton.show()
				} else {
					tg.MainButton.hide()
				}

			}, this)
		}
	}



	async getPlayer() {
		// const id = tg.initDataUnsafe.user?.id
		const id = 545166583

		if (!id) {
			return null
		}

		try {
			const response = await fetch(`${URL}/dbGetPlayerByUserId`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ id })
			})
			return await response.json()
		} catch (error) {
			console.log('fetch player: ', error)
		}

		if (this.player.noData) {
			console.log('create - player.noData: ', player.noData)
			return null
		}
	}

	async updatePlayerField(id, playerField) {
		try {
			const response = await fetch(`${URL}/dbUpdatePlayerField`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: { id, playerField }
			})
			const result = await response.json()
			console.log('result', result)
			return result
		} catch (error) {
			console.log('updatePlayerField: ', error)
		}
	}

	renderFirstMap() {
		this.map = this.make.tilemap({ key: 'map_1' })
		const scales = this.map.addTilesetImage('scales')
		const objects = this.map.addTilesetImage('objects')
		this.map.createLayer('scales', scales)

		const playerArr = this.player.playerField.map((row) => row.map((i) => i + 121))
		const playerField = this.map.createBlankLayer('ships', [scales, objects])
		playerField.putTilesAt(playerArr, 1, 1)
	}

	renderSecondMap() {
		this.map = this.make.tilemap({ key: 'map_2' })
		const scales = this.map.addTilesetImage('scales')
		const objects = this.map.addTilesetImage('objects')
		this.map.createLayer('scales', scales)

		const targetArr = this.player.targetField.map((row) => row.map((i) => i + 121))
		const targetField = this.map.createBlankLayer('targets', [scales, objects])
		targetField.putTilesAt(targetArr, 1, 1)

		const playerArr = this.player.playerField.map((row) => row.map((i) => i + 121))
		const playerField = this.map.createBlankLayer('ships', [scales, objects])
		playerField.putTilesAt(playerArr, 1, 13)
	}

	sendCoord(data) {
		fetch('https://tebot.netlify.app/.netlify/functions/bot', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				myMark: 'webapp',
				id: tg.initDataUnsafe.query_id,
				result: data
			})
		})
	}

	update() { }
}