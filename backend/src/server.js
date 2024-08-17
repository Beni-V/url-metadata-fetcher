const express = require('express');
const path = require('path');
const app = require('./app');

const PORT = process.env.PORT || 80;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Catch-all route to serve the frontend app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
