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

const checkAIFirstMove = () => {
	if (!gameOver && useAI && activePlayer == player2) {
		aiPlayer();
	}
};

const closeModals = () => {
	modal.style.display = "none";
	if (gameOver) {
		resetGame();
		checkAIFirstMove();
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

const resetGame = () => {
	gameOver = false;
	closeModals();
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
	for (let i = 0; i < gameBoard.winningCombos.length; i++) {
		let combo = gameBoard.winningCombos[i];
		let winArr = [];
		for (let j = 0; j < combo.length; j++) {
			winArr.push(gameBoard.gameArr[combo[j]])
		}
		if (!winArr.includes(undefined) && winArr.every((item) => item == winArr[0])) {
			console.log(winArr);
			gameOver = true;
			winnerName.innerText = activePlayer.name + " wins!";
			activePlayer.score += 1;
			modal.style.display = "block";
			updateScores();
			return;
		}
	}

	// Draw condition
	if (!gameBoard.gameArr.includes(undefined)) {
		gameOver = true;
		winnerName.innerText = "Nobody wins!";
		modal.style.display = "block";
	}

	updateScores();
	return;
};

const addClickHandler = (elem) => {
	elem.addEventListener("click", () => {
		if (elem.innerText == "" && !gameOver) {
			gameBoard.gameArr[elem.id] = activePlayer.marker;
			elem.innerText = gameBoard.gameArr[elem.id]
			gameHandler();
		}
	});
};

const gameHandler = () => {
	winnerName.innerText = "Game in progress...";
	checkWin();
	
	if (!gameOver) {
		updateActivePlayer();
		if (useAI && activePlayer == player2) {
			aiPlayer();
		}
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
	// console.log(emptyCells);
	
	if (difficulty == "Easy") {
		let targetCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
		cells[targetCell].click();
	}

	if (difficulty == "Impossible") {
		console.log("I don't know what to do here");
	}
};

const winnerName = document.getElementById("winnerName");
const modal = document.getElementById("modal");
modal.addEventListener("click", (event) => {
	if (event.target.classList[0] == "modal") {
		closeModals();
	}
});

let activePlayer;
let gameOver = false;
const aiCheckbox = document.getElementById("aiCheckbox");
let useAI = aiCheckbox.checked;
aiCheckbox.addEventListener("click", () => {
	useAI = !useAI;
	if (!useAI) {
		player2.name = "Player 2";
	}
	if (useAI && activePlayer == player2) {
		aiPlayer();
	}
	updateScores();
});


const player1 = player("Player 1", "X", 0);
const player2 = player("Player 2", "O", 1);

const player1Card = document.getElementById("player1");
const player2Card = document.getElementById("player2");

// Name change
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
});

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
