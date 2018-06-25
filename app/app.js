var express = require('express');
var app = express();

var rollerShutter = require('./roller-shutter/rollerShutterController');

app.use('/roller-shutter', rollerShutter);

module.exports = app;
