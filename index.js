var bindings = require('bindings')('storm-replay');

module.exports = {
    extract: function(Archive, File) {
        // 'replay.attributes.events',
        // 'replay.details',
        // 'replay.game.events',
        // 'replay.initData',
        // 'replay.load.info',
        // 'replay.message.events',
        // 'replay.smartcam.events',
        // 'replay.sync.events'
        var ret = bindings.extractFile(Archive, File);
        var obj = {};
        obj.err = (ret.length === undefined)
        obj.data = ret;
        return obj;
    }
};

// var ret = bindings.extract('replays/garden-of-terror.StormReplay', 'replay.game.events');
// var ret = bindings.extract('replays/garden-of-terror.StormReplay', 'rasdf');
// console.log(ret.length);
// if fail, then ret.length === undefined