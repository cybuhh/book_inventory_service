"use strict";

const dbUrl = process.env. MONGOLAB_URI || 'mongodb://localhost:27017/microservices-books';
const MongoClient = require('mongodb').MongoClient;

function Mongo() {
    let collection = MongoClient.connect(dbUrl).then(function(db) { return db.collection('books') });

    return {
        findAll: function findAll() {
            return collection
                .then(function(collection) {
                    return collection.find({}).toArray();
                })
        },

        findOne: function findOne(id) {
            return collection
                .then(function(collection) {
                    return collection.find({ isbn: id }).limit(1).next();
                })
        },

        upsert: function upsert(data) {
            return collection
                .then(function (collection) {
                    return collection.updateOne({
                        isbn: data.isbn
                    }, data, { upsert: true })
                })
        }
    }
}

module.exports = Mongo;
