const LIVES = 5

var playing = false, score = 0, lives = LIVES, touched = false, step, action, speed = 1, streak = 0, sliced = 0, fruit = ''
var fruitFiles = 'apple apple1 berries grape grapes1 orange plum tomato peach pineapple raspberry strawberry'.split(' ')

$(() => {
	var restartEnabled = false
	var theme = 'dark'
	var playAreaHeight = $('#playArea').height()
	var pieces = [], piecesLength = 4
	for(let i = 4 ; i < (piecesLength * 4 + 4) ; i += 4) pieces.push(i)

	$('.hearts').css('width', LIVES * 22)

	for(let i = 0 ; i < LIVES ; ++i) $('#lives').append(`<img src="assets/images/heart.png" id="heart${i}" class="heart"/>`)
	for(let i of fruitFiles) $('#fruitsContainer').append(`<img src="assets/images/${i}.svg" id=${i} class="fruits"/>`)

	function restart() {
		restartEnabled = true

		if (playing) {
			$('#container').css('filter', 'blur(6px)')
			playing = false

			$('#dialog').dialog({
				buttons: {
					'Cancel': () => { $('#dialog').dialog('close') },
					'Ok': () => { location.reload() }
				},

				close: () => {
					restartEnabled = false
					playing = true
					$('#container').css('filter', 'blur(0px)')
				}
			})
		}

		else {
			$('#container').css('filter', 'blur(0px)')
			restartEnabled = false
			playing = true
			score = 0
			lives = LIVES
			speed = 1
			sliced = 0

			$('#gameOver').hide('puff', 500)
			$('#particles').hide('puff', 1000)
			$('#scoreVal').html('0')
			$('#startButton').html('Reload')
			$('#instruction').html('Cut the Fruits')

			for(let i = 0 ; i < LIVES ; ++i) $(`#heart${i}`).show('pulsate', {times: 10}, 350)

			startAction()
		}
	}

	$('#startButton').click(() => { console.log('hi') ; if (!restartEnabled) restart() })

	document.getElementById('bodydiv').addEventListener('keydown', event => {
		if (event.keyCode === 27) {
			if (!restartEnabled)
				restart()
			else
				$('#dialog').dialog('close')
		}
	})

	var effects = 'toggle pulsate fade '
	$('#fruitsContainer').mouseover(function() {
		if (fruit.position().top + 99 > 0 && playing) {
			score += ++streak
			sliced += 1
			touched = true

			fruit.css('filter', 'blur(4px)')
			fruit.hide('explode', {pieces: pieces[Math.floor(Math.random() * (piecesLength))] }, 175)

			document.getElementById('swoosh').cloneNode(true).play()
			$('#scoreVal').html(score)
			$('#scoreVal').toggle('fade', 150)
			$('#scoreVal').toggle('highlight', {color: '#ffaaff'}, 150)

			setTimeout(function() {
				clearInterval(action)
				startAction()
			}, 200)
		}
	})

	function startAction() {
		sampleFruit()
		$('#lives').show('explode', {pieces: 12}, 450)

		fruit.css({
		 	'left': Math.round(Math.random() * 428),
		 	'top': Math.round(Math.random() * -50) - 105
		})

		speed += 0.05
		step = Math.floor(Math.random() * 3) + speed

		action = setInterval(
			() => {
				if (playing)
					fruit.css('top', fruit.position().top + step)

				if (!touched && fruit.position().top > playAreaHeight) {
					streak = 0
					touched = false
					document.getElementById('missed').cloneNode(true).play()

					if (lives > 1) {
						lives -= 1
						step = Math.floor(Math.random() * 5) + speed

						fruit.css({
							'left': Math.round(Math.random() * 428),
							'top': Math.round(Math.random() * -50) -100,
						})

						$(`#heart${lives}`).hide('fade', 200)
						sampleFruit()
					}

					else {
						playing = false

						$('#particles').show('puff', 1000)
						$('#gameOver').show('pulsate', {times: 12}, 500)
						$('#gameOver').html(`<p>Game Over</p><p>You have Sliced ${sliced} Fruits</p>`)
						$('#instruction').html('Press Restart Game to Play Again')
						$('#startButton').html('Restart Game')
						$(`#heart${0}`).hide('pulsate', 200)
						$('#lives').hide('explode', {pieces: 12}, 250)

						clearInterval(action)
						fruit.hide()
					}
				}
			}, 10)
	}

	function sampleFruit() {
		touched = false
		fruit = $('#' + fruitFiles[Math.floor(Math.random() * fruitFiles.length)])
		fruit.css('filter', 'blur(0px)')
		fruit.show()
	}

	// Theming
	$('#dark').click(() => {
		theme = 'dark'
		swapBulb()
	})

	$('#light').click(() => {
		theme = 'light'
		swapBulb()
	})

	function swapBulb() {
		if (theme === 'dark') {
			$('#light').css('rotate', '180deg')
			$('#dark').css('rotate', '180deg')

			setTimeout(() => {
				$('#light').show('fade', 250)
				$('#dark').hide('fade', 250)
				$('html').css('background-color', '#222')

				$('.theming').css('background-color', '#222')
				$('.theming').css('color', '#fff')
				$('#container').css('background-color', '#5555ff')
				$('#gameOver').css('background-color', '#ff5555')
			}, 250)


			setTimeout(() => {
				$('#light').css('rotate', '0deg')
				$('#dark').css('rotate', '0deg')
			}, 750)
		}

		else {
			$('#light').css('rotate', '180deg')
			$('#dark').css('rotate', '180deg')

			setTimeout(() => {
				$('#dark').show('fade', 250)
				$('#light').hide('fade', 250)
				$('html').css('background-color', '#fff')

				$('.theming').css('background-color', '#fff')
				$('.theming').css('color', '#000')
				$('#container').css('background-color', '#8EDBFF')
				$('#gameOver').css('background-color', '#55f')
			}, 250)

			setTimeout(() => {
				$('#light').css('rotate', '0deg')
				$('#dark').css('rotate', '360deg')
			}, 750)
		}
	}

	swapBulb()
})
