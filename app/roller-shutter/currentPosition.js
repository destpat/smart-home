const config = require('../config');

exports.getPosition = function(room) {
  console.log(room);
  return config.rollerShutter[room].currentPosition
};

exports.setPosition = function(room, newPosition) {
  config.rollerShutter[room].currentPosition = newPosition
};
