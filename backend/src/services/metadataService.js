const axios = require('axios');
const metascraper = require('metascraper')([
    require('metascraper-url')(),
    require('metascraper-title')(),
    require('metascraper-description')(),
    require('metascraper-image')(),
]);

const convertImageToBase64 = async (imageUrl) => {
    try {
        const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer'
        });
        const buffer = Buffer.from(response.data, 'binary').toString('base64');
        const mimeType = response.headers['content-type'];
        return `data:${mimeType};base64,${buffer}`;
    } catch (error) {
        return null;
    }
};

exports.fetchMetadataForUrls = async (urls) => {
    const metadataPromises = urls.map(async (url) => {
        try {
            const { data: html, request: { responseURL: finalUrl } } = await axios.get(url);
            const metadata = await metascraper({ html, url: url });

            const imageBase64 = metadata.image ? await convertImageToBase64(metadata.image) : null;

            return {
                url: finalUrl,
                title: metadata.title || 'No title available',
                description: metadata.description || 'No description available',
                image: imageBase64,
            };
        } catch (error) {
            return {
                url,
                error: 'Could not retrieve metadata',
            };
        }
    });

    return await Promise.all(metadataPromises);
};
