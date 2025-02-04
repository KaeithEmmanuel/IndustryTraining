import React, { useEffect, useState } from 'react';
import Trie from './Trie';
import './Dictionary.css';

const Dictionary = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [word, setWord] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [trie, setTrie] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5000/api/words')
            .then((response) => response.text())
            .then((data) => {
                const wordsArray = data.split('\n').map(word => word.trim());
                const trieInstance = new Trie();
                wordsArray.forEach(word => trieInstance.insert(word));
                setTrie(trieInstance);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching the file:', err);
                setError('Error loading dictionary');
                setLoading(false);
            });
    }, []);

    const handleInputChange = (e) => {
        const input = e.target.value;
        setWord(input);

        if (input.length > 0 && trie) {
            const matches = trie.suggest(input);
            setSuggestions(matches);
            setSelectedIndex(0);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setWord(suggestion);
        setSuggestions([]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown' && selectedIndex < suggestions.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        } else if (e.key === 'ArrowUp' && selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        } else if (e.key === 'Enter' && suggestions[selectedIndex]) {
            setWord(suggestions[selectedIndex]);
            setSuggestions([]);
        }
    };

    const handleSearch = () => {
    if (!word) {
        alert('Please enter a word to search');
        return;
    }
    if (trie.search(word)) {
        alert(`The word "${word}" exists in the dictionary.`);
        setSuggestions([]);
    } else {
        alert(`The word "${word}" does not exist in the dictionary.`);
        const nearestWords = trie.findNearestWords(word, 2); // Max distance = 2
        if (nearestWords.length > 0) {
            setSuggestions(nearestWords.slice(0, 5)); // Show top 5 suggestions
        } else {
            setSuggestions([]);
            alert('No similar words found.');
        }
    }
};


    return (
        <div className="dictionary-container">
            <h1>Dictionary App</h1>
            {loading && <p>Loading dictionary...</p>}
            {error && <p>{error}</p>}
            <div className="search-bar">
                <input
                    type="text"
                    value={word}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter a word to search"
                    disabled={loading}
                />
                <button onClick={handleSearch} disabled={loading}>Search Word</button>
            </div>
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <li 
                            key={index} 
                            onClick={() => handleSuggestionClick(suggestion)} 
                            className={selectedIndex === index ? 'highlighted' : ''}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dictionary;
