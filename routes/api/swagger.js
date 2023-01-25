const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const {DEFAULT_PORT} = require("../../config");
const {LOCATION, PORT = DEFAULT_PORT} = process.env;

const specs = swaggerJsDoc({
  definition: {
    openapi: '3.0.0', info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'GoIT NodeJS homework project "Contacts"',
    },
    servers: [{
      url: `${LOCATION}:${PORT}`,
    }],
  },
  apis: ['.routes/api/*.js'],
});

// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

module.exports = [swaggerUI.serve, swaggerUI.setup(specs)];
