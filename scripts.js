const gameBoard = (() => {
	const gameArr = new Array(9);
	const gameElem = "gameBoard";
	const winningCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
		];
	return { gameArr, gameElem, winningCombos };
})();

const player = (name, marker, id) => {
	this.id = id;
	this.name = name;
	this.score = 0;
	this.marker = marker;
	return { name, score, marker, id };
};

const closeModals = () => {
	modals.forEach((element) => {
		element.style.display = "none";
	});
	if (gameOver) {
		resetGame();
	}
};

const updateScores = () => {
	const player1Label = document.getElementById("player1Name");
	const player1Score = document.getElementById("player1Score");
	player1Label.innerText = player1.name;
	player1Score.innerText = player1.score;

	const player2Label = document.getElementById("player2Name");
	const player2Score = document.getElementById("player2Score");
	player2Label.innerText = player2.name;
	player2Score.innerText = player2.score;
};

const updateActivePlayer = () => {
	if (activePlayer == player1) {
		activePlayer = player2;
		player2Card.style.border = "5px solid red";
		player1Card.style.border = "1px solid black";
	} else {
		activePlayer = player1;
		player1Card.style.border = "5px solid red";
		player2Card.style.border = "1px solid black";
	}
};

const addClickHandler = (elem) => {
	elem.addEventListener("click", () => {
	  if (elem.innerText == "" && !gameOver) {
		elem.innerText = activePlayer.marker;
		gameBoard.gameArr[elem.id] = activePlayer.marker;
		gameHandler();
	  }
	});
};

const resetGame = () => {
	gameOver = false;
	modal.style.display = "none";
	const cells = Array.from(document.getElementsByTagName("td"));
	cells.forEach((element) => {
		element.innerText = "";
	});
	gameBoard.gameArr = new Array(9);
};

const drawResetButton = (parentElement, text) => {
	const resetButton = document.createElement("button");
	resetButton.innerText = text;
	resetButton.classList.add("button", "reset");
	resetButton.addEventListener("click", () => {
		resetGame();
	});
	parentElement.appendChild(resetButton);
};

const drawBoard = (elemID) => {
	const gameElem = document.getElementById(elemID);
	const table = document.createElement("table");
	table.classList.add("centered", "noselect");
	drawResetButton(gameElem, "Reset");
	gameElem.appendChild(table);

	for (let i = 0; i < gameBoard.gameArr.length / 3; i++) {
		const tr = document.createElement("tr");
		table.appendChild(tr);
		for (let j = 0; j < gameBoard.gameArr.length / 3; j++) {
			const td = document.createElement("td");
			tr.appendChild(td);
			addClickHandler(td);
		}
	}

	const cells = document.getElementsByTagName("td");
	for (let i = 0; i < cells.length; i++) {
		const cell = cells[i];
		cell.id = i;
	}

	const modalContent = document.getElementById("modalContent");
	drawResetButton(modalContent, "Play Again");
	const closeModal = Array.from(document.getElementsByClassName("closeModal"));
	closeModal.forEach((element) => {
		element.addEventListener("click", (event) => {
			event.target.parentElement.style.display = "none";
			closeModals();
		});
	});
};

const checkWin = () => {
	// Check for win
	gameBoard.winningCombos.forEach((combo) => {
		let winArr = [];
		for (let i = 0; i < combo.length; i++) {
			winArr.push(gameBoard.gameArr[combo[i]]);
		}

		if (!winArr.includes(undefined) && winArr.every((item) => item == winArr[0])) {
			gameOver = true;
			winnerName.innerText = activePlayer.name + " wins!";
			activePlayer.score += 1;
			modal.style.display = "block";
			updateScores();
		}

		// Draw condition
		if (!winArr.includes(undefined) && !winArr.every((item) => item == winArr[0]) && !gameBoard.gameArr.includes(undefined)) {
			gameOver = true;
			winnerName.innerText = "Nobody wins!";
			modal.style.display = "block";
		}

		console.log(winArr);
	});
}

const gameHandler = () => {
	winnerName.innerText = "Game in progress...";
	checkWin();
	updateActivePlayer();
	if (useAI) {
		aiPlayer();
	}
};

const aiPlayer = () => {
	const difficulty = "Easy";

	// TO DO: Highlight AI decision process
	let cells = Array.from(document.getElementsByTagName("td"));
	let emptyCells = [];
	for (let i = 0; i < cells.length; i++) {
		if (cells[i].innerText == "") {
			emptyCells.push(i);
		}
	}
	console.log(emptyCells);
	
	if (difficulty == "Easy") {
		let targetCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
		cells[targetCell].innerText = activePlayer.marker;
		gameBoard.gameArr[targetCell] = activePlayer.marker;
	}

	if (difficulty == "Impossible") {
		console.log("I don't know what to do here");
	}

	updateActivePlayer();
	
};

const winnerName = document.getElementById("winnerName");
const modals = Array.from(document.getElementsByClassName("modal"));
modals.forEach((element) => {
	element.addEventListener("click", (event) => {
		if (event.target.classList[0] == "modal") {
			closeModals();
		}
	});
});

let activePlayer;
let gameOver = false;
const useAI = true;

const player1 = player("Player 1", "X", 0);
const player2 = player("Player 2", "O", 1);

const player1Card = document.getElementById("player1");
const player2Card = document.getElementById("player2");
const player1NameChange = document.getElementById("player1NameSelect");
player1NameChange.addEventListener("click", () => {
	let newName = window.prompt("Enter your name:");
	if (newName != "") {
		player1.name = newName;
	}
	updateScores();
});
const player2NameChange = document.getElementById("player2NameSelect");
player2NameChange.addEventListener("click", () => {
	let newName = window.prompt("Enter your name:");
	if (newName != "") {
		player2.name = newName;
	}
	updateScores();
})

window.onload = () => {
	activePlayer = player2;
	if (useAI) {
		activePlayer.name = "Mr Robot";
	}
	resetGame();
	updateActivePlayer();
	updateScores();
	drawBoard(gameBoard.gameElem);
};
