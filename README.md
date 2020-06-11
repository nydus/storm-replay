storm-replay
============

![Works with Node v8](https://img.shields.io/badge/node%20v8-%20%E2%9C%94-brightgreen)
![Works with Node v10](https://img.shields.io/badge/node%20v10-%20%E2%9C%94-brightgreen)
![Does NOT work with Node v12](https://img.shields.io/badge/node%20v12-%20%E2%9D%8C-critical)
![Does NOT work with Node v14](https://img.shields.io/badge/node%20v14-%20%E2%9D%8C-critical)

![Works with node-gyp v6.1.0](https://img.shields.io/badge/node--gyp%20v6.1.0-%20%E2%9C%94-brightgreen)
![Does NOT work with node-gyp v7](https://img.shields.io/badge/node--gyp%20v7-%20%E2%9D%8C-critical)

![Works with StormLib v9.21](https://img.shields.io/badge/StormLib%20v9.21-%20%E2%9C%94-brightgreen)
![Does NOT work with StormLib v9.22](https://img.shields.io/badge/StormLib%20v9.22-%20%E2%9D%8C-critical)


***2018-12 Update** Since Blizzard has decided to effectively kill Heroes of the Storm by ending all competitive esports entirely, shifting developers off the game, and “changing the cadence” of updates, I have no longer cared about the game and have halted all development.  Shame, as it was a beloved game for me, but seeing as they completely dropped by the ball by failing to bring the game to market in a timely manner to compete in the MOBA space, my updates to this project will be considered few and very far between.*

NodeJS wrapper for StormLib (https://github.com/ladislav-zezula/StormLib) for
parsing Heroes of the Storm replay files (`.StormReplay`).

This is a backend library designed for speedy extraction of files.  In tests
against the javascript library, extraction times improved nearly 60%.

## API

### .getHeader(Archive)

Retrieve the MPQ Header information for the `Archive`.  This header includes
the all important build information for parsing.

The object returned contains the full header as `.header.data` and the parsed
header as `.content.data`.  You will most likely want `.content.data`. The
other data provided, `.err` and `.content.size`, is there for validation.

```javascript
    return {
        err: (Header.length === undefined),
        header: {
            data: Header,
            size: Header.length
        },
        content: {
            data: Header.slice(16, 16 + Header.readUInt32LE(12)),
            size: Header.readUInt32LE(12)
        }
    };
```

### .extractFile(Archive, File)

Extract `File` from `Archive` as a buffer.

The object returned has the data you want as `.content.data`.  The other data
provided, `.err` and `.content.size`, is there for validation.

```javascript
    return {
        err: (File.length === undefined),
        content: {
            data: File,
            size: File.length
        }
    };
```

### .removeMessages(Archive)

Remove `replay.message.events` from the archive.

Chat messages may be toxic, offensive, taken out of context or otherwise not
fit for human consumption.  This sanitation method provides some protection
to ensure a player's actions speak louder than his or her words.

Returns `true` if there are no messages in the file, `false` if there was an
issue.

```javascript
    return bool;
```

## References

* http://www.zezula.net/en/mpq/stormlib.html
* http://sagivo.com/post/130207525903/nodejs-addons
* http://www.benfarrell.com/2013/01/03/c-and-node-js-an-unholy-combination-but-oh-so-right/
