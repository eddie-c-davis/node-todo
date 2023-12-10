const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const { notFound, errorHandler } = require('./middleware');

const app = express();

require('dotenv').config();

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

const tasks = require('./routes/tasks');

app.use('/api/tasks', tasks);

app.use(notFound);
app.use(errorHandler);

module.exports = app;