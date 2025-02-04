import React, { useState } from 'react';
import './Dictionary.css';

const generateRandomLetters = (count = 7) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({ length: count }, () => letters[Math.floor(Math.random() * letters.length)]);
};

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

function Bot(){
    const [letters, setLetters] = useState([]);
    const [combinations, setCombinations] = useState([]);
    const [n, setN] = useState(3);

    const generateLetters = () => {
        const randomLetters = generateRandomLetters();
        setLetters(randomLetters);
        setCombinations([]);
    };

    const findCombinations = () => {
        if (n > 0 && n <= letters.length) {
            setCombinations([...getCombinations(letters, n)]);
        } else {
            alert('Invalid combination length.');
        }
    };

    return (
        <div className="scrabble-container">
            <h2 className="scrabble-title">Scrabble Helper</h2>
            <button className="scrabble-button" onClick={generateLetters}>Generate Random Letters</button>
            <div className="scrabble-letters">
                {letters.length > 0 && <p>Letters: {letters.join(', ')}</p>}
            </div>
            {letters.length > 0 && (
                <>
                    <input
                        type="number"
                        className="scrabble-input"
                        value={n}
                        onChange={(e) => setN(parseInt(e.target.value))}
                        min="1"
                        max={letters.length}
                    />
                    <button className="scrabble-button" onClick={findCombinations}>Find Combinations</button>
                </>
            )}
            {combinations.length > 0 && (
                <div className="scrabble-combinations">
                    <h3>Combinations:</h3>
                    <ul>
                        {combinations.map((combo, index) => (
                            <li key={index}>{combo}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

    );
};

export default Bot;
