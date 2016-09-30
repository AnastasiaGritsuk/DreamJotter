var request = require("request");
var btoa = require("../utils").btoa;
var base_url = require("../config").base_url;

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

function del(url, headers, body, callback) {
    request.delete({
        headers: headers,
        url: base_url + url,
        body: body
    }, function (error, response, body) {
        callback(error, response, body);
    });
}


describe("Jotter Server", function() {

    var map = {};

    describe("POST /auth", function() {
        it("user login with valid username and valid password", function(done) {
            post('/auth',loginHeaders('admin', 'admin'), '', function (error, response, body) {
                
                var token = JSON.parse(body).data;
                console.log(token);
                map['admin'] = token;
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
            del('/auth',authHeaders(map['admin']), '', function (error, response, body) {
                console.log(response.body);
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});