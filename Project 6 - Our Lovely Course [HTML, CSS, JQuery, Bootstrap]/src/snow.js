class SnowField {
	constructor() {
		this.fps = 30
		this.canvas = null
		this.width = 0
		this.height = 0
		this.snow = 200
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

			for (let i = 0 ; i < this.snow ; ++i)
				this.snowParticles[i] = new Snow(Math.random() * this.width, Math.random() * this.height, Math.random() * 2 + 1)

			this.update()
		})

		this.canvas = document.getElementById(canvas)
		this.canvas.width = this.width
		this.canvas.height = this.height
	}

	start() {
		for (let i = 0 ; i < this.snow ; ++i )
			this.snowParticles[i] = new Snow(Math.random() * this.width, Math.random() * this.height)

		setInterval(() => { this.update() }, 1000 / this.fps)
	}

	update() {
		var ctx = this.canvas.getContext('2d')
		ctx.clearRect(0, 0, this.width, this.height)

		for (let i = 0 ; i < this.snow ; ++i) {
			var snow = this.snowParticles[i]
			snow.x += Math.sin(i)
			snow.y += snow.yspeed

			if ((snow.y > this.height) || (snow.x < -snow.size || snow.x > this.width))
				this.snowParticles[i] = new Snow(Math.random() * this.width, 0)

			ctx.fillStyle = `rgba(255, 255, 255, ${this.height / (snow.y * 2)})`
			ctx.fillRect(snow.x, snow.y, snow.size, snow.size)
		}
	}
}

class Snow {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.size = Math.random() * 2 + 1
		this.yspeed = Math.random() * 5 + 1
	}
}
