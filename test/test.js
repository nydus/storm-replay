/*jshint esversion: 6 */

const fs = require("fs");
const expect = require('chai').expect;
const storm = require('../');

const valid = {
    extractFile: {
        validFile: {
            "success": true,
            "content": {
                "data": {
                    "type": "Buffer",
                    "data": [
                        5,34,0,4,1,0,20,5,22,0,2,24,84,105,99,107,108,101,77,101,79,
                        122,109,111,2,5,8,0,9,2,2,7,72,101,114,111,4,9,2,8,9,168,224,
                        33,4,2,2,32,6,5,8,0,9,254,3,2,9,72,4,9,184,1,6,9,254,3,8,9,4,
                        10,9,0,12,9,200,1,14,9,0,16,9,2,18,4,1,9,0,20,2,22,83,103,
                        116,46,32,72,97,109,109,101,114,5,22,0,2,8,90,97,99,107,2,5,
                        8,0,9,2,2,7,72,101,114,111,4,9,2,8,9,244,173,73,4,2,2,32,6,5,
                        8,0,9,254,3,2,9,72,4,9,184,1,6,9,254,3,8,9,4,10,9,0,12,9,200,
                        1,14,9,0,16,9,2,18,4,1,9,2,20,2,14,77,117,114,97,100,105,110,
                        5,22,0,2,24,71,114,97,108,71,114,105,101,118,111,117,115,2,5,
                        8,0,9,2,2,7,72,101,114,111,4,9,2,8,9,196,190,53,4,2,2,32,6,5,
                        8,0,9,254,3,2,9,72,4,9,184,1,6,9,254,3,8,9,4,10,9,0,12,9,200,
                        1,14,9,0,16,9,2,18,4,1,9,4,20,2,16,84,97,115,115,97,100,97,
                        114,5,22,0,2,8,84,101,103,97,2,5,8,0,9,2,2,7,72,101,114,111,
                        4,9,2,8,9,148,144,227,3,4,2,2,32,6,5,8,0,9,254,3,2,9,72,4,9,
                        184,1,6,9,254,3,8,9,4,10,9,0,12,9,200,1,14,9,0,16,9,2,18,4,1,
                        9,6,20,2,10,74,97,105,110,97,5,22,0,2,12,83,104,105,111,107,
                        90,2,5,8,0,9,2,2,7,72,101,114,111,4,9,2,8,9,158,162,203,3,4,
                        2,2,32,6,5,8,0,9,254,3,2,9,72,4,9,184,1,6,9,254,3,8,9,4,10,9,
                        0,12,9,200,1,14,9,0,16,9,2,18,4,1,9,8,20,2,12,82,97,121,110,
                        111,114,5,22,0,2,24,71,97,115,111,108,105,110,101,116,97,120,
                        120,2,5,8,0,9,2,2,7,72,101,114,111,4,9,2,8,9,160,170,165,5,4,
                        2,2,32,6,5,8,0,9,254,3,2,9,254,3,4,9,0,6,9,0,8,9,4,10,9,2,12,
                        9,200,1,14,9,0,16,9,4,18,4,1,9,10,20,2,18,77,97,108,102,117,
                        114,105,111,110,5,22,0,2,12,85,100,97,110,97,114,2,5,8,0,9,2,
                        2,7,72,101,114,111,4,9,2,8,9,154,133,154,1,4,2,2,32,6,5,8,0,
                        9,254,3,2,9,254,3,4,9,0,6,9,0,8,9,4,10,9,2,12,9,200,1,14,9,0,
                        16,9,4,18,4,1,9,12,20,2,10,76,105,32,76,105,5,22,0,2,10,108,
                        117,115,104,105,2,5,8,0,9,2,2,7,72,101,114,111,4,9,2,8,9,168,
                        228,207,3,4,2,2,32,6,5,8,0,9,254,3,2,9,254,3,4,9,0,6,9,0,8,9,
                        4,10,9,2,12,9,200,1,14,9,0,16,9,4,18,4,1,9,14,20,2,10,86,97,
                        108,108,97,5,22,0,2,20,80,102,102,102,102,109,97,121,110,101,
                        2,5,8,0,9,2,2,7,72,101,114,111,4,9,2,8,9,164,139,240,1,4,2,2,
                        32,6,5,8,0,9,254,3,2,9,254,3,4,9,0,6,9,0,8,9,4,10,9,2,12,9,
                        200,1,14,9,0,16,9,4,18,4,1,9,16,20,2,14,74,111,104,97,110,
                        110,97,5,22,0,2,14,83,101,112,101,108,105,111,2,5,8,0,9,2,2,
                        7,72,101,114,111,4,9,2,8,9,188,154,143,5,4,2,2,32,6,5,8,0,9,
                        254,3,2,9,254,3,4,9,0,6,9,0,8,9,4,10,9,2,12,9,200,1,14,9,0,
                        16,9,4,18,4,1,9,18,20,2,14,71,97,122,108,111,119,101,2,2,32,
                        73,110,102,101,114,110,97,108,32,83,104,114,105,110,101,115,
                        4,2,0,6,5,2,0,2,46,82,101,112,108,97,121,115,80,114,101,118,
                        105,101,119,73,109,97,103,101,46,116,103,97,8,6,1,10,9,204,
                        235,182,218,130,251,132,209,3,12,9,204,235,169,233,209,242,
                        132,209,3,14,2,0,16,2,0,18,2,0,20,4,1,0,16,2,80,115,50,109,
                        97,0,0,85,83,31,27,34,141,219,31,114,32,92,191,212,68,5,82,
                        135,16,11,15,57,149,155,232,22,84,129,98,228,8,30,168,85,17,
                        2,80,115,50,109,97,0,0,85,83,26,217,76,18,110,185,138,76,29,
                        231,184,230,248,170,161,83,219,165,43,9,211,130,94,12,137,
                        219,197,130,141,183,15,118,2,80,115,50,109,97,0,0,85,83,146,
                        216,23,68,193,68,27,246,40,237,106,183,233,209,148,133,200,
                        96,145,77,139,116,90,145,246,53,31,249,220,212,230,187,2,80,
                        115,50,109,97,0,0,85,83,161,233,171,205,63,210,80,83,201,3,
                        171,19,82,166,133,117,55,40,75,50,157,8,184,107,43,226,222,73,
                        195,171,127,67,2,80,115,50,109,97,0,0,85,83,24,148,139,217,
                        206,107,207,74,136,85,78,50,114,87,200,232,165,93,137,142,62,
                        91,26,144,254,226,127,86,157,89,179,144,2,80,115,50,109,97,0,
                        0,85,83,102,179,48,17,145,21,70,73,212,173,31,207,160,251,8,
                        180,18,35,178,108,216,28,161,70,179,173,146,214,3,243,104,128,
                        2,80,115,50,109,97,0,0,85,83,70,128,18,1,255,71,151,22,30,68,
                        176,255,138,224,83,23,59,103,91,7,166,78,83,93,196,254,239,
                        153,91,92,132,229,2,80,115,50,109,97,0,0,85,83,151,131,125,
                        193,26,30,212,198,226,145,199,15,153,155,194,228,150,250,212,
                        217,75,220,161,120,115,48,58,204,233,143,5,254,22,6,0,24,9,8,
                        26,9,14,28,4,0,30,9,0,32,4,1,6,0
                    ]
                },
                "size": 1313
            }
        },
        archiveNotFound: {
            success: false,
            details: {
                reason: 'test/replays/archiveNotFound.StormReplay not found.',
                args: [
                    {
                        name: 'Archive',
                        value: 'test/replays/archiveNotFound.StormReplay'
                    },
                    {
                        name: 'File',
                        value: 'replay.details'
                    }
                ],
            }
        },
        fileNotFound: {
            "success": false,
            "details": {
                "reason": "replay.fileNotFound not valid.",
                "args": [
                    {
                        "name": "Archive",
                        "value": "test/replays/example.StormReplay"
                    },
                    {
                        "name": "File",
                        "value": "replay.fileNotFound"
                    }
                ]
            }
        },
        fileNotValid: {
            success: false,
            details: {
                reason: 'Extraction of file is not permitted.',
                args: [
                    {
                        name: 'Archive',
                        value: 'index.js'
                    },
                    {
                        name: 'File',
                        value: 'replay.details'
                    }
                ],
            }
        }
    },
    getHeader: {
        archiveNotValid: {
            success: false,
            details: {
                reason: 'index.js is not a valid MPQ archive.',
                args: [
                    {
                        name: 'Archive',
                        value: 'index.js'
                    }
                ],
            }
        },
        archiveNotFound: {
            success: false,
            details: {
                reason: 'test/replays/archiveNotFound.StormReplay not found.',
                args: [
                    {
                        name: 'Archive',
                        value: 'test/replays/archiveNotFound.StormReplay'
                    }
                ],
            }
        },
        validHeader: {
            "success": true,
            "header": {
                "data": {
                    "type": "Buffer",
                    "data": [
                        77,80,81,27,0,2,0,0,0,4,0,0,119,0,0,0,5,16,0,2,58,
                        72,101,114,111,101,115,32,111,102,32,116,104,101,
                        32,83,116,111,114,109,32,114,101,112,108,97,121,27,
                        49,49,2,5,12,0,9,2,2,9,0,4,9,28,6,9,2,8,9,200,217,4,
                        10,9,200,217,4,4,9,4,6,9,132,169,2,8,6,0,10,5,2,2,2,
                        32,31,97,13,103,93,191,134,220,69,74,227,213,69,91,
                        48,233,12,9,200,217,4,14,5,2,2,2,32,177,69,134,94,253,
                        177,171,28,223,50,57,170,30,77,101,173
                    ]
                },
                "size": 135
            },
            "content": {
                "data": {
                    "type": "Buffer",
                    "data": [
                        5,16,0,2,58,72,101,114,111,101,115,32,111,102,32,116,
                        104,101,32,83,116,111,114,109,32,114,101,112,108,97,
                        121,27,49,49,2,5,12,0,9,2,2,9,0,4,9,28,6,9,2,8,9,200,
                        217,4,10,9,200,217,4,4,9,4,6,9,132,169,2,8,6,0,10,5,2,
                        2,2,32,31,97,13,103,93,191,134,220,69,74,227,213,69,91,
                        48,233,12,9,200,217,4,14,5,2,2,2,32,177,69,134,94,253,
                        177,171,28,223,50,57,170,30,77,101,173
                    ]
                },
                "size": 119
            }
        }
    }
}

