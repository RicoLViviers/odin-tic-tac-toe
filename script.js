function Player(name, marker) {
    return { name, marker };
}

function Gameboard() {
    const gameboard = Array(9).fill(" ");

    return {
        getBoard() {
            return [...gameboard];
        },

        setMarker(index, marker) {
            if (
                index < 0 ||
                index >= gameboard.length ||
                !Number.isInteger(index) ||
                gameboard[index] !== " "
            ) {
                return false;
            }

            gameboard[index] = marker;
            return true;
        },

        reset() {
            gameboard.fill(" ");
        }
    };
}

function GameController() {
    const board = Gameboard();
    let players = [];
    let playerTurn = 0;
    let isGameOver = false;
    let gameResult = null;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    this.startGame = function (player1Name, player2Name) {
        players = [
            Player(player1Name, "X"),
            Player(player2Name, "O")
        ];

        playerTurn = 0;
        isGameOver = false;
        gameResult = null;
        board.reset();
    };

    this.getBoard = function () {
        return board.getBoard();
    };

    this.getCurrentPlayer = function () {
        return players[playerTurn] ?? null;
    };

    this.getResult = function () {
        return gameResult;
    };

    this.playMove = function (index) {
        if (isGameOver || players.length !== 2) {
            return false;
        }

        const currentPlayer = players[playerTurn];

        if (!board.setMarker(index, currentPlayer.marker)) {
            return false;
        }

        const winner = this.checkWinningCondition();

        if (winner) {
            isGameOver = true;
            gameResult = {
                type: "win",
                player: currentPlayer
            };
            return true;
        }

        if (!board.getBoard().includes(" ")) {
            isGameOver = true;
            gameResult = { type: "draw" };
            return true;
        }

        playerTurn = (playerTurn + 1) % players.length;
        return true;
    };

    this.checkWinningCondition = function () {
        const currentBoard = board.getBoard();

        for (const [a, b, c] of winningConditions) {
            if (
                currentBoard[a] !== " " &&
                currentBoard[a] === currentBoard[b] &&
                currentBoard[a] === currentBoard[c]
            ) {
                return currentBoard[a];
            }
        }

        return null;
    };

    this.getPlayerNames = function () {
        return players.map(player => player.name);
    };
}

const boardDivs = document.querySelectorAll(".board-square");
const firstPlayerName = document.getElementById("first-player-name");
const secondPlayerName = document.getElementById("second-player-name");
const startButton = document.getElementById("start-button");
const startNewGameButton = document.getElementById("start-new");
const playAgainButton = document.getElementById("play-again");
const nameForm = document.getElementById("name-form");

const statusDisplay = document.createElement("p");
statusDisplay.id = "game-status";
document.body.insertBefore(statusDisplay, document.querySelector(".game-board"));

const myController = new GameController();

function DisplayController(controller) {
    this.renderBoard = function () {
        const board = controller.getBoard();

        boardDivs.forEach((square, index) => {
            square.textContent = board[index] === " " ? "" : board[index];
        });
    };

    this.updateStatus = function () {
        const result = controller.getResult();

        if (result?.type === "win") {
            statusDisplay.textContent =
                `${result.player.name} wins!`;
        } else if (result?.type === "draw") {
            statusDisplay.textContent = "It's a draw!";
        } else {
            const player = controller.getCurrentPlayer();

            statusDisplay.textContent = player
                ? `${player.name}'s turn (${player.marker})`
                : "Enter player names to start";
        }
    };

    this.refresh = function () {
        this.renderBoard();
        this.updateStatus();
    };
}

const displayController = new DisplayController(myController);

boardDivs.forEach((square, index) => {
    square.addEventListener("click", () => {
        if (myController.playMove(index)) {
            displayController.refresh();
        }
    });
});

nameForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const plr1Name = firstPlayerName.value.trim();
    const plr2Name = secondPlayerName.value.trim();

    if (!plr1Name || !plr2Name) {
        statusDisplay.textContent = "Please enter both player names.";
        return;
    }

    myController.startGame(plr1Name, plr2Name);

    nameForm.style.display = "none";
    displayController.refresh();
});

startNewGameButton.addEventListener("click", () => {
    nameForm.style.display = "flex";
    firstPlayerName.value = "";
    secondPlayerName.value = "";
    statusDisplay.textContent = "Enter the new player names";
});

playAgainButton.addEventListener("click", () => {
    const currentPlayer = myController.getCurrentPlayer();

    const names = myController.getPlayerNames();

    if (!names) {
        nameForm.style.display = "flex";
        return;
    }

    myController.startGame(names[0], names[1]);
    displayController.refresh();
});

displayController.refresh();