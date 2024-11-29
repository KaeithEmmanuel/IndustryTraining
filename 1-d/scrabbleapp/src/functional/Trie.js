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
        let currentNode = this.root;
        for (const char of word) {
            if (!currentNode.children[char]) {
                currentNode.children[char] = new TrieNode();
            }
            currentNode = currentNode.children[char];
        }
        currentNode.isEndOfWord = true;
    }

    // Check if a word exists in the Trie
    search(word) {
        let word1=word.toLowerCase();
        let currentNode = this.root;
        for (const char of word1) {
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
        for (const char of prefix) {
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

        // Find the node where the prefix ends
        for (const char of prefix) {
            if (!currentNode.children[char]) {
                return suggestions; // No words with this prefix
            }
            currentNode = currentNode.children[char];
        }

        // Recursively collect all words starting from this node
        this.collectWords(currentNode, prefix, suggestions);
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
}

export default Trie;
