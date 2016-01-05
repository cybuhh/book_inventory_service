"use strict";

// const mongo = require('../stockInMemory')();
const mongo = require('../libs/mongo')();
const app = require('../app')(mongo);

let server = app.listen(process.env.PORT || 3000, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
