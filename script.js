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
}

function GameController()
{
    let players = [];
    let playerTurn = 0;
    let isGameOver = false;
}