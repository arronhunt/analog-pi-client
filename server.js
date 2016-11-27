"use strict"

let express = require('express')
let request = require('request')
let fs = require('fs')
let ip = require('ip')
var app = express()

// TODO: Do we need a pairing feature?
//       Generate a unique key pair between client and pi

// Main route
app.get('/', function (req, res) {
    res.send("Hello World")
});

app.get('/listen', function (req, res) {
    let record = require('./routes/record.js')
    let upload = require('./routes/upload.js')
    record.listen(10000, function(recording) {
        if (recording.success) {
            upload.post(recording.filepath, function(data) {
                res.send(data)
            })
        } else {
            res.send(recording)
        }
    })
})

// Used to get details about this specific pi.
// NOTE: Pi needs to be initialized first using POST /init
app.get('/config', function(req, res) {
    res.send({
        "success": true,
        "initialized": false,
        "name": "pi-analog",
        "uuid": "12345",
        "ip": ip.address(),
    })
})

app.post('/init', function(req, res) {
    // Create a config file that will generate details about this pi
})

app.listen(3001, function () {
  console.log('Example app listening at localhost:3001/');
});
