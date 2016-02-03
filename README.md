storm-replay
============

NodeJS wrapper for StormLib (https://github.com/ladislav-zezula/StormLib) for
parsing Heroes of the Storm replay files (`.StormReplay`).

This is a backend library designed for speedy extraction of files.  In tests
against the javascript library, extraction times improved nearly 60%.

# API

## .getHeader(Archive)

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

## .extractFile(Archive, File)

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

## .removeMessages(Archive)

Remove `replay.message.events` from the archive.

Chat messages may be toxic, offensive, taken out of context or otherwise not
fit for human consumption.  This sanitation method provides some protection
to ensure a player's actions speak louder than his or her words.

Returns `true` if there are no messages in the file, `false` if there was an
issue.

```javascript
    return bool;
```

# TODO

* Currently, the build is only working on OSX. It should be relatively easy to
convert the `Makefile` for Linux, but may take quite a bit of time for Windows.

# References

* http://www.zezula.net/en/mpq/stormlib.html
* http://sagivo.com/post/130207525903/nodejs-addons
* http://www.benfarrell.com/2013/01/03/c-and-node-js-an-unholy-combination-but-oh-so-right/