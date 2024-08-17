const express = require('express');
const helmet = require('helmet');
const path = require('path');
const metadataController = require('../src/controllers/metadataController');
const rateLimiter = require('../src/utils/rateLimiter');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(rateLimiter);
app.use(express.static(path.join(__dirname, '../public')));

app.set('trust proxy', 1)



app.post('/api/fetch_metadata', metadataController.fetchMetadata);
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
