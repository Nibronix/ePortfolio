const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    try {
        // Read the html file
        const filePath = path.hoin(__dirname, 'index.html');
        const htmlContent = fs.readFileSync(filePath, 'utf8');

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html'
            },
            body: htmlContent
        };
    } catch (error) {
        console.error('Error reading index!', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};