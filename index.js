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
        var obj = {
            err: (ret.length === undefined),
            content: {
                data: ret,
                size: ret.length
            }
        };
        return obj;
    },

    getHeader: function(Archive) {
        var ret = bindings.getHeader(Archive);
        var obj = {
            err: (ret.length === undefined),
            header: {
                data: ret,
                size: ret.length
            },
            content: {
                data: ret.slice(16, 16 + ret.readUInt32LE(12)),
                size: ret.readUInt32LE(12)
            }
        };
        return obj;
    }
};

// var data = bindings.extractFile('replays/garden-of-terror.StormReplay', 'replay.game.events');
// var header = bindings.getHeader('replays/garden-of-terror.StormReplay');
