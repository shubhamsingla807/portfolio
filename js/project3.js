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
