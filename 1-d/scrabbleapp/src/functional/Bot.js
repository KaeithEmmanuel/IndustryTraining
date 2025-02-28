import React, { useState,useEffect } from 'react';
import Trie from './Trie';
import './Styles.css';

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

function Bot({ board, playerLetters, updateBoard }) {
    const [combinations, setCombinations] = useState([]);
    const [n, setN] = useState(3);
    const [trie, setTrie] = useState(null);

    // Load dictionary into Trie
    useEffect(() => {
        fetch('http://localhost:5000/api/words')
            .then(response => response.text())
            .then(data => {
                const wordsArray = data.split('\n').map(word => word.trim());
                const trieInstance = new Trie();
                wordsArray.forEach(word => trieInstance.insert(word));
                setTrie(trieInstance);
            })
            .catch(err => console.error('Error loading dictionary:', err));
    }, []);

    // Find combinations of letters
    const findCombinations = () => {
        if (n > 0 && n <= playerLetters.length) {
            setCombinations([...getCombinations(playerLetters, n)]);
        } else {
            alert('Invalid combination length.');
        }
    };

    // Suggest the best move
    const suggestBestMove = () => {
        if (!trie) {
            alert('Dictionary is still loading.');
            return;
        }

        let bestWord = '';
        let bestScore = 0;
        let bestPosition = null;

        for (let length = n; length >= 2; length--) {
            const wordOptions = getCombinations(playerLetters, length);
            for (let word of wordOptions) {
                if (trie.search(word.toLowerCase())) {
                    const placement = findBestPlacement(word);
                    if (placement && placement.score > bestScore) {
                        bestWord = word;
                        bestScore = placement.score;
                        bestPosition = placement.position;
                    }
                }
            }
        }

        if (bestWord) {
            alert(`Best Move: Place "${bestWord}" at ${bestPosition.row}, ${bestPosition.col}`);
        } else {
            alert('No valid move found.');
        }
    };

    // Find the best placement for a word
    const findBestPlacement = (word) => {
        let bestScore = 0;
        let bestPosition = null;

        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (!cell) {
                    let score = Math.random() * 10; // Replace with actual scoring logic
                    if (score > bestScore) {
                        bestScore = score;
                        bestPosition = { row: rowIndex, col: colIndex };
                    }
                }
            });
        });

        return bestPosition ? { score: bestScore, position: bestPosition } : null;
    };

    return (
        <div className="bot-container">
            <h2>Bot Assistance</h2>
            <input
                type="number"
                value={n}
                onChange={(e) => setN(parseInt(e.target.value))}
                min="1"
                max={playerLetters.length}
            />
            <button onClick={findCombinations}>Find Combinations</button>
            <button onClick={suggestBestMove}>Suggest Best Move</button>
            {combinations.length > 0 && (
                <div>
                    <h3>Combinations:</h3>
                    <ul className="combinations-list">
                        {combinations.map((combo, index) => (
                            <li key={index}>{combo}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Bot;