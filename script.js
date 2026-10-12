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

    startGame = function(player1Name, player2Name)
    {
        players = [
            Player(player1Name, 'X'),
            Player(player2Name, 'O')
        ]

        playerTurn = 0;
        isGameOver = false;
    }
}