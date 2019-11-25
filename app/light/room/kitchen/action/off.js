const client = require('../../../../mqttConnect').getClient();

exports.off = (part, res) => {
  switch (part) {
    case 'left':
      client.publish('cmnd/kitchen_light/power1', '0');
      break;
    case 'right':
      client.publish('cmnd/kitchen_light/power2', '0');
      break;
    case 'both':
      client.publish('cmnd/kitchen_light/power2', '0');
      client.publish('cmnd/kitchen_light/power1', '0');
      break;
    default:
  }
}
