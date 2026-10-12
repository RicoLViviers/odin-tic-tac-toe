function Player(name, marker)
{
    return { name, marker }
}

function Gameboard()
{
    this.gameboard = [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
    ]

    this.getBoard = function()
    {
        return this.gameboard;
    }
}

function GameController()
{
    let players = [];
    let playerTurn = 0;
    let isGameOver = false;

    this.startGame = function(player1Name, player2Name)
    {
        players = [
            Player(player1Name, 'X'),
            Player(player2Name, 'O')
        ]

        playerTurn = 0;
        isGameOver = false;
    }
}


let myBoard = new Gameboard();

function DisplayController() {
    this.renderBoard = function() {
        const boardDivs = document.getElementsByClassName("board-square");
        for (let i = 0; i < boardDivs.length; i++) {
            boardDivs[i].textContent = myBoard.gameboard[i];
        }
    }
}

