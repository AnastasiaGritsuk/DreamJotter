var request = require("request");
var btoa = require("../../common/utils").btoa;

var base_url = "http://localhost:3000";

function loginHeaders(username, pwd) {
    return {
        'Content-Type': 'application/json',
        'Authorization' : 'Basic ' + btoa(username + ':' + pwd)
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
});