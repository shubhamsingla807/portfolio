window.onbeforeunload = function () {
	window.scrollTo(0, 0);
};
let colors = [
	"#39FF71",
	"#A181FF",
	"#A5C93E",
	"#4B6FF0",
	"#FF39B0",
	"#F0CC4B",
	"#3D39FF",
];

window.onload = function () {
	const canvas = document.querySelector("#canvas1");
	const c = canvas.getContext("2d");

	// cursor
	const mouse = {
		x: 0,
		y: 0,
		dx: 0,
		dy: 0,
		r: 40,
	};

	const sizes = {
		width: window.innerWidth,
		height: window.innerHeight,
	};

	window.addEventListener("mousemove", (e) => {
		mouse.x = e.clientX;
		mouse.y = e.clientY;

		let custom = document.getElementById("custom-cursor");
		if (sizes.width > 800) {
			gsap.to(custom, {
				top: e.y - 40,
				left: e.x - 40,
			});
		}
	});

	canvas.width = sizes.width;
	canvas.height = sizes.height;

	let W = canvas.width;
	let H = canvas.height;

	const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

	// sizes
	window.addEventListener("resize", () => {
		sizes.width = window.innerWidth;
		sizes.height = window.innerHeight;

		canvas.width = sizes.width;
		canvas.height = sizes.height;
	});

	class FixedBalls {
		constructor(x, y, r) {
			this.x = x;
			this.y = y;
			this.r = r;
			this.dx = 0;
			this.dy = 0;
		}

		angleFromCenter(cx, cy, mx, my) {
			const mAngle = Math.atan2(mx - cx, -my + cy);
			return mAngle > 0 ? mAngle : Math.PI * 2 + mAngle;
		}

		circlePath(mx, my) {
			let cx = this.x;
			let cy = this.y;
			let r = this.r;
			const dist = Math.hypot(mx - cx, my - cy);
			let path = "";
			if (dist > r && dist < 3 * r) {
				const angle = this.angleFromCenter(cx, cy, mx, my);
				const delta = Math.acos(r / dist);

				const p0x = cx + r * Math.sin(angle - delta);
				const p0y = cy - r * Math.cos(angle - delta);
				const p2x = cx + r * Math.sin(angle + delta);
				const p2y = cy - r * Math.cos(angle + delta);
				const anchorR = dist > r * 2 ? r * 4 - dist : dist;
				const p1x = cx + anchorR * Math.sin(angle);
				const p1y = cy - anchorR * Math.cos(angle);
				path = `M ${p0x},${p0y} Q ${p1x},${p1y} ${p2x},${p2y}`;
			}
			return (
				path +
				`M ${cx},${cy - r} A ${r},${r} 1 1 1 ${cx},${
					cy + r
				} A ${r},${r} 1 1 1 ${cx},${cy - r} Z`
			);
		}
	}

	let balls = [];
	let fixedBalls = [];

	let grav = [0, -0.1];
	let gravity = 0.1;
	let friction = 0.7;

	class Ball {
		constructor(x, y, dx, dy, r) {
			this.x = x;
			this.y = y;
			this.dx = dx;
			this.dy = dy;
			this.r = r;
			this.color = "white";
			this.id = Math.random();
			this.touched = 0;
		}

		draw() {
			c.fillStyle = this.color;
			c.beginPath();
			c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
			c.fill();
		}

		kill() {
			balls = balls.filter((item) => item.id != this.id);

			for (let i = 0; i < this.r; i++) {
				particles.push(
					new Particle(
						this.x,
						this.y,
						Math.random() * 3,
						colors[Math.floor(randomIntFromRange(0, 7))],
						{
							x: (Math.random() - 0.5) * (Math.random() * 4),
							y: (Math.random() - 0.5) * (Math.random() * 4),
						}
					)
				);
			}
		}

		update() {
			if (this.y + this.r + this.dy >= canvas.height) {
				this.dy = -this.dy * friction;
				this.touched += 1;

				if (this.touched > 4) {
					this.kill();
				}
			} else {
				this.dy += gravity;
			}

			if (
				this.x + this.r + this.dx >= canvas.width ||
				this.x - this.r <= 0
			) {
				this.dx = -this.dx;
			}

			this.x += this.dx;
			this.y += this.dy;
			this.dx += grav[0];
			// this.dy -= grav[1];

			this.draw();
		}
	}

	class Particle {
		constructor(x, y, radius, color, velocity) {
			this.x = x;
			this.y = y;
			this.radius = radius;
			this.color = color;
			this.velocity = velocity;
			this.alpha = 1;
		}

		draw() {
			c.save();
			c.beginPath();
			c.globalAlpha = this.alpha;
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			c.fillStyle = this.color;
			c.fill();
			c.restore();
		}

		update() {
			this.draw();
			this.velocity.x *= 0.99;
			this.velocity.y *= 0.99;
			this.x = this.x + this.velocity.x;
			this.y = this.y + this.velocity.y;
			this.alpha = this.alpha - 0.005;
		}
	}

	let particles = [];

	function randomIntFromRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function randomColor(colors) {
		return colors[Math.floor(Math.random() * colors.length)];
	}

	function drawFixedBalls() {
		c.fillStyle = "#fff";
		let circle1 = new FixedBalls(
			sizes.width * 0.78,
			sizes.height * 0.1,
			sizes.width * 0.09
		);
		if (sizes.width < 500) {
			circle1.x = sizes.width * 0.7;
			circle1.y = sizes.height * 0.75;
			circle1.r = sizes.width * 0.16;
		}
		const path1 = circle1.circlePath(mouse.x, mouse.y);

		let circle2 = new FixedBalls(
			sizes.width * 0.9,
			sizes.height * 0.45,
			sizes.width * 0.06
		);
		if (sizes.width < 900) {
			circle2.y = sizes.height * 0.35;
		}
		if (sizes.width < 500) {
			circle2.x = sizes.width * 1;
			circle2.y = sizes.height * 0.18;
			circle2.r = sizes.width * 0.2;
		}
		const path2 = circle2.circlePath(mouse.x, mouse.y);

		let circle3 = new FixedBalls(
			sizes.width * 0.2,
			sizes.height * 0.3,
			sizes.width * 0.09
		);
		if (sizes.width < 900) {
			circle3.y = sizes.height * 0.2;
		}
		const path3 = circle3.circlePath(mouse.x, mouse.y);
		let circle4 = new FixedBalls(
			sizes.width * 0.04,
			sizes.height * 0.8,
			sizes.width * 0.05
		);
		if (sizes.width < 500) {
			circle4.x = sizes.width * 0.04;
			circle4.y = sizes.height * 0.8;
			circle4.r = sizes.width * 0.12;
		}
		const path4 = circle4.circlePath(mouse.x, mouse.y);
		const p1 = new Path2D(path1);
		c.fill(p1);
		const p2 = new Path2D(path2);
		c.fill(p2);
		const p3 = new Path2D(path3);
		c.fill(p3);
		const p4 = new Path2D(path4);
		c.fill(p4);

		if (fixedBalls.length == 0) {
			fixedBalls.push(circle1);
			fixedBalls.push(circle2);
			fixedBalls.push(circle3);
			fixedBalls.push(circle4);
		} else if (fixedBalls[0].x != circle1.x) {
			fixedBalls = [];
			fixedBalls.push(circle1);
			fixedBalls.push(circle2);
			fixedBalls.push(circle3);
			fixedBalls.push(circle4);
		}
	}

	function generateMore() {
		setInterval(() => {
			if (!document.hidden && balls.length < 7) {
				let numberOfBalls = randomIntFromRange(2, 4);
				for (let i = 0; i < numberOfBalls; i++) {
					let radius = randomIntFromRange(10, 30);
					let x = randomIntFromRange(radius, sizes.width);
					let y = -radius;
					let dx = randomIntFromRange(-1, 1);
					let dy = randomIntFromRange(-0.5, 0.5);
					balls.push(new Ball(x, y, dx, dy, radius));
				}
			}
		}, 5000);
	}

	function init() {
		let numberOfBalls = randomIntFromRange(3, 4);
		for (let i = 0; i < numberOfBalls; i++) {
			let radius = randomIntFromRange(10, 30);
			let x = randomIntFromRange(radius, sizes.width);
			let y = -radius;
			let dx = randomIntFromRange(-1, 1);
			let dy = randomIntFromRange(-0.5, 0.5);
			balls.push(new Ball(x, y, dx, dy, radius));
		}
		generateMore();
	}

	function checkCollision(ballA, ballB) {
		let rSum = ballA.r + ballB.r;
		let dx = ballB.x - ballA.x;
		let dy = ballB.y - ballA.y;

		return [
			rSum * rSum > dx * dx + dy * dy,
			rSum - Math.sqrt(dx * dx + dy * dy),
		];
	}

	function resolveCollision(ballA, ballB) {
		let relVel = [ballB.dx - ballA.dx, ballB.dy - ballA.dy];
		let norm = [ballB.x - ballA.x, ballB.y - ballA.y];
		let mag = Math.sqrt(norm[0] * norm[0] + norm[1] * norm[1]);
		norm = [norm[0] / mag, norm[1] / mag];

		let velAlongNorm = relVel[0] * norm[0] + relVel[1] * norm[1];
		if (velAlongNorm > 0) return;

		let bounce = 0.7;
		let j = -(1 + bounce) * velAlongNorm;
		j /= 1 / ballA.r + 1 / ballB.r;

		let impulse = [j * norm[0], j * norm[1]];
		ballA.dx -= (1 / ballA.r) * impulse[0];
		ballA.dy -= (1 / ballA.r) * impulse[1];
	}

	function adjustPositions(ballA, ballB, depth) {
		//Inefficient implementation for now
		const percent = 0.2;
		const slop = 0.01;
		let correction =
			(Math.max(depth - slop, 0) / (1 / ballA.r + 1 / ballB.r)) * percent;

		let norm = [ballB.x - ballA.x, ballB.y - ballA.y];
		let mag = Math.sqrt(norm[0] * norm[0] + norm[1] * norm[1]);
		norm = [norm[0] / mag, norm[1] / mag];
		correction = [correction * norm[0], correction * norm[1]];
		ballA.x -= (1 / ballA.r) * correction[0];
		ballA.y -= (1 / ballA.r) * correction[1];
	}

	let grd = c.createLinearGradient(0, 0, sizes.width, 0);
	grd.addColorStop(0, "#193ad5");
	grd.addColorStop(1, "#120845");

	function animate() {
		c.fillStyle = grd;
		c.fillRect(0, 0, sizes.width, sizes.height);
		drawFixedBalls();

		particles.forEach((particle, index) => {
			if (particle.alpha <= 0) {
				particles.splice(index, 1);
			} else {
				particle.update();
			}
		});

		for (let ball of balls) {
			ball.update();
			for (let ball2 of balls) {
				if (ball !== ball2) {
					let collision = checkCollision(ball, ball2);
					if (collision[0]) {
						adjustPositions(ball, ball2, collision[1]);
						resolveCollision(ball, ball2);
					}
				}
			}
			fixedBalls.forEach((fixedball) => {
				let collision = checkCollision(ball, fixedball);
				if (collision[0]) {
					adjustPositions(ball, fixedball, collision[1]);
					resolveCollision(ball, fixedball);
				}
			});
			// for mouse
			if (sizes.width > 800) {
				let collision = checkCollision(ball, mouse);
				if (collision[0]) {
					adjustPositions(ball, mouse, collision[1]);
					resolveCollision(ball, mouse);
				}
			}
		}
		requestAnimationFrame(animate);
	}

	drawFixedBalls();
	animate();

	function addAnimToMainText() {
		// let line1 = document.getElementsByClassName("line1")[0];
		// let line2 = document.getElementsByClassName("line2")[0];
		// let line3 = document.getElementsByClassName("line3")[0];

		// line2.style["animation-delay"] = "300ms";
		// line3.style["animation-delay"] = "600ms";

		// line1.classList.add("line-animation");
		// line2.classList.add("line-animation");
		// line3.classList.add("line-animation");

		document.getElementById("section2-container").style.display = "block";
	}

	addAnimToMainText();

	setTimeout(() => {
		document.body.style["overflow-y"] = "unset";
		document.body.style.height = "unset";
		init();
	}, 2000);

	//   section2

	function addGrainyEffectToHomePage() {
		let overlay = document.getElementsByClassName("overlay");
		let overlayImage = document.getElementById("overlay-container");
		// for mouse movement
		for (let i = 0; i < overlay.length; i++) {
			overlay[i].addEventListener("click", (e) => {
				window.open(overlay[i].dataset.url, "_top");
			});

			overlay[i].addEventListener("mousemove", (e) => {
				overlayImage.style.display = "block";
				gsap.to(overlayImage, {
					top: e.y - 60,
					left: e.x - 60,
				});
			});

			overlay[i].addEventListener("mouseout", (e) => {
				overlayImage.style.display = "none";
			});
		}

		var options = {
			animate: true,
			patternWidth: 100,
			patternHeight: 193.71,
			grainOpacity: 0.1,
			grainDensity: 1,
			grainWidth: 1,
			grainHeight: 1,
		};
		grained("#section1id", options);
	}
	addGrainyEffectToHomePage();
};
