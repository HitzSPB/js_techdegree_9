'use strict';
// load modules
const express = require('express');
const morgan = require('morgan');
const users = require('./routes/users');
const courses = require('./routes/courses');
const models = require("./models");

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();
// setup morgan which gives us http request logging
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', users);
app.use('/api', courses);

// Testing DB Connection
(async () => {
  try {
    models.sequelize.authenticate();
    models.sequelize.sync();
    console.log("Testing connection database - Success");
  } catch (err) {
    console.log("Unable to connect to DB", err);
  }
})();

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
