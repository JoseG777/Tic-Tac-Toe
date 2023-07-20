console.log("Hello, Tic-Tac-Toe!")

let containers = document.getElementsByClassName("container")
let board = ["", "", "", "", "", "", "", "", ""]

//BEGIN GAME
document.getElementById("player").hidden = true
document.getElementById("restart").hidden = true

document.getElementById("start").onclick = function()
{
    document.getElementById("player").hidden = false
    document.getElementById("restart").hidden = false
    document.getElementById("start").hidden = true
}


document.getElementById("restart").onclick = function()
{
    const boxes = document.querySelectorAll('.container')
    boxes.forEach((box) => 
    {
        box.textContent = ""
    })
    document.getElementById("player").innerHTML = "X's turn"
}

function updateBoard()
{
    for(let i = 0; i < containers.length; i++)
    {
        board[i] = containers[i].innerHTML
    }
}

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
    if (X_count === O_count) 
    {
        return "X"
    }
    else
    {
        return "O"
    }
}


function playerClick(element)
{   
    let box = element.getAttribute("id")
    if(document.getElementById(box).innerHTML === "")
    {
    let turn = playerTurn()
    if(turn === "X")
    {   
        document.getElementById(box).innerHTML = "X"
        document.getElementById("player").innerHTML = "O's turn"
    }
    if(turn === "O")
    {
        document.getElementById(box).innerHTML = "O"
        document.getElementById("player").innerHTML = "X's turn"
    }
    updateBoard()
    if(checkWin(turn))
    {
        document.getElementById("player").innerHTML = `Player ${turn} wins!`
        return null
    }
    if(checkDraw())
    {
        document.getElementById("player").innerHTML = "Draw!"
        return null
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
            return true
        }
    }
    for(let column = 0; column < 3; column++)
    {
        if
        (board[column + 0] === player && board[column + 3] === player && board[column + 6] === player)
        {
            return true
        }
    }
    if 
    ((board[0] === player && board[4] === player && board[8] === player) || 
    (board[2] === player && board[4] === player && board[6] === player)) 
    {
        return true
    }
}

function checkDraw()
{
    for(let i = 0; i < containers.length; i++)
    {
        if(containers[i].innerHTML === "")
        {
            return false
        }
    }
    return true
}








