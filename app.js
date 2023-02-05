const startBtnNode = document.querySelector(".js-start");
const screensNode = document.querySelectorAll(".js-screen");
const timeListNode = document.querySelector(".js-time-list");
const timeElemNode = document.querySelector(".js-time");
const boardNode = document.querySelector(".js-board");
const colors = [
	"	#FF0000",
	"	#FF8000",
	"	#FFFF00",
	"	#80FF00",
	"	#00FF00",
	"	#00FF80",
	"	#00FFFF",
	"	#0080FF",
	"	#0000FF",
	"	#8000FF",
	"	#FF00FF",
	"	#FF0080",
];

let time = 0;
let score = 0;

startBtnNode.addEventListener("click", (event) => {
	event.preventDefault();
	screensNode[0].classList.add("up");
});

timeListNode.addEventListener("click", (event) => {
	if (event.target.classList.contains("time-btn")) {
		time = parseInt(event.target.getAttribute("data-time"));
		screensNode[1].classList.add("up");
		startGame();
	}
});

if (window.screen.width > 500) {
	boardNode.addEventListener("click", (event) => {
		if (event.target.classList.contains("circle")) {
			score++;
			event.target.remove();
			createRandomСircle();
		}
	});
} else {
	boardNode.addEventListener("touchstart", (event) => {
		if (event.target.classList.contains("circle")) {
			score++;
			event.target.remove();
			createRandomСircle();
		}
	});
}

function startGame() {
	setInterval(decreaseTime, 1000);
	createRandomСircle();
	setTime(time);
}

function decreaseTime() {
	if (time === 0) {
		finishGame();
	} else {
		let currentTime = --time;
		if (currentTime < 10) {
			currentTime = `0${currentTime}`;
		}
		setTime(currentTime);
	}
}

function setTime(value) {
	timeElemNode.innerHTML = `00:${value}`;
}

function finishGame() {
	// timeElemNode.parentNode.remove();
	timeElemNode.parentNode.classList.add("hide");
	boardNode.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
}

function createRandomСircle() {
	const circleNode = document.createElement("div");
	const size = getRandomSize(10, 60);
	const { width, height } = boardNode.getBoundingClientRect();
	const x = getRandomSize(0, width - size);
	const y = getRandomSize(0, height - size);

	circleNode.classList.add("circle");
	circleNode.style.backgroundColor = getRandomColor();
	circleNode.style.width = `${size}px`;
	circleNode.style.height = `${size}px`;
	circleNode.style.top = `${y}px`;
	circleNode.style.left = `${x}px`;

	boardNode.append(circleNode);
}

function getRandomSize(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
/////////////////////////////////////////////////////////////////////////////////

function getRandomColor() {
	const index = Math.floor(Math.random() * colors.length);
	return colors[index];
}
