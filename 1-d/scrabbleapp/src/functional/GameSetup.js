import React, { useState, useEffect } from 'react';
import Bot from './Bot';
import Dictionary from './Dictionary';
import './Styles.css';

const BOARD_SIZE = 15;
const LETTER_COUNT = 7; // Number of letters a player can hold

const createEmptyBoard = () => Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(''));

const generateRandomLetters = (count = LETTER_COUNT) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({ length: count }, () => letters[Math.floor(Math.random() * letters.length)]);
};

function GameSetup() {
    const [board, setBoard] = useState(createEmptyBoard());
    const [playerLetters, setPlayerLetters] = useState([]);
    const [selectedLetters, setSelectedLetters] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState(null);

    // Initialize player letters
    useEffect(() => {
        setPlayerLetters(generateRandomLetters());
    }, []);

    // Update the board with a word at a specific position
    const updateBoard = (word, position) => {
        const newBoard = board.map(row => [...row]);
        for (let i = 0; i < word.length; i++) {
            newBoard[position.row][position.col + i] = word[i];
        }
        setBoard(newBoard);
    };

    // Handle cell click to select position
    const handleCellClick = (row, col) => {
        setSelectedPosition({ row, col });
    };

    // Handle letter click to select/deselect letters
    const handleLetterClick = (letter) => {
        if (selectedLetters.includes(letter)) {
            setSelectedLetters(selectedLetters.filter(l => l !== letter));
        } else {
            setSelectedLetters([...selectedLetters, letter]);
        }
    };

    // Place the selected word on the board
    const placeWord = () => {
        if (selectedLetters.length === 0 || !selectedPosition) {
            alert('Please select letters and a position on the board.');
            return;
        }

        const word = selectedLetters.join('');
        updateBoard(word, selectedPosition);
        setPlayerLetters(playerLetters.filter(l => !selectedLetters.includes(l)));
        setSelectedLetters([]);
        setSelectedPosition(null);
    };

    // Refresh player letters
    const refreshLetters = () => {
        setPlayerLetters(generateRandomLetters());
    };

    return (
        <div className="main-container">
            <h1>Scrabble Game</h1>
            <div className="content-container">
                <div className="board-container">
                    <div className="board">
                        {board.map((row, rowIndex) => (
                            <div key={rowIndex} className="row">
                                {row.map((cell, colIndex) => (
                                    <div
                                        key={colIndex}
                                        className={`cell ${selectedPosition?.row === rowIndex && selectedPosition?.col === colIndex ? 'selected' : ''}`}
                                        onClick={() => handleCellClick(rowIndex, colIndex)}
                                    >
                                        {cell}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="controls-container">
                    <div className="player-letters">
                        <h3>Your Letters:</h3>
                        <div className="letters-list">
                            {playerLetters.map((letter, index) => (
                                <div
                                    key={index}
                                    className={`letter ${selectedLetters.includes(letter) ? 'selected' : ''}`}
                                    onClick={() => handleLetterClick(letter)}
                                >
                                    {letter}
                                </div>
                            ))}
                        </div>
                        <button onClick={refreshLetters}>Refresh Letters</button>
                    </div>
                    <button onClick={placeWord}>Place Word</button>
                    <Bot board={board} playerLetters={playerLetters} updateBoard={updateBoard} />
                    <Dictionary />
                </div>
            </div>
        </div>
    );
}

export default GameSetup;