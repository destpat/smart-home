const client = require('../../../../mqttConnect').getClient();

exports.on = (part, res) => {
  switch (part) {
    case 'left':
      client.publish('cmnd/kitchen_light/power1', '1');
      break;
    case 'right':
      client.publish('cmnd/kitchen_light/power2', '1');
      break;
    case 'both':
      client.publish('cmnd/kitchen_light/power2', '1');
      client.publish('cmnd/kitchen_light/power1', '1');
      break;
    default:
  }
}
