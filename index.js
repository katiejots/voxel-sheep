var createGame = require('voxel-engine');
var voxel = require('voxel');
var game = createGame({
    generate: voxel.generator['Valley'],
    texturePath: '/textures/'
});
game.appendTo('#container');

var createPlayer = require('voxel-player')(game);
var substack = createPlayer('substack.png');
substack.possess();
window.substack = substack;

window.addEventListener('keydown', function (ev) {
    if (ev.keyCode === 'R'.charCodeAt(0)) {
        substack.toggle();
    }
});

var createCreature = require('voxel-creature')(game);
var creature = createCreature((function () {
    var position = new game.THREE.Vector3(0, 0, 0);
    var voxels = [
        [1, 2, 6, 1],
        [3, 2, 6, 1],
        [3, 3, 6, 1],
        [1, 3, 6, 1],
        [1, 4, 6, 1],
        [2, 4, 6, 1],
        [3, 2, 2, 1],
        [1, 2, 2, 1],
        [3, 3, 2, 1],
        [1, 3, 2, 1],
        [1, 4, 2, 1],
        [3, 4, 2, 1],
        [2, 4, 2, 1],
        [3, 4, 3, 1],
        [3, 4, 4, 1],
        [3, 4, 5, 1],
        [2, 4, 3, 1],
        [2, 4, 4, 1],
        [2, 4, 5, 1],
        [1, 4, 3, 1],
        [1, 4, 4, 1],
        [1, 4, 5, 1],
        [2, 5, 6, 1],
        [2, 6, 6, 1],
        [3, 6, 6, 1],
        [1, 6, 6, 1],
        [1, 7, 6, 1],
        [3, 7, 6, 1],
        [2, 6, 7, 1],
        [2, 4, 1, 1],
        [3, 4, 6, 1],
        [4, 4, 6, 1],
        [4, 4, 4, 1],
        [4, 4, 2, 1],
        [0, 4, 6, 1],
        [0, 4, 4, 1],
        [0, 4, 2, 1],
        [1, 5, 3, 1],
        [1, 5, 5, 1],
        [3, 5, 3, 1],
        [3, 5, 5, 1],
        [2, 5, 4, 1],
        [2, 5, 2, 1]
    ];
    var size = game.cubeSize;
    var group = game.chunkGroups.create();
    voxels.map(function (voxel) {
        group.setBlock({
                x: position.x + voxel[0] * size,
                y: position.y + voxel[1] * size,
                z: position.z + voxel[2] * size
            }
            , voxel[3])
    });
    var obj = new game.THREE.Object3D;
    Object.keys(group.meshes).forEach(function (key) {
        var m = group.meshes[key];
        obj.add(m);
        m.scale.x *= 0.1;
        m.scale.y *= 0.1;
        m.scale.z *= 0.1;
    });
    obj.position = group.position;
    return obj;
})());

window.creature = creature;

creature.position.y = 200;
creature.position.x = Math.random() * 300 - 150;
creature.position.z = Math.random() * 300 - 150;

creature.on('block', function () {
    creature.jump();
});

creature.notice(substack, {
    radius: 500,
    interval: 1000
});

creature.on('notice', function (player) {
    creature.lookAt(player);
    creature.move(0, 0, 0.5);
});

creature.on('frolic', function () {
    creature.rotation.y += Math.random() * Math.PI / 2 - Math.PI / 4;
    creature.move(0, 0, 0.5 * Math.random());
});

creature.on('collide', function (player) {
    console.log('COLLIDE');
});

setInterval(function () {
    if (creature.noticed) return;
    creature.rotation.y += Math.random() * Math.PI / 2 - Math.PI / 4;
    creature.move(0, 0, 0.5 * Math.random());
}, 1000);

