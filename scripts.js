const modal = document.getElementById("myModal");
const closeSpan = document.getElementById("closeModal");
const winnerName = document.getElementById("winnerName")

closeSpan.onclick = () => {
    modal.style.display = "none";
    resetGame();
}

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
        resetGame();
    }
}

const gameBoard = (() => {
    const gameArr = new Array(9);
    const gameElem = "gameBoard";
    const winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ];
    return {
        gameArr,
        gameElem,
        winningCombos
    }
})();

const player = (name, marker) => {
    this.name = name;
    this.score = 0;
    this.marker = marker;
    return {name, score, marker};
}

const gameHandler = () => {
    // TO DO: Draw logic
    const player1Card = document.getElementById("player1");
    const player2Card = document.getElementById("player2");
    gameBoard.winningCombos.forEach(combo => {
        let winArr = []
        for (let i = 0; i < combo.length; i++) {
            winArr.push(gameBoard.gameArr[combo[i]]);
        }

        if (!winArr.includes(undefined)) {
            let isEqual = winArr.every(value => value == winArr[0]);
            if (isEqual) {
                modal.style.display = "block";
                winnerName.innerText = activePlayer.name;
                console.log("The winner is... " + activePlayer.name);
                activePlayer.score += 1;
                console.table(activePlayer)
            }
        }
        console.log(winArr);
    });
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

const drawBoard = (elemID) => {
    const gameElem = document.getElementById(elemID);
    const resetButton = document.createElement("button");
    const table = document.createElement("table");

    resetButton.innerText = "Reset";
    resetButton.classList.add("button", "reset");
    resetButton.addEventListener("click", () => {
        resetGame();
    });
    
    table.classList.add("centered", "noselect");
    
    
    gameElem.appendChild(resetButton);
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
        const size = "100px";
        cell.id = i;
        cell.style.width = size;
        cell.style.height = size;
    }
}

window.onload = drawBoard(gameBoard.gameElem);

let activePlayer;
const player1 = player("Player 1", "X");
const player2 = player("Player 2", "O");
activePlayer = player2;
gameHandler();