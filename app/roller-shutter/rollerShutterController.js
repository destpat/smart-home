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
  let roomList = [room, room1, room2];

  if (position) {
    roomList.map((room) => {
      room ? postPercent.percent(parseInt(position), room, res) : undefined;
    })
    return res.status(200).send({ message: 'Done'})
  }
  if (action === 'up') {
    roomList.map((room) => {
      room ? postUp.up(room, res) : undefined;
    })
    return res.status(200).send({ message: 'Done' })
  }
  if (action === 'down') {
    roomList.map((room) => {
      room ? postDown.down(room, res) : undefined;
    })
    return res.status(200).send({ message: 'Done' })
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
