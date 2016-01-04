"use strict";
const http = require('http');

let server = http.createServer(function(req, res) {
    req.on();
    res.end('it\'s alive');
});

server.listen(3000, function() {
    console.log('server running on port 3000');
});
