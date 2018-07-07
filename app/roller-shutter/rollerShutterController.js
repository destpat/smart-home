const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mqtt = require('mqtt');
const mqttConfig = require('../config').mqtt;
const rollerTimeConfig = require('../config').rollerTime;
const postPercent = require('./action/percent');
const postUp = require('./action/up');
const postDown = require('./action/down');
const client = require('./utilis/mqttConnect').getClient();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/dialogflow', (req, res) => {
  const { action, room, position } = req.body.queryResult.parameters;
  console.log(req.body.queryResult.parameters);
  if (position) {
    console.log(parseInt(position));
    return postPercent.percent(parseInt(position), room, res);
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

router.post('/:position', (req, res) => {
  let position = parseInt(req.params.position);
  console.log(position);
  postPercent.percent(position, req.body.room, res);
});

module.exports = router;
