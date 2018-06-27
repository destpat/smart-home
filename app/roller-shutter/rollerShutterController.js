const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mqtt = require('mqtt');
const mqttConfig = require('../config').mqtt;
const rollerTimeConfig = require('../config').rollerTime;
const postPercent = require('./action/percent');
const postUp = require('./action/up');
const postDown = require('./action/down');
let currentPosition = require('./currentPosition')

const client =  mqtt.connect(mqttConfig.url, { username : mqttConfig.username, password: mqttConfig.password });

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/dialogflow', (req, res) => {
  console.log(req.body);
  console.log(req.body);
  console.log(req.body);
})

router.post('/down', (req, res) => {
  postDown.down(req.body.room, res)
});

router.post('/up', (req, res) => {
  postUp.up(req.body.room, res)
});

router.post('/:percent', (req, res) => {
  let percent = parseInt(req.params.percent);
  postPercent.percent(percent, req.body.room, res);
});

module.exports = router;
