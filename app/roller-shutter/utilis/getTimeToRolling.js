var config = require('../../config')

exports.getTimeToRolling = (room) => {
  return config.rollerShutter[room].rollingTime;
}
