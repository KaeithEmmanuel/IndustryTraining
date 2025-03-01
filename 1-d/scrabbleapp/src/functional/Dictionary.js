import React, { useState, useEffect } from 'react';
import Trie from './Trie';
import './Styles.css';

function Dictionary({ word, onWordCheck }) {
    const [trie, setTrie] = useState(null);
    const [isValid, setIsValid] = useState(null);
    const [suggestions, setSuggestions] = useState([]);

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

    useEffect(() => {
        if (trie && word) {
            const lowerWord = word.toLowerCase();
            const valid = trie.search(lowerWord);
            setIsValid(valid);
            let suggestions = valid ? [] : trie.findNearestWords(lowerWord, 5).slice(0, 5); // Get up to 5 nearest words
            setSuggestions(suggestions);
            if (onWordCheck) onWordCheck(word, valid, suggestions);
        }
    }, [word, trie, onWordCheck]);

    return (
        <div className="dictionary-container">
            <h2>Dictionary Checker</h2>
            {isValid !== null && (
                <p className={isValid ? "valid" : "invalid"}>
                    {isValid ? "Valid Word ✅" : "Invalid ❌"}
                </p>
            )}

            {!isValid && suggestions.length > 0 && (
                <div className="recommendations-container">
                    <h3>Did you mean?</h3>
                    <div className="recommendation-list">
                        {suggestions.map((rec, index) => (
                            <span key={index} className="recommendation-item">
                                {rec}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dictionary;