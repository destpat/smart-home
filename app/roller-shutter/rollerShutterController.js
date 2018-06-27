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
  const { action, room, number } = req.body.queryResult.parameters;
  console.log(req.body.queryResult.parameters);
  if (number) {
    return postPercent.percent(number, room, res);
  }
  if (action === 'up') {
    return postUp.up(room, res);
  }
  if (action === 'down') {
    return postDown.down(room, res);
  }
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
