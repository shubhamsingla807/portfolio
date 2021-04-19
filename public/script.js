// window.onload = function () {
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// cursor
const cursor = {
	x: 0,
	y: 0,
};
window.addEventListener("mousemove", (e) => {
	cursor.x = e.clientX / sizes.width - 0.5;
	cursor.y = e.clientY / sizes.height - 0.5;
});

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

canvas.width = sizes.width;
canvas.height = sizes.height;

let gravity = 1;
let friction = 0.9;
const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// sizes
window.addEventListener("resize", () => {
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// c.fillStyle = "#193ad5";
	// c.fillRect(0, 0, sizes.width, sizes.height);
	// drawFixedBalls();
	canvas.width = sizes.width;
	canvas.height = sizes.height;
});

window.addEventListener("dblclick", (e) => {
	const fullscreenElement =
		document.fullscreenElement || document.webkitFullscreenElement;

	if (!fullscreenElement) {
		if (canvas.requestFullscreen) {
			canvas.requestFullscreen();
		} else if (canvas.webkitFequestFullscreen) {
			canvas.webkitFequestFullscreen;
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
});

class FixedBalls {
	constructor(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
	}

	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	}
}

let ballArray = [];
let fixedBalls = [];

class Ball {
	constructor(x, y, radius, color, dx, dy) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.dy = dy;
		this.dx = dx;
		this.touched = 0;
		this.id = Math.random();
	}

	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	}

	kill() {
		this.radius = 0;
		ballArray = ballArray.filter((item) => item.id != this.id);
		console.log("in kill", ballArray.length);
	}

	update() {
		if (this.y + this.radius + this.dy >= canvas.height) {
			this.dy = -this.dy * friction;
			this.touched += 1;
		} else {
			this.dy += gravity;
		}

		if (
			this.x + this.radius + this.dx >= canvas.width ||
			this.x - this.radius <= 0
		) {
			this.dx = -this.dx;
		}

		if (this.dx > 3) {
			this.dx = randomIntFromRange(-2, 2);
			console.log(this.dx, this.dy);
		}

		this.x += this.dx;
		this.y += this.dy;

		if (this.touched == 150) {
			setTimeout(() => {
				console.log("ordered to kill", this.touched);
				this.kill();
			}, 500);
		}

		this.draw();
	}
}

function randomIntFromRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}

function drawFixedBalls() {
	let circle1 = new FixedBalls(
		sizes.width * 0.78,
		sizes.height * 0.1,
		sizes.width * 0.09,
		"white"
	);
	let circle2 = new FixedBalls(
		sizes.width * 0.9,
		sizes.height * 0.45,
		sizes.width * 0.06,
		"white"
	);
	let circle3 = new FixedBalls(
		sizes.width * 0.1,
		sizes.height * 0.3,
		sizes.width * 0.04,
		"white"
	);
	let circle4 = new FixedBalls(
		sizes.width * 0.04,
		sizes.height * 0.8,
		sizes.width * 0.07,
		"white"
	);

	circle1.draw();
	circle2.draw();
	circle3.draw();
	circle4.draw();
	fixedBalls.push(circle1);
	fixedBalls.push(circle2);
	fixedBalls.push(circle3);
	fixedBalls.push(circle4);
}

function init() {
	setInterval(() => {
		let radius = randomIntFromRange(20, 40);
		let x = randomIntFromRange(radius, sizes.width);
		let y = randomIntFromRange(radius, sizes.height / 2);
		let dx = randomIntFromRange(-2, 2);
		let dy = randomIntFromRange(-2, 2);
		let color = randomColor(colors);
		ballArray.push(new Ball(x, y, radius, color, dx, dy));
	}, 1500);
	for (let i = 0; i < 8; i++) {
		let radius = randomIntFromRange(20, 40);
		let x = randomIntFromRange(radius, sizes.width);
		let y = randomIntFromRange(radius, sizes.height / 2);
		let dx = randomIntFromRange(-2, 2);
		let dy = randomIntFromRange(-2, 2);
		let color = randomColor(colors);
		ballArray.push(new Ball(x, y, radius, color, dx, dy));
	}
}

let animationId;
const tick = () => {
	animationId = window.requestAnimationFrame(tick);

	c.fillStyle = "#193ad5";
	c.fillRect(0, 0, sizes.width, sizes.height);
	drawFixedBalls();

	ballArray.forEach((ball) => {
		ball.update();

		fixedBalls.forEach((fixedBall) => {
			const dist = Math.hypot(ball.x - fixedBall.x, ball.y - fixedBall.y);

			if (
				dist - ball.radius - fixedBall.radius <= 5 &&
				dist - ball.radius - fixedBall.radius >= -ball.radius
			) {
				ball.dy = -ball.dy * friction;
				// ball.dx = -ball.dx;
				let bx = ball.x;
				let by = ball.y;
				let fx = fixedBall.x;
				let fy = fixedBall.y;

				let thita = -Math.atan2(fx - bx, by - fy);
				ball.touched += 1;
				ball.dx = thita;
			} else if (dist - ball.radius - fixedBall.radius < -ball.radius) {
				ball.kill();
			}
		});
	});
};

init();
drawFixedBalls();
tick();
