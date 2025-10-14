'use client';

import Square from "./Square";
import { useState } from 'react';

export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    function handleClick(i){
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? 'X' : 'O';
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],      
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let [a, b, c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    const winner = calculateWinner(squares);
    let status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;
    const restartGame = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    }

    return (
    
        <div style={{ textAlign: 'center' }}>
            <div className="mb-4 text-xl font-bold">{status}</div>
            <div className="grid grid-cols-3 gap-2">
                {squares.map((value, index) => (
                    <Square key={index} value={value} onClick={() => handleClick(index)} />
                ))}
            </div>
            <button onClick={restartGame} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"> 
                重新开始游戏
            </button>
        </div>
       
    );


    
}
