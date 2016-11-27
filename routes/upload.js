"use strict"

let fs = require('fs')
let request = require('request')

// let apiURL = "http://localhost:3000/identify"
let apiURL = "http://arrons-mbp.local:3000/identify"

exports.post = function(filepath, callback) {
    fs.readFile(filepath, function(err, data) {
        if (err) throw err
        request({
            url: apiURL,
            method: "POST",
            formData: {
                file: fs.createReadStream(filepath)
            }
        }, function(err, httpResponse, body) {
            if (err) console.log(err)
            console.log('SUCCESS')
            callback(body)
        })
    })
}
