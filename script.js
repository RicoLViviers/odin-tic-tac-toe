function Player(name, marker) {
    return { name, marker }
}

function Gameboard() {
    this.gameboard = Array(9).fill(' ');

    return {
        getBoard() {
            return gameboard;
        },

        setMarker(index, marker) {
            if (index < 0 || index >= gameboard.length) {
                return false;
            }

            if (gameboard[index] !== ' ') {
                return false;
            }

            gameboard[index] = marker;
            return true;
        },

        reset() {
            gameboard.fill(' ');
        }
    }

}

function GameController() {
    const board = Gameboard();
    let players = [];
    let playerTurn = 0;
    let isGameOver = false;

    this.startGame = function (player1Name, player2Name) {
        players = [
            Player(player1Name, 'X'),
            Player(player2Name, 'O')
        ]

        playerTurn = 0;
        isGameOver = false;
        board.reset();
    }

    this.getBoard = function () {
        return board.getBoard();
    }

    this.playMove = function (index) {
        if (isGameOver) {
            return false;
        }

        const currentPlayer = players[playerTurn];

        const moveSuccesful = board.setMarker(index, currentPlayer.marker);

        if (!moveSuccesful) {
            return false;
        }

        playerTurn = (playerTurn + 1) % players.length;
        return true;
    }
}


let myController = new GameController();
myController.startGame('Player 1', 'Player 2');

function DisplayController() {
    const boardDivs = document.getElementsByClassName("board-square");


    this.renderBoard = function () {
        const board = myController.getBoard();
        for (let i = 0; i < boardDivs.length; i++) {
            boardDivs[i].textContent = board[i] === ' ' ? '' : board[i];
        }
    }

    for (let i = 0; i < boardDivs.length; i++) {
        boardDivs[i].addEventListener("click", () => {
            const moveSuccesful = myController.playMove(i);

            if (moveSuccesful) {
                this.renderBoard();
            }
        })
    }
}


const displayController = new DisplayController();
displayController.renderBoard();