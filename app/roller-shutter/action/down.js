const currentPosition = require('../currentPosition');
const sonoffHelper = require('../utilis/millisecondsToSonoffTime');
const rollingHelper = require('../utilis/getTimeToRolling');
const client = require('../utilis/mqttConnect').getClient();

exports.down = (room, res) => {
  let downTime = sonoffHelper.millisecondsToSonoffTime(rollingHelper.getTimeToRolling(room)).toString();
  client.publish(`cmnd/${room}/pulseTime1`, downTime , () => {
    client.publish(`cmnd/${room}/power1`, '1', () => {
      currentPosition.setPosition(room, 100);
      res.status(200).send({
        message: 'Rolling shutter is close',
        downTime: downTime
      });
    });
  });
}
