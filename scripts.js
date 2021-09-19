const gameBoard = (() => {
    const gameArr = new Array(9);
    const gameElem = "gameBoard";
    const winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    return {gameArr, gameElem, winningCombos};
})();

const player = (name, marker) => {
    this.name = name;
    this.score = 0;
    this.marker = marker;
    return {name, score, marker};
}

const updateScores = () => {
    const player1Label = document.getElementById("player1Name");
    const player1Score = document.getElementById("player1Score");
    player1Label.innerText = player1.name;
    player1Score.innerHTML = player1.score;
    
    const player2Label = document.getElementById("player2Name");
    const player2Score = document.getElementById("player2Score");
    player2Label.innerText = player2.name;
    player2Score.innerHTML = player2.score;
    activePlayer = player2;
}

const gameHandler = () => {
    winnerName.innerText = "Game in progress...";
    const player1Card = document.getElementById("player1");
    const player2Card = document.getElementById("player2");
    
    
    gameBoard.winningCombos.forEach(combo => {
        let winArr = [];
        for (let i = 0; i < combo.length; i++) {
            winArr.push(gameBoard.gameArr[combo[i]]);
        }

        if (!winArr.includes(undefined) && winArr.every((item) => item == winArr[0])) {
            winnerName.innerText = activePlayer.name + " wins!";
            activePlayer.score += 1;
            console.table(activePlayer);
            modal.style.display = "block";
            updateScores();
        }

        if (!winArr.includes(undefined) && !winArr.every((item) => item == winArr[0]) && !gameBoard.gameArr.includes(undefined)) {
            winnerName.innerText = "Nobody Wins!"
        }
        console.log(winArr);
    });

    if (useAI) {
        aiPlayer();
    }

    if (activePlayer == player1) {
        activePlayer = player2;
        player2Card.style.border = "5px solid red";
        player1Card.style.border = "1px solid black";
    } else {
        activePlayer = player1;
        player1Card.style.border = "5px solid red";
        player2Card.style.border = "1px solid black";
    }
}

const addClickHandler = (elem) => {
    elem.addEventListener("click", () => {
        if (elem.innerText == "") {
            elem.innerText = activePlayer.marker;
            gameBoard.gameArr[elem.id] = activePlayer.marker;
            gameHandler();
        }
    });
}

const resetGame = () => {
    modal.style.display = "none";
    const cells = Array.from(document.getElementsByTagName("td"));
    cells.forEach(element => {
        element.innerText = "";
    });
    gameBoard.gameArr = new Array(9);
}

const drawResetButton = (parentElement) => {
    const resetButton = document.createElement("button");
    resetButton.innerText = "Reset";
    resetButton.classList.add("button", "reset");
    resetButton.addEventListener("click", () => {
        resetGame();
    });
    parentElement.appendChild(resetButton);
}

const drawBoard = (elemID) => {
    const gameElem = document.getElementById(elemID);
    const table = document.createElement("table");
    table.classList.add("centered", "noselect");
    drawResetButton(gameElem);
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

    const playerList = Array.from((document.getElementsByClassName("player")));
    playerList.forEach(element => {
        const nameButton = document.createElement("button");
        nameButton.classList.add("button", "btnSmall");
        nameButton.innerText = "Change name";
        nameButton.addEventListener("click", () => {
            console.log("Change player name");
        });
        // element.appendChild(nameButton);
    });
    
}

const aiPlayer = () => {
    if (useAI) {
        console.log("WE ARE THE ROBOTS");
    }
};

const winnerName = document.getElementById("winnerName");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");
closeModal.onclick = () => {
    modal.style.display = "none";
    resetGame();
};

drawResetButton(modalContent);

const useAI = true;

window.onload = drawBoard(gameBoard.gameElem);

let activePlayer;
const player1 = player("Player 1", "X");
const player2 = player("Player 2", "O");
gameHandler();
updateScores();