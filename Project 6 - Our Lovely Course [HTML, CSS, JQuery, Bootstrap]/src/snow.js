class SnowField {
	constructor() {
		this.fps = 30
		this.canvas = null
		this.width = 0
		this.height = 0
		this.snow = 250
		this.fps = 1000 / this.fps
		this.snowParticles = []
	}

	initialize(canvas) {
		this.width = window.innerWidth
		this.height = window.innerHeight

		window.addEventListener('resize', () => {
			this.width = window.innerWidth
			this.height = window.innerHeight
			this.canvas.width = this.width
			this.canvas.height = this.height
			this.update()
		})

		this.canvas = document.getElementById(canvas)
		this.canvas.width = this.width
		this.canvas.height = this.height
	}

	start() {
		for (let i = 0 ; i < this.snow ; ++i )
			this.snowParticles[i] = new Snow(Math.random() * this.width, Math.random() * this.height)

		setInterval(() => { this.update() }, this.fps)
	}

	update() {
		var ctx = this.canvas.getContext('2d')
		ctx.clearRect(0, 0, this.width, this.height)

		for (let i = 0 ; i < this.snow ; ++i) {
			var snow = this.snowParticles[i]
			snow.x += snow.xSpeed
			snow.y += snow.ySpeed

			if ((snow.y > this.height) || (snow.x < -snow.size || snow.x > this.width))
				this.snowParticles[i] = new Snow(Math.random() * this.width, 0)

			ctx.fillStyle = `rgba(255, 255, 255, ${this.height / (snow.y * 2)})`

			ctx.beginPath()
			ctx.arc(snow.x, snow.y, snow.size, 3.1, 3)
			ctx.fill()
		}
	}
}

class Snow {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.size = Math.random() * 1.5 + 0.5

		this.ySpeed = Math.random() * 5 + 1
		this.xSpeed = Math.random() * 5 + 1
		if (Math.random() < 0.5) this.xSpeed *= -1
	}
}
