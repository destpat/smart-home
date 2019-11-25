const rollerShutterConfig = require('../../config').rollerShutter

exports.getTimeToRolling = (room) => {
  return rollerShutterConfig[room].rollingTime;
}
