
const BOARD_SIZE = 3;

function createPlayer(name,piece){
    return {name,piece}
}



const gameboard =(function(){
    const board = Array.from({length: 3}, ()=> Array.from({length:3}, ()=> null));
    console.log(board);
    

    function makeMove(row,col,currentPlayer)
    {
        if(board[row][col]=== null)
        {
            board[row][col] = currentPlayer;
        }
        
    }
    function switchTurn(currentPlayer)
    {   
        
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
    function validateBoard(piece)
    {

        if(checkRow(piece) || checkCol(piece) || checkDiagonal(piece))
        {
            console.log("You Win!")
        }
        
    }
    function getBoard() {return board}
   

    return { 
        
        makeMove,
        getBoard,
        validateBoard
    }
})();
const boardContainer = document.getElementById("gameBoard");
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
            squareDiv.style.width = "100px";
            squareDiv.style.height = "100px";
            squareDiv.style.border = "1px solid";
            boardContainer.appendChild(squareDiv);
        }
    }
}
boardContainer.addEventListener('click', function(event) {
    if (event.target && event.target.nodeName === 'DIV') {
        const index = Array.from(boardContainer.children).indexOf(event.target);
        const row = Math.floor(index / BOARD_SIZE);
        const col = index % BOARD_SIZE;
        console.log(`Div clicked at position (${row}, ${col})`);
        
        event.target.textContent = "x";
        
        gameboard.makeMove(row,col,player1.piece);
        console.log(gameboard.getBoard());
        gameboard.validateBoard('x')
    }
});



createBoard();




const player1 = createPlayer('David','x');
const player2 = createPlayer('Minh','y');

console.log(gameboard.getBoard());

// gameboard.makeMove(0,0,player1.piece);
// gameboard.makeMove(1,1,player1.piece);
// gameboard.makeMove(2,2,player1.piece);


