var request = require("request");
var btoa = require("../utils").btoa;
var createUser = require("../utils").createUser;
var base_url = require("../config").base_url;
var db = require("../config").db;

function loginHeaders(username, pwd) {
    return {
        'Content-Type': 'application/json',
        'Authorization' : 'Basic ' + btoa(username + ':' + pwd)
    }
}

function authHeaders(token) {
    return {
        'Authorization': token
    }
}

function post(url, headers, body, callback) {
    request.post({
        headers: headers,
        url: base_url + url,
        body: body
    }, function (error, response, body) {
        callback(error, response, body);
    });
}

function dekete(url, headers, body, callback) {
    request.delete({
        headers: headers,
        url: base_url + url,
        body: body
    }, function (error, response, body) {
        callback(error, response, body);
    });
}


describe("Jotter Server", function() {

    describe("POST /auth", function() {
        it("user login with valid username and valid password", function(done) {
            post('/auth',loginHeaders('admin', '1234'), '', function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("user login with valid username and invalid password ", function(done) {
            post('/auth',loginHeaders('admin', 'zzzz'), '', function (error, response, body) {
                expect(response.statusCode).toBe(401);
                done();
            });
        });
        it("user login with invalid username", function(done) {
            post('/auth',loginHeaders('zzzz', '1234'), '', function (error, response, body) {
                expect(response.statusCode).toBe(401);
                done();
            });
        });
    });
    describe("DELETE /auth", function() {
        it("token is valid", function(done) {
            delete('/auth',authHeaders('xxx1xxx2'), '', function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});