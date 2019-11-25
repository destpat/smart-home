var express = require('express');
var app = express();

var rollerShutter = require('./roller-shutter/rollerShutterController');
var lightController = require('./light/lightController');
var dialogflowController = require('./dialogflow/dialogflowController');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/roller-shutter', rollerShutter);
app.use('/light', lightController);
app.use('/dialogflow', dialogflowController);

module.exports = app;
