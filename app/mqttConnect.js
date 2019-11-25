const mqttConfig = require('./config').mqtt;
const mqtt = require('mqtt');

const client = mqtt.connect(mqttConfig.url, { username : mqttConfig.username, password: mqttConfig.password });

exports.getClient = function() {
  return client;
};
