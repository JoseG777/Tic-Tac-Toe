console.log("Hello, Tic-Tac-Toe!")

let containers = document.getElementsByClassName("container");
let board = ["", "", "", "", "", "", "", "", ""];

//BEGIN GAME
document.getElementById("player").hidden = true;
document.getElementById("restart").hidden = true;

document.getElementById("start").onclick = function()
{
    document.getElementById("player").hidden = false;
    document.getElementById("restart").hidden = false;
    document.getElementById("start").hidden = true;
};


document.getElementById("restart").onclick = function()
{
    const boxes = document.querySelectorAll('.container');
    boxes.forEach((box) => 
    {
        box.textContent = ""
    });
    document.getElementById("player").innerHTML = "X's turn";
}

function updateBoard()
{
    for(let i = 0; i < containers.length; i++)
    {
        board[i] = containers[i].innerHTML;
    }
};

//DETERMINE TURNS
function playerTurn() {
    let X_count = 0;
    let O_count = 0;
    for (let i = 0; i < containers.length; i++) {
        if (containers[i].innerHTML === "X") {
            X_count += 1;
        }
        if (containers[i].innerHTML === "O") {
            O_count += 1;
        }
    }
    if(X_count === 5 && O_count === 4)
    {
        return null;
    }
    if (X_count === O_count) 
    {
        return "X";
    }
    else
    {
        return "O";
    }
};

//PLAYER CLICK
function playerClick(element)
{   
    if(document.getElementById("player").innerHTML != "AI wins!" && document.getElementById("start").hidden === true)
    {

    let box = element.getAttribute("id");

    //PLAYER TURN
    if(document.getElementById(box).innerHTML === "")
    {
        let turn = playerTurn();
        if(turn === "X")
        {   
            document.getElementById(box).innerHTML = "X";
            document.getElementById("player").innerHTML = "O's turn";
        }   
        if(turn === "O")
        {
            document.getElementById(box).innerHTML = "O";
            document.getElementById("player").innerHTML = "X's turn";
        }

        updateBoard()

        if(checkWin(turn) === "X" || checkWin(turn) === "O")
        {
            document.getElementById("player").innerHTML = `Player ${turn} wins!`;
            return null;
        }
        if(checkDraw() === true)
        {
            document.getElementById("player").innerHTML = "Draw!";
            return null;
        }

        //AI TURN
        if (turn === "X") 
        { 
            setTimeout(function(){
            let aiMove = minimaxDepth(board);
            document.getElementById(`box${aiMove}`).innerHTML = "O";
            document.getElementById("player").innerHTML = "X's turn";

            updateBoard();

            if (checkWin("O") === "O") 
            {
                document.getElementById("player").innerHTML = "AI wins!";
            } 
            else if (checkDraw()) 
            {
                document.getElementById("player").innerHTML = "Draw!";
            }
            }, 1500);
        }
        
    }
    }
}

//TERMINAL
function checkWin(player)
{   
    for(let row = 0; row < 3; row++)
    {
        if(board[row * 3] === player && board[row * 3 + 1] === player && board[row * 3 + 2] === player)
        {
            return player;
        }
    }
    for(let column = 0; column < 3; column++)
    {
        if
        (board[column + 0] === player && board[column + 3] === player && board[column + 6] === player)
        {
            return player;
        }
    }
    if 
    ((board[0] === player && board[4] === player && board[8] === player) || 
    (board[2] === player && board[4] === player && board[6] === player)) 
    {
        return player;
    }
}

function checkDraw()
{
    for(let i = 0; i < containers.length; i++)
    {
        if(containers[i].innerHTML === "")
        {
            return false;
        }
    }
    if(checkWin("X") != "X" && checkWin("O") != "O")
    {
        return true;
    }
}

//MINIMAX

//TURN
function playerTurnAi(board) {
    let X_count = 0;
    let O_count = 0;
    for (let i = 0; i < 9; i++) 
    {
    if (board[i] === "X") 
        {
            X_count += 1;
        }
    if (board[i] === "O") 
        {
            O_count += 1;
        }
    }
    if(X_count === 5 && O_count === 4)
    {
        return null;
    }
    if (X_count === O_count) 
    {
        return "X";
    }
    else
    {
        return "O";
    }
}

