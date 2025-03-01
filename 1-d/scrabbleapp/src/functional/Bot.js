import React, { useState } from 'react';
import './Styles.css';

function Bot({ board, playerLetters, updateBoard, onSuggestBestMove }) {
    const BOARD_SIZE = 15;
    const [bestMove, setBestMove] = useState(null);

    // Generate all possible combinations of player letters
    const getCombinations = (letters, length, prefix = '', results = new Set()) => {
        if (prefix.length === length) {
            results.add(prefix);
            return;
        }
        letters.forEach((letter, index) => {
            getCombinations([...letters.slice(0, index), ...letters.slice(index + 1)], length, prefix + letter, results);
        });
        return results;
    };

    // Find the best move based on the board and player letters
    const suggestBestMove = () => {
        if (!playerLetters || playerLetters.length === 0) {
            alert('No letters available to suggest a move.');
            return;
        }

        let bestWord = '';
        let bestScore = 0;
        let bestPosition = null;
        let bestDirection = 'horizontal';

        // Check all possible word lengths
        for (let length = playerLetters.length; length >= 2; length--) {
            const wordOptions = getCombinations(playerLetters, length);

            // Check each word option
            for (let word of wordOptions) {
                // Check horizontal placement
                for (let row = 0; row < BOARD_SIZE; row++) {
                    for (let col = 0; col <= BOARD_SIZE - length; col++) {
                        let canPlace = true;
                        for (let i = 0; i < length; i++) {
                            if (board[row][col + i] !== '') {
                                canPlace = false;
                                break;
                            }
                        }
                        if (canPlace) {
                            const score = calculateScore(word, row, col, 'horizontal');
                            if (score > bestScore) {
                                bestWord = word;
                                bestScore = score;
                                bestPosition = { row, col };
                                bestDirection = 'horizontal';
                            }
                        }
                    }
                }

                // Check vertical placement
                for (let col = 0; col < BOARD_SIZE; col++) {
                    for (let row = 0; row <= BOARD_SIZE - length; row++) {
                        let canPlace = true;
                        for (let i = 0; i < length; i++) {
                            if (board[row + i][col] !== '') {
                                canPlace = false;
                                break;
                            }
                        }
                        if (canPlace) {
                            const score = calculateScore(word, row, col, 'vertical');
                            if (score > bestScore) {
                                bestWord = word;
                                bestScore = score;
                                bestPosition = { row, col };
                                bestDirection = 'vertical';
                            }
                        }
                    }
                }
            }
        }

        if (bestWord) {
            setBestMove({ word: bestWord, position: bestPosition, direction: bestDirection });
            if (onSuggestBestMove) {
                onSuggestBestMove(bestWord, bestPosition, bestDirection);
            }
        } else {
            alert('No valid move found.');
        }
    };

    // Calculate the score for a word placement
    const calculateScore = (word, row, col, direction) => {
        // Simple scoring logic: score = word length + random bonus
        let score = word.length + Math.random() * 5;
        return score;
    };

    return (
        <div className="bot-container">
            <h2>Bot Assistance</h2>
            <button onClick={suggestBestMove}>Suggest Best Move</button>
            {bestMove && (
                <div className="best-move">
                    <h3>Best Move:</h3>
                    <p>Word: {bestMove.word}</p>
                    <p>Position: Row {bestMove.position.row}, Column {bestMove.position.col}</p>
                    <p>Direction: {bestMove.direction}</p>
                </div>
            )}
        </div>
    );
}

export default Bot;