const express = require('express');
const helmet = require('helmet');
const path = require('path');
const metadataController = require('./controllers/metadataController');
const rateLimiter = require('./utils/rateLimiter');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(rateLimiter);

app.set('trust proxy', 1)

app.post('/fetch-metadata', metadataController.fetchMetadata);

const PORT = process.env.PORT || 8000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Catch-all route to serve the frontend app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
