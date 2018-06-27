const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mqtt = require('mqtt');
const mqttConfig = require('../config').mqtt;
const rollerTimeConfig = require('../config').rollerTime;

const client =  mqtt.connect(mqttConfig.url, { username : mqttConfig.username, password: mqttConfig.password });

let currentPosition = 0;

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

let getTimeToRolling = (room) => {
  return rollerTimeConfig[room];
}

let millisecondsToSonoffTime = (milliseconds) => {
  if (milliseconds < 11100) {
    return Math.round(milliseconds / 100);
  }
  if (milliseconds > 11100) {
    return `1${Math.round(milliseconds / 1000)}`;
  }
}

router.post('/down', (req, res) => {
  let downTime = millisecondsToSonoffTime(getTimeToRolling(req.body.room)).toString();
  client.publish(`cmnd/${req.body.room}/pulseTime1`, downTime , () => {
    client.publish(`cmnd/${req.body.room}/power1`, '1', () => {
      res.status(200).send({
        message: 'Rolling shutter is close',
        downTime: downTime
      });
    });
  });
});

router.post('/up', (req, res) => {
  let upTime = millisecondsToSonoffTime(getTimeToRolling(req.body.room)).toString();
  client.publish(`cmnd/${req.body.room}/pulseTime2`, upTime , () => {
    client.publish(`cmnd/${req.body.room}/power2`, '1', () => {
      res.status(200).send({
        message: 'Rolling shutter is open',
        upTime: upTime
      });
    });
  });
});


router.post('/:percent', (req, res) => {
  /**
  * @description
  * Descend le volet roulant de
  * la cuisine avec le pourcentage donnée
  * en paramétre
  */
  let percentInt = parseInt(req.params.percent);
  if (percentInt > 0 && percentInt <= 100) {
    let percentToMilliseconds = (percent) => {
      return percent * getTimeToRolling(req.body.room) / 100;
    }
    if (currentPosition < percentInt) {
      let downTime = millisecondsToSonoffTime(percentToMilliseconds(percentInt) - percentToMilliseconds(currentPosition)).toString();
      client.publish(`cmnd/${req.body.room}/pulseTime1`, downTime, () => {
        client.publish(`cmnd/${req.body.room}/power1`, '1', () => {
          currentPosition = percentInt;
          console.log(downTime);
          res.status(200).send({
            message: 'Done',
            downTime :  downTime,
            currentPosition: currentPosition
          })
        });
      });
    }
    if (currentPosition > percentInt) {
      let upTime = millisecondsToSonoffTime(percentToMilliseconds(currentPosition) - percentToMilliseconds(percentInt)).toString()
      client.publish(`cmnd/${req.body.room}/pulseTime2`, upTime , () => {
        client.publish(`cmnd/${req.body.room}/power2`, '1', () => {
          currentPosition = percentInt;
          res.status(200).send({
            message: 'Done',
            upTime :  upTime,
            currentPosition: currentPosition
          })
        });
      });
    }
  } else {
    res.status(400).send({
      message: `Error percent value is not valid => (${req.params.percent})`
    })
  }
});

module.exports = router;
