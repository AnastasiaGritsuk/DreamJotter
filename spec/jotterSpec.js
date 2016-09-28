var request = require("request");

var base_url = "http://localhost:3000";

function btoa(str) {
    if (Buffer.byteLength(str) !== str.length)
        throw new Error('bad string!');
    return Buffer(str, 'binary').toString('base64');
}

function loginHeaders(username, pwd) {
    return {
        'Content-Type': 'application/json',
        'Authorization' : 'Basic ' + btoa(username + ':' + pwd)
    }
}

describe("Jotter Server", function() {

    describe("POST /auth", function() {
        it("user login with valid username and valid password", function(done) {
            request.post({
                headers: loginHeaders('admin','1234'),
                url: base_url + '/auth',
                body: ''
            }, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("user login with valid username and invalid password ", function(done) {
            request.post({
                headers: loginHeaders('admin','zzzz'),
                url: base_url + '/auth',
                body: ''
            }, function(error, response, body) {
                expect(response.statusCode).toBe(401);
                done();
            });
        });
        it("user login with invalid username", function(done) {
            request.post({
                headers: loginHeaders('zzzz','1234'),
                url: base_url + '/auth',
                body: ''
            }, function(error, response, body) {
                expect(response.statusCode).toBe(401);
                done();
            });
        });
    });
});