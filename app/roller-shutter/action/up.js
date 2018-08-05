const currentPosition = require('../currentPosition');
const sonoffHelper = require('../utilis/millisecondsToSonoffTime');
const rollingHelper = require('../utilis/getTimeToRolling');
const client = require('../utilis/mqttConnect').getClient();

exports.up = (room, res) => {
  let upTime = sonoffHelper.millisecondsToSonoffTime(rollingHelper.getTimeToRolling(room)).toString();
  client.publish(`cmnd/${room}/pulseTime2`, upTime , () => {
    client.publish(`cmnd/${room}/power2`, '1', () => {
      currentPosition.setPosition(room, 0);
    });
  });
}
