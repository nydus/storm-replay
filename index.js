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
        return {
            err: (ret.length === undefined),
            content: {
                data: ret,
                size: ret.length
            }
        };
    },

    getHeader: function(Archive) {
        var ret = bindings.getHeader(Archive);
        return {
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
    },

    /**
     * Remove replay.message.events from the archive.  As some chat messages
     * may be toxic or taken out of context, this sanitation method provides
     * the ability to ensure a player's actions speak louder than her words.
     *
     * @summary Remove replay.message.events from the MPQ archive.
     */
    removeMessages: function(Archive) {
        var ret = bindings.removeMessages(Archive);
        return ret;
    }
};
