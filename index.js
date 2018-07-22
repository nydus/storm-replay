/*jshint esversion: 6 */

const bindings = require('bindings')('storm-replay');
const fs = require('fs');
const version = require('./package.json').version;

/*
 * Buffer Helper Functions
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000);
};

const FILES = [
    'replay.attributes.events',
    'replay.details',
    'replay.game.events',
    'replay.initdata',
    'replay.load.info',
    'replay.message.events',
    'replay.smartcam.events',
    'replay.sync.events',
    'replay.tracker.events'
];

/*
 * Exports
 */
module.exports = {
    version: version,
    extractFile: function(Archive, File) {
        if (!fs.existsSync(Archive)) {
            return {
                success: false,
                details: {
                    reason: Archive + ' not found.',
                    args: [
                        {
                            name: 'Archive',
                            value: Archive
                        },
                        {
                            name: 'File',
                            value: File
                        }
                    ],
                }
            };
        }
        if (FILES.indexOf(File) > -1) {
            var ret = bindings.extractFile(Archive, File);
            if (ret.length === undefined) {
                return {
                    success: false,
                    details: {
                        reason: 'Extraction of file is not permitted.',
                        args: [
                            {
                                name: 'Archive',
                                value: Archive
                            },
                            {
                                name: 'File',
                                value: File
                            }
                        ],
                    }
                };
            }
            return {
                success: true,
                content: {
                    data: ret,
                    size: ret.length
                }
            };
        } else {
            return {
                success: false,
                details: {
                    reason: File + ' not valid.',
                    args: [
                        {
                            name: 'Archive',
                            value: Archive
                        },
                        {
                            name: 'File',
                            value: File
                        }
                    ],
                }
            };
        }
    },

    getHeader: function(Archive) {
        if (fs.existsSync(Archive)) {
            var ret = bindings.getHeader(Archive);
            if (ret.length === undefined) {
                return {
                    success: false,
                    details: {
                        reason: Archive + ' is not a valid MPQ archive.',
                        args: [
                            {
                                name: 'Archive',
                                value: Archive
                            }
                        ],
                    }
                };
            }
            return {
                success: true,
                header: {
                    data: ret,
                    size: ret.length
                },
                content: {
                    data: ret.slice(16, 16 + ret.readUInt32LE(12)),
                    size: ret.readUInt32LE(12)
                }
            };
        } else {
            return {
                success: false,
                details: {
                    reason: Archive + ' not found.',
                    args: [
                        {
                            name: 'Archive',
                            value: Archive
                        }
                    ],
                }
            };
        }
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
