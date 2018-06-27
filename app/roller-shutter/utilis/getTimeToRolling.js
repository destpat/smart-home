var config = require('../../config')

exports.getTimeToRolling = (room) => {
  return config.rollerTime[room];
}
