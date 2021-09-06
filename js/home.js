window.onbeforeunload = function () {
	window.scrollTo(0, 0);
};

var tl = new TimelineMax({ onUpdate: updatePercentage });
var tl2 = new TimelineMax();
let controller = new ScrollMagic.Controller();

let sizes = {
	x: window.innerWidth,
	y: window.innerHeight,
};

let points = document
	.getElementsByClassName("shreader-front")[0]
	.getBoundingClientRect();

console.log(points);
let half = {
	x: points.left,
	y: points.top,
};

let xCon = (points.width - 385) / 2 + 30;
let yCon = -20;
let width = 130;

tl.to("#ball3", 1, { top: half.y - yCon, left: half.x + xCon, width: width }); // orange
tl.to(
	"#ball5",
	1,
	{ top: half.y - yCon, left: half.x + xCon + 100, width: width },
	0
); // red
tl.to(
	"#ball4",
	1,
	{ top: half.y - yCon, left: half.x + xCon + 200, width: width },
	0
); // blue
tl.to(
	"#ball1",
	1,
	{ top: half.y - yCon + 120, left: half.x + xCon, width: width },
	0
); // green
tl.to(
	"#ball2",
	1,
	{ top: half.y - yCon + 120, left: half.x + xCon + 100, width: width },
	0
); // yellow
tl.to(
	"#ball6",
	1,
	{ top: half.y - yCon + 120, left: half.x + xCon + 200, width: width },
	0
); // grey

tl.from(".shreader-front", 0.5, { y: 200, opacity: 0 }, 0.5);

tl.to("#main-h1", 0.5, { marginTop: 0 }, 0);
tl.to(".p-wrap p", 1, { y: 0 }, 0.5);
// let tl3 = new TimelineMax();

// tl1.to("header", 1, { top: 0 });

const scene = new ScrollMagic.Scene({
	triggerElement: ".intro",
	triggerHook: "onLeave",
	duration: "100%",
})
	.setPin(".intro")
	.setTween(tl)
	.addTo(controller);

console.log(scene);
let header = document.getElementsByTagName("header")[0];
let options = {
	root: null,
	rootMargin: "100px",
	threshild: 0.05,
};
function addInter() {
	let observer = new IntersectionObserver(touching, options);
	observer.observe(document.getElementById("section2-container"));
	function touching(entries) {
		console.log(entries[0]);
		if (entries[0].isIntersecting && entries[0].intersectionRatio < 0.08) {
			gsap.to(window, { duration: 1.5, scrollTo: "#section2-container" });
		}
	}
}
addInter();
// window.onscroll = function () {
// 	console.log("scrolled", scrollComplete);
// 	if (scrollComplete) {
// 		gsap.to(window, { duration: 1, scrollTo: "#section2-container" });
// 	}
// };

function updatePercentage() {
	tl.progress();
	if (tl.progress() > 0.7) {
		if (header.style.position != "fixed") {
			header.style.position = "fixed";
			header.style.top = "-80px";
			tl2.to("header", 1, { top: 0 });
		}
	}
	// if (tl.progress() == 1) {
	// 	scrollComplete = true;
	// } else {
	// 	scrollComplete = false;
	// }
}

// ball1 = green
// ball2 = yellow
// ball3 = orange
// ball4 = blue
// ball5 = red
// ball6 = grey

let clicked = 0;
window.onload = function () {
	let a = document.getElementById("greeting");
	let ap = a.getBoundingClientRect();
	function addClickToTearMe() {
		let btn = document.getElementById("hitme");
		let shreaderFront =
			document.getElementsByClassName("shreader-front")[0];

		btn.addEventListener("click", (e) => {
			e.preventDefault();
			btn.innerText = "Send Now";
			btn.style.fontSize = "2rem";
			btn.style.fontFamily = "inherit";
			if (clicked == 0) {
				scene.remove();
				document.getElementsByClassName("intro")[0].style.position =
					"initial";

				const node = document.getElementsByClassName(
					"scrollmagic-pin-spacer"
				)[0];
				node.replaceWith(...node.childNodes);

				clicked++;
				let tl1 = new TimelineMax();
				tl1.to(".ball", 0.6, {
					top: half.y - yCon + 60,
					left: half.x + xCon + 100,
				});

				tl1.to("#ball7", 0.1, { opacity: 1 });
				tl1.to(".fade", 1, { opacity: 0 });
				tl1.to(".ball", 0.4, { scale: 0.4 });
				tl1.to("#ball7", 0.8, { opacity: 0 });
				tl1.to(".ball", 0.1, { display: "none" });

				tl1.to("#greeting", 0.4, { opacity: 1 });
				tl1.to("#message-text", 0.4, { opacity: 1 }, "-=.4");
				tl1.to("#user-name", 0.4, { opacity: 1 }, "-=.8");
				document.getElementById("user-name").disabled = false;
				document.getElementById("message-text").disabled = false;
				document.getElementById("message-text").focus();
			} else {
				let data = {
					message: document.getElementById("message-text").value,
					user: document.getElementById("user-name").value,
				};
				if (data.message == "" || data.user == "") {
					return;
				}
				fetch("https://shubham-mail.herokuapp.com/new-message", {
					method: "POST",
					mode: "cors",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					redirect: "follow",
					referrerPolicy: "no-referrer",
					body: JSON.stringify(data),
				})
					.then((response) => {
						console.log(response);
						return response.json();
					})
					.then((data) => {
						console.log("Success:", data);
					})
					.catch((error) => {
						console.error("Error:", error);
					});
			}
		});
	}

	function addGrainyEffectToHomePage() {
		let tl4 = new TimelineMax();
		let overlay = document.getElementsByClassName("overlay");
		let overlayImage = document.getElementById("overlay-container");
		console.log(overlayImage);
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
	}
	addGrainyEffectToHomePage();

	addClickToTearMe();
};
