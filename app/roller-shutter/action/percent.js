const position = require('../currentPosition');
const sonoffHelper = require('../utilis/millisecondsToSonoffTime');
const rollingHelper = require('../utilis/getTimeToRolling');
const client = require('../utilis/mqttConnect').getClient();

exports.percent = (percent, room, res) => {
  /**
  * @description
  * Descend le volet roulant de
  * la cuisine avec le pourcentage donnée
  * en paramétre
  */
  currentPosition = position.getPosition();

  if (percent > 0 && percent <= 100 && percent !== currentPosition) {
    let percentToMilliseconds = (percent) => {
      return percent * rollingHelper.getTimeToRolling(room) / 100;
    }
    if (currentPosition < percent) {
      let downTime = sonoffHelper.millisecondsToSonoffTime(percentToMilliseconds(percent) - percentToMilliseconds(currentPosition)).toString();
      client.publish(`cmnd/${room}/pulseTime1`, downTime, () => {
        client.publish(`cmnd/${room}/power1`, '1', () => {
          position.setPosition(percent);
          console.log({
            message: 'Done',
            downTime: downTime,
            currentPosition: currentPosition
          });
          res.status(200).send({
            message: 'Done',
            downTime: downTime,
            currentPosition: currentPosition
          })
        });
      });
    } else {
      let upTime = sonoffHelper.millisecondsToSonoffTime(percentToMilliseconds(currentPosition) - percentToMilliseconds(percent)).toString()
      client.publish(`cmnd/${room}/pulseTime2`, upTime , () => {
        client.publish(`cmnd/${room}/power2`, '1', () => {
          position.setPosition(percent);
          console.log({
            message: 'Done',
            upTime: upTime,
            currentPosition: currentPosition
          });
          res.status(200).send({
            message: 'Done',
            upTime: upTime,
            currentPosition: currentPosition
          })
        });
      });
    }
  } else {
    res.status(400).send({
      message: `Error percent value is not valid => (${percent})`,
      currentPosition: currentPosition,
      percent: percent
    })
  }
}
