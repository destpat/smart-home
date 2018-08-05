const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const mqtt = require('mqtt');
const mqttConfig = require('../config').mqtt;
const postPercent = require('./action/percent');
const postUp = require('./action/up');
const postDown = require('./action/down');
const client = require('./utilis/mqttConnect').getClient();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/dialogflow', (req, res) => {
  const { action, room, position, room1, room2 } = req.body.queryResult.parameters;
  let multiRoom = room1 !== '' && room2 !== '';
  if (position) {
    if (multiRoom) {
      postPercent.percent(parseInt(position), room1, res);
      return postPercent.percent(parseInt(position), room2, res);
    } else {
      return postPercent.percent(parseInt(position), room, res);
    }
  }
  if (action === 'up') {
    if (multiRoom) {
      postUp.up(room1, res);
      return postUp.up(room2, res);
    } else {
      return postUp.up(room, res);
    }
  }
  if (action === 'down') {
    if (multiRoom) {
      postDown.down(room1, res);
      return postDown.down(room2, res);
    } else {
      return postDown.down(room, res);
    }
  } else {
    res.status(400).send({
      message: 'No valide data'
    })
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
  postPercent.percent(position, req.body.room, res);
});

module.exports = router;
