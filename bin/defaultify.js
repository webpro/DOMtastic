#!/usr/bin/env node

var Transform = require('stream').Transform,
    defaultExporter = new Transform(),
    firstChunkOnly = true,
    wrapperFuncRE = /^(!function\()([a-z])(\)\{)/;

var oldNamespace = process.argv[2],
    newNamespace = process.argv[3];

defaultExporter._transform = function(chunk, encoding, done) {

    if(firstChunkOnly) {

        chunk = chunk.toString().replace(wrapperFuncRE, '$1_$2$3function $2(){return _$2()["default"]};');

        if(oldNamespace && newNamespace) {
            chunk = chunk.replace(oldNamespace, newNamespace);
        }

        firstChunkOnly = null;
    }

    done(null, chunk);

};

process.stdin.pipe(defaultExporter).pipe(process.stdout);
