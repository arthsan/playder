module.exports = function parseStringAsArray(arrayAsString){
  return arrayAsString.split(',').map(game => game.trim());
}