var bindings = require('bindings')('storm-replay');

module.exports = {
    extractFile: function(Archive, File) {
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
        obj.err = (ret.length === undefined);
        obj.data = ret;
        obj.length = ret.length;
        return obj;
    },

    getHeader: function(Archive) {
        var ret = bindings.getHeader(Archive);
        var obj = {};
        obj.err = (ret.length === undefined);
        obj.data = ret;
        obj.length = ret.length;
        return obj;
    }
};

// var data = bindings.extractFile('replays/garden-of-terror.StormReplay', 'replay.game.events');
// var header = bindings.getHeader('replays/garden-of-terror.StormReplay');
