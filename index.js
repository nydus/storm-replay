//  module.exports = require('./build/Release/StormLib.node');

var bindings = require('bindings')('StormLib');

            // 'replay.attributes.events',
            // 'replay.details',
            // 'replay.game.events',
            // 'replay.initData',
            // 'replay.load.info',
            // 'replay.message.events',
            // 'replay.smartcam.events',
            // 'replay.sync.events'

var ret = bindings.get('replays/towers-of-doom.StormReplay', 'replay.game.events');
console.log(ret.length);

var ret = bindings.get('replays/towers-of-doom.StormReplay', 'rasdf');
console.log(ret.length);