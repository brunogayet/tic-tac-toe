import { useState } from "react";
import { Board } from "../../Board";
import { SquarePossibleValues } from "../Square/Square";

import './styles.css'

/**
 //TODO
 * [X] For the current move only, show “You are at move #…” instead of a button.
 * [X] Rewrite Board to use two loops to make the squares instead of hardcoding them.
 * [ ] Add a toggle button that lets you sort the moves in either ascending or descending order.
 * [X] When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
 * [X] Display the location for each move in the format (row, col) in the move history list.
 */

export function Game() {

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    const [historyIndex, setHistoryIndex] = useState<number[]>([0]);

    function handlePlay(nextSquares: SquarePossibleValues[], index: number) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setHistoryIndex([...historyIndex, index + 1]);
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    return (
        <div className='game'>
            <div className='game-board'>
                <Board 
                    xIsNext={xIsNext} 
                    squares={currentSquares}
                    onPlay={handlePlay} 
                />
            </div>
            <div className='game-info'>
                <ol>
                    {
                        history.map((_, move) => {
                    
                            return (
                                <li key={move}>
                                    { move === 0 && (
                                        <button onClick={() => jumpTo(move)}>Go to game start</button>
                                    )}

                                    { move > 0 && move !== currentMove && (
                                        <button onClick={() => jumpTo(move)}>{`Go to move #` + move + ` (` + convertNumberToMatrix(historyIndex[move]).join(',') + `)`}</button>
                                    )}

                                    {move > 0 && move === currentMove && (
                                        <span>You are at move {`#` + move + ` (` + convertNumberToMatrix(historyIndex[move]).join(',') + `)`}</span>
                                    )}
                                </li>
                            )
                        })
                    }
                </ol>
            </div>
        </div>
    )
}

function convertNumberToMatrix(n: number): [number, number] {
    const row = n % 3 === 0 ? Math.floor(n / 3) - 1 : Math.floor(n / 3);
    const col = n % 3 === 0 ? Math.floor(n % 3) + 3 : Math.floor(n % 3);
    
    return [row + 1, col];
}