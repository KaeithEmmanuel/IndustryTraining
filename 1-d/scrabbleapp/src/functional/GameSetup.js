import React, { useState } from 'react';
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
    const [playerLetters, setPlayerLetters] = useState(generateRandomLetters());
    const [word, setWord] = useState('');
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [direction, setDirection] = useState('horizontal'); // 'horizontal' or 'vertical'
    const [validationResult, setValidationResult] = useState(null);
    const [suggestions, setSuggestions] = useState([]);

    // Refresh player letters
    const refreshLetters = () => {
        setPlayerLetters(generateRandomLetters());
    };

    // Validate and place the word on the board
    const placeWord = (isValid, suggestions = []) => {
        if (!isValid) {
            if (suggestions.length > 0) {
                alert(`Invalid word. Did you mean: ${suggestions.join(', ')}?`);
            } else {
                alert('Invalid word. No suggestions available.');
            }
            return;
        }

        const newBoard = board.map(row => [...row]);
        let canPlaceWord = true;

        if (direction === 'horizontal') {
            for (let i = 0; i < word.length; i++) {
                if (newBoard[x+i][y] !== '') {
                    canPlaceWord = false;
                    break;
                }
            }
            if (canPlaceWord) {
                for (let i = 0; i < word.length; i++) {
                    newBoard[x+i][y] = word[i];
                }
            }
        } else if (direction === 'vertical') {
            for (let i = 0; i < word.length; i++) {
                if (newBoard[x][y+i] !== '') {
                    canPlaceWord = false;
                    break;
                }
            }
            if (canPlaceWord) {
                for (let i = 0; i < word.length; i++) {
                    newBoard[x][y+i] = word[i];
                }
            }
        }

        if (!canPlaceWord) {
            alert('Cannot place word here. Cells are already occupied.');
            return;
        }

        setBoard(newBoard);

        // Remove used letters from player's tokens
        const usedLetters = word.split('');
        const newPlayerLetters = playerLetters.filter(letter => {
            const index = usedLetters.indexOf(letter);
            if (index !== -1) {
                usedLetters.splice(index, 1); // Remove the letter from the used list
                return false; // Exclude this letter from the new player letters
            }
            return true;
        });

        setPlayerLetters(newPlayerLetters);

        // Refresh tokens if empty
        if (newPlayerLetters.length === 0) {
            refreshLetters();
        }

        // Reset form
        setWord('');
        setX(0);
        setY(0);
        setDirection('horizontal');
        setValidationResult(null);
        setSuggestions([]);
    };

        // Inside GameSetup.js
    const handleSuggestBestMove = (word, position, direction) => {
        setWord(word);
        setX(position.col);
        setY(position.row);
        setDirection(direction);
        alert(`Bot suggests: Place "${word}" at row ${position.row}, column ${position.col} (${direction}).`);
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
                                    <div key={colIndex} className="cell">
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
                                <div key={index} className="letter">
                                    {letter}
                                </div>
                            ))}
                        </div>
                        <button onClick={refreshLetters}>Refresh Letters</button>
                    </div>

                    <div className="word-input">
                        <h3>Place a Word</h3>
                        <input
                            type="text"
                            value={word}
                            onChange={(e) => setWord(e.target.value.toUpperCase())}
                            placeholder="Enter a word"
                        />
                        <div className="coordinate-input">
                            <label>
                                X:
                                <input
                                    type="number"
                                    value={x}
                                    onChange={(e) => setX(parseInt(e.target.value))}
                                    min="0"
                                    max={BOARD_SIZE - 1}
                                />
                            </label>
                            <label>
                                Y:
                                <input
                                    type="number"
                                    value={y}
                                    onChange={(e) => setY(parseInt(e.target.value))}
                                    min="0"
                                    max={BOARD_SIZE - 1}
                                />
                            </label>
                        </div>
                        <div className="direction-input">
                            <label>
                                Direction:
                                <select
                                    value={direction}
                                    onChange={(e) => setDirection(e.target.value)}
                                >
                                    <option value="horizontal">Horizontal</option>
                                    <option value="vertical">Vertical</option>
                                </select>
                            </label>
                        </div>
                        <Dictionary
                            word={word}
                            onWordCheck={(word, isValid, suggestions) => {
                                setValidationResult(isValid);
                                setSuggestions(suggestions);
                            }}
                        />
                        <button onClick={() => placeWord(validationResult, suggestions)}>Place Word</button>
                    </div>

                    <Bot
                        board={board}
                        playerLetters={playerLetters}
                        updateBoard={placeWord}
                        onSuggestBestMove={handleSuggestBestMove}
                    />
                </div>
            </div>
        </div>
    );
}

export default GameSetup;