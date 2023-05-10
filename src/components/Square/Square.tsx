import './styles.css';

export type SquarePossibleValues = 'X' | 'O' | null;

interface SquareProps {
    value: SquarePossibleValues,
    tint: boolean,
    onSquareClick: () => void
}

export function Square({ value, tint, onSquareClick }: SquareProps) {

    return (
        <button 
            className={tint ? `square winnerSquare` : `square`}
            onClick={onSquareClick}
        >
            {value}
        </button>
    )
}