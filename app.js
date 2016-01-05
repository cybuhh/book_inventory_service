"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const stockRoute = require('./routes/stock');

function logRequest(req, res, next) {
    console.log('requested path', req.path);
    next();
}

function serverError(err, req, res, next) {
    res.status(err.status || 500);
    console.error(err.stack);
    res.json({
        message: err.message,
        error: (process.env.NODE_ENV === 'production') ? {} : err.toString()
    });
}

function clientError(req, res, next) {
    let err = new Error('Not Fount');
    err.status = 404;
    next(err);
}

module.exports = function(mongo) {
    // app.use(logRequest);
    app.use(bodyParser.json());

    app.get('/', function (req, res) {
        res.send('Hello World!');
    });

    app.use('/stock', stockRoute(mongo));

    app.use(clientError);
    app.use(serverError);

    return app;
};
