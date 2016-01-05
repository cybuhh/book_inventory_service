"use strict";

const request = require('supertest');
const stockInMemory = require('../stockInMemory')();
const app = require('../app')(stockInMemory);

describe('POST JSON to stock', function() {

    it('respond with proper JSON', function(done){
        let requestBody = {
            "isbn": "1617291781",
            "count": 10
        };

        request(app)
            .post('/stock')
            .send(requestBody)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201, requestBody, done);
    });
});
