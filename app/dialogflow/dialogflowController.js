const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mqtt = require('mqtt');
const mqttConfig = require('../config').mqtt;
const percent = require('../roller-shutter/action/percent');
const up = require('../roller-shutter/action/up');
const down = require('../roller-shutter/action/down');
const getTopic = require('./getTopic')
const kitchenOn = require('../light/room/kitchen/action/on');
const kitchenOff = require('../light/room/kitchen/action/off');


router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

router.post('/', (req, res) => {
  const {
    action,
    room,
    position,
    room1,
    room2,
    device,
    part
  } = req.body.queryResult.parameters;
  let roomList = [room, room1, room2];
  console.log('******* PARAMS **********');
  console.log(req.body.queryResult.parameters);
  console.log('******* PARAMS **********');
  if (device === "roller_shutter") {
    if (position) {
      roomList.map((room) => {
        room ? percent.percent(parseInt(position), getTopic.getTopic(device, room), res) : undefined;
      })
      return res.status(200).send({
        message: 'Done'
      })
    }
    if (action === 'up') {
      roomList.map((room) => {
        room ? up.up(getTopic.getTopic(device, room), res) : undefined;
      })
      return res.status(200).send({
        message: 'Done'
      })
    }
    if (action === 'down') {
      roomList.map((room) => {
        room ? down.down(getTopic.getTopic(device, room), res) : undefined;
      })
      return res.status(200).send({
        message: 'Done'
      })
    } else {
      res.status(400).send({
        message: 'No valide data'
      })
    }
  }
  if (device === "light" && !part) {
    if (action === 'on') {
      kitchenOn.on('both')
    }
    if (action === 'off') {
      kitchenOff.off('both')
    }
    return res.status(200).send({
      message: 'Finish'
    })
  }

  if (device === "light" && part) {
    if (action === 'on') {
      kitchenOn.on(part)
    }
    if (action === 'off') {
      kitchenOff.off(part)
    }
    return res.status(200).send({
      message: 'Finish'
    })
  }
  return res.status(200).send({
    message: 'Finish'
  })
})

module.exports = router;
