import { Square, SquarePossibleValues } from './components/Square/Square'
import './styles/board.css'

interface BoardProps {
    xIsNext: boolean,
    squares: SquarePossibleValues[],
    onPlay: (squares: SquarePossibleValues[], index: number) => void

}

export function Board({ xIsNext, squares, onPlay }: BoardProps) {
    
    function handleClick(index: number) {
        if(squares[index] || calculateWinner(squares)) {
            return;
        }

        const nextSquares = [...squares];

        if(xIsNext) {
            nextSquares[index] = 'X';
        } else {
            nextSquares[index] = 'O';
        }
        
        onPlay(nextSquares, index);
    }

    const result = calculateWinner(squares);
    let status;

    if(result) {
        status = 'Winner: ' + result.winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
    
    return (
        <>
            <div className='final-message' style={result ?  { backgroundColor: 'green' } : {}}>{status}</div>
            <div className='grid-container'>
                {
                    squares.map((val, i) => {
                        return (
                            <Square 
                                key={i}
                                value={val}
                                tint={result?.combination.includes(i) ? true : false}
                                onSquareClick={() => handleClick(i)}
                            />
                        )
                    })
                }
            </div>
        </>
    )
}

function calculateWinner(squares: SquarePossibleValues[]) {
    const winnerCombinationLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winnerCombinationLines.length; i++) {
        const [a, b, c] = winnerCombinationLines[i];

        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            
            // const combinationWinner = Array(9).fill(null).map((val, i) => {
            //     return [a,b,c].includes(i) ? squares[a] : val;
            // });

            return {
                winner: squares[a],
                combination: [a,b,c]
            }
        }
    }
    return null;
}