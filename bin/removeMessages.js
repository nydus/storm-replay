var storm = require('../');

var bool = storm.removeMessages('test/replays/example.StormReplay');

console.log("replay.messages.events", (bool) ? "successfully" : "NOT", "removed.")

// (with messages)
//  MD5  = 1ce78a9a6f9b63674c6dfe51afd34456
//  Size = 549635

// (without messages)
//  MD5  = f2b50b6c994970dc0b5c789715a20b3c
//  Size = 549577