class TrieNode {
    constructor() {
        this.children = {}; // Object to store child nodes
        this.isEndOfWord = false; // Marks the end of a valid word
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode(); // Root node of the Trie
    }

    // Insert a word into the Trie
    insert(word) {
        word=word.toLowerCase();
        let currentNode = this.root;
        for (const char of word.toLowerCase()) {
            if (!currentNode.children[char]) {
                currentNode.children[char] = new TrieNode();
            }
            currentNode = currentNode.children[char];
        }
        currentNode.isEndOfWord = true;
    }

    // Check if a word exists in the Trie
    search(word) {
        word=word.toLowerCase();
        let currentNode = this.root;
        for (const char of word.toLowerCase()) {
            if (!currentNode.children[char]) {
                return false;
            }
            currentNode = currentNode.children[char];
        }
        return currentNode.isEndOfWord;
    }

    // Check if any word starts with a given prefix
    startsWith(prefix) {
        prefix=prefix.toLowerCase();
        let currentNode = this.root;
        for (const char of prefix.toLowerCase()) {
            if (!currentNode.children[char]) {
                return false;
            }
            currentNode = currentNode.children[char];
        }
        return true;
    }

    // Get suggestions for a given prefix
    suggest(prefix) {
        prefix=prefix.toLowerCase();
        let currentNode = this.root;
        const suggestions = [];

        for (const char of prefix.toLowerCase()) {
            if (!currentNode.children[char]) {
                return suggestions;
            }
            currentNode = currentNode.children[char];
        }

        this.collectWords(currentNode, prefix.toLowerCase(), suggestions);
        return suggestions;
    }

    // Helper function to collect words from a given node
    collectWords(node, prefix, suggestions) {
        prefix=prefix.toLowerCase();  
        if (node.isEndOfWord) {
            suggestions.push(prefix);
        }
        for (const char in node.children) {
            this.collectWords(node.children[char], prefix + char, suggestions);
        }
    }

    // Find nearest words using Levenshtein distance
    findNearestWords(inputWord, maxDistance = 2) {
        const results = [];

        const dfs = (node, prefix, dpPrevious) => {
            const m = inputWord.length;
            const n = prefix.length;

            // Compute current row based on previous row
            const dpCurrent = Array(m + 1).fill(0);
            dpCurrent[0] = n;
            for (let i = 1; i <= m; i++) {
                const cost = inputWord[i - 1] === prefix[n - 1] ? 0 : 1;
                dpCurrent[i] = Math.min(
                    dpPrevious[i - 1] + cost, // Substitution
                    dpPrevious[i] + 1,       // Deletion
                    dpCurrent[i - 1] + 1     // Insertion
                );
            }

            // If the current node is a word and within max distance, add to results
            if (node.isEndOfWord && dpCurrent[m] <= maxDistance) {
                results.push({ word: prefix, distance: dpCurrent[m], frequency: node.frequency });
            }

            // Prune: Stop exploring paths where minimum distance exceeds maxDistance
            if (Math.min(...dpCurrent) > maxDistance) return;

            // Recursively traverse child nodes
            for (const char in node.children) {
                dfs(node.children[char], prefix + char, dpCurrent);
            }
        };

        // Initialize the DP array for the root
        const dpInit = Array(inputWord.length + 1).fill(0).map((_, i) => i);
        dfs(this.root, '', dpInit);

        // Sort results by distance, then by frequency (higher is better)
        results.sort((a, b) =>
            a.distance - b.distance || b.frequency - a.frequency
        );
        return results.map(res => res.word);
    }
}

export default Trie;
