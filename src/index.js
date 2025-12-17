// Packages
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

//middlewars
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin: (origin, callback) => {
    const allowedOrigins = [process.env.URL_ORIGIN, 'http://localhost:3000'];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use(cookieParser());

//ROUTES
app.use(require('./routes/main.routes'));

// Swagger Configuration
// Swagger Configuration
let swaggerSpec;

try {
  // Try to load static swagger.json (production/build)
  swaggerSpec = require('./swagger.json');
  console.log('Loaded static swagger.json');
} catch (error) {
  // Fallback to dynamic generation (development)
  console.log('Generating Swagger spec dynamically...');
  const swaggerJsdoc = require('swagger-jsdoc');

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
      ],
    },
    apis: ['./src/routes/*.js'], // Path to the API docs relative to root
  };
  swaggerSpec = swaggerJsdoc(swaggerOptions);
}

const swaggerUi = require('swagger-ui-express');

// Serve Swagger at root
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3002);
console.log('Server running in: ' + process.env.URL_ORIGIN);