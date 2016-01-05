"use strict";

const router = require('express').Router();

module.exports = function(mongo) {
    router.get('/', function (req, res) {
        mongo.findAll()
            .then(function(docs) {
                res.send(docs);
            });
    });

    router.get('/:id', function (req, res) {
        mongo.findOne(parseInt(req.params.id, 10))
            .then(function(docs) {
                if (docs === null) {
                    return res.sendStatus(404);
                }
                res.send(docs);
            })
            .catch(function() {
                res.sendStatus(404);
            });
    });

    router.post('/', function (req, res) {
        let data = {
            isbn: parseInt(req.body.isbn, 10),
            count: req.body.count
        };

        mongo.upsert(data)
            .then(function() {
                res.status(201);
                res.json(data);
            })
            .catch(function(err) {
                res.sendStatus(500);
            });
    });

    return router;
};
