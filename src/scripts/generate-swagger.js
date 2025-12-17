const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs');
const path = require('path');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Simple School API',
            version: '1.0.0',
            description: 'API documentation for Simple School management system',
        },
        servers: [
            {
                url: 'http://localhost:3002',
                description: 'Development server',
            },
            {
                url: process.env.URL_ORIGIN || 'http://localhost:3002',
                description: 'Production Server'
            }
        ],
    },
    apis: ['./src/routes/*.js'], // Path relative to project root
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Output to dist/swagger.json (ensure dist exists)
// Output to src/swagger.json (for Vercel/Dev)
const srcDir = path.join(__dirname, '..');
const srcFile = path.join(srcDir, 'swagger.json');
fs.writeFileSync(srcFile, JSON.stringify(swaggerSpec, null, 2));
console.log(`Swagger JSON generated at ${srcFile}`);

// Output to dist/swagger.json (for Build)
const distDir = path.join(__dirname, '../../dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}
const distFile = path.join(distDir, 'swagger.json');
fs.copyFileSync(srcFile, distFile);
console.log(`Swagger JSON copied to ${distFile}`);
