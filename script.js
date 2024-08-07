
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

const player1 = createPlayer('David','x');
const player2 = createPlayer('Minh','y');

console.log(gameboard.getBoard());

gameboard.makeMove(0,0,player1.piece);
gameboard.makeMove(1,1,player1.piece);
gameboard.makeMove(2,2,player1.piece);

gameboard.validateBoard('x')
