import { useEffect } from 'react'

// For tel bot - get data from web app
// if(message?.web_app_data?.data) {
// 	try {
// 		const data = JSON.parse(message?.web_app_data?.data)
// bot.ctx.replay(...)
// 	} catch (error) {
// console.log(error)
// 	}
// }


const tg = window.Telegram.WebApp

function App() {

	useEffect(() => {
		tg.ready()
	}, [])

	const closeHandler = () => {
		tg.close()
	}

	// tg.initDataUnsafe?.user?.username

	const toggleHandler = () => {
		if (tg.MainButton.isVisible) {
			tg.MainButton.hide()
		} else {
			tg.MainButton.show()
		}
	}

	// tg.MainButton.setParams({
	// 	text: ''
	// })

	// tg.onEvent('mainButtonClicked', () => { })
	// tg.offEvent('mainButtonClicked', () => { }) // отписаться от события, удалить слушатель

	// tg.sendMessage('string') // если приложение было открыто через клавиатурную кнопку

	// если приложение было открыто инлайн кнопку или боковую кнопку:
	// через fetch отправить на сервер бота данные и id - tg.initDataUnsafe?.query_id
	// bot.answerWebAppQuery(id, {
	// type: '',
	// ...
	// ...
	// })

	return (
		<>
			<div>hi</div>
			<br />
			<button onClick={closeHandler}>close</button>
			<br />
			<button onClick={toggleHandler}>toggle</button>
			<br />
			<span>{tg.initDataUnsafe?.user?.username}</span>
		</>
	)
}

export default App
