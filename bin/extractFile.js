var storm = require('../');

console.log(JSON.stringify(storm.extractFile('test/replays/example.StormReplay', 'replay.fileNotFound')));

console.log(JSON.stringify(storm.extractFile('test/replays/example.StormReplay', 'replay.details')));
