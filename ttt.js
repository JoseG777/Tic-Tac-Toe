console.log("Hello, Tic-Tac-Toe!")

Math

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
    if(X_count === 5 && O_count === 4)
    {
        return null
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

//PLAYER CLICK
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

    if(checkWin(turn) === "X" || checkWin(turn) === "O")
    {
        document.getElementById("player").innerHTML = `Player ${turn} wins!`
        return null
    }
    if(checkWin(turn) === "DRAW")
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
            return player
        }
    }
    for(let column = 0; column < 3; column++)
    {
        if
        (board[column + 0] === player && board[column + 3] === player && board[column + 6] === player)
        {
            return player
        }
    }
    if 
    ((board[0] === player && board[4] === player && board[8] === player) || 
    (board[2] === player && board[4] === player && board[6] === player)) 
    {
        return player
    }
    if(checkDraw())
    {
        return "DRAW"
    }
    return null
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

//MINIMAX
function values(player)
{
    if(checkWin(player) === "X")
    {
        return 1
    }
    if(checkWin(player) === "O")
    {
        return -1
    }
    if(checkWin(player) === "DRAW")
    {
        return 0
    }
    return 0
}

let test = ["X", "O", "X",
            "O", "", "O",
            "X", "X", ""]

function possibleActions(board)
{
    let possiblities = new Set()
    for(let i = 0; i < 9; i++)
    {
        if(board[i] == "")
        {
            possiblities.add(i)
        }
    }
    let possiblitiesArray = Array.from(possiblities)
    return possiblitiesArray
}
console.log(possibleActions(test))
test = possibleActions(test)
console.log(test)

for(let i = 0; i < test.length; i++)
{
    console.log(test[i])
}

function result(board, move)
{
    let boardCopy = []
    copyBoard(board, boardCopy)
    if(!possibleActions(board).includes(move))
    {
        throw new Error("Invalid Move")
    }
    else
    {
        boardCopy[move] = playerTurn()
    }
    return boardCopy
}

board = ["X", "O", "X", 
         "O", "", "O", 
         "X", "X", ""]

console.log(result(board, 4))
console.log(result(board, 5))

function minimize(board)
{   
    let optimal = 2
    if(checkWin("X") === "X")
    {
        return values("X")
    }
    if(checkWin("O") === "O")
    {
        return values("O")
    }
    if(checkWin(playerTurn()) === "DRAW")
    {
        return values()
    }
    let arrayOfPossiblities = possibleActions(board)
    for(moves in arrayOfPossiblities)
    {
        optimal = Math.min(optimal, maximize(result(board, arrayOfPossiblities[moves])))
    }
    return optimal
}
console.log(minimize(board))

function maximize(board)
{   
    let optimal = -2
    if(checkWin("X") === "X")
    {
        return values("X")
    }
    if(checkWin("O") === "O")
    {
        return values("O")
    }
    if(checkWin(playerTurn()) === "DRAW")
    {
        return values(playerTurn())
    }
    let arrayOfPossiblities = possibleActions(board)
    for(moves in arrayOfPossiblities)
    {
        optimal = Math.max(optimal, minimize(result(board, arrayOfPossiblities[moves])))
    }
    return optimal
}

function minimax(board)
{
    if(checkWin("X") != null || checkWin("O") != null)
    {
        return null
    }
    else if(playerTurn() === "X")
    {
        let options = []
        for(moves in possibleActions(board))
        {
            options.push([minimize(result(board, moves)), moves])
        }
        options.sort((a, b) => a[0] - b[0])
        return options[0]
    }
    else if(playerTurn() === "O")
    {
        let options = []
        for(moves in possibleActions(board))
        {
            options.push([maximize(result(board, moves)), moves])
        }
        options.sort((a, b) => b[0] - a[0])
        return options[0][1]
    }
}

function copyBoard(original, copy)
{
    for(let i = 0; i < original.length; i++)
    {
        copy[i] = original[i]
    }
}

