"use strict";

const _ = require('lodash');

function Mongo() {
    let books = [];

    return {
        findAll: function findAll() {
            return Promise.resolve(books);
        },

        findOne: function findOne(isbn) {
            let book = _.find(books, { 'isbn': isbn });
            return Promise.resolve(book);
        },

        upsert: function upsert(book) {
            let oldBook = _.find(books, { 'isbn': book.isbn });
            if (oldBook) {
                oldBook = book;
            } else {
                books.push(book);
            }
            return Promise.resolve(oldBook);
        }
    };
}

module.exports = Mongo;
