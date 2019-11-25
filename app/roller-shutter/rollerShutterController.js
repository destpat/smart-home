const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const mqtt = require('mqtt');
const mqttConfig = require('../config').mqtt;
const percent = require('./action/percent');
const up = require('./action/up');
const down = require('./action/down');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', (req, res) => {
  console.log(req.body.action);
  switch (req.body.action) {
    case 'percent':
    console.log(req.body.percent);
      let position = parseInt(req.body.percent);
      percent.percent(position, req.body.room, res);
      return res.status(200).send({ message: 'Done'})
    case 'up':
        up.up(req.body.room, res)
      return res.status(200).send({ message: 'Done'})
      case 'down':
        down.down(req.body.room, res)
      return res.status(200).send({ message: 'Done'})
    default:
  }
});

module.exports = router;
