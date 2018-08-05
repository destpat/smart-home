module.exports = {
  mqtt: {
    url: 'mqtt server url',
    username: 'username',
    password: 'password'
  },
  rollerShutter: {
    living_room: {
      rollingTime: 14000, // Time for rolling the shutter un milliseconds
      currentPosition: 0
    },
    kitchen: {
      rollingTime: 14000, // Time for rolling the shutter un milliseconds
      currentPosition: 0
    },
    bedroom: {
      rollingTime: 14000, // Time for rolling the shutter un milliseconds
      currentPosition: 0
    }
  },

  rollerTime: {
    living_room : 14000, // Time for rolling the shutter un milliseconds
    kitchen : 14000,
    bedroom : 14000
  }
};
