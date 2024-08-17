const metadataService = require('../services/metadataService');

exports.fetchMetadata = async (req, res) => {
    try {
        const urls = req.body.urls;
        if (!urls || urls.length < 3) {
            return res.status(400).json({ message: 'At least 3 URLs are required.' });
        }
        const metadata = await metadataService.fetchMetadataForUrls(urls);
        res.json(metadata);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching metadata.', error });
    }
};
