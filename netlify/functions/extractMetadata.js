// netlify/functions/extractMetadata.js
const ExifParser = require('exif-parser');

exports.handler = async (event) => {
    try {
        // Parse the image data from the event body
        const { imageBase64 } = JSON.parse(event.body);
        const imageBuffer = Buffer.from(imageBase64, 'base64');

        // Extract metadata using exif-parser
        const parser = ExifParser.create(imageBuffer);
        const metadata = parser.parse();

        // Return the metadata as JSON
        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                metadata: metadata.tags
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        console.error('Error processing image:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: 'Error processing image' })
        };
    }
};
