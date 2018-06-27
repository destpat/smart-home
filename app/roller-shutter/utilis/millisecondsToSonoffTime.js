exports.millisecondsToSonoffTime = (milliseconds) => {
  if (milliseconds < 11100) {
    return Math.round(milliseconds / 100);
  }
  if (milliseconds > 11100) {
    return `1${Math.round(milliseconds / 1000)}`;
  }
}
