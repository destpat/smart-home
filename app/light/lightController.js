const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const mqtt = require('mqtt');
const mqttConfig = require('../config').mqtt;

const kitchenOn = require('./room/kitchen/action/on');
const kitchenOff = require('./room/kitchen/action/off');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/on', (req, res) => {
  if (req.body.room === 'kitchen') {
    const { part, part1 } = req.body;
    let partList = [ part, part1 ];
    partList.map((part) => {
      kitchenOn.on(part, res)
    })
  }
  return res.status(200).send({ message: 'Done' })
});

router.post('/off', (req, res) => {
  if (req.body.room === 'kitchen') {
    const { part, part1 } = req.body;
    let partList = [ part, part1 ];
    partList.map((part) => {
      kitchenOff.off(part, res)
    })
  }
  return res.status(200).send({ message: 'Done' })
});

module.exports = router;
