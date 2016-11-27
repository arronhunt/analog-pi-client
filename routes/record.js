"use strict"

var mic = require('mic')
var fs = require('fs')

let outputFile = './recordings/recording.raw'

exports.listen = function(timeout, callback) {
    console.log(`listening for ${timeout} seconds...`)
    this.micInstance = mic({
        'rate': '8000',
        'channels': '2',
        'bitwidth': '16',
        'device': 'plughw:1, 0',
        'debug': true,
        'exitOnSilence': 100 // Time in centiseconds. (TIL centiseconds)
    })
    var micInputStream = this.micInstance.getAudioStream();
    var outputFileStream = fs.WriteStream(outputFile);
    micInputStream.pipe(outputFileStream);

    micInputStream.on('silence', function() {
        console.log("I can't hear anything...");
        callback({
            success: false,
            message: "No audio was playing, recording stopped"
        })
        process.exit()
    });

    micInputStream.on('stopComplete', function() {
        console.log(`File saved to ${outputFile}`);
    });

    micInputStream.on('startComplete', () => {
        var currentdate = new Date()
        console.log(`[${currentdate}]`, `Started!`);

        setTimeout(() => {
            console.log("Done!")
            this.micInstance.stop();
            callback({
                success: true,
                filepath: outputFile
            })
        }, timeout)

    });

    this.micInstance.start();
}
