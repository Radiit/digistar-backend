const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Flash Sale Bundling API Documentation',
      version: '1.0.0',
      description: 'API documentation for Flash Sale Bundling system',
    },
    servers: [
      {
        url: 'http://localhost:3000', // URL server API kamu
      },
    ],
  },
  apis: ['./routes/*.js'], // Lokasi file route yang mendefinisikan API
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
