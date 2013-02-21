var game = require('voxel-hello-world')

var createSheep = require('./')(game);
game.on('fire', function(target){
  console.log(target)
  createSheep(calculateSheepPosition(game.controls.target().yaw.position, 10));
})

function calculateSheepPosition(playerPosition, offset) {
  var sheepPosition = {x: offset, y: offset, z: 0};
  sheepPosition.x = sheepPosition.x + playerPosition.x;
  sheepPosition.y = sheepPosition.y + playerPosition.y; 
  sheepPosition.z = playerPosition.z;
  return sheepPosition;
}
