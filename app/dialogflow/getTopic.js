exports.getTopic = (device, room) => {
  console.log('inside get topic');

  let topicRollerShutterBinding = {
    living_room: "living_room_roller_shutter",
    kitchen : "kitchen_roller_shutter",
    king_bedroom: "king_bedroom_roller_shutter"
  }
  if (device === 'roller_shutter') {
    return topicRollerShutterBinding[room];
  }
}
