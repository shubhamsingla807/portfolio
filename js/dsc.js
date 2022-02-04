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
	console.log(scrolled);
	document.getElementById("myBar").style.width = scrolled + "%";
}

function checkVisible(elm) {
	var rect = elm.getBoundingClientRect();
	var viewHeight = Math.max(
		document.documentElement.clientHeight,
		window.innerHeight,
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
	console.log(sections.length);
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
			} else if (i == 7 || i == 8) {
				links[4].style.color = "blue";
			} else if (i == 9 || i == 10) {
				links[5].style.color = "blue";
			} else if (i == 11 || i == 12) {
				links[6].style.color = "blue";
			}
		}
	}
}
