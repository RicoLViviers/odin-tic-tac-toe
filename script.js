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

    this.checkWinningCondition = function()
    {
        for (const condition of winningConditions) {
            let a = condition[0];
            let b = condition[1];
            let c = condition[2];

            if (
                board.getBoard()[a] !== ' ' && 
                board.getBoard()[a] === board.getBoard()[b] &&
                board.getBoard()[a] === board.getBoard()[c])
                {
                    isGameOver = true;
                }
        }
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

            myController.checkWinningCondition();
        })
    }
}


const displayController = new DisplayController();
displayController.renderBoard();