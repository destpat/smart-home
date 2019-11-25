const rollerShutterConfig = require('../config').rollerShutter;

exports.getPosition = function(room) {
  return rollerShutterConfig[room].currentPosition
};

exports.setPosition = function(room, newPosition) {
  rollerShutterConfig[room].currentPosition = newPosition
};
