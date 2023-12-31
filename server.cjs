const express = require('express');
const path = require('path');
const app = express();

const PORT = 8080;

// Serve static assets from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Always serve index.html for any request
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
