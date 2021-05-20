var slideIndex = 1;
showSlides(slideIndex);

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
	updateNavigator();
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

function checkVisible(elm) {
	var rect = elm.getBoundingClientRect();
	var viewHeight = Math.max(
		document.documentElement.clientHeight,
		window.innerHeight
	);
	return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}
let curr = "";

function removePrevColor() {
	let links = document.getElementById("navigator").getElementsByTagName("a");

	for (let i = 0; i < links.length; i++) {
		links[i].style.color = "black";
	}
}

function updateNavigator() {
	let links = document.getElementById("navigator").getElementsByTagName("a");
	let sections = document.getElementsByTagName("section");
	for (let i = 0; i < sections.length; i++) {
		if (checkVisible(sections[i])) {
			removePrevColor();
			if (i == 0) {
				links[0].style.color = "blue";
			} else if (i == 1 || i == 2) {
				links[1].style.color = "blue";
			} else if (i == 3 || i == 4) {
				links[2].style.color = "blue";
			} else if (i == 5 || i == 6) {
				links[3].style.color = "blue";
			} else if (i == 7 || i == 8 || i == 9) {
				links[4].style.color = "blue";
			} else if (i == 10 || i == 11) {
				links[5].style.color = "blue";
			}
		}
	}
}
