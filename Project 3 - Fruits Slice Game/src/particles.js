class Particles {
	constructor() {
		this.fps = 45
		this.canvas = null
		this.width = 0
		this.height = 0
		this.stars = 100
	}

	initialize(canvas, elementSize) {
		this.width = elementSize.offsetWidth
		this.height = elementSize.offsetHeight
		this.canvas = canvas
		this.canvas.width = this.width
		this.canvas.height = this.height
	}

	start() {
		var stars = []
		for(let i = 0 ; i < this.stars ; ++i)
			stars[i] = new Star(Math.random() * this.width, Math.random() * this.height, Math.random() * 2 + 1)

		this.stars = stars

		setInterval(() => { this.update() }, 1000 / this.fps)
	}

	update() {
		var ctx = this.canvas.getContext('2d')
		ctx.clearRect(0, 0, this.width, this.height)

		for(let i = 0 ; i < this.stars.length ; ++i) {
			var star = this.stars[i]
			star.x += Math.sin(i)
			star.y += star.yspeed

			if ((star.y > this.height) || (star.x < -star.size || star.x > this.width))
				this.stars[i] = new Star(Math.random() * this.width, 0, Math.random() * 2 + 1)

			ctx.fillRect(star.x, star.y, star.size, star.size)
			ctx.fillStyle = star.colour
		}
	}
}

var hexDigits = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

class Star {
	constructor(x, y, size) {
		this.x = x
		this.y = y
		this.size = size
		this.colour = '#'
		for(let i = 0 ; i < 6 ; ++i) this.colour += hexDigits[Math.floor(Math.random() * 16)]
		this.yspeed = Math.random() * 5 + 1
	}
}
