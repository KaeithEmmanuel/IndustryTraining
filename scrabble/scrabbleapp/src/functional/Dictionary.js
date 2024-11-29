import React, { useEffect, useState } from 'react';
import Trie from './Trie'; 
import './Dictionary.css';

const Dictionary = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [word, setWord] = useState('');
    const [suggestions, setSuggestions] = useState([]); // State for suggestions
    const [trie, setTrie] = useState(null); // Trie instance
    const [selectedIndex, setSelectedIndex] = useState(0); // For keyboard navigation

    // Fetch the .txt file and insert words into the Trie
    useEffect(() => {
        fetch('http://localhost:5000/api/words') // Fetch words from the server
            .then((response) => response.text())
            .then((data) => {
                const wordsArray = data.split('\n').map(word => word.trim()); // Removing spaces or newlines
                const trieInstance = new Trie();
                wordsArray.forEach(word => trieInstance.insert(word)); // Insert words into the Trie
                setTrie(trieInstance); // Set trie to state for future use
                setLoading(false); // Update loading state
            })
            .catch((err) => {
                console.error('Error fetching the file:', err);
                setError('Error loading dictionary');
                setLoading(false);
            });
    }, []);

    // Function to update suggestions based on the prefix typed
    const handleInputChange = (e) => {
        const input = e.target.value;
        setWord(input);

        if (input.length > 0 && trie) {
            const matches = trie.suggest(input); // Get word suggestions based on the prefix
            setSuggestions(matches); // Update suggestions state
            setSelectedIndex(0); // Reset selected index when typing
        } else {
            setSuggestions([]); // Clear suggestions when the input is empty
        }
    };

    // Function to select a suggestion (either by click or auto-fill)
    const handleSuggestionClick = (suggestion) => {
        setWord(suggestion); // Auto-fill the input with the selected suggestion
        setSuggestions([]); // Clear suggestions list
    };

    // Handle keyboard navigation through suggestions
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown' && selectedIndex < suggestions.length - 1) {
            setSelectedIndex(selectedIndex + 1); // Move down the suggestions list
        } else if (e.key === 'ArrowUp' && selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1); // Move up the suggestions list
        } else if (e.key === 'Enter' && suggestions[selectedIndex]) {
            setWord(suggestions[selectedIndex]); // Auto-fill the word with the selected suggestion
            setSuggestions([]); // Clear suggestions list
        }
    };

    const handleSearch = () => {
        if (!word) {
            alert('Please enter a word to search');
            return;
        }
        if (trie.search(word)) {
            alert(`The word "${word}" exists in the dictionary.`);
        } else {
            alert(`The word "${word}" does not exist in the dictionary.`);
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
                            className={selectedIndex === index ? 'highlighted' : ''} // Highlight selected suggestion
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
