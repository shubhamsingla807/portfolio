var slideIndex = 1;
// showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
	showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
	showSlides((slideIndex = n));
}

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	var dots = document.getElementsByClassName("dot");
	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex - 1].style.display = "flex";
	dots[slideIndex - 1].className += " active";
}

window.onscroll = function () {
	myFunction();
	zoomImages();
};

function myFunction() {
	let winScroll =
		document.body.scrollTop || document.documentElement.scrollTop;
	let height =
		document.documentElement.scrollHeight -
		document.documentElement.clientHeight;
	let scrolled = (winScroll / height) * 100;
	document.getElementById("myBar").style.width = scrolled + "%";
}

function zoomImages() {
	let images = document.getElementsByTagName("img");
	console.log(images.length);
	for (let i = 0; i < images.length; i++) {
		images[i].addEventListener("click", () => {
			const viewer = new Viewer(images[i], {
				navbar: false,
				title: false,
				toolbar: {
					zoomIn: 4,
					zoomOut: 4,
					oneToOne: 0,
					reset: 0,
					prev: 0,
					play: {
						show: 4,
						size: "large",
					},
					next: 0,
					rotateLeft: 0,
					rotateRight: 0,
					flipHorizontal: 0,
					flipVertical: 0,
				},
			});
		});
	}
	// const gallery = new Viewer(document.querySelectorAll("img"));
}