//TERMINAL CONDITIONS
function checkDrawAi(board)
{   
    for(let i = 0; i < 9; i++)
    {
        if(board[i] === "")
        {
            return false;
        }
    }
    if(checkWinAi("X", board) != "X" && checkWinAi("O", board) != "O")
    {
        return true;
    }
    return false;
}

function checkWinAi(player, board)
{   
    for(let row = 0; row < 3; row++)
    {
        if(board[row * 3] === player && board[row * 3 + 1] === player && board[row * 3 + 2] === player)
        {
            return player;
        }
    }
    for(let column = 0; column < 3; column++)
    {
        if(board[column + 0] === player && board[column + 3] === player && board[column + 6] === player)
        {
            return player;
        }
    }
    if 
    ((board[0] === player && board[4] === player && board[8] === player) || 
    (board[2] === player && board[4] === player && board[6] === player)) 
    {
        return player;
    }
    return null;
};

function terminal(board)
{
    if(checkWinAi("X", board) === "X" || checkWinAi("O", board) === "O"|| checkDrawAi(board))
    {
        return true;
    }
    return false;
}

//MINIMAX
function values(board)
{
    if(checkWinAi("X",board) === "X")
    {
        return 1;
    }
    if(checkWinAi("O", board) === "O")
    {
        return -1;
    }
    return 0;
};

function possibleActions(board)
{
    let possiblities = new Set()
    if(terminal(board))
    {
        return [];
    }
    for(let i = 0; i < 9; i++)
    {
        if(board[i] == "")
        {
            possiblities.add(i);
        }
    }
    let possiblitiesArray = Array.from(possiblities);
    return possiblitiesArray;
};

function result(board, move)
{
    let boardCopy = [];
    copyBoard(board, boardCopy);
    if(!possibleActions(board).includes(move))
    {
        //console.log("NOT POSSIBLE")
        return null;
    }
    else
    {   
        boardCopy[move] = playerTurnAi(board);
    }
    return boardCopy;
};

function minimize(board)
{   
    let optimal = 2;
    if(terminal(board))
    {
        return values(board);
    }
    let arrayOfPossiblities = possibleActions(board)
    for(let moves = 0; moves < arrayOfPossiblities.length; moves++)
    {   
        let value = maximize(result(board, arrayOfPossiblities[moves]));
        optimal = Math.min(optimal, value);
    }
    return optimal;
}

function maximize(board)
{   
    let optimal = -2;
    if(terminal(board))
    {
        return values(board);
    }
  
    let arrayOfPossiblities = possibleActions(board)
    for(let moves = 0; moves < arrayOfPossiblities.length; moves++)
    {   
        let value = minimize(result(board, arrayOfPossiblities[moves]));
        optimal = Math.max(optimal, value);
    }
    return optimal;
};

function minimaxDepth(board)
{
    if (terminal(board))
    {
        return null;
    }
    else if (playerTurnAi(board) === "X")
    {
        let max = -2;
        let bestMove = null;
        let depth = 4;
        
        let aop = possibleActions(board);

        for (let i = 0; i < depth; i++)
        {
            let move = aop[i];
            if(move === undefined)
            {
                return bestMove;
            }
            let value = minimize(result(board, move));
            if (value > max)
            {
                max = value;
                bestMove = move;
            }
        }
        return bestMove;
    }
    else if (playerTurnAi(board) === "O")
    {
        let min = 2;
        let bestMove = null;
        let depth = 4;

        let aop = possibleActions(board);

        for (let i = 0; i < depth; i++)
        {
            let move = aop[i];

            if(move === undefined)
            {
                return bestMove;
            }

            let value = maximize(result(board, move));
            if (value < min)
            {
                min = value;
                bestMove = move;
            }
        }
        return bestMove;
    }
};

function copyBoard(original, copy)
{
    for(let i = 0; i < original.length; i++)
    {
        copy[i] = original[i];
    }
};
