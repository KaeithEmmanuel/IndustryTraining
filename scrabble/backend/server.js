const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');  // Import CORS
const app = express();
const port = 5000;

// Enable CORS for all origins (allow all websites to access this server)
app.use(cors());  // Use CORS middleware

// Middleware to parse JSON bodies (optional, for future features)
app.use(express.json());

// Serve the .txt file
app.get('/api/words', (req, res) => {
  const filePath = path.join(__dirname, 'words_alpha.txt');
  
  // Check if the file exists before sending
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('Dictionary file not found.');
    }
    res.sendFile(filePath);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
