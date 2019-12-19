class SnowField {
	constructor() {
		this.fps = 40
		this.canvas = null ;
		this.width = 0
		this.height = 0
		this.stars = 200
		this.intervalId = 0
	}

	initialize(canvas) {
		this.width = window.innerWidth
		this.height = window.innerHeight

		window.addEventListener('resize', () => {
			this.width = window.innerWidth
			this.height = window.innerHeight
			this.canvas.width = this.width
			this.canvas.height = this.height

			for (let i = 0 ; i < this.stars ; ++i)
				this.stars[i] = new Snow(Math.random() * this.width, Math.random() * this.height, Math.random() * 2 + 1)

			this.draw()
		})

		this.canvas = document.getElementById(canvas)
		this.canvas.width = this.width
		this.canvas.height = this.height
	}

	start() {
		var stars = []
		for (let i = 0 ; i < this.stars ; ++i )
			stars[i] = new Snow(Math.random() * this.width, Math.random() * this.height, Math.random() * 2 + 1)

		this.stars = stars

		this.intervalId = setInterval(() => {
			this.update()
			this.draw()
		}, 1000 / this.fps)
	}

	update() {
		for (var i = 0 ; i < this.stars.length ; ++i) {
			var star = this.stars[i]
			star.x += Math.sin(i)
			star.y += star.yspeed

			if ((star.y > this.height) || (star.x < -star.size || star.x > this.width))
				this.stars[i] = new Snow(Math.random() * this.width, 0, Math.random() * 3 + 1)
		}
	}

	draw() {
		var ctx = this.canvas.getContext('2d')
		ctx.clearRect(0, 0, this.width, this.height)

		for(let i = 0 ; i < this.stars.length ; ++i) {
			var star = this.stars[i]
			ctx.fillStyle = '#fff'
			ctx.fillRect(star.x, star.y, star.size, star.size)
		}
	}
}

class Snow {
	constructor(x, y, size) {
		this.x = x
		this.y = y
		this.size = size
		this.yspeed = Math.random() * 10 + 1
	}
}
