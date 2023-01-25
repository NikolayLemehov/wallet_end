const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const router = require('./routes/api');

const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJSDocs = YAML.load('./api.yaml');

const app = express();
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/transactions', router.transactions);
app.use('/api/users', router.users);

app.use((req, res) => {
  res.status(404).json({message: 'Not found'});
});

app.use((err, req, res, next) => {
  const {status = 500, message = 'Server error'} = err;
  res.status(status).json({message});
});

module.exports = app;
