
const BOARD_SIZE = 3;

function createPlayer(name,piece){
    return {name,piece}
}



const gameboard =(function(){
    const board = Array.from({length: 3}, ()=> Array.from({length:3}, ()=> null));
    console.log(board);
    let gameActive= true;
    let currentPlayerIndex =0;
    
    const players = [
        createPlayer("david",'x'),
        createPlayer('minh', 'o')
    ]
    function isGameActive()
    {
        return gameActive;
    }
    function makeMove(row,col)
    {
        if(board[row][col]=== null)
        {
            board[row][col] = players[currentPlayerIndex].piece;
        }
        
    }
    function switchTurn()
    {   
        const playerOne = document.getElementById("playerOne");
        const playerTwo = document.getElementById("playerTwo");
        if(currentPlayerIndex ===0)
            {
                currentPlayerIndex = 1;
                playerOne.classList.remove("active")
                playerTwo.classList.add("active")
            }
        else{
            currentPlayerIndex = 0;
            playerOne.classList.add("active")
            playerTwo.classList.remove("active")
        }
        console.log(currentPlayerIndex)
        
    }
    function checkDiagonal(piece)
    {
        let win = false;
        let count =0;
        for(let i = 0;i<BOARD_SIZE;i++)
        {
            count++;
            if( !(board[i][i] === piece) ) 
            {
                count--;
                continue
            }
            if (count === 3)
            {
                //console.log("you win")
                win = true;
            }

        }

        let size = BOARD_SIZE;
        let count2=0;
        for(let i = 0; i< 3;i++)
        {
            count2++;
            size = size -1;
            // console.log(`(${i},${size}) ${board[i][size]}`)
            if( !(board[i][size] === piece) ) 
            {
                count2--;
                continue
            }
            if (count2 === 3)
            {
                //console.log("you win")
                win = true;
            }
            
            
        }

        if(win)
            {
                return true
            }
            else{ return false}

    }
    function checkRow(piece)
    {
        for(let i = 0;i <BOARD_SIZE;i++)
        {
            let count = 0;
            for(let j=0;j<BOARD_SIZE;j++)
            {
                count++;
                if( !(board[i][j] === piece) ) 
                {
                    count--;
                    continue
                }
                if (count === 3)
                {
                    //console.log("you win")
                    return true;
                }
                
            }
            
        }
        return false;
    }
    function checkCol(piece)
    {
        for(let i =0;i<3;i++)
        {
            let count = 0;
            for(j=0;j<BOARD_SIZE;j++)
            {
                // console.log(`(${j},${i}) ${board[j][i]}`)
                count++;
                    if( !(board[j][i] === piece) ) 
                    {
                        count--;
                        continue
                    }
                    if (count === BOARD_SIZE)
                    {
                        //console.log("you win")
                        return true;
                    }
                    
            }
        }
        return false;
    }
    function checkIfBoardIsFull()
    {
        return !board.some((cell) => cell.includes(null))
    }
    function createBoard()
    {
        
        if (!boardContainer) {
            console.error("Element with id 'game-board' not found.");
            return;
        }
        boardContainer.style.display = 'grid';
        boardContainer.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, 100px)`; // 3 columns of 100px each
        boardContainer.style.gridTemplateRows = `repeat(${BOARD_SIZE}, 100px)`;    // 3 rows of 100px each

        for(let i = 0; i<BOARD_SIZE;i++)
        {
            for(let j=0; j<BOARD_SIZE;j++)
            {
                console.log('tex')
                const squareDiv=document.createElement("div");
                squareDiv.classList.add("square");
                squareDiv.style.width = "100px";
                squareDiv.style.height = "100px";
                squareDiv.style.border = "1px solid";
                boardContainer.appendChild(squareDiv);
            }
        }
    }
    function validateBoard()
    {
        let piece  = players[currentPlayerIndex].piece;
        
        

        if(checkRow(piece) || checkCol(piece) || checkDiagonal(piece))
        {
            gameActive= false;
           
            console.log("You Win!")
            return;
        }
        if(checkIfBoardIsFull())
        {   
            gameActive = false;
            console.log("Tie Game")    
        }
        
    }
    function resetBoard()
    {
        for(let i =0;i<board.length;i++)
            {
                for(let j=0; j< board[i].length;j++)
                    {
                        board[i][j]=null;
                    }
            }

        const squareDiv = document.querySelectorAll('div.square')
        squareDiv.forEach(div=>{
            div.textContent='';
        })
        const playerOne = document.getElementById("playerOne");
        const playerTwo = document.getElementById("playerTwo");
        playerOne.classList.remove('active');
        playerTwo.classList.remove('active');
        gameActive = true;
    }
    function getBoard() {return board}
    function getCurrentPlayer()
    {
            return players[currentPlayerIndex];
    }
    function getPlayers(){
            return players;
    }

    return { 
        gameActive,
        makeMove,
        switchTurn,
        getBoard,
        getCurrentPlayer,
        getPlayers,
        validateBoard,
        createBoard,
        resetBoard,
        isGameActive

    }
})();
const boardContainer = document.getElementById("gameBoard");
const container = document.getElementById("container");
function createPlayerBoard()
{
    const player1Div = document.createElement("div");
    player1Div.id="playerOne";
    player1Div.style.width = "100px";
    player1Div.style.height= "50px";
    player1Div.textContent=gameboard.getPlayers()[0].name;
    container.appendChild(player1Div);

    const player2Div = document.createElement("div");
    player2Div.id = "playerTwo";
    player2Div.style.width = "100px";
    player2Div.style.height= "50px";
    player2Div.textContent=gameboard.getPlayers()[1].name;
    container.appendChild(player2Div);

}

boardContainer.addEventListener('click', function(event) {
    if(!gameboard.isGameActive())
    {
            return;
    }
    if (event.target && event.target.nodeName === 'DIV') {
        const index = Array.from(boardContainer.children).indexOf(event.target);
        const row = Math.floor(index / BOARD_SIZE);
        const col = index % BOARD_SIZE;

        if(row == -1 || col == -1)
            {
                return;
            }
        console.log(`Div clicked at position (${row}, ${col})`);
        if(event.target.textContent == '')
            {
                
                event.target.textContent = gameboard.getCurrentPlayer().piece;
                
            }
        else{
            return
        }
        
        gameboard.makeMove(row,col);
        
        console.log(gameboard.getBoard());
        gameboard.validateBoard()
        gameboard.switchTurn()
        
        
        
    }
});
document.getElementById("resetBtn").addEventListener('click', (e)=>{
    
    gameboard.resetBoard();
    console.log(gameboard.getBoard())
});

createPlayerBoard();
gameboard.createBoard();







