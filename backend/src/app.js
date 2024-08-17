const express = require('express');
const helmet = require('helmet');
const metadataController = require('./controllers/metadataController');
const rateLimiter = require('./utils/rateLimiter');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(rateLimiter);

app.set('trust proxy', 1)

app.post('/fetch-metadata', metadataController.fetchMetadata);

module.exports = app;