const getFileSizeInBytes = (filename) => {
    let stats = fs.statSync(filename);
    let bytes = stats.size;
    return bytes;
};

describe('extractFile()', function () {

    it('file is valid', function () {
        var result = storm.extractFile('test/replays/example.StormReplay', 'replay.details');
        expect(JSON.stringify(result)).to.be.equal(JSON.stringify(valid.extractFile.validFile));
    });

    it('file not found', function () {
        var result = storm.extractFile('test/replays/example.StormReplay', 'replay.fileNotFound');
        expect(JSON.stringify(result)).to.be.equal(JSON.stringify(valid.extractFile.fileNotFound));
    });

    it('archive not found', function () {
        var result = storm.extractFile('test/replays/archiveNotFound.StormReplay', 'replay.details');
        expect(JSON.stringify(result)).to.be.equal(JSON.stringify(valid.extractFile.archiveNotFound));
    });

    it('archive not valid', function () {
        var result = storm.extractFile('index.js', 'replay.details');
        expect(JSON.stringify(result)).to.be.equal(JSON.stringify(valid.extractFile.fileNotValid));
    });
});

describe('getHeader()', function () {
    it('archive is valid', function () {
        var result = storm.getHeader('test/replays/example.StormReplay');
        expect(JSON.stringify(result)).to.be.equal(JSON.stringify(valid.getHeader.validHeader));
    });

    it('archive not found', function () {
        var result = storm.getHeader('test/replays/archiveNotFound.StormReplay');
        expect(JSON.stringify(result)).to.be.equal(JSON.stringify(valid.getHeader.archiveNotFound));
    });

    it('archive not valid', function () {
        var result = storm.getHeader('index.js');
        expect(JSON.stringify(result)).to.be.equal(JSON.stringify(valid.getHeader.archiveNotValid));
    });
});

describe('removeMessages()', function () {

    it('file has replay.messages.events', function () {
        var result = getFileSizeInBytes('test/replays/example.StormReplay');
        expect(result).to.be.equal(549635);
    });

    it('remove chat messages', function () {
        var result = storm.removeMessages('test/replays/example.StormReplay');
        expect(result).to.be.equal(true);
    });

    it('confirm removal of chat messages', function () {
        var result = getFileSizeInBytes('test/replays/example.StormReplay');
        expect(result).to.be.equal(549577);
    });

});